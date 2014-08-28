var Route = function(planetA, planetB) {
	this.startPlanet = planetA;
	this.endPlanet = planetB;

	var p1 = g_game.planets[planetA];
	var p2 = g_game.planets[planetB];

	//this.pt1 = new Phaser.Point(p1.x, p1.y);
	//this.pt2 = new Phaser.Point(p2.x, p2.y);
	this.exitAngle1 = Math.atan2(p2.y - p1.y, p2.x - p1.x);
	this.exitAngle2 = (this.exitAngle1 + Math.PI) % (Math.PI * 2);
	this.pt1 = p1.orbit.circumferencePoint(this.exitAngle1);
	this.pt2 = p2.orbit.circumferencePoint(this.exitAngle2);

	this.length = Math.abs(Phaser.Point.distance(this.pt1, this.pt2));

	//var bigPath = g_game.raphPaper.path('M' + p1.x + ' ' + p1.y + 'L' + p2.x + ' ' + p2.y);
	//this.length = bigPath.getTotalLength();
	//this.path = g_game.raphPaper.path(bigPath.getSubpath(p1.r*2, this.length - p2.r*2)).attr( { stroke: '#222', 'stroke-width': 2 }).toBack();
	//this.length = this.path.getTotalLength();
	//this.image = this.path;
	//bigPath.remove();

	//this.pt1 = this.path.getPointAtLength(0);
	//this.pt2 = this.path.getPointAtLength(this.length);
	// find intersecting orbit lengths
	/*var len = 0;
	 while (!this.exitLength1) {
	 var orbitPoint = p1.orbit.circumferencePoint(len, true);	//p1.orbit.getPointAtLength(len);
	 console.log(orbitPoint);
	 if (Math.abs(this.pt1.x - orbitPoint.x) < 2 && Math.abs(this.pt1.y - orbitPoint.y) < 2) {
	 this.exitLength1 = len;
	 }
	 len++;
	 }
	 len = 0;
	 while (!this.exitLength2) {
	 var orbitPoint = p2.orbit.circumferencePoint(len, true);	//p2.orbit.getPointAtLength(len);
	 if (Math.abs(this.pt2.x - orbitPoint.x) < 2 && Math.abs(this.pt2.y - orbitPoint.y) < 2) {
	 this.exitLength2 = len;
	 }
	 len++;
	 }*/

	this.destroy = function() {
		this.image.remove();
	}

	return this;
}
