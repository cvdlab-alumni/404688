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