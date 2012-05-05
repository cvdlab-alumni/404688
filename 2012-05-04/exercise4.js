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
DRAW(PLANE());
