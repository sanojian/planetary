/*
	Copyright 2013 Jonas 'sanojian' Olmstead
*/

var g_game = {sounds: {}, music: {}};
		
function initPlanetary() {

	g_game.sounds.bomber = new buzz.sound( "./audio/fx/bomb", {
		formats: [ "ogg", "wav", "mp3" ]
	});
	g_game.sounds.laser = new buzz.sound( "./audio/fx/laser", {
		formats: [ "ogg", "wav", "mp3" ]
	});
 	g_game.sounds.explosion = new buzz.sound( "./audio/fx/explosion", {
		formats: [ "ogg", "wav", "mp3" ]
	});
 	g_game.sounds.gun = new buzz.sound( "./audio/fx/gun", {
		formats: [ "ogg", "wav", "mp3" ]
	});
	
	$('#gameHolder').width($(document).width()-32).height($(document).height()-32);
	g_game.raphPaper = Raphael("gameHolder");
	
	// research selector
	g_game.researchSelector = g_game.raphPaper.set();
	g_game.researchSelector.push(g_game.raphPaper.circle(0, 0, 40).attr({ stroke: '#999', 'stroke-width': 2 }));
	g_game.researchSelector.push(g_game.raphPaper.circle(0, 0, 60).attr({ fill: '#fff', opacity: 0 }));

	var selArmour = drawResearch('armour', 6, g_defs.teams['team1'].color, 0, -38);
	var bbox = selArmour.getBBox();
	var highlightResearch = {};
	highlightResearch.armour = g_game.raphPaper.ellipse(bbox.x + bbox.width/2, bbox.y + bbox.height/2, 16, 12).attr({ stroke: '#fff', fill: '#228DFF', opacity: 0.8 }).insertBefore(selArmour);
	var selGun = drawResearch('gun', 6, g_defs.teams['team1'].color, 34, 18);
	var bbox = selGun.getBBox();
	highlightResearch.gun = g_game.raphPaper.ellipse(bbox.x + bbox.width/2, bbox.y + bbox.height/2, 16, 12).attr({ stroke: '#fff', fill: '#228DFF', opacity: 0.8 }).insertBefore(selArmour);
	var selEngine = drawResearch('engine', 6, g_defs.teams['team1'].color, -34, 18);
	var bbox = selEngine.getBBox();
	highlightResearch.engine = g_game.raphPaper.ellipse(bbox.x + bbox.width/2, bbox.y + bbox.height/2, 16, 12).attr({ stroke: '#fff', fill: '#228DFF', opacity: 0.8 }).insertBefore(selArmour);
	
	g_game.researchSelector.push( highlightResearch.armour, highlightResearch.gun, highlightResearch.engine, selArmour, selGun, selEngine);
	selArmour.hover(function() { g_game.researchSelector.game.hoverSelect('armour'); });
	selGun.hover(function() { g_game.researchSelector.game.hoverSelect('gun'); });
	selEngine.hover(function() { g_game.researchSelector.game.hoverSelect('engine'); });
	g_game.researchSelector.game = {
		hoverSelect: function(type) {
			for (var key in highlightResearch) {
				highlightResearch[key].hide();
			}
			highlightResearch[type].show();
			g_game.researchSelector.game.laboratory.researchType = type;
		}
	};
	g_game.researchSelector.hide();

	
	// ship selector
	g_game.shipSelector = g_game.raphPaper.set();
	g_game.shipSelector.push(g_game.raphPaper.circle(0, 0, 40).attr({ stroke: '#999', 'stroke-width': 2 }));
	g_game.shipSelector.push(g_game.raphPaper.circle(0, 0, 60).attr({ fill: '#fff', opacity: 0 }));

	var selFighter = drawShip('fighter', 6, g_defs.teams['team1'].color, 0, -38);
	var bbox = selFighter.getBBox();
	var highlight = {};
	highlight.fighter = g_game.raphPaper.ellipse(bbox.x + bbox.width/2, bbox.y + bbox.height/2, 16, 12).attr({ stroke: '#fff', fill: '#228DFF', opacity: 0.8 }).insertBefore(selFighter);
	var selBomber = drawShip('bomber', 6, g_defs.teams['team1'].color, 36, 16);
	var bbox = selBomber.getBBox();
	highlight.bomber = g_game.raphPaper.ellipse(bbox.x + bbox.width/2, bbox.y + bbox.height/2, 16, 12).attr({ stroke: '#fff', fill: '#228DFF', opacity: 0.8 }).insertBefore(selFighter);
	//var selGun = drawShip('gun', 8, g_defs.teams['team1'].color, 34, 18);
	//var bbox = selGun.getBBox();
	//highlight.gun = g_game.raphPaper.ellipse(bbox.x + bbox.width/2, bbox.y + bbox.height/2, 16, 12).attr({ stroke: '#fff', fill: '#228DFF', opacity: 0.8 }).insertBefore(selFighter);
	var selFactory = drawShip('factory', 6, g_defs.teams['team1'].color, -34, 18);
	var bbox = selFactory.getBBox();
	highlight.factory = g_game.raphPaper.ellipse(bbox.x + bbox.width/2, bbox.y + bbox.height/2, 16, 12).attr({ stroke: '#fff', fill: '#228DFF', opacity: 0.8 }).insertBefore(selFighter);
	//var selSatellite = drawShip('satellite', 6, g_defs.teams['team1'].color, -34, -18);
	//var bbox = selSatellite.getBBox();
	//highlight.satellite = g_game.raphPaper.ellipse(bbox.x + bbox.width/2, bbox.y + bbox.height/2, 16, 12).attr({ stroke: '#fff', fill: '#228DFF', opacity: 0.8 }).insertBefore(selFighter);
	//var selLaboratory = drawShip('laboratory', 6, g_defs.teams['team1'].color, -34, 18);
	//var bbox = selLaboratory.getBBox();
	//highlight.laboratory = g_game.raphPaper.ellipse(bbox.x + bbox.width/2, bbox.y + bbox.height/2, 16, 12).attr({ stroke: '#fff', fill: '#228DFF', opacity: 0.8 }).insertBefore(selFighter);

	g_game.shipSelector.push(	highlight.fighter,highlight.bomber,highlight.factory,
								selFighter,selBomber,selFactory);
	//g_game.shipSelector.push(	highlight.fighter,highlight.bomber,highlight.factory,highlight.gun,highlight.satellite,highlight.laboratory,
	//							selFighter,selBomber,selFactory,selGun,selSatellite,selLaboratory);
	selFighter.hover(function() { g_game.shipSelector.game.hoverSelect('fighter'); });
	selBomber.hover(function() { g_game.shipSelector.game.hoverSelect('bomber'); });
	selFactory.hover(function() { g_game.shipSelector.game.hoverSelect('factory'); });
	//selGun.hover(function() { g_game.shipSelector.game.hoverSelect('gun'); });
	//selSatellite.hover(function() { g_game.shipSelector.game.hoverSelect('satellite'); });
	//selLaboratory.hover(function() { g_game.shipSelector.game.hoverSelect('laboratory'); });
	g_game.shipSelector.game = {
		hoverSelect: function(type) {
			for (var key in highlight) {
				highlight[key].hide();
			}
			highlight[type].show();
			g_game.shipSelector.game.factory.buildType = type;
		}
	};
	g_game.shipSelector.hide();
		
	g_game.background = g_game.raphPaper.rect(0,0,2048,2048,12).attr( { stroke: '#eeeeee', fill: '#eeeeee', opacity: 0.02 });
	g_game.background.game = { vx: 0, vy: 0 };
	g_game.background.drag(
		function(dx, dy, x, y, evt) {
			this.game.vx = this.game.ox - dx;
			this.game.vy = this.game.oy - dy;
			positionGameText();
			g_game.raphPaper.setViewBox(this.game.vx, this.game.vy, g_game.raphPaper.width, g_game.raphPaper.height);
		}, function(x, y, evt) {
			this.game.ox = this.game.vx || 0;
			this.game.oy = this.game.vy || 0;
		}, function() {
		}
	);
	g_game.raphPaper.setViewBox(0, 0, $('#gameHolder').width(), $('#gameHolder').height());

	g_game.gameMessage = g_game.raphPaper.set([
		g_game.raphPaper.text(0, 0, 'The message').attr(g_defs.fontAttribs).attr({ 'font-size': 32 }),
		g_game.raphPaper.text(0, 0, '<- prev lvl').attr(g_defs.fontAttribs).attr({ 'font-size': 24,  href: 'javascript: moveLevel(-1)' }),
		g_game.raphPaper.text(0, 0, '@ restart').attr(g_defs.fontAttribs).attr({ 'font-size': 24,  href: 'javascript: loadLevel()' }),
		g_game.raphPaper.text(0, 0, 'next lvl ->').attr(g_defs.fontAttribs).attr({ 'font-size': 24,  href: 'javascript: moveLevel(1)' })
	]).hide();
	g_game.gameMessage.game = { show: false, positions: [[0, -40], [-200, 60], [0, 60], [200, 60]] };

	g_game.routeSelector = g_game.raphPaper.path('M0 0L10 10').attr({ stroke: '#B6FF00', 'stroke-width': 4, 'stroke-dasharray': '-' });
	g_game.routeSelector.toBack().hide();
	g_game.routeSelector.game = { isActive: false, points: [] };

	loadLevel();
};

