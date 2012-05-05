var domain1 = INTERVALS(1)(30);
var domain2 = DOMAIN([
	[0, 1],
	[0, 1]
])([15, 30]);

var p0 = [[0,0,0],[9.5,0,0],[4,4,0],[2,-2,0]];
//var p1 = [[9.5,0,0],[0,0,0],[1,-0.5,0],[-1,0.5,0]];
var p1 = [[0,0,0],[9.5,0,0],[-1,-0.5,0],[1,0.5,0]];
var p2 = [[0,0,15],[6.5,0,15],[4,4,0],[2,-2,0]];
//var p3 = [[6.5,0,15],[0,0,15],[1,-0.5,0],[-1,0.5,0]];
var p3 = [[0,0,15],[6.5,0,15],[-1,-0.5,0],[1,0.5,0]]
var layerWing = function(points){
	self.curves = [];
	points.map(function(p){
		self.curves.push(CUBIC_HERMITE(S0)(p));
	});
	 return function(domain){
	 	return MAP(BEZIER(S1)(self.curves))(domain);
	 }
}


var repeatableTransHermControlPoints = function(n) {
	this.n = n;
	return function(controlPointSet) {
		self = this;
		self.cPoints = controlPointSet;
		return function(offset) {
			this.rPoints = [];
			this.dx = offset[0] || 0;
			this.dy = offset[1] || 0;
			this.dz = offset[2] || 0;
			for (i = 0; i < self.n; i++) {
				this.rPoints.push(self.cPoints.map(function(p,j) {
					if(j===1||j===0)
						return [p[0] + dx*i, p[1] + dy*i, p[2] + dz*i];
					else
						return p;
				}));
			}
		return this.rPoints;
		}
	}
}

var repeatableScalHermControlPoints = function(n) {
	this.n = n;
	return function(controlPointSet) {
		self = this;
		self.cPoints = controlPointSet;
		return function(offset) {
			this.rPoints = [];
			this.dx = offset[0] || 0;
			this.dy = offset[1] || 0;
			this.dz = offset[2] || 0;
			for (i = 0; i < self.n; i++) {
				this.rPoints.push(self.cPoints.map(function(p,j) {
					if(j===1)
						return [p[0] + dx*i, p[1] + dy*i, p[2] + dz*i];
					else
						return p;
				}));
			}
		return this.rPoints;
		}
	}
}


var cpwA = repeatableTransHermControlPoints(3)(p0)([0,0,5]);
var cpwB = repeatableTransHermControlPoints(3)(p1)([0,0,5]);

cpwA=cpwA.concat(repeatableScalHermControlPoints(4)(p2)([-1,-0.2,.5]));
cpwB=cpwB.concat(repeatableScalHermControlPoints(4)(p3)([-1,-0.2,.5]));

var ulwA = layerWing(cpwA)(domain2);
var ulwB = layerWing(cpwB)(domain2);

// var asd1 = layerWing([cpwA[2],p2])(domain2);
// var asd2 = layerWing([cpwB[2],p3])(domain2);

var combineSection = function(curves){
	return function(domain){
		return STRUCT(CONS(AA(MAP)(curves))(domain));
	}
}

var wing = STRUCT([ulwA,ulwB]);
DRAW(wing);







// var p1 = [[0,0,5],[9.5,0,5],[4,4,0],[2,-2,0]];

// var p3 = [[0,0,5],[9.5,0,5],[4,4,0],[2,-2,0]];

// var c0 = CUBIC_HERMITE(S0)(p0);
// var c1 = CUBIC_HERMITE(S0)(p1);

// var c3 = CUBIC_HERMITE(S0)(p3);

// var b0 = BEZIER(S1)([c0,c1]);
// console.log(b0);
// var s = MAP(b0)(domain2);
// DRAW(s);



var p0 = [[0,0,0],[9.5,0,0],[4,4,0],[2,-2,0]];
var p1 = [[9.5,0,0],[0,0,0],[1,-0.5,0],[-1,0.5,0]];
var domain1 = INTERVALS(1)(30);
var domain2 = DOMAIN([
	[0, 1],
	[0, 1]
])([15, 30]);

var wSection = function(points){
	var domain1 = INTERVALS(1)(30);
	var c0 = CUBIC_HERMITE(S0)(points);
	//var c1 = CUBIC_HERMITE(S0)(points);
	//var w0 = MAP(c0)(domain1);
	//var w1 = MAP(c1)(domain1);
	//var wing = STRUCT([w0,w1]);
	return c0;
}
var layerWing = function(points){
	self.curves = [];
	points.map(function(p){
		self.curves.push(CUBIC_HERMITE(S0)(p));
	});
	 return function(domain){
	 	return MAP(BEZIER(S1)(self.curves))(domain);
	 }
}


var repeatableControlPoints = function(n) {
	this.n = n;
	return function(controlPointSet) {
		self = this;
		self.cPoints = controlPointSet;
		return function(offset) {
			this.rPoints = [];
			this.dx = offset[0] || 0;
			this.dy = offset[1] || 0;
			this.dz = offset[2] || 0;
			for (i = 0; i < self.n; i++) {
				this.rPoints.push(self.cPoints.map(function(p) {
					return [p[0] + dx*i, p[1] + dy*i, p[2] + dz*i];
				}));
			}
		return this.rPoints;
		}
	}
}

var repeatableHermControlPoints = function(n) {
	this.n = n;
	return function(controlPointSet) {
		self = this;
		self.cPoints = controlPointSet;
		return function(offset) {
			this.rPoints = [];
			this.dx = offset[0] || 0;
			this.dy = offset[1] || 0;
			this.dz = offset[2] || 0;
			for (i = 0; i < self.n; i++) {
				this.rPoints.push(self.cPoints.map(function(p,j) {
					if(j===1||j===0)
						return [p[0] + dx*i, p[1] + dy*i, p[2] + dz*i];
					else
						return p;
				}));
			}
		return this.rPoints;
		}
	}
}

// var repeatableHermiteCurves = function(points){
// 	var self = this;
// 	self.curves = [];

// 	points.forEach(function(p){
// 		self.curves.push(STRUCT([MAP(CUBIC_HERMITE(S0)(p))(domain),POLYLINE([p[0],p[1]])]));
// 	});
// 	return self.curves;
// }

// var repeatableWingSection = function(points){
// 	that = this;
// 	that.points = points;
// 	return function(domain){
// 		var self = that;
// 		self.domain = domain;
// 		self.sections = [];
// 		self.points.forEach(function(p){
// 			self.sections.push(STRUCT([MAP(CUBIC_HERMITE(S0)(p))(self.domain),POLYLINE([p[0],p[1]])]));
// 		});
// 		return self.sections;
// 	}
// }

var repeatableBezierCurves = function(points){
	var self = this;
	this.curves = [];
	points.forEach(function(p){
		self.curves.push(BEZIER(S0)(p));
	});
	return this.curves;
}

var combineSection = function(curves){
	return function(domain){
		return STRUCT(CONS(AA(MAP)(curves))(domain));
	}
}

//var a = repeatableControlPoints(3)(p0)([0,0,5]);
//var b = repeatableWingSection(a)(domain1);
//var d = combineSection(b)(domain1);
var d = wSection([p0,p1]);
DRAW(d);

