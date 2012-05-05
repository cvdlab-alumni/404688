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

DRAW(stabilizer());