function clearLevel() {

	if (g_game.ships) {
		for (var i=g_game.ships.length-1;i>=0;i--) {
			g_game.ships[i].destroy(true);
		}
		for (var key in g_game.routes) {
			g_game.routes[key].destroy();
		}
		for (var key in g_game.planets) {
			g_game.planets[key].destroy();
		}
		for (var key in g_game.buildings) {
			if (g_game.buildings[key]) {
				g_game.buildings[key].destroy(true);
			}
		}
		for (var i=g_game.explosions.length-1;i>=0;i--) {
			g_game.explosions[i].destroy(true);
		}
	}
	
	g_game.routeSelector.hide();
	g_game.routeSelector.game.isActive = false;
	g_game.gameMessage.hide();
	if (g_game.tutorial_set) {
		while (g_game.tutorial_set.length > 0) {
			g_game.tutorial_set.pop().remove();
		}
	}
	
	g_game.ships = [];
	g_game.planets = {};
	g_game.routes = {};
	g_game.buildings = {};
	g_game.explosions = [];
	g_game.teams = {};
}

function loadLevel() {
	
	clearLevel();
	
	if (!localStorage.planetary_level) {
		localStorage.planetary_level = 1;
	}
	g_game.level = g_levels[localStorage.planetary_level];

	while (!g_game.level) {
		localStorage.planetary_level = Math.max(1, parseInt(localStorage.planetary_level, 10) - 1);
		console.log('down to ' + localStorage.planetary_level);
		g_game.level = g_levels[localStorage.planetary_level];
	}
	
	// if new song or no current song
	if (g_game.level.song1 || !g_game.music.song1) {
		if (g_game.music.song1) {
			g_game.music.song1.stop();
		}
		// find a song
		var level = parseInt(localStorage.planetary_level, 10);
		var song = undefined;
		while (!song) {
			song = g_levels[level].song1;
			level = level - 1;
		}
		g_game.music.song1 = new buzz.sound(song, {
			formats: [ "ogg", "mp3" ],
			autoplay: true,
			loop: true
		});
	}
	
	for (var name in g_game.level.planets) {
		g_game.planets[name] = new Planet(name, g_game.level.planets[name].x, g_game.level.planets[name].y, 
											g_game.level.planets[name].r, g_game.level.planets[name].color);
	}
	for (var i=0;i<g_game.level.routes.length;i++) {
		var route = g_game.level.routes[i].split('_');
		g_game.routes[g_game.level.routes[i]] = new Route(route[0], route[1]);
	}
	for (var i=0;i<g_game.level.players.length;i++) {
		initTeam(g_game.level.players[i].team, g_game.level.players[i].location);
	}
	for (var i=0;i<g_game.level.ships.length;i++) {
		var planet = g_game.planets[g_game.level.ships[i].location];
		g_game.ships.push(new Ship(g_game.level.ships[i].type, g_game.level.ships[i].team, planet.x, planet.y, 3, planet.name));
	}
	for (var i=0;i<g_game.level.buildings.length;i++) {
		g_game.buildings[g_game.level.buildings[i].location] = new Building(	g_game.level.buildings[i].type, 
																				g_game.level.buildings[i].location, 
																				g_game.level.buildings[i].team);
	}
	if (g_game.level.tutorial_image) {
		g_game.tutorial_set = g_game.raphPaper.set([
			g_game.raphPaper.text(0, 0, g_game.level.tutorial_image.text).attr(g_defs.fontAttribs).attr( { 'font-size': 16 } ),
			g_game.raphPaper.rect(g_game.level.tutorial_image.x, g_game.level.tutorial_image.y, g_game.level.tutorial_image.w, g_game.level.tutorial_image.h, 12)
				.attr({ fill: '#228DFF', opacity: 0.3 }),
			g_game.raphPaper.rect(g_game.level.tutorial_image.x, g_game.level.tutorial_image.y, g_game.level.tutorial_image.w, g_game.level.tutorial_image.h, 12)
				.attr({ stroke: '#eeeeee', opacity: 1 }),
			g_game.raphPaper.image('./images/tutorial/' + g_game.level.tutorial_image.name, 
								g_game.level.tutorial_image.x,
								g_game.level.tutorial_image.y,
								g_game.level.tutorial_image.w,
								g_game.level.tutorial_image.h)
								
		]).toBack();
		g_game.tutorial_set[0].game = { tx: g_game.level.tutorial_image.tx, ty: g_game.level.tutorial_image.ty };
	}


	// center on players home
	var home = g_game.planets[g_game.level.players[0].location];
	g_game.background.game.vx = home.x - g_game.raphPaper.width/4;
	g_game.background.game.vy = home.y - g_game.raphPaper.height/2 + 30;
	g_game.raphPaper.setViewBox(g_game.background.game.vx, g_game.background.game.vy, g_game.raphPaper.width, g_game.raphPaper.height);

	positionGameText();
	
	doGameLoop(0);
	
};

