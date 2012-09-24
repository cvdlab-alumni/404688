console.log('test');

/* Domain and other usefull object definition */
var palette = {
	white: [1.2,1.2,1.2,1],
	brick: [0.56,0.14,0.14,1]
};
var domA = INTERVALS(1)(16);
var domB = INTERVALS(1)(8);
var dom2d = DOMAIN([
	[0, 1],
	[0, 1]
])([10,10]);

var domeDomain = DOMAIN([[0,1],[0,1]])([12,12]);

/* Octagonal base */
var octagonPlan = function (a) {
	return function(l){
		return SIMPLICIAL_COMPLEX([[0,0],[-l,-a],[l,-a],[a,-l],[a,l],[l,a],[-l,a],[-a,l],[-a,-l]])
								  ([[0,1,2],[2,0,3],[3,4,0],[0,5,4],[5,6,0],[0,7,6],[7,0,8],[8,1,0]]);
	};
};


/* Single layer church base */
var churchPlan = function(r){
	return function(h){
		var l = r*SIN(PI/8);
		var a = r*COS(PI/8);

		var octP1 = octagonPlan(a)(l);
		octP1 = EXTRUDE([h])(octP1);
		octP1 = BOUNDARY(octP1);
		var chapBasement = SIMPLICIAL_COMPLEX([[-a,-l],[-a,l],[-(a+1.5*l),l],[-(a+1.5*l),-l]])([[0,1,2],[2,3,0]]);
		chapBasement = EXTRUDE([h])(chapBasement);
		chapBasement = BOUNDARY(chapBasement);
		chapBasements = STRUCT(REPLICA(4)([chapBasement,R([0,1])(PI/2)]));
		octP1 = STRUCT([octP1,chapBasements]).scale([2],[-1]);
		return STRUCT([octP1]);
	};
};

/* Multilevel church base */
var multiLevelChurchPlan = function(l){
	return function(model){
		return STRUCT(REPLICA(l)([model,T([2])([-0.1]),S([0,1])([1.1,1.1])]));

	};
};

/* Plan corner section */
var planSection = function(r){
	var p00 = [-r*SIN(PI/40),-r*COS(PI/8)];
	var p01 = [-r*SIN(PI/8),-r*COS(PI/8)];
		
	var p10 = [-r*SIN(PI/40),-(r+0.1)*COS(PI/8)];
	var p11 = [-(r+0.1)*SIN(PI/8),-(r+0.1)*COS(PI/8)];

	var halfS0 = POLYLINE([p01,p00,p10]);
	var halfS1 = S([0])([-1])(halfS0).rotate([0,1],-PI/4);
	var w1 = POLYLINE([p11,p10]);
	var octCorner = STRUCT([w1,halfS0,halfS1]).rotate([0,1],PI/4).scale([0],[-1]);

	var p20 = [-r*SIN(PI/40),-(r+0.3)*COS(PI/8)];
	var w2 = POLYLINE([p10,p20]);
	var p30 = [0,-(r+0.1)*COS(PI/8)-(2*(r))*SIN(PI/8)];
	var p31 = [-(r+0.1)*SIN(PI/8),-(r+0.1)*COS(PI/8)-(2*(r))*SIN(PI/8)];

	var chap = POLYLINE([p11,p31,p30]);

	var c = CUBIC_HERMITE(S0)([[0,-(r+0.1)*COS(PI/8)-(2*(r-0.1))*SIN(PI/8)],p20,[-2*.6*r,0], [2*.6*r*COS(PI/16),2*.6*r*SIN(PI/16)]]);
	var chapIn = MAP(c)(domA);

	var cr = 0.05*r;
	var cAlfa = MAP(CUBIC_HERMITE(S0)([[cr,0],[0,cr],[0,(PI/2)*cr],[-(PI/2)*cr,0]]))(domB);
	var columnA = STRUCT(REPLICA(4)([cAlfa,R([0,1])(PI/2)])).translate([0,1],[-r*0.8*SIN(PI/8),-r*0.8*COS(PI/8)]);
	return STRUCT([octCorner,w2,chap,chapIn,columnA]);

};

