/*
	Copyright 2013 Jonas 'sanojian' Olmstead
*/

var g_game = {sounds: {}, music: {}};


var GameState = function(game) {
};

// Load images and sounds
GameState.prototype.preload = function() {
	this.game.load.atlasJSONHash('allsprites', './images/lofi_scifi_v2_trans.png', null, g_spriteAtlas);

};

// Setup the example
GameState.prototype.create = function() {

	//var ship = this.game.add.sprite(100, 100, 'allsprites', 'ship');

	//var planet0 = this.game.add.sprite(200, 200, 'allsprites', 'planet0');

	//var planet1 = this.game.add.sprite(200, 300, 'allsprites', 'planet1');
	
	window.gfx = this.game.add.graphics(0, 0);
	
	window.bmd = this.game.add.bitmapData(640, 480);	
    window.screenBmd = this.game.add.sprite(0, 0, window.bmd); 
	loadLevel();

	//window.gfx.lineStyle(1, 0xffffff);
	
	/*for (var key in g_game.planets) {
		//window.gfx.drawCircle(g_game.planets[key].orbit.x, g_game.planets[key].orbit.y, g_game.planets[key].orbit.diameter/2);
	}

	for (var key in g_game.routes) {
		window.gfx.moveTo(g_game.routes[key].pt1.x, g_game.routes[key].pt1.y);
		window.gfx.lineTo(g_game.routes[key].pt2.x, g_game.routes[key].pt2.y);
	}*/
	
	this.frame = 0;
	
};

GameState.prototype.update = function() {

	window.bmd.clear();
	window.bmd.ctx.strokeStyle = "#ffffff";
	for (var key in g_game.planets) {
		//window.bmd.ctx.drawCircle(g_game.planets[key].orbit.x, g_game.planets[key].orbit.y, g_game.planets[key].orbit.diameter/2);
		window.bmd.ctx.lineWidth = 1;
		window.bmd.ctx.beginPath();
		window.bmd.ctx.arc(g_game.planets[key].orbit.x, g_game.planets[key].orbit.y, g_game.planets[key].orbit.diameter/2, 0, 2 * Math.PI, false);
		window.bmd.ctx.stroke();
		window.bmd.ctx.closePath();
	}

	for (var key in g_game.routes) {
		window.bmd.ctx.beginPath();
		window.bmd.ctx.moveTo(g_game.routes[key].pt1.x, g_game.routes[key].pt1.y);
		window.bmd.ctx.lineTo(g_game.routes[key].pt2.x, g_game.routes[key].pt2.y);
		window.bmd.ctx.lineWidth = 1;
		window.bmd.ctx.stroke();
		window.bmd.ctx.closePath();

	}
	if (g_game.teams.team1.routePoints.length) {
		window.bmd.ctx.strokeStyle = "#00ff00";
		window.bmd.ctx.lineWidth = 3;
		window.bmd.ctx.beginPath();
		window.bmd.ctx.moveTo(g_game.planets[g_game.teams.team1.routePoints[0]].x, g_game.planets[g_game.teams.team1.routePoints[0]].y);
		
		for (var i=1;i<g_game.teams.team1.routePoints.length;i++) {
			window.bmd.ctx.lineTo(g_game.planets[g_game.teams.team1.routePoints[i]].x, g_game.planets[g_game.teams.team1.routePoints[i]].y);
		}
		window.bmd.ctx.stroke();
		window.bmd.ctx.closePath();
	}
		
	window.bmd.render();
	window.bmd.refreshBuffer();

	doGameLoop(this.frame++);

};

// Setup game
var g_game = new Phaser.Game(640, 480, Phaser.AUTO, 'game');
g_game.state.add('game', GameState, true);

/*function initPlanetary() {
	return;
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
};*/


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
	
	/*g_game.routeSelector.hide();
	g_game.routeSelector.game.isActive = false;
	g_game.gameMessage.hide();
	if (g_game.tutorial_set) {
		while (g_game.tutorial_set.length > 0) {
			g_game.tutorial_set.pop().remove();
		}
	}*/
	
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
	/*if (g_game.level.song1 || !g_game.music.song1) {
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
	}*/
	
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
	/*if (g_game.level.tutorial_image) {
		g_game.tutorial_set = g_game.raphPaper.set([
			g_game.raphPaper.text(0, 0, g_game.level.tutorial_image.text).attr(g_defs.fontAttribs).attr( { 'font-size': 18 } ),
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
	
	doGameLoop(0);*/
	
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

/*var drawResearch = function(type, r, color, offsetX, offsetY) {
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
}*/

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





// x and y are center and r is the radius
function getCircleToPath(x, y, r) {
	return "M" + "" + (x) + "," + (y-r) + "A"
		+ r + "," + r + ",0,1,1," + (x-0.1) + "," + (y-r) + "z";
}



function findPointAtLength(Cx, Cy, r, L, clockwise) {
	var Ax = Cx;
	var Ay = Cy - r;
    var angle = Math.atan2(Ay - Cy, Ax - Cx);
    if (clockwise) {
        angle = angle - L / r;
    }
    else {
        angle = angle + L / r;
    }
    var Bx = Cx + r * Math.cos(angle);
    var By = Cy + r * Math.sin(angle);
    return { x: Bx, y: By};
}

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
				//g_game.planets[key].show();
			}
			else {
				//g_game.planets[key].hide();
			}
		}
		for (var key in g_game.routes) {
			if (g_game.planets[g_game.routes[key].startPlanet].occupied) {
				//g_game.routes[key].image.show();
				g_game.routes[key].visible = true;
				g_game.planets[g_game.routes[key].endPlanet].visible = true;
				//g_game.planets[g_game.routes[key].endPlanet].show();
			}
			else if (g_game.planets[g_game.routes[key].endPlanet].occupied) {
				g_game.routes[key].image.show();
				g_game.routes[key].visible = true;
				g_game.planets[g_game.routes[key].startPlanet].visible = true;
				//g_game.planets[g_game.routes[key].startPlanet].show();
			}
			else {
				g_game.routes[key].visible = false;
				//g_game.routes[key].image.hide();
			}
		}
		for (var key in g_game.buildings) {
			if (g_game.buildings[key] && g_game.planets[key].visible) {
				g_game.buildings[key].visible = true;
				//g_game.buildings[key].image.show();
				if (g_game.buildings[key].type == 'factory') {
					//g_game.buildings[key].progressOutline.show();
					//g_game.buildings[key].progress.show();
				}
				//g_game.buildings[key].image.show();
			}
			else if (g_game.buildings[key]) {
				g_game.buildings[key].visible = false;
				//g_game.buildings[key].image.hide();
				if (g_game.buildings[key].type == 'factory') {
					g_game.buildings[key].progressOutline.hide();
					//g_game.buildings[key].progress.hide();
				}
			}
		}

		for (var i=0;i<g_game.ships.length;i++) {
			if (g_game.ships[i].team == 'team1') {
				g_game.ships[i].visible = true;
				//g_game.ships[i].image.show();
			}
			else if (g_game.ships[i].orbitting && g_game.planets[g_game.ships[i].orbitting].visible) {
				g_game.ships[i].visible = true;
				//g_game.ships[i].image.show();
			}
			else if (!g_game.ships[i].orbitting && g_game.ships[i].destination && g_game.planets[g_game.ships[i].destination].visible) {
				g_game.ships[i].visible = true;
				//g_game.ships[i].image.show();
			}
			else {
				g_game.ships[i].visible = false;
				//g_game.ships[i].image.hide();
			}
		}
	}
	
	//setTimeout(function() { doGameLoop(frames + 1); }, 50);
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
