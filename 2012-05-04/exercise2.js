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

//DRAW(fuselage());
