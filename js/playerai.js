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