/* Complete church plan*/
var centralPlan = function(r){
	return function(n){
		var s0 = planSection(r);
		var s1 = S([0])([-1])(s0);
		var s = STRUCT([s0,s1]);
		return STRUCT(REPLICA(n)([s, R([0,1])([PI/2])]));
	};
};

/* Church half side section */
var domeBaseStripe = function(r) {
	return function(n){
		var dx = r*COS(PI/n);
		var raggio = r*SIN(PI/n);
		var c1 = CUBIC_HERMITE(S0)([[-dx,0,0],[-dx*.1,0,r],[0,0,2*r],[1.5*dx,0,0]]);
		var c2 = CUBIC_HERMITE(S0)([[-dx,raggio,0],[-dx*.1,raggio*.1,r],[0,0,2*r],[1.5*dx,-1.5*raggio,0]]);
		var csup1 = BEZIER(S1)([c1,c2]);
		var corner1 = MAP(csup1)(domeDomain);
		var corner2 = S([0])([-1])(corner1).rotate([0,1],[-PI-PI/4]);
		return STRUCT([corner1,corner2]).rotate([0,1],PI/2);
	};
};

/* Church dome ogive */
var domeOgive = function(r){
	return function(n){
		var dy = r*COS(PI/(n));
		var dx = r*SIN(PI/(n))*.25;
		var c1 = CUBIC_HERMITE(S0)([[-1.05*dx,-1.035*dy,0],[-dx*1.05*.1,-1.035*dy*.1,r],[0,0,2*r],[1.5*dx,1.5*dy,0]]);
		var c2 = CUBIC_HERMITE(S0)([[1.05*dx,-1.035*dy,0],[dx*1.05*.1,-1.035*dy*.1,r],[0,0,2*r],[-1.5*dx,1.5*dy,0]]);
		var c3 = CUBIC_HERMITE(S0)([[0,-1.01*r,0],[0,-1.035*dy*.1,1.01*r],[0,0,2*r],[0,1.5*r,0]]);
		var s1 = BEZIER(S1)([c1,c3]);
		var s2 = BEZIER(S1)([c2,c3]);
		var s3 = BEZIER(S1)([c1,c2]);

		var sup1 = MAP(s1)(domeDomain);
		var sup2 = MAP(s2)(domeDomain);
		var sup3 = MAP(s3)(domeDomain);
		return STRUCT([sup1,sup2,sup3]).rotate([0,1],-PI/8);

	};
};

/* Church dome section */
var domeSection = function(r,n,l){
	var db = domeBaseStripe(r)(n).color(palette.brick);
	var dt = domeOgive(r)(n);
	var dc= roofLantern(r).translate([2], [r]);
	return STRUCT([db,dt,dc]);
};

