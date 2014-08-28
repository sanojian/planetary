var Ship = function(myType, myTeam, locX, locY, r, start) {

	var self = this;
	self.type = myType;
	self.home = start;
	if (g_game.buildings[self.home]) {
		g_game.buildings[self.home].numShips += 1;
	}
	self.orbitting = start;
	g_game.planets[self.orbitting].addOrbitter(self);
	self.destination = null;
	self.speed = g_defs.shipStats[this.type].speed;
	self.team = myTeam;
	self.fireSpeed = 20;
	self.hits = g_defs.shipStats[this.type].hits;
	self.damage = g_defs.shipStats[this.type].damage;
	var frames = Math.floor(Math.random() * self.fireSpeed);

	var upgrades = getUpgrades();
	if (upgrades.engine) {
		self.speed += 0.5 * self.speed;
	}
	if (upgrades.armour) {
		self.hits += 0.5 * self.hits;
	}
	if (upgrades.gun) {
		self.damage += 0.5 * self.damage;
	}

	self.redraw = function() {
		if (!self.image) {
			self.image = drawShip(self.type, g_defs.shipStats[myType].size, g_defs.teams[myTeam].color, locX, locY, upgrades);
			self.image.anchor.set(0.5);
		}

		/*self.image.attr({ 'stroke-width': self.hits });
		 if (!g_game.planets[self.orbitting].visible) {
		 self.image.hide();
		 }*/
	};

	self.redraw();
	self.x = locX;
	self.y = locY;
	//self.image.transform('t' + self.x + ',' + self.y);


	self.takeDamage = function(amt) {
		self.hits -= amt;
		// satellites die in one hit always
		if (self.hits <= 0 || self.type == 'satellite') {
			self.destroy();
		}
		else {
			self.redraw();
		}
	}

	self.destroy = function(skipAnimate) {
		if (self.visible && !skipAnimate) {
			g_game.explosions.push(new Explosion(self.image));
		}
		if (self.orbitting) {
			g_game.planets[self.orbitting].removeOrbitter(this);
		}
		var idx = g_game.ships.indexOf(this);
		g_game.ships.splice(idx, 1);
		self.image.remove();
		if (g_game.buildings[self.home])
			g_game.buildings[self.home].numShips -= 1;
	}

	self.clearDestination = function() {
		self.exitLength = null;
		self.destination = null;
	};

	self.setDestination = function() {
		// for turorial, ship may not have an actual team
		if (!g_game.teams[self.team])
			return;

		if (self.type == 'satellite')
			return;		// not allowed to leave orbit

		if (self.orbitting) {
			self.clearDestination();
			for (var i=0;i<g_game.teams[self.team].routePoints.length-1;i++) {
				if (g_game.teams[self.team].routePoints[i] == self.orbitting) {
					// lets go somewhere
					self.destination = g_game.teams[self.team].routePoints[i+1];
				}
			}

			if (self.destination) {
				// find a route
				var route = g_game.routes[self.orbitting + '_' + self.destination] || g_game.routes[self.destination + '_' + self.orbitting];
				if (route) {
					//var pt = Raphael.pathIntersection(route.path, g_game.planets[self.orbitting].orbit);
					if (route.startPlanet == self.orbitting) {
						self.exitLength = route.exitLength1;
						self.enterLength = route.exitLength2;
					}
					else {
						self.exitLength = route.exitLength2;
						self.enterLength = route.exitLength1;
					}
				}
			}
		}
	};

	self.setDestination();
	var orbitDistanceTravelled = 0;

	self.attackAvailableTargets = function() {
		for (var i=0;i<g_game.planets[self.orbitting].orbittingShips.length;i++) {
			var otherShip = g_game.planets[self.orbitting].orbittingShips[i];
			if (otherShip.team != self.team) {
				if (self.visible) {
					var shot = g_game.raphPaper.path('M' + self.x + ' ' + self.y + 'L' + otherShip.x + ' ' + otherShip.y).attr({ stroke: '#ff5555' });
					g_game.sounds.laser.play();
					setTimeout(function() { shot.remove(); }, 100);
				}

				if (Math.random() > 0.5)	// needs accuracy
					otherShip.takeDamage(self.damage);
				i = g_game.planets[self.orbitting].orbittingShips.length; // break loop
			}
		}

	};

	self.move = function() {
		frames++;
		if (self.exitLength !== null && Math.abs(orbitDistanceTravelled - self.exitLength) < 2) {
			g_game.planets[self.orbitting].removeOrbitter(this);
			self.orbitting = null;
			self.exitLength = null;
			orbitDistanceTravelled = 0;
		}
		if (self.orbitting) {
			if ((self.type == 'laboratory' || self.type == 'gun' || self.type == 'factory') && !g_game.buildings[self.orbitting]) {
				// I am orbitting an empty planet, build a factory!
				g_game.buildings[self.orbitting] = new Building(self.type, self.orbitting, self.team);
				return self.destroy();
			}
			orbitDistanceTravelled = (orbitDistanceTravelled + self.speed) % g_game.planets[self.orbitting].orbitLength;
			var pt = findPointAtLength(g_game.planets[self.orbitting].x, g_game.planets[self.orbitting].y, g_game.planets[self.orbitting].r, orbitDistanceTravelled, false);//g_game.planets[self.orbitting].orbit.getPointAtLength(orbitDistanceTravelled);
			self.x = pt.x;
			self.y = pt.y;
			//self.image.transform('t' + self.x + ',' + self.y);
			self.image.x = pt.x;
			self.image.y = pt.y;
			if (frames % self.fireSpeed == 0) {
				// look for target
				if (self.type == 'fighter' || self.type == 'satellite') {
					self.attackAvailableTargets();
				}
				else if (self.type == 'bomber') {
					var building = g_game.buildings[g_game.planets[self.orbitting].name];
					if (building && building.team != self.team) {
						if (self.visible) {
							var shot = g_game.raphPaper.path('M' + self.x + ' ' + self.y + 'L' + g_game.planets[this.orbitting].x + ' ' + g_game.planets[this.orbitting].y).attr({ stroke: '#ffffff', 'stroke-width': 3 });
							setTimeout(function() { shot.remove(); }, 100);
							g_game.sounds.bomber.play();
						}
						building.takeDamage(this.damage);
					}
					else {
						self.attackAvailableTargets();
					}
				}
			}
		}
		else if (self.destination) {
			var dx = self.x - g_game.planets[self.destination].x;
			var dy = self.y - g_game.planets[self.destination].y;
			if (Math.abs(dx) < g_game.planets[self.destination].r*2 && Math.abs(dy) < g_game.planets[self.destination].r*2) {
				// we arived!
				if (self.type == 'factory' && g_game.buildings[self.destination] == null) {
					g_game.buildings[self.destination] = new Building('factory', self.destination, self.team);
					return self.destroy();
				}

				self.orbitting = self.destination;
				g_game.planets[self.orbitting].addOrbitter(this);
				orbitDistanceTravelled = self.enterLength || 0;
				self.setDestination();
				return;
			}
			var angle = Math.atan2(-dy, -dx);
			self.x += self.speed * Math.cos(angle);
			self.y += self.speed * Math.sin(angle);
			// get bbox of set so we can rotate around center
			//for (var i=0;i<self.image.length;i++) {
			//var bbox = self.image[self.image.length-1].getBBox();
			//self.image.transform('r' + (angle * 180 / Math.PI) + ',' + (bbox.x + bbox.w/2) + ',' + (bbox.y + bbox.h/2));
			self.image.transform('t' + self.x + ',' + self.y);
			//}

		}
	};

	return this;
};

