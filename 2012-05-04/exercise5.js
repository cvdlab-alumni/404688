var wing = function() {
	var domain1 = INTERVALS(1)(30);
	var domain2 = DOMAIN([
		[0, 1],
		[0, 1]
	])([45, 30]);

	var p0 = [
		[0, 0, 0],
		[9.5, 0, 0],
		[4, 4, 0],
		[2, -2, 0]
	];
	var p1 = [
		[0, 0, 20],
		[9.5, 0, 20],
		[4, 4, 0],
		[2, -2, 0]
	];
	var p2 = [
		[1.5, 0, 22],
		[6.5, 0, 22],
		[4, 2, 0],
		[2, -1, 0]
	];
	var p3 = [
		[1.5, 0, 22],
		[6.5, 0, 22],
		[4, 0, 8],
		[2, 0, -2]
	];

	var c0 = CUBIC_HERMITE(S0)(p0);
	var c1 = CUBIC_HERMITE(S0)(p1);
	var c2 = CUBIC_HERMITE(S0)(p2);
	var c3 = CUBIC_HERMITE(S0)(p3);
	var wingU = BEZIER(S1)([c0, c1, c2, c3]);


	var q0 = [
		[0, 0, 0],
		[9.5, 0, 0],
		[-1, -0.5, 0],
		[1, 0.5, 0]
	];
	var q1 = [
		[0, 0, 20],
		[9.5, 0, 20],
		[-1, -0.5, 0],
		[1, 0.5, 0]
	];
	var q2 = [
		[1.5, 0, 22],
		[6.5, 0, 22],
		[-1, -0.5, 0],
		[1, 0.5, 0]
	];
	var q3 = [
		[1.5, 0, 22],
		[6.5, 0, 22],
		[1, 0, 5],
		[1, 0, -2]
	];

	var k0 = CUBIC_HERMITE(S0)(q0);
	var k1 = CUBIC_HERMITE(S0)(q1);
	var k2 = CUBIC_HERMITE(S0)(q2);
	var k3 = CUBIC_HERMITE(S0)(q3);

	var wingD = BEZIER(S1)([k0, k1, k2, k3]);

	var wingI = BEZIER(S1)([c0, k0]);
	var wingZ = BEZIER(S1)([c3, k3]);

	var surfI = MAP(wingI)(domain2);
	var surfU = MAP(wingU)(domain2);
	var surfD = MAP(wingD)(domain2);
	var surfZ = MAP(wingZ)(domain2);

	var surf = T([0])([9.5])(R([1, 2])(-PI / 2)(R([0, 1])(PI)(STRUCT([surfI, surfU, surfD, surfZ]))));

	var planeWing = S([0,1])([0.6,0.75])(surf);
	return planeWing;
};

var domain2 = DOMAIN([
	[0, 1],
	[0, 1]
])([45, 30]);

var circle = function(x, r) {
	var domain1 = INTERVALS(1)(30);
	var t1 = [2 * r, 0, 0];
	var t2 = [-2 * r, 0, 0];

	var p0 = [
		[0, 0, 0],
		[0, 0, r], t1, t2];
	var p1 = [
		[0, x, 0],
		[0, x, r], t1, t2];
	var p2 = [
		[0, 0, 0],
		[0, 0, r], t2, t1];
	var p3 = [
		[0, x, 0],
		[0, x, r], t2, t1];

	var c0 = CUBIC_HERMITE(S0)(p0);
	var c1 = CUBIC_HERMITE(S0)(p1);
	var surf1 = BEZIER(S1)([c0, c1]);

	var c2 = CUBIC_HERMITE(S0)(p2);
	var c3 = CUBIC_HERMITE(S0)(p3);
	var surf2 = BEZIER(S1)([c2, c3]);


	return STRUCT([MAP(surf1)(domain2), MAP(surf2)(domain2)]);
};				

var tail = function(y, z, r1, r2) {
	var domain1 = INTERVALS(1)(30);
	var t11 = [2 * r1, 0, 0];
	var t21 = [-2 * r1, 0, 0];

	var t12 = [2 * r2, 0, 0];
	var t22 = [-2 * r2, 0, 0];

	var p0 = [
		[0, 0, 0],
		[0, 0, r1], t11, t21];
	var p1 = [
		[0, y, z],
		[0, y, z + r2], t12, t22];

	var p2 = [
		[0, 0, 0],
		[0, 0, r1], t21, t11];
	var p3 = [
		[0, y, z],
		[0, y, z + r2], t22, t12];

	var c0 = CUBIC_HERMITE(S0)(p0);
	var c1 = CUBIC_HERMITE(S0)(p1);
	var surf1 = BEZIER(S1)([c0, c1]);

	var c2 = CUBIC_HERMITE(S0)(p2);
	var c3 = CUBIC_HERMITE(S0)(p3);

	var surf2 = BEZIER(S1)([c2, c3]);
	var surf3 = BEZIER(S1)([c1, c3]);

	return STRUCT([MAP(surf1)(domain2), MAP(surf2)(domain2), MAP(surf3)(domain2)]);
};