/* Church outer door */
var doorA = function(r){

	var l = r*SIN(PI/8);
	var a = r*COS(PI/8);

	var seg00 = SIMPLEX_GRID([[l/6],[.1],[-l/6,5*l/3,-l/6]]);
	var seg01 = SIMPLEX_GRID([[-l/2,l/6,-l/3],[.1],[-l/6,2*l/3,-l/6]]);
	var seg10 = SIMPLEX_GRID([[4*l/6],[.1],[l/6]]);
	var seg11 = SIMPLEX_GRID([[-l/2,l/2],[.1],[-5*l/6,l/6]]);
	var seg12 = SIMPLEX_GRID([[l],[.1],[-5*l/3,l/6]]);

	var lA = 1.5*l;

	var wA = SIMPLEX_GRID([[-l/6,l/3],[-0.04,0.02],[-l/6,5/6*l]]);
	var wB0 = SIMPLICIAL_COMPLEX([
							[(l - (lA/2)*COS(PI/6)),l+0.01],
							[(l - (lA/2)*COS(PI/6)),11/6*l],
							[l,11/6*l],
							[l,l+0.01+((lA/2)*SIN(PI/6))]

						])([
							[0,1,2],
							[2,0,3]
						]);

	var wB1 = SIMPLEX_GRID([[-l/6,5/6*l],[-0.04,0.02,-0.04],[-l,0.01]]);
	var wC = SIMPLEX_GRID([[-l/6,(l - (l/2)*COS(PI/6))],[-0.04,0.02,-0.04],[-l,5/6*l]]);

	wA.color(palette.white);
	wB0.color(palette.white);
	wB1.color(palette.white);
	wC.color(palette.white);

	var tA = SIMPLICIAL_COMPLEX([
									[(lA/2)*COS(PI/6),0],
									[0,0],
									[(lA/2)*COS(PI/6),(lA/2)*SIN(PI/6)],
									[(lA/2)*COS(PI/6),(lA/2)*SIN(PI/9)],
									[(lA/3.5)*COS(PI/6),(lA/2)*SIN(PI/24)],
									[(lA/2)*COS(PI/6),(lA/2)*SIN(PI/24)]
								])([
									[0,1,5],
									[5,1,4],
									[4,1,2],
									[2,4,3]
								]);
	tA = tA.extrude([.1]);
	tA = BOUNDARY(tA);
	tA = tA.rotate([1,2],PI/2);
	tA = tA.translate([0,2],[(l - (lA/2)*COS(PI/6)),l+0.01]);
	
	var tC = SIMPLICIAL_COMPLEX([
									[(lA/2)*COS(PI/6),(lA/2)*SIN(PI/9)],
									[(lA/3.5)*COS(PI/6),(lA/2)*SIN(PI/24)],
									[(lA/2)*COS(PI/6),(lA/2)*SIN(PI/24)]
							])([
								[0,1,2]
							]);

	tC = tC.color([1,1,1,0.7]);
	tC = tC.translate([0,1],[(l - (lA/2)*COS(PI/6)),l+0.01]);
	tC = STRUCT([tC,wB0]);
	tC = tC.extrude([.02]);
	tC = tC.rotate([1,2],PI/2);
	tC = tC.translate([1],[-0.04]);

	var tB = STRUCT([seg00,seg01,seg10,seg11,seg12,wA,wB1,wC]).scale([1],[-1]);
	return STRUCT([tA,tB,tC]);
};

/* Church inner door and roofLantern wall*/
var doorB = function(r){

	var l = r*SIN(PI/8);
	var a = r*COS(PI/8);

	var c01 = CUBIC_HERMITE(S0)([[-l/4*3,0],[-l/4*3,5/6*l],[0,0],[0,0]]);
	var c02 = CUBIC_HERMITE(S0)([[-l/4*3,5/6*l],[-l,13/12*l],[0,PI/2*l/4],[-PI/2*l/4,0]]);

	var c1 = CUBIC_HERMITE(S0)([[0,0],[0,11/6*l],[0,0],[0,0]]);
	var c2 = CUBIC_HERMITE(S0)([[0,11/6*l],[-l,11/6*l],[0,0],[0,0]]);
	var s1 = BEZIER(S1)([c01,c1]);
	var s2 = BEZIER(S1)([c02,c2]);

	var s = STRUCT([MAP(s1)(dom2d),MAP(s2)(dom2d)]);

	s = EXTRUDE([.1*r])(s).rotate([1,2],PI/2);
	s.material = new plasm.materials.LineMaterial();
	s.color(palette.white);
	return s;

};