var moveLevel = function(amt) {
	localStorage.planetary_level = parseInt(localStorage.planetary_level, 10) + amt;
	//location.href = location.href;
	loadLevel();
}

var initTeam = function(team, home) {
	g_game.teams[team] = { routePoints: [] };
	if (home) {
		g_game.buildings[home] = new Building('factory', home, team);
	}
	if (team != 'team1') {
		g_game.teams[team].player = new PlayerAI(team);
	}
};

var Explosion = function(image) {

	var color = (image.attrs || image[0].attrs).fill;
	var bbox = image.getBBox();
	var x = bbox.x + bbox.width/2;
	var y = bbox.y + bbox.height/2;
	var block1 = g_game.raphPaper.rect(x-3,y-3,3,3).attr({ fill: color, stroke: '#ddd', 'stroke-width': 1 });
	var block2 = g_game.raphPaper.rect(x,y-3,3,3).attr({ fill: color, stroke: '#ddd', 'stroke-width': 1 });
	var block3 = g_game.raphPaper.rect(x-3,y,3,3).attr({ fill: color, stroke: '#ddd', 'stroke-width': 1 });
	var block4 = g_game.raphPaper.rect(x,y,3,3).attr({ fill: color, stroke: '#ddd', 'stroke-width': 1 });

	var blocks = [block1, block2, block3, block4];
	var dx1 = 1 + Math.random() * 2;
	var dx2 = 1 + Math.random() * 2;
	var dx3 = 1 + Math.random() * 2;
	var dx4 = 1 + Math.random() * 2;
	var dy1 = 1 + Math.random() * 2;
	var dy2 = 1 + Math.random() * 2;
	var dy3 = 1 + Math.random() * 2;
	var dy4 = 1 + Math.random() * 2;

	g_game.sounds.explosion.play();
 
	var time = 0;
	var destroyed = false;
	this.animate = function() {
		if (destroyed) {
			return false;
		}
	
		if (time > 10) {
			blocks[0].remove();
			blocks[1].remove();
			blocks[2].remove();
			blocks[3].remove();
			return false;
		}
		
		blocks[0].attr({ x: blocks[0].attrs.x - dx1, y: blocks[0].attrs.y - dy1 });
		blocks[1].attr({ x: blocks[1].attrs.x + dx2, y: blocks[1].attrs.y - dy2 });
		blocks[2].attr({ x: blocks[2].attrs.x - dx3, y: blocks[2].attrs.y + dy3 });
		blocks[3].attr({ x: blocks[3].attrs.x + dx4, y: blocks[3].attrs.y + dy4 });
		time++;
		return true;
	};
	this.destroy = function() {
		destroyed = true;
		blocks[0].remove();
		blocks[1].remove();
		blocks[2].remove();
		blocks[3].remove();
	}
	
	return this;
};