var drawShip = function(type, r, color, offsetX, offsetY, upgrades) {
	var ship = null;//g_game.raphPaper.set();
	if (type == 'fighter') {
		/*var points = [];
		 //if (upgrades && upgrades.engine) {
		 points.push([ [-r*1.5, -r/2], [r, 0], 	[-r*1.5, r/2] ]);
		 //}
		 points.push([ [-r, -r], 	[2*r, 0], 	[-r, r] ]);
		 for (var j=0;j<points.length;j++) {
		 var path = '';
		 for (var i=0;i<points[j].length;i++) {
		 path += (i == 0 ? 'M' : 'L') + (points[j][i][0] + offsetX) + ',' + (points[j][i][1] + offsetY);
		 }
		 path += 'L' + (points[j][0][0] + offsetX) + ',' + (points[j][0][1] + offsetY);
		 ship.push(g_game.raphPaper.path(path).attr({ fill: color, stroke: '#ddd', 'stroke-width': 3 }));
		 }*/
		ship = g_game.add.sprite(offsetX, offsetY, 'allsprites', 'ship');
	}
	else if (type == 'bomber') {
		/*ship.push(g_game.raphPaper.ellipse(offsetX-r, offsetY-r, r, r/2).attr({ fill: color, stroke: '#ddd', 'stroke-width': 3 }));
		 ship.push(g_game.raphPaper.ellipse(offsetX-r, offsetY+r, r, r/2).attr({ fill: color, stroke: '#ddd', 'stroke-width': 3 }));
		 ship.push(g_game.raphPaper.ellipse(offsetX, offsetY, 3*r/2, r).attr({ fill: color, stroke: '#ddd', 'stroke-width': 3 }));*/
		ship = g_game.add.sprite(offsetX, offsetY, 'allsprites', 'ship');
	}
	else if (type == 'factory' || type == 'dummy-factory') {
		/*ship.push(g_game.raphPaper.rect(offsetX - 2, offsetY - 10, 8, 14).attr({ fill: color, stroke: '#ddd', 'stroke-width': 3 }));
		 ship.push(g_game.raphPaper.rect(offsetX - 8, offsetY - 4, 8, 8).attr({ fill: color, stroke: '#ddd', 'stroke-width': 3 }));*/
		ship = g_game.add.sprite(offsetX, offsetY, 'allsprites', 'factory');
	}
	else if (type == 'gun') {
		ship.push(g_game.raphPaper.circle(offsetX, offsetY, r).attr({ fill: color, stroke: '#ddd', 'stroke-width': 3 }));
		ship.push(g_game.raphPaper.rect(offsetX - r/4, offsetY - r/4, 2*r, r/2).attr({ fill: color, stroke: '#ddd', 'stroke-width': 2 }));
	}
	else if (type == 'satellite') {
		ship.push(g_game.raphPaper.path('M' + (offsetX-r) + ' ' + (offsetY-r) + 'L' + (offsetX+r) + ' ' + (offsetY+r)
				+ 'M' + (offsetX+r) + ' ' + (offsetY-r) + 'L' + (offsetX-r) + ' ' + (offsetY+r)
		).attr({ stroke: '#ddd', 'stroke-width': 3 }));
		ship.push(g_game.raphPaper.circle(offsetX, offsetY, r-2).attr({ fill: color, stroke: '#ddd', 'stroke-width': 3 }));
	}
	else if (type == 'laboratory') {
		ship.push(g_game.raphPaper.path('M' + (offsetX-r) + ' ' + (offsetY-r) + 'L' + (offsetX-2*r) + ' ' + (offsetY+r)
			+ 'L' + (offsetX) + ' ' + (offsetY+r) + 'L' + (offsetX-r) + ' ' + (offsetY-r)).attr({ fill: color, stroke: '#ddd', 'stroke-width': 3 }));
		var x = offsetX+r/2-2;
		y = offsetY-3*r/2+2;
		ship.push(g_game.raphPaper.path('M' + x + ' ' + y + 'L' + (x+r) + ' ' + (y-r)).attr({ fill: color, stroke: '#ddd', 'stroke-width': 3 }));
		ship.push(g_game.raphPaper.path(sector(x, y, r+2, 135, 315)).attr( { fill: color, stroke: '#ddd', 'stroke-width': 3 }));

	}

	return ship;
};
