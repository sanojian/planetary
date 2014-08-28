var Building = function(myType, planetName, myTeam) {
	var self = this;

	self.type = myType;
	self.planet = g_game.planets[planetName];
	var frames = 0;
	self.team = myTeam;
	self.buildSpeed = 100;
	self.buildType = 'fighter';
	self.researchType = 'armour';
	self.hits = 2;
	var builtByMe = 0;
	self.numShips = 0;
	var gunFireTime = 20;
	self.damage = g_defs.shipStats[this.type].damage;

	self.image = drawShip(self.type, g_defs.shipStats[myType].size, g_defs.teams[self.team].color, self.planet.x, self.planet.y);
	self.image.anchor.set(0.5);
	/*var bbox = self.image.getBBox();
	 var glow = g_game.raphPaper.set();
	 for (var i=0;i<self.image.length;i++) {
	 glow.push(self.image[i].glow());
	 }

	 if (self.type == 'factory') {
	 // the production progress meter
	 self.progressOutline = g_game.raphPaper.rect(bbox.x, bbox.y + bbox.height, bbox.width, 5)
	 .attr({ stroke: '#999', fill: '#333' });
	 self.progress = g_game.raphPaper.rect(self.progressOutline.attrs.x + 1, self.progressOutline.attrs.y + 1, 0.1, self.progressOutline.attrs.height-2)
	 .attr({ fill: '#0f0', 'stroke-width': 0 });
	 }

	 if (!self.planet.visible) {
	 self.image.hide();
	 if (self.type == 'factory') {
	 self.progressOutline.hide();
	 self.progress.hide();
	 }
	 }

	 if (self.type == 'factory' && myTeam == 'team1') {
	 var dragStart =  function() {
	 g_game.shipSelector.transform('T' + (self.image[0].attrs.x + self.image[0].attrs.width/2) + ',' + (self.image[0].attrs.y + self.image[0].attrs.height/2)).show().toFront();
	 g_game.shipSelector.game.factory = self;
	 g_game.shipSelector.game.hoverSelect(self.buildType);
	 };
	 // apply drag methods to both image and glow effect
	 self.image.drag( null, dragStart, function() { g_game.shipSelector.hide(); });
	 glow.drag( null, dragStart, function() { g_game.shipSelector.hide(); });
	 }
	 else if (self.type == 'laboratory' && myTeam == 'team1') {
	 var dragResearchStart =  function() {
	 var bbox = self.image.getBBox();
	 g_game.researchSelector.transform('T' + (bbox.x + bbox.width/2) + ',' + (bbox.y + bbox.height/2)).show().toFront();
	 g_game.researchSelector.game.laboratory = self;
	 g_game.researchSelector.game.hoverSelect(self.researchType);
	 };
	 // apply drag methods to both image and glow effect
	 self.image.drag( null, dragResearchStart, function() { g_game.researchSelector.hide(); });
	 glow.drag( null, dragResearchStart, function() { g_game.researchSelector.hide(); });
	 }

	 self.redraw = function() {
	 self.image.attr({ 'stroke-width': self.hits });
	 };*/

	self.takeDamage = function(amt) {
		self.hits -= amt;
		if (self.hits <=0) {
			self.destroy();
		}
		else
			self.redraw();
	};

	//self.redraw();
	self.bAlive = true;
	self.destroy = function(skipAnimate) {
		if (g_game.shipSelector.game.factory == self) {
			g_game.shipSelector.hide();
		}
		if (self.visible && !skipAnimate) {
			g_game.explosions.push(new Explosion(self.image));
		}
		glow.remove();
		self.image.remove();
		if (self.type == 'factory') {
			self.progressOutline.remove();
			self.progress.remove();
		}
		g_game.buildings[planetName] = undefined;
		self.bAlive = false;
	};

	self.move = function() {
		if (!self.bAlive) return;
		frames++;
		if (self.type == 'factory') {
			var w = 8;//self.progress.attrs.width;
			// more ships makes factory build slower
			var timeToBuild = self.buildSpeed + Math.pow(2, self.numShips);
			if (frames > timeToBuild) {
				frames = 0;
				g_game.ships.push(new Ship(self.buildType, self.team, self.planet.x, self.planet.y, 3, planetName));
				builtByMe++;
			}
			/*var newW = (self.progressOutline.attrs.width-2) * frames / timeToBuild;
			 if (Math.floor(w) != Math.floor(newW)) {
			 self.progress.attr({ width: newW });
			 }*/
		}
		else if (self.type == 'gun') {
			var target = null;
			for (var i=0;i<self.planet.orbittingShips.length;i++) {
				if (self.planet.orbittingShips[i].team != self.team) {
					target = self.planet.orbittingShips[i];
					break;
				}
			}

			if (target != null) {
				var dx = self.planet.x - target.x;
				var dy = self.planet.y - target.y;
				var angle = Math.atan2(-dy, -dx);
				// get bbox of set so we can rotate around center
				self.image.transform('r' + (angle * 180 / Math.PI) + ',' + self.planet.x + ',' + self.planet.y);
				glow.transform('r' + (angle * 180 / Math.PI) + ',' + self.planet.x + ',' + self.planet.y);
				if (frames > gunFireTime) {
					var shot = g_game.raphPaper.path('M' + self.planet.x + ' ' + self.planet.y + 'L' + target.x + ' ' + target.y)
						.attr({ stroke: '#55ff55', 'stroke-width': 2 });
					setTimeout(function() { shot.remove(); }, 100);
					target.takeDamage(self.damage);

					if (self.visible) {
						g_game.sounds.gun.play();
					}

					frames = 0;
				}
			}

		}
	};

	return self;
}