var drawResearch = function(type, r, color, offsetX, offsetY) {
	var icon = g_game.raphPaper.set();
	if (type == 'armour') {
		icon.push(g_game.raphPaper.path(['M', offsetX-r, offsetY-r, 'L', offsetX+r, offsetY-r, 
										'Q', offsetX+r, offsetY+r/2, offsetX, offsetY+r,
										'Q', offsetX-r, offsetY+r/2, offsetX-r, offsetY-r]).attr({ fill: color, stroke: '#ddd', 'stroke-width': 3 }));
		//icon.push(g_game.raphPaper.ellipse(offsetX-r, offsetY-r, r, r/2).attr({ fill: color, stroke: '#ddd', 'stroke-width': 3 }));
		//icon.push(g_game.raphPaper.path(sector(offsetX, offsetX, r+2, 315, 225)).attr( { fill: color, stroke: '#ddd', 'stroke-width': 3 }));
	}
	else if (type == 'gun') {
		//icon = drawShip('fighter', 5, g_defs.teams['team1'].color, offsetX, offsetY);
		icon.push(g_game.raphPaper.rect(offsetX-r/2,offsetY-3*r/4,r*2,r/2).attr({ fill: color, stroke: '#ddd', 'stroke-width': 2 }));
		icon.push(g_game.raphPaper.rect(offsetX-r/2,offsetY+r/4,r*2,r/2).attr({ fill: color, stroke: '#ddd', 'stroke-width': 2 }));
		icon.push(g_game.raphPaper.ellipse(offsetX-r/2,offsetY,r,r).attr({ fill: color, stroke: '#ddd', 'stroke-width': 2 }));
	}
	else if (type == 'engine') {
		icon.push(g_game.raphPaper.rect(offsetX+r/2, offsetY-r/2,r,r).attr({ fill: color, stroke: '#ddd', 'stroke-width': 2 }));
		icon.push(g_game.raphPaper.path(['M', offsetX-r, offsetY-r,
										'L', offsetX+r/2, offsetY-r/2,
										//'Q', offsetX-r/2, offsetY-r, offsetX+r/2, offsetY-r/2,
										'L', offsetX+r/2, offsetY+r/2,
										'L', offsetX-r, offsetY+r,
										//'Q', offsetX-r/2, offsetY+r, offsetX-r, offsetY+r,
										'L', offsetX-r, offsetY-r]).attr({ fill: color, stroke: '#ddd', 'stroke-width': 3 }));
	}
	
	return icon;
}