var nose = function(y1, z1, y2, z2, r1, r2, r3) {
	var domain1 = INTERVALS(1)(30);
	var t11 = [2 * r1, 0, 0];
	var t21 = [-2 * r1, 0, 0];

	var t12 = [2 * r2, 0, 0];
	var t22 = [-2 * r2, 0, 0];

	var t31 = [2 * r3, 0, 0];
	var t32 = [-2 * r3, 0, 0];

	var p0 = [
		[0, 0, 0],
		[0, 0, r1], t11, t21];
	var p1 = [
		[0, y1, z1],
		[0, y1, z1 + r2], t12, t22];

	var p5 = [
		[0, y2, z2],
		[0, y2, z2 + r3], t31, t32];


	var p2 = [
		[0, 0, 0],
		[0, 0, r1], t21, t11];
	var p3 = [
		[0, y1, z1],
		[0, y1, z1 + r2], t22, t12];

	var p6 = [
		[0, y2, z2],
		[0, y2, z2 + r3], t32, t31];

	var c0 = CUBIC_HERMITE(S0)(p0);
	var c1 = CUBIC_HERMITE(S0)(p1);
	var c5 = CUBIC_HERMITE(S0)(p5);
	var surf1 = BEZIER(S1)([c0, c1, c5]);

	var c2 = CUBIC_HERMITE(S0)(p2);
	var c3 = CUBIC_HERMITE(S0)(p3);
	var c6 = CUBIC_HERMITE(S0)(p6);
	var surf2 = BEZIER(S1)([c2, c3, c6]);

	return STRUCT([MAP(surf1)(domain2), MAP(surf2)(domain2)]);
};

var SPHERE = function(r, n, color) {
	var sphereDomain = DOMAIN([
		[0, PI],
		[0, 2 * PI]
	])([n, n]);
	var sphere = MAP(function(p) {
		var u = p[0] - PI / 2;
		var v = p[1] - PI;
		return [r * Math.cos(u) * Math.sin(v), r * Math.cos(u) * Math.cos(v), r * Math.sin(u)];
	})(sphereDomain);
	sphere = COLOR(color)(sphere);
	return sphere;

};

var fuselage = function() {

	var sphere = T([1, 2])([13, 2.5])(SPHERE(0.5, 30, [1, 0, 0, 1]));
	var planeTail = R([0, 1])(PI)(tail(10, 2, 5, 2));
	var planeBody = circle(10, 5);
	var planeNose = T([1])([10])(nose(2, 1, 3, 2, 5, 3, 1));

	var planeFuselage = STRUCT([sphere, planeBody, planeNose, planeTail]);

	return planeFuselage;
};

