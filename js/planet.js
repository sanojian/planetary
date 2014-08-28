var Planet = function(name, myX, myY, myR, myColor) {
	var self = this;
	this.x = myX;
	this.y = myY;
	this.r = myR;
	this.name = name;
	this.orbittingShips = [];

	var color = myColor || 'rgb(' + (64 + Math.floor(Math.random() * 128)) + ',' + (64 + Math.floor(Math.random() * 128)) + ',' + (64 + Math.floor(Math.random() * 128)) + ')';


	//this.orbit = g_game.raphPaper.path(getCircleToPath(this.x, this.y, this.r*2)).attr( { stroke: '#222', 'stroke-width': 2 });
	//this.orbitLength = this.orbit.getTotalLength();

	this.orbit = new Phaser.Circle(myX, myY, myR*2);
	this.orbitLength = this.orbit.circumference();

	//var imgPlanet = g_game.raphPaper.circle(myX, myY, myR).attr({ fill: color, 'stroke-width': 3 });
	var imgPlanet = g_game.add.sprite(myX, myY, 'allsprites', 'planet0');
	imgPlanet.anchor.set(0.5);
	imgPlanet.inputEnabled = true;
	imgPlanet.events.onInputDown.add(function() {
		g_game.bRouting = true;
		g_game.teams.team1.routePoints = [name];

	}, this);
	imgPlanet.events.onInputOver.add(function() {
		if (g_game.bRouting && g_game.teams.team1.routePoints[g_game.teams.team1.routePoints.length-1] != name) {
			g_game.teams.team1.routePoints.push(name);
			console.log(g_game.teams.team1.routePoints);
		}
	}, this);
	imgPlanet.events.onInputUp.add(function() {
		g_game.bRouting = false;
	}, this);

	/*var cover = g_game.raphPaper.circle(this.x, this.y, this.r*2).attr( { fill: '#fff', opacity: 0 });

	 cover.hover(
	 function() {
	 imgPlanet.attr({ stroke: color });
	 self.orbit.attr({ 'stroke-width': 2, stroke: '#666' });
	 //if (g_game.routeSelector.game.isActive) {
	 //	self.dragOver();
	 //}
	 }, function() {
	 imgPlanet.attr({ stroke: '#000' });
	 self.orbit.attr({ 'stroke-width': 1, stroke: '#222' });
	 }
	 );

	 self.dragOver = function() {
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

	 };

	 cover.drag(
	 function(dx, dy, x, y, evt) {

	 // over another planet?
	 for (var key in g_game.planets) {
	 if (Math.abs(dx + g_game.routeSelector.game.odx - g_game.planets[key].x) < g_game.planets[key].r*2 && Math.abs(dy + g_game.routeSelector.game.ody - g_game.planets[key].y) < g_game.planets[key].r*2) {
	 g_game.planets[key].dragOver();
	 }
	 }

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
	 );*/

	this.destroy = function() {
		this.orbit.remove();
		imgPlanet.remove();
		cover.remove();
	};

	this.hide = function() {
		/*this.orbit.hide();
		 imgPlanet.hide();
		 cover.hide();*/
	};
	this.show = function() {
		/*this.orbit.show();
		 imgPlanet.show();
		 cover.show();*/
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