/* Church lower level corner section */
var cornerSection3d = function(r){
	var l = r*SIN(PI/8);
	var a = r*COS(PI/8);

	var dA = doorA(r);
	var axisA = cornerAxis(PI/8,r);
	axisA = axisA.extrude([11/6*l]);
	dA = STRUCT([dA,axisA]);

	var dB = doorB(r);
	var axisB = SIMPLICIAL_COMPLEX([
									[0,0],
									[0,-.1],
									[.1/COS(PI/8)*SIN(PI/8),-.1]
								])([
									[0,1,2]
								]);
	axisB = axisB.extrude([11/6*l]);

	dB = STRUCT([dB, axisB]);
	dB = dB.rotate([0,1],-PI/4);

	var intermediateSection = BOUNDARY(octagonalRingSection(r,PI/8).extrude([.05]).translate([2],[11/6*l]));

	var halfChapelLV1 = chapWall(r,PI/4).translate([0,1],[-l+.05,-2*a+.1]);
	
	var corner = STRUCT([dA,dB]);
	corner = corner.translate([0,1],[-l,-a]).scale([0],[-1]).rotate([0,1],-PI/4);
	corner.material = new plasm.materials.LineMaterial();

	var column = BOUNDARY(DISK([0.05*r])().extrude([11/6*l]).translate([0,1],[-r*0.8*SIN(PI/8),-r*0.8*COS(PI/8)]));

	return STRUCT([corner,column,intermediateSection,halfChapelLV1]);

};

/* Church complete lower level */
var centralPlan3d = function(r){
	return function(n){
		var s0 = cornerSection3d(r).rotate([0,1],PI/4);
		var s1 = S([0])([-1])(s0);
		var s = STRUCT([s0,s1]);
		return STRUCT(REPLICA(n)([s, R([0,1])([PI/2])]));
	};
};

/* Corner axis used to join various element such as chapel walls or roofLantern walls */
var cornerAxis = function(ang,r){
		return SIMPLICIAL_COMPLEX([
									[0,0],
									[0,-.1*r],
									[-.1/COS(ang)*SIN(ang)*r,-.1*r]
								])([
									[0,1,2]
								]);
};

/* Church intermediate level section betwetn lower level and domes */
var octagonalRingSection = function(r,a){
	var l = r*SIN(PI/8);
	var a = r*COS(PI/8);

	var pc00 = [l,l/3];
	var pc01 = [l/3,5/6*l];

	var cp00 = 0;

	var c00 = CUBIC_HERMITE(S0)([pc00,pc01,[-4/6*l*PI/2,0],[0,PI/2*4/6*l]]);
	var c01 = BEZIER(S0)([[l,cp00-l/6],[cp00,cp00-l/6]]);
	var c02 = BEZIER(S0)([[cp00,cp00-l/6],[cp00,l]]);

	var s01 = MAP(BEZIER(S1)([c01,c00]))(dom2d);
	var s02 = MAP(BEZIER(S1)([c02,c00]))(dom2d);
	var s0 = STRUCT([s01,s02]);

	var section0 = STRUCT([s0,T([1])([5/3*l])(S([1])([-1])(s0))]);

	var dy = ((.2)*SIN(PI/8));

	var section1a = SIMPLICIAL_COMPLEX([[l,cp00],[cp00,cp00],[l,cp00-dy],[cp00-dy,cp00-dy]])([[0,1,2],[2,1,3]]);
	var section1b = S([0])([-1])(section1a).rotate([0,1],-PI/2);
	var section1c = SIMPLICIAL_COMPLEX([[cp00,l],[cp00,11/6*l],[cp00-dy,l],[cp00-dy,11/6*l]])([[0,1,2],[2,1,3]]);
	var section1d = SIMPLICIAL_COMPLEX([[cp00-dy,cp00-dy],[l,cp00-dy],[l,cp00-2*dy],[cp00-dy,cp00-2*dy]])([[0,1,2],[2,0,3]]);

	var section = STRUCT([section1a,section1b,section1c,section0,section1d]);

	section = section.translate([0,1],[-l,-a-(11/6*l)-((.15)*COS(PI/8))]);

	var p00 = [0,0];
	var p01 = [-l*.7,0];
	var p10 = [0, -(.5)*COS(PI/8)];
	var p11 = [-(r*1.2)*SIN(PI/8),-(r*.5)*COS(PI/8)];

	var octCorner0 = SIMPLICIAL_COMPLEX([p00,p01,p10,p11])([[0,1,2],[2,1,3]]).translate([1],[-a*.7]);
	var octCorner1 = STRUCT([R([0,1])(-PI/4)(S([0])([-1])(octCorner0))]);

	var interLevel = STRUCT([octCorner0,octCorner1,section]);
	return interLevel;
};

