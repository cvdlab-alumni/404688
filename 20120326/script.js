var domain1d = DOMAIN([[1,2]])([4]);
var domain2d = DOMAIN([[3,4],[1,5]])([4,4]);
var domain3d = DOMAIN([[5,6],[1,5],[1,5]])([4,4,4]);

var domainmap = DOMAIN([[0,10]])([10]);

var mapping = function(p){
	var u = p[0];

	return [u, 1];
};

var mapped = MAP(mapping)(domainmap);

var bisettrice = function(p){
	var u = p[0];

	return [u,u];
};

var mapped2 = MAP(bisettrice)(domainmap);

var domainPI = DOMAIN([[0,2*PI]])([20])

var sin = function(p){
	var u = p[0];

	return [u,Math.sin(u)];
};

var mapped3 = MAP(sin)(domainPI);

var circle=function(p){

};

var drawCircle = function(r,n){
	var domainCircle= DOMAIN([[0,2*PI]])([n]);
	var circ = MAP(function(p){
		var u = p[0];

		return [r*Math.cos(u),r*Math.sin(u)];
	})(domainCircle);
	DRAW(circ);
};

var drawCilinder = function(r,h,n,m,color){
	var linDomain = DOMAIN([[0,2*PI],[0,h]])([n,m]);
	var cilinder = MAP(function(p){
		u = p[0];
		v = p[1];

		return [v,r*Math.cos(u),r*Math.sin(u)];
	})(linDomain);
	COLOR(color)(cilinder);
	DRAW(cilinder);
};

var drawSphere = function(r,n,color){
	var sphereDomain = DOMAIN([[0,2*PI],[0,2*PI]])([n,n]);
	var sphere = MAP(function(p){
		var u = p[0];
		var v = p[1];

		return [r*Math.sin(u)*Math.cos(v),r*Math.sin(u)*Math.sin(v),r*Math.cos(u)];
	})(sphereDomain);
	COLOR(color)(sphere);
	DRAW(sphere);
};