function sector(cx, cy, radius, startAngle, endAngle) {
	var rad = Math.PI / 180;
	var x1 = cx + radius * Math.cos(-startAngle * rad),
	x2 = cx + radius * Math.cos(-endAngle * rad),
	y1 = cy + radius * Math.sin(-startAngle * rad),
	y2 = cy + radius * Math.sin(-endAngle * rad);
	return ["M", cx, cy, "L", x1, y1, "A", radius, radius, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"];
}

function getUpgrades() {
	var result = {};
	for (var key in g_game.buildings) {
		if (g_game.buildings[key] && g_game.buildings[key].type == 'laboratory') {
			result[g_game.buildings[key].researchType] = true;
		}
	}
	return result;
}

var drawShip = function(type, r, color, offsetX, offsetY, upgrades) {
	var ship = g_game.raphPaper.set();
	if (type == 'fighter') {
		var points = [];
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
		}
	}
	else if (type == 'bomber') {
		ship.push(g_game.raphPaper.ellipse(offsetX-r, offsetY-r, r, r/2).attr({ fill: color, stroke: '#ddd', 'stroke-width': 3 }));
		ship.push(g_game.raphPaper.ellipse(offsetX-r, offsetY+r, r, r/2).attr({ fill: color, stroke: '#ddd', 'stroke-width': 3 }));
		ship.push(g_game.raphPaper.ellipse(offsetX, offsetY, 3*r/2, r).attr({ fill: color, stroke: '#ddd', 'stroke-width': 3 }));
	}
	else if (type == 'factory' || type == 'dummy-factory') {
		ship.push(g_game.raphPaper.rect(offsetX - 2, offsetY - 10, 8, 14).attr({ fill: color, stroke: '#ddd', 'stroke-width': 3 }));
		ship.push(g_game.raphPaper.rect(offsetX - 8, offsetY - 4, 8, 8).attr({ fill: color, stroke: '#ddd', 'stroke-width': 3 }));
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

var PlayerAI = function(myTeam) {

	var self = this;
	self.team = myTeam;
	self.decisionTicks = 15 + Math.floor(Math.random() * 10);
	
	var count = 0;
	self.move = function() {
		g_game.teams[self.team].routePoints = [];
		destination:
		for (var i in g_game.buildings) {
			// look for my buildings
			if (g_game.buildings[i] && g_game.buildings[i].team == self.team) {
				g_game.teams[self.team].routePoints = [i];
				var bDecision = false;
				for (var j in g_game.routes) {
					if (g_game.routes[j].startPlanet == i || g_game.routes[j].endPlanet == i) {
					
						var planet = g_game.routes[j].startPlanet == i ? g_game.routes[j].endPlanet : g_game.routes[j].startPlanet;
					
						// is this planet empty?
						if (!g_game.buildings[planet]) {
							g_game.buildings[i].buildType = 'factory';
							g_game.teams[self.team].routePoints.push(planet);
							break destination;
						}
						else if (g_game.buildings[planet].team != self.team) {
							g_game.buildings[i].buildType = 'bomber';
							g_game.teams[self.team].routePoints.push(planet);
							break destination;
						
						}
					}
				}
				g_game.buildings[i].buildType = 'fighter';
			}
		}
		
		for (var i=0;i<g_game.ships.length;i++) {
			if (g_game.ships[i].team == self.team)
				g_game.ships[i].setDestination();
		}
	};
	
	return self;
}

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
	var bbox = self.image.getBBox();
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
	};
	
	self.takeDamage = function(amt) {
		self.hits -= amt;
		if (self.hits <=0)
			self.destroy();
		else
			self.redraw();
	};
	
	self.redraw();
	self.bAlive = true;
	self.destroy = function(skipAnimate) {
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
			var w = self.progress.attrs.width;
			// more ships makes factory build slower
			var timeToBuild = self.buildSpeed + Math.pow(2, self.numShips);
			if (frames > timeToBuild) {
				frames = 0;
				g_game.ships.push(new Ship(self.buildType, self.team, self.planet.x, self.planet.y, 3, planetName));
				builtByMe++;
			}
			var newW = (self.progressOutline.attrs.width-2) * frames / timeToBuild;
			if (Math.floor(w) != Math.floor(newW)) {
				self.progress.attr({ width: newW });
			}
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

var Route = function(planetA, planetB) {
	this.startPlanet = planetA;
	this.endPlanet = planetB;
	
	var p1 = g_game.planets[planetA];
	var p2 = g_game.planets[planetB];
	
	var bigPath = g_game.raphPaper.path('M' + p1.x + ' ' + p1.y + 'L' + p2.x + ' ' + p2.y);
	this.length = bigPath.getTotalLength();
	this.path = g_game.raphPaper.path(bigPath.getSubpath(p1.r*2, this.length - p2.r*2)).attr( { stroke: '#222', 'stroke-width': 2 }).toBack();
	this.length = this.path.getTotalLength();
	this.image = this.path;
	bigPath.remove();
	
	this.pt1 = this.path.getPointAtLength(0);
	this.pt2 = this.path.getPointAtLength(this.length);
	// find intersecting orbit lengths
	var len = 0;
	while (!this.exitLength1) {
		var orbitPoint = p1.orbit.getPointAtLength(len);
		if (Math.abs(this.pt1.x - orbitPoint.x) < 2 && Math.abs(this.pt1.y - orbitPoint.y) < 2) {
			this.exitLength1 = len;
		}
		len++;
	}
	len = 0;
	while (!this.exitLength2) {
		var orbitPoint = p2.orbit.getPointAtLength(len);
		if (Math.abs(this.pt2.x - orbitPoint.x) < 2 && Math.abs(this.pt2.y - orbitPoint.y) < 2) {
			this.exitLength2 = len;
		}
		len++;
	}
	
	this.destroy = function() {
		this.image.remove();
	}
		
	return this;
}

// x and y are center and r is the radius
function getCircleToPath(x, y, r) {
	return "M" + "" + (x) + "," + (y-r) + "A"
		+ r + "," + r + ",0,1,1," + (x-0.1) + "," + (y-r) + "z";
}

var Planet = function(name, myX, myY, myR, myColor) {
	var self = this;
	this.x = myX;
	this.y = myY;
	this.r = myR;
	this.name = name;
	this.orbittingShips = [];
	
	var color = myColor || 'rgb(' + (64 + Math.floor(Math.random() * 128)) + ',' + (64 + Math.floor(Math.random() * 128)) + ',' + (64 + Math.floor(Math.random() * 128)) + ')';
	
	
	this.orbit = g_game.raphPaper.path(getCircleToPath(this.x, this.y, this.r*2)).attr( { stroke: '#222', 'stroke-width': 2 });
	this.orbitLength = this.orbit.getTotalLength();

	var imgPlanet = g_game.raphPaper.circle(myX, myY, myR).attr({ fill: color, 'stroke-width': 3 });
	var cover = g_game.raphPaper.circle(this.x, this.y, this.r*2).attr( { fill: '#fff', opacity: 0 });

	cover.hover(
		function() {
			imgPlanet.attr({ stroke: color });
			self.orbit.attr({ 'stroke-width': 2, stroke: '#666' });
			if (g_game.routeSelector.game.isActive) {
				var lastPoint = g_game.teams.team1.routePoints[g_game.teams.team1.routePoints.length-1];
				if (lastPoint != self.name) { 
					var bFound = false;
					for (var i=0;!bFound && i<g_game.level.routes.length;i++) {
						if (g_game.level.routes[i].indexOf(lastPoint) != -1 && g_game.level.routes[i].indexOf(self.name) != -1) {
							bFound = true;
						}
					}
					if (bFound) {
						g_game.teams.team1.routePoints.push(self.name);
						for (var i=0;i<g_game.ships.length;i++) {
							if (g_game.ships[i].team == 'team1')
								g_game.ships[i].setDestination();
						}
					}
				}
			}
		}, function() {
			imgPlanet.attr({ stroke: '#000' });
			self.orbit.attr({ 'stroke-width': 1, stroke: '#222' });
		}
	);
	cover.drag(
		function(dx, dy, x, y, evt) {
			var path = '';
			for (var i=0;i<g_game.teams.team1.routePoints.length;i++) {
				path += (i == 0 ? 'M' : 'L') + g_game.planets[g_game.teams.team1.routePoints[i]].x 
					+ ' ' + g_game.planets[g_game.teams.team1.routePoints[i]].y;
			}
			path += 'L' + (dx + g_game.routeSelector.game.odx) + ' ' + (dy + g_game.routeSelector.game.ody);
			g_game.routeSelector.attr({ path: path });
		}, function(x, y, evt) {
			g_game.teams.team1.routePoints = [name];
			g_game.routeSelector.game.odx = x + g_game.background.game.vx;
			g_game.routeSelector.game.ody = y + g_game.background.game.vy;
			g_game.routeSelector.game.isActive = true;
			g_game.routeSelector.show();
		}, function() {
			g_game.routeSelector.game.isActive = false;
			var path = '';
			for (var i=0;i<g_game.teams.team1.routePoints.length;i++) {
				path += (i == 0 ? 'M' : 'L') + g_game.planets[g_game.teams.team1.routePoints[i]].x 
					+ ' ' + g_game.planets[g_game.teams.team1.routePoints[i]].y;
			}
			// if path is empty, clear all destinations
			if (g_game.teams.team1.routePoints.length == 1) {
				for (var i=0;i<g_game.ships.length;i++) {
					if (g_game.ships[i].team == 'team1' && g_game.ships[i].orbitting) {
						g_game.ships[i].clearDestination();
					}
				}
			}
			g_game.routeSelector.attr({ path: path });
		}
	);
	
	this.destroy = function() {
		this.orbit.remove();
		imgPlanet.remove();
		cover.remove();
	};
	
	this.hide = function() {
		this.orbit.hide();
		imgPlanet.hide();
		cover.hide();
	};
	this.show = function() {
		this.orbit.show();
		imgPlanet.show();
		cover.show();
	};
	this.addOrbitter = function(orbitter) {
		this.orbittingShips.push(orbitter);
	}
	this.removeOrbitter = function(orbitter) {
		var idx = this.orbittingShips.indexOf(orbitter);
		if (idx >= 0)
			this.orbittingShips.splice(idx, 1);
	}
	
	return this;
};

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
		if (!self.image)
			self.image = drawShip(self.type, g_defs.shipStats[myType].size, g_defs.teams[myTeam].color, 0, 0, upgrades);

		self.image.attr({ 'stroke-width': self.hits });
		if (!g_game.planets[self.orbitting].visible) {
			self.image.hide();
		}	
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
			var pt = g_game.planets[self.orbitting].orbit.getPointAtLength(orbitDistanceTravelled);
			self.x = pt.x;
			self.y = pt.y;
			self.image.transform('t' + self.x + ',' + self.y);
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

var doGameLoop = function(frames) {
	var cEnemies = 0;
	var cFriendlies = 0;

	for (var i=0;i<g_game.ships.length;i++) {
		if (g_game.ships[i].team == 'team1') {
			cFriendlies++;
		}
		else {
			cEnemies++;
		}
		g_game.ships[i].move();
	}
	for (var building in g_game.buildings) {
		if (g_game.buildings[building]) {
			if (g_game.buildings[building].team == 'team1') {
				cFriendlies++;
			}
			else {
				cEnemies++;
			}
			g_game.buildings[building].move();
		}
	}
	for (var team in g_game.teams) {
		if (team != 'team1') {
			var player = g_game.teams[team].player;
			if (frames % player.decisionTicks == 0) {
				player.move();
			}
		}
	}
	for (var i=0;i<g_game.explosions.length;i++) {
		if (!g_game.explosions[i].animate()) {
			g_game.explosions.splice(i,1);
			i--;
		}
	}
	
	// check for win or loss
	if (cEnemies == 0) {
		g_game.gameMessage[0].attr({ text: g_game.level.winMessage });
		g_game.gameMessage.game.show = true;
		positionGameText();
		g_game.gameMessage.toFront().show();
		if (localStorage.planetary_level == 1) {
			g_game.gameMessage[1].hide();
		}
		
		//localStorage.planetary_level = parseInt(localStorage.planetary_level, 10) + 1;
		
		return;
	}
	else if (cFriendlies == 0) {
		g_game.gameMessage[0].attr({ text: 'You lose!' });
		g_game.gameMessage.game.show = true;
		positionGameText();
		g_game.gameMessage.toFront().show();
		g_game.gameMessage[3].hide();
		if (localStorage.planetary_level == 1) {
			g_game.gameMessage[1].hide();
		}

		return;
	}
		
	if (frames % 10 == 0) {
		// check for visibility
		for (var key in g_game.planets) {
			g_game.planets[key].occupied = g_game.planets[key].visible = false;
			if (g_game.buildings[key] && g_game.buildings[key].team == 'team1') {
				g_game.planets[key].occupied = g_game.planets[key].visible = true;
			}
			for (var i=0;i<g_game.planets[key].orbittingShips.length;i++) {
				if (g_game.planets[key].orbittingShips[i].team == 'team1') {
					g_game.planets[key].occupied = g_game.planets[key].visible = true;
				}
			}

			if (g_game.planets[key].visible) {
				g_game.planets[key].show();
			}
			else {
				g_game.planets[key].hide();
			}
		}
		for (var key in g_game.routes) {
			if (g_game.planets[g_game.routes[key].startPlanet].occupied) {
				g_game.routes[key].image.show();
				g_game.routes[key].visible = true;
				g_game.planets[g_game.routes[key].endPlanet].visible = true;
				g_game.planets[g_game.routes[key].endPlanet].show();
			}
			else if (g_game.planets[g_game.routes[key].endPlanet].occupied) {
				g_game.routes[key].image.show();
				g_game.routes[key].visible = true;
				g_game.planets[g_game.routes[key].startPlanet].visible = true;
				g_game.planets[g_game.routes[key].startPlanet].show();
			}
			else {
				g_game.routes[key].visible = false;
				g_game.routes[key].image.hide();
			}
		}
		for (var key in g_game.buildings) {
			if (g_game.buildings[key] && g_game.planets[key].visible) {
				g_game.buildings[key].visible = true;
				g_game.buildings[key].image.show();
				if (g_game.buildings[key].type == 'factory') {
					g_game.buildings[key].progressOutline.show();
					g_game.buildings[key].progress.show();
				}
				g_game.buildings[key].image.show();
			}
			else if (g_game.buildings[key]) {
				g_game.buildings[key].visible = false;
				g_game.buildings[key].image.hide();
				if (g_game.buildings[key].type == 'factory') {
					g_game.buildings[key].progressOutline.hide();
					g_game.buildings[key].progress.hide();
				}
			}
		}

		for (var i=0;i<g_game.ships.length;i++) {
			if (g_game.ships[i].team == 'team1') {
				g_game.ships[i].visible = true;
				g_game.ships[i].image.show();
			}
			else if (g_game.ships[i].orbitting && g_game.planets[g_game.ships[i].orbitting].visible) {
				g_game.ships[i].visible = true;
				g_game.ships[i].image.show();
			}
			else if (!g_game.ships[i].orbitting && g_game.ships[i].destination && g_game.planets[g_game.ships[i].destination].visible) {
				g_game.ships[i].visible = true;
				g_game.ships[i].image.show();
			}
			else {
				g_game.ships[i].visible = false;
				g_game.ships[i].image.hide();
			}
		}
	}
	
	setTimeout(function() { doGameLoop(frames + 1); }, 50);
};

function positionGameText() {
	if (g_game.gameMessage.game.show) {
		for (var i=0;i<g_game.gameMessage.length;i++) {
			g_game.gameMessage[i].attr({ 	x: g_game.background.game.vx + g_game.raphPaper.width/2 + g_game.gameMessage.game.positions[i][0], 
											y: g_game.background.game.vy + 3*g_game.raphPaper.height/4 + g_game.gameMessage.game.positions[i][1] });
		}
	}
	if (g_game.tutorial_set) {
		g_game.tutorial_set.attr( { x: g_game.background.game.vx + g_game.raphPaper.width - 310, y: g_game.background.game.vy + 10 } );
		var text = g_game.tutorial_set[0];
		text.attr( { x: text.attrs.x + text.game.tx, y: text.attrs.y + text.game.ty } );
	}
}