/* Church complete intermediate level */
var octagonalRingCorner = function(r){
	return function(delta){
		var l = r*SIN(PI/8);
		var a = r*COS(PI/8);
		var p00 = [0,0];
		var p01 = [-l,0];
		var p10 = [0, -delta*a];
		var p11 = [-(1+delta)*l, -delta*a];

		var octCorner0 = SIMPLICIAL_COMPLEX([p00,p01,p10,p11])([[0,1,2],[2,1,3]]).translate([1],[-a]);
		var octCorner1 = STRUCT([S([0])([-1])(R([0,1])(PI/4)(octCorner0))]);

		return STRUCT([octCorner0,octCorner1]);
	};
};

/* Roof lantern */
var roofLantern = function(r){
	var d0 = doorB(r).color(palette.white);
	var d1 = S([0])([-1])(d0).rotate([0,1],PI/4);

	var d = STRUCT([d0,d1]).rotate([0,1],-PI/4);

	var ax01 = cornerAxis(PI/8,r).extrude([r*SIN(PI/8)*11/6]);
	var ax02 = S([0])([-1])(ax01).rotate([0,1],-PI/4);

	var dax = STRUCT([d,ax01,ax02]);
	dax = dax.scale([0,1,2],[0.1,0.1,0.25]);
	dax = dax.translate([0,1],[-.1*r*SIN(PI/8),-.1*r*COS(PI/8)]);

	var ring = octagonalRingCorner(.098*r)(0.15).extrude([.005*r]).translate([2],[0.25*11/6*r*SIN(PI/8)]);

	var ap0 = SIMPLICIAL_COMPLEX([[0,0,.25*r+0.25*11/6*r*SIN(PI/8)+.005*r],[0,-.105*r*COS(PI/8),0.25*11/6*r*SIN(PI/8)+.005*r],[-.105*r*SIN(PI/8),-.105*r*COS(PI/8),0.25*11/6*r*SIN(PI/8)+.005*r]])([[0,1,2]]);
	var ap1 = S([0])([-1])(ap0).rotate([0,1],-PI/4);

	var ap = STRUCT([ap0,ap1]).color(palette.brick);

	var camp = STRUCT([dax,ring,ap]);

	return camp;
};

/* Half chapel's wall*/
var halfChapWall = function(r,a){
	var l = r*SIN(PI/8);
	
	var seg01 = SIMPLEX_GRID([[-l/3,l/6],[.1],[-2/3*l,2*l/3,-2/3*l]]);
	var seg10 = SIMPLEX_GRID([[.88*l],[.1],[l/6,-9*l/6,l/6]]);
	var seg11 = SIMPLEX_GRID([[-l/3,.55*l],[.1],[-l/2,l/6,-2*l/3,l/6,-l/2]]);
	var seg12 = SIMPLEX_GRID([[.88*l],[-.04,.02,-.04],[-l/6,9*l/6,-l/6]]).color(palette.white);;

	var wall = STRUCT([seg01,seg10,seg11,seg12]);

	wall = wall.translate([1],[-.1]);
	
	return wall;
};

/* Complete chapel's wall */
var chapWall = function(r,a){
	var l = r*SIN(PI/8);
	var w0 = STRUCT([halfChapWall(r,a),cornerAxis(a,r).extrude([11/6*r*SIN(PI/8)])]);
	var w1 = S([0])([-1])(w0).rotate([0,1],-a*2);
	var w2 = halfChapWall(r,a);
	var col = SIMPLEX_GRID([[.25*l],[.1],[11*l/6]]).translate([0,1],[-.25*l,-.1]);
	w2 = STRUCT([w2,col]).scale([0],[-1]).rotate([0,1],PI/2).translate([0,1],[-.1,5*l/3]);
	return STRUCT([w0,w1,w2]);
};