var stabilizer = function() {
	var domain1 = INTERVALS(1)(30);
	var domain2 = DOMAIN([
		[0, 1],
		[0, 1]
	])([45, 30]);

	var p0 = [
		[0, 2, 0],
		[0, 0, 3],
		[0, -3, 0],
		[0, -3, 0]
	];
	var p1 = [
		[0, 0, 3],
		[0, -1.5, 0],
		[0, -3, 0],
		[0, 0, -2]
	];
	var p2 = [
		[0, -1.5, 0],
		[0, 0, -1],
		[0, 0, -2],
		[0, 2, 0]
	];

	var p3 = [
		[0.5, 2, 0],
		[0.5, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	];
	var p4 = [
		[-0.5, 2, 0],
		[-0.5, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	];

	var p5 = [
		[0.5, 0, 0],
		[0.5, 0, -1],
		[0, 0, 0],
		[0, 0, 0]
	];
	var p6 = [
		[-0.5, 0, 0],
		[-0.5, 0, -1],
		[0, 0, 0],
		[0, 0, 0]
	];

	var p7 = [
		[0.5, 0, 0]
	];
	var p8 = [
		[-0.5, 0, 0]
	];

	var c0 = CUBIC_HERMITE(S0)(p0);
	var c1 = CUBIC_HERMITE(S0)(p1);
	var c2 = CUBIC_HERMITE(S0)(p2);
	var c3 = CUBIC_HERMITE(S0)(p3);
	var c4 = CUBIC_HERMITE(S0)(p4);
	var c5 = CUBIC_HERMITE(S0)(p5);
	var c6 = CUBIC_HERMITE(S0)(p6);
	var c7 = BEZIER(S0)(p7);
	var c8 = BEZIER(S0)(p8);

	var surf1 = BEZIER(S1)([c0, c3]);
	var surf4 = BEZIER(S1)([c0, c4]);
	var surf2 = BEZIER(S1)([c1, c7]);
	var surf6 = BEZIER(S1)([c1, c8]);
	var surf3 = BEZIER(S1)([c2, c5]);
	var surf5 = BEZIER(S1)([c2, c6]);


	var verticalStabilizer = STRUCT([
		MAP(surf1)(domain2), 
		MAP(surf2)(domain2), 
		MAP(surf3)(domain2), 
		MAP(surf4)(domain2), 
		MAP(surf5)(domain2), 
		MAP(surf6)(domain2)
	]);

	var p10 = [
		[0.5, 2, 0],
		[3, .7, 0],
		[1, 0, 0],
		[0, -2, 0]
	];
	var p12 = [
		[0.5, 2, 0],
		[0.5, .7, 0.15],
		[0, 0, 0.25],
		[0, -2, 0]
	];
	var p13 = [
		[0.5, 2, 0],
		[0.5, .7, -0.15],
		[0, 0, -0.25],
		[0, -2, 0]
	];

	var p11 = [
		[3, .7, 0],
		[0.5, 0, 0],
		[0, -2, 0],
		[-4, 0, 0]
	];
	var p14 = [
		[0.5, .7, 0.15],
		[0.5, 0, 0],
		[0, -2, 0],
		[0, 0, -0.5]
	];
	var p15 = [
		[0.5, .7, -0.15],
		[0.5, 0, 0],
		[0, -2, 0],
		[0, 0, 0.5]
	];

	var c10 = CUBIC_HERMITE(S0)(p10);
	var c11 = CUBIC_HERMITE(S0)(p11);
	var c12 = CUBIC_HERMITE(S0)(p12);
	var c13 = CUBIC_HERMITE(S0)(p13);
	var c14 = CUBIC_HERMITE(S0)(p14);
	var c15 = CUBIC_HERMITE(S0)(p15);


	var surf8 = BEZIER(S1)([c10, c12]);
	var surf9 = BEZIER(S1)([c10, c13]);

	var surf10 = BEZIER(S1)([c11, c14]);
	var surf11 = BEZIER(S1)([c11, c15]);

	var s1 = T([2])([-0.05])(STRUCT(
		[MAP(surf8)(domain2), MAP(surf9)(domain2), MAP(surf10)(domain2), MAP(surf11)(domain2)]
	));

	var horizStabilizer = STRUCT([S([0])([-1])(s1),s1]);

	var planeStabilizer = STRUCT([horizStabilizer,verticalStabilizer]);

	return planeStabilizer;
};

var PLANE = function() {
	var planeFuselage = fuselage();
	var planeStabilizer = stabilizer();
	var planeWing = wing();

	var planeWingL = T([1])([2])(R([0, 1])(PI / 2)(planeWing));

	var planeWingR = S([0])([-1])(planeWingL);

	var planeWings = COLOR([1, 1, 0, 1])(STRUCT([planeWingL, planeWingR]));

	var planeStabilizer = COLOR([1, 1, 0, 1])(T([1, 2])([-10, 4])(S([0,1,2])([1.5,1.5,1.5])((planeStabilizer))));

	var plane = STRUCT([planeFuselage, planeWings, planeStabilizer]);
	return plane;
};

var airport = function() {
	var myPlane = T([2])([15])(R([1, 2])(PI / 12)(PLANE()));

	var field = COLOR([0, 0.5, 0, 1])(T([0])([-75])(STRUCT(REPLICA(2)([SIMPLEX_GRID([
		[49, -2, -23, -2, -23, -2, 49],
		[75]
	]), T([1])([-75])]))));

	var airstrip = COLOR([0.5, 0.5, 0.5, 1])(T([0])([-75])(STRUCT(REPLICA(2)([SIMPLEX_GRID([
		[-49, -2, 23, -2, 23, -2, -49],
		[75]
	]), T([1])([-75])]))));

	var centralAirstrip = COLOR([0.5, 0.5, 0.5, 1])(T([0, 1])([-75, -75])(STRUCT(REPLICA(2)([SIMPLEX_GRID([
		[-49, -2, -23, 2, -23, -2, -49], REPLICA(15)([-5, 5])])]))));

	var borderStripRoad = COLOR([1, 1, 1, 1])(T([0])([-75])(STRUCT(REPLICA(2)([SIMPLEX_GRID([
		[-49, 2, -23, -2, -23, 2, -49],
		[75]
	]), T([1])([-75])]))));

	var centralStripRoad = COLOR([1, 1, 1, 1])(T([0, 1])([-75, -75])(STRUCT(REPLICA(2)([SIMPLEX_GRID([
		[-49, -2, -23, 2, -23, -2, -49], REPLICA(15)([5, -5])])]))));

	var airport = STRUCT([myPlane, airstrip, field, borderStripRoad, centralStripRoad, centralAirstrip]);
	
	return airport;
}

DRAW(airport());