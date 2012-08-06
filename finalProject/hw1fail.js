console.log('test');

//var load = function (id, n) {
//  var url = "https://raw.github.com/cvdlab-cg/" + id 
//    + "/master/2012-05-04/exercise" + n + ".js";
//
//  var script = document.createElement('script');
//  script.src = url;
//  document.body.appendChild(script);
//
//  return url;
//};
var dom = INTERVALS(1)(15);

var chapelPlan = function (r) {
	return function(n){
		var dx = r*COS(PI/n);
		var raggio = r*SIN(PI/n);
		var c = MAP(CUBIC_HERMITE(S0)([[dx,-raggio],[dx,raggio],[4*raggio,0],[-4*raggio,0]]))(dom);
		var dx1 = raggio/2;
		var asd = R([0,1])(2*PI/n)(POLYLINE([[dx,-raggio],[dx+dx1,-raggio-dx1],[dx+3*dx1,0],[dx,2*raggio+dx1]]));
		var asd2 = S([1])([-1])(asd);
		var inner = STRUCT([asd,asd2]);
		var inner2 = R([0,1])(-2*PI/n)(inner);
		// var delta = SQRT((4*raggio*raggio));
		// var asd2 = T([0,1])([-delta,-delta])(asd);
		//DRAW(inner2);
		var c1 = STRUCT(REPLICA(n-1)([c,R([0,1])(2*PI/n)]));
		return STRUCT([c1,inner2]);
	}
};

var moreChapel = function(r){
	return function(n){
		var dx = r*COS(PI/n);
		var raggio = r*SIN(PI/n);
		var c = R([0,1])(-PI/(4*n+4))(chapelPlan(3.4*raggio/n)(n+1));
		var chap = T([0,1])([-raggio,raggio])(c);
		//return chap;
		return STRUCT(REPLICA(n)([chap,R([0,1])(2*PI/n)]));

	}

};