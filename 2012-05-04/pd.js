var wing = function() {
		var domain1 = INTERVALS(1)(30);
		var domain2 = DOMAIN([
			[0, 1],
			[0, 1]
		])([15, 30]);

		var p0 = [
			[0, 0, 0],
			[9.5, 0, 0],
			[4, 4, 0],
			[2, -2, 0]
		];
		var p1 = [
			[0, 0, 5],
			[9.5, 0, 5],
			[4, 4, 0],
			[2, -2, 0]
		];
		var p2 = [
			[0, 0, 10],
			[9.5, 0, 10],
			[4, 4, 0],
			[2, -2, 0]
		];
		var p3 = [
			[0, 0, 15],
			[9.5, 0, 15],
			[4, 4, 0],
			[2, -2, 0]
		];
		var p4 = [
			[0, 0, 20],
			[9.5, 0, 20],
			[4, 4, 0],
			[2, -2, 0]
		];
		var p5 = [
			[1.5, 0, 22],
			[6.5, 0, 22],
			[4, 2, 0],
			[2, -1, 0]
		];
		var p6 = [
			[1.5, 0, 22],
			[6.5, 0, 22],
			[4, 0, 8],
			[2, 0, -2]
		];

		var c0 = CUBIC_HERMITE(S0)(p0);
		var c1 = CUBIC_HERMITE(S0)(p1);
		var c2 = CUBIC_HERMITE(S0)(p2);
		var c3 = CUBIC_HERMITE(S0)(p3);
		var c4 = CUBIC_HERMITE(S0)(p4);
		var c5 = CUBIC_HERMITE(S0)(p5);
		var c6 = CUBIC_HERMITE(S0)(p6);
		var wingU = BEZIER(S1)([c0, c1, c2, c3, c4, c5, c6]);


		var q0 = [
			[0, 0, 0],
			[9.5, 0, 0],
			[-1, -0.5, 0],
			[1, 0.5, 0]
		];
		var q1 = [
			[0, 0, 5],
			[9.5, 0, 5],
			[-1, -0.5, 0],
			[1, 0.5, 0]
		];
		var q2 = [
			[0, 0, 10],
			[9.5, 0, 10],
			[-1, -0.5, 0],
			[1, 0.5, 0]
		];
		var q3 = [
			[0, 0, 15],
			[9.5, 0, 15],
			[-1, -0.5, 0],
			[1, 0.5, 0]
		];
		var q4 = [
			[0, 0, 20],
			[9.5, 0, 20],
			[-1, -0.5, 0],
			[1, 0.5, 0]
		];
		var q5 = [
			[1.5, 0, 22],
			[6.5, 0, 22],
			[-1, -0.5, 0],
			[1, 0.5, 0]
		];
		var q6 = [
			[1.5, 0, 22],
			[6.5, 0, 22],
			[1, 0, 5],
			[1, 0, -2]
		];

		var k0 = CUBIC_HERMITE(S0)(q0);
		var k1 = CUBIC_HERMITE(S0)(q1);
		var k2 = CUBIC_HERMITE(S0)(q2);
		var k3 = CUBIC_HERMITE(S0)(q3);
		var k4 = CUBIC_HERMITE(S0)(q4);
		var k5 = CUBIC_HERMITE(S0)(q5);
		var k6 = CUBIC_HERMITE(S0)(q6);

		var wingD = BEZIER(S1)([k0, k1, k2, k3, k4, k5, k6]);

		var wingZ = BEZIER(S1)([c6, k6]);

		var surfU = MAP(wingU)(domain2);
		var surfD = MAP(wingD)(domain2);
		var surfZ = MAP(wingZ)(domain2);

		var surf = T([0])([9.5])(R([1,2])(-PI/2)(R([0,1])(PI)(STRUCT([surfU, surfD, surfZ]))));

		var surf = COLOR([0, 0, 1, 1])(surf);


		return surf;
	}


		var domain2 = DOMAIN([
			[0, 1],
			[0, 1]
		])([45, 30]);

var colindro = function (x,r1,r2) {
	var domain1 = INTERVALS(1)(30);
	var t11 = [2*r1,0,0];
	var t12 = [-2*r1,0,0];
	var t21 = [2*r2,0,0];
	var t22 = [-2*r2,0,0];

	var p0 = [[0,0,0],[0,0,r1],t11,t22];
	var p1 = [[0,x,0],[0,x,r1],t11,t22];
	var p2 = [[0,0,0],[0,0,r2],t12,t21];
	var p3 = [[0,x,0],[0,x,r2],t12,t21];

	var c0 = CUBIC_HERMITE(S0)(p0);
	var c1 = CUBIC_HERMITE(S0)(p1);
	var surf1 = BEZIER(S1)([c0, c1]);

	var c2 = CUBIC_HERMITE(S0)(p2);
	var c3 = CUBIC_HERMITE(S0)(p3);
	var surf2 = BEZIER(S1)([c2, c3]);
	
	return STRUCT([MAP(surf1)(domain2),MAP(surf2)(domain2)]);
}