/* tholobate walls */
var chapWalls = function(r){
	return function(a){
		var w0 = halfChapWall(r,a).scale([0],[1.15]);
		var w1 = STRUCT([w0,cornerAxis(a,1).extrude([11/6*r*SIN(PI/8)])]);
		var w2 = S([0])([-1])(w1).rotate([0,1],-a*2);

		return STRUCT([w2,w1]).translate([0,1],[-r*SIN(a),-r*COS(a)]);


	};
};

/* Chapel dome section */
var chapelDome = function(r){
	var l = r*SIN(PI/8);
	var a = r*COS(PI/8);

	var halfChapelLV2 = chapWalls(r*.3)(PI/8).scale([2],[1.5]).translate([2],[11/6*l+.05]);
	var halfChapelLV2Ring = octagonalRingCorner(r*.3)(0.5).extrude([.05]).translate([2],[11/6*l+.05+1.5*11/6*(r*.3)*SIN(PI/8)]);
	var halfChapelLV2Dome = domeSection(r*.35,8,4).translate([2],[11/6*l+.05+1.5*11/6*(r*.3)*SIN(PI/8)+.05]);

	var halfChapel = STRUCT([halfChapelLV2,halfChapelLV2Ring,halfChapelLV2Dome]);

	return STRUCT(REPLICA(4)([halfChapel,R([0,1])([-PI/4])])).translate([1],[-a-r*.525]);

};

/* Central dome section */
var centralDomeSection = function(r){
	var l = r*SIN(PI/8);
	var a = r*COS(PI/8);

	var centralChapelWallSection = chapWalls(r)(PI/8);
	var centralChapelRingSection = octagonalRingCorner(r)(0.2).extrude([.1]).translate([2],[11/6*l]);
	var centralDomeSection = domeSection(r*1.1,8,1).translate([2],[11/6*l+.1]);
	return STRUCT([centralChapelWallSection,centralDomeSection,centralChapelRingSection]);
};

/* Central dome complete */
var centralDome = function(r,n){
	return STRUCT(REPLICA(n)([centralDomeSection(r),R([0,1])([-PI/4])]));
};

/* Church corner section with central dome section and chapel's dome */
var complete3dCornerSection = function(r){
	var l = r*SIN(PI/8);
	var a = r*COS(PI/8);

	var c = cornerSection3d(r);
	var chap = chapelDome(r);
	var cDome = centralDomeSection(r).translate([2],[11*l/6]);

	return STRUCT([c, chap, cDome]);
};

/* N church sections */
var complete3dChurch = function(r,n){
	var c0 = complete3dCornerSection(r);
	var c1 = S([0])([-1])(c0).rotate([0,1],[-PI/2]);

	var c = STRUCT([c0,c1]);
	return STRUCT(REPLICA(n)([c, R([0,1])([-PI/2])]));
};

/* Project page drawing functions */
var planCornerSection = function(){
	DRAW(planSection(1));
};

var completePlan = function(){
	DRAW(centralPlan(1)(4));
};

var lowerLevelCornerSection = function(){
	DRAW(cornerSection3d(1));
};

var completeLowerLevel = function(){
	var c01 = cornerSection3d(1);
	var c02 = S([0])([-1])(c01).rotate([0,1],-PI/2);
	var c = STRUCT([c01,c02]);
	c = STRUCT(REPLICA(4)([c,R([0,1])(PI/2)]));
	DRAW(c)
};

var drawDomeSection = function(){
	DRAW(centralDomeSection(1));
};

var drawDomeComplete = function(){
	DRAW(centralDome(1,8));
};

var churchCornerSection = function(){
	DRAW(complete3dCornerSection(1));
};

var completeChurch = function(){
	DRAW(multiLevelChurchPlan(3)(churchPlan(1.25)(.1)));
	DRAW(complete3dChurch(1,4));
};