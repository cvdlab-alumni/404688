/*
 *Exercise 1: draw a wing
 *
 */

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

DRAW(COLOR([1,1,0,1])(wing()));