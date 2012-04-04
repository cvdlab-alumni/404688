/*
var mattonella = function(x,y,z,dx,dy,dz){
	var tx = x || 0;
	var ty = y || 0;
	var tz = z || 0;
	var dw = dx || 1;
	var dh = dy || 1;
	var dp = dz || 0.1;
	//console.log(tx + ' ' + ty + ' ' + tz + ' ' + dw + ' ' + dh + ' ' + dp);

	var load_x = dw-0.02;
	var load_y = dh-0.02;

	var border_x = (dw-load_x)/2;
	var border_y = (dh-load_y)/2;
	//console.log(load_x + ' ' + load_y + ' ' + border_x + ' ' + border_y);
	var mattonella_load = STRUCT([SIMPLEX_GRID([[-border_x,load_x,-border_x],[-border_x,load_x,-border_x],[dp]])]);
	//console.log('1');
	var mattonella_bord = STRUCT([SIMPLEX_GRID([[dh],[border_x,-load_x,border_x],[dp]]),SIMPLEX_GRID([[border_y,-load_y,border_y],[dw],[dp]])]);
	//console.log('2');
	COLOR([0,0,0])(mattonella_bord);
	//console.log('3');
	var mattonella = STRUCT([mattonella_bord,mattonella_load]);
	//console.log('4');
	return	T([0,1,2])([tx,ty,tz])(mattonella);
}

var grid_mattonella = function(mattonella){
	return function(h,w,dh,dw){
		var base_x = REPLICA(w)([mattonella,T([0])([dw])]);
		var base = STRUCT(base_x);
		var grid = REPLICA(h)([base,T([1])([dh])]);
		return STRUCT(grid);
	}
};

*/

var grid = function(x,y,z,dy,dx,dz){
	var tx = x || 0;
	var ty = y || 0;
	var tz = z || 0;
	var dw = dx || 1;
	var dh = dy || 1;
	var dp = dz || 0.1;

	var mygrid = STRUCT([SIMPLEX_GRID([[dw],[dh],[dp]])]);
	
	return	T([0,1,2])([tx,ty,tz])(mygrid);
}

/* Plan */
var zona1 = grid(0,0,0,2,1);
var zona2a = grid(1,10,0,7,20);
var zona2b1 = grid(1,17,0,5,8);
var zona2b2 = grid(1,22,0,0.4,8);
var zona2c = grid(1,0,0,1,20);
var zona2 = STRUCT([zona2a,zona2b1,zona2b2,zona2c]);
var zona3 = grid(21,0,0,17,15);
var zona4a = grid(36,0,0,1,3);
var zona4b = grid(36,4,0,13,3);
var zona4 = STRUCT([zona4a,zona4b]);
var zona5 = grid(39,4,0,13,8);
var zona6 = grid(47,4,0,1,4);
var zona7 = grid(51,4,0,2,1);
var plan = STRUCT([zona1,zona2,zona3,zona4,zona5,zona6,zona7]);
COLOR([0.835,0.785,0.735])(plan);
/* Piscine */
var piscina1 = grid(1,1,-0.1,9,20);
var piscina2 = grid(47,5,-0.1,11,4);
var piscine = STRUCT([piscina2,piscina1]);
COLOR([0.65,0.9,0.93])(piscine);

var statua = grid(48.5,14.5,0,1,1);

/* Muri piscina 1*/

var muro1Piscina1 = grid(1,0.8,0.1,0.2,7,3);
var muro2Piscina1 = grid(0.8,0.8,0,21.6,0.2,3.1);
var muro3Piscina1 = grid(1,22.2,0.1,0.2,8,3);
var muro4aPiscina1 = grid(9,16.7,0.1,5.7,0.2,1);
var muro4bPiscina1 = grid(9,16.7,1.1,5.7,0.2,1);
var muro4cPiscina1 = grid(9,16.7,2.1,2.1,0.2,0.5);
var muro4dPiscina1 = grid(9,20.5,2.1,1.9,0.2,0.5);
var muro4ePiscina = grid(9,16.7,2.6,5.7,0.2,0.5);
var muro4Piscina1 = STRUCT([muro4dPiscina1,muro4cPiscina1,muro4bPiscina1,muro4aPiscina1,muro4ePiscina]);
var muriPiscina1 = STRUCT([muro1Piscina1,muro2Piscina1,muro3Piscina1,muro4Piscina1]);
COLOR([0.9,0.82,0.75])(muriPiscina1);
/* Muri piscina2*/

var muro1Pscina2 = grid((41+1/3),4.8,0.1,0.2,(9+2/3),3);
var muro2Piscina2 = grid(51,4.8,0,11.4,0.2,3.1);
var muro3Piscina2 = grid((37+2/3),16,0,0.2,(13+1/3),3.1);

var muriPiscina2 = STRUCT([muro1Pscina2,muro2Piscina2,muro3Piscina2]);
COLOR([0.9,0.82,0.75])(muriPiscina2);

/*Muro panca*/
var muroPanca = grid(7.5,15,0.1,0.2,19,3);
COLOR([0.835,0.785,0.735])(muroPanca);

/*Muro ingresso */

var muroIngresso = grid(25.2,7.2,0.1,0.2,8.5,3);
COLOR([0.075,0.075,0.33])(muroIngresso);
var muroInterno = grid(37,11.3,0.1,0.2,5.5,3);
COLOR([1,0.55,0.55])(muroInterno)

/* Interni bagno*/

var muro1aBagno = grid(4.95,17,0.1,2,0.1,2);
var muro1bBagno = grid(4.95,20,0.1,2.4,0.1,2);
var muro1cBagno = grid(4.95,17,2.1,5.4,0.1,1);
var muro1Bagno = STRUCT([muro1aBagno,muro1bBagno,muro1cBagno]);


var muro2aBagno = grid(5,20.7,0.1,0.1,0.9,2);
var muro2bBagno = grid(6.9,20.7,0.1,0.1,2.1,2);
var muro2cBagno = grid(5,20.7,2.1,0.1,4,1);
var muro2Bagno = STRUCT([muro2aBagno,muro2bBagno,muro2cBagno]);

var muro3aBagno = grid(6.95,20.7,0.1,0.4,0.1,2);
var muro3bBagno = grid(6.95,22.1,0.1,0.3,0.1,2);
var muro3cBagno = grid(6.95,20.7,2.1,1.7,0.1,1);
var muro3Bagno = STRUCT([muro3cBagno,muro3bBagno,muro3aBagno]);

var muriBagno = STRUCT([muro1Bagno,muro2Bagno,muro3Bagno]);
COLOR([0.86,0.73,0.57])(muriBagno)
/* Panca */
var panca1sx = grid(7.9,14.1,0.4,0.7,2.4,0.1);
var panca1dx = T([0])([12.9])(panca1sx);
var panca1centrale = grid(10.3,14.1,0.4,0.7,10.5,0.1);

var gambaPanca = grid(7.95,14.2,0.1,0.5,0.5,0.3);
var gambePancaR = REPLICA(8)([gambaPanca,T([0])([2.1])]);
var gambePanca = STRUCT(REPLICA(8)([gambaPanca,T([0])([2.1])]));

var panca1 = STRUCT([panca1sx,panca1dx,panca1centrale,gambePanca]);
COLOR([0.9,0.82,0.75])(panca1);

/* Scale */
var tras_gradini = T([0,2])([0.7,-0.25]);
var gradino2 = STRUCT(REPLICA(3)([grid(36.35,1,-0.15,1,0.35,0.125),T([1])([1])]));
var gradino1 = STRUCT(REPLICA(2)([grid(36,1,-0.025,1.5,0.35,0.125),T([1])([1.5])]));
var grad_disp = REPLICA(4)([gradino1,tras_gradini]);
var grad_a = STRUCT(grad_disp);
var grad_pari = REPLICA(4)([gradino2,tras_gradini]);
var grad_b = STRUCT(grad_pari);
var scale = STRUCT([grad_a,grad_b]);
COLOR([0.835,0.785,0.735])(scale);

/* Tile finestre */

var tileVetro1Vbord = SIMPLEX_GRID([[0.025,-0.995,0.025],[0.1],[3]]);
var tileVetro1Hbord = SIMPLEX_GRID([[-0.025,0.995,-0.025],[0.1],[0.2,-2.7,0.1]]);
var tileVetro1base = STRUCT([tileVetro1Hbord,tileVetro1Vbord]);
var tileVetro1 = T([0,1])([30,13.6])(tileVetro1base);
var muroVetro1 = STRUCT(REPLICA(10)([tileVetro1,T([0])([1])]));
var tileVetroBagno = T([0,1])([1,17])(tileVetro1base);
var muroVetroBagno = STRUCT(REPLICA(8)([tileVetroBagno,T([0])([1])]));

var tileVetro2Vbord = SIMPLEX_GRID([[0.1],[0.025,-0.895,0.025],[3]]);
var tileVetro2Hbord = SIMPLEX_GRID([[0.1],[-0.025,0.895,-0.025],[0.2,-2.7,0.1]]);
var tileVetro2base = STRUCT([tileVetro2Hbord,tileVetro2Vbord]);
var tileVetro2 = T([0,1])([(45-1/3),6.8])(tileVetro2base);
var muroVetro2 = STRUCT(REPLICA(8)([tileVetro2,T([1])([0.9])]));

var tileVetro3Vbord = SIMPLEX_GRID([[0.025,-3.795,0.025],[0.1],[3]]);
var tileVetro3Hbord = SIMPLEX_GRID([[-0.025,3.795,-0.025],[0.1],[0.2,-2.7,0.1]]);
var tileVetro3base = STRUCT([tileVetro3Hbord,tileVetro3Vbord]);
var tileVetro3 = T([0,1])([29.9,4.9])(tileVetro3base);
var muroVetro3 = STRUCT(REPLICA(3)([tileVetro3,T([0])([3.8])]));

var tileVetro4Vbord = SIMPLEX_GRID([[0.1],[0.025,-3.09,0.075],[3]]);
var tileVetro4Hbord = SIMPLEX_GRID([[0.1],[-0.025,3.09,-0.075],[0.2,-2.7,0.1]]);
var tileVetro4base = STRUCT([tileVetro4Hbord,tileVetro4Vbord]);
var tileVetro4 = T([0,1])([31,7.4])(tileVetro4base);
var muroVetro4a = STRUCT(REPLICA(2)([tileVetro4,T([1])([3.1])]));
var muroVetro4 = STRUCT(REPLICA(2)([muroVetro4a,T([0])([1])]));
var muriVetro = STRUCT([muroVetro3,muroVetro1,muroVetro2,muroVetroBagno,muroVetro4]);
COLOR([0.3,0.3,0.3])(muriVetro);

/*cross pillars*/

var crossPillarX = grid(-0.2,-0.1,0.1,0.2,0.4,3);
var crossPillarY = grid(-0.1,-0.2,0.1,0.4,0.2,3);
var crossPillar = STRUCT([crossPillarY,crossPillarX]);
var tCrossPillar = T([0,1])([26,7])(crossPillar);
var rCrossPillar = STRUCT(REPLICA(4)([tCrossPillar,T([0])([(6+1/3)])]));

var gridCrossPillar = STRUCT(REPLICA(2)([rCrossPillar,T([1])([7])]));

/* Roof */
var roof1 = grid(0.3,13.3,3.1,9.6,9.6,0.1);
var roof2 = grid(24,4,3.1,13,23,0.1);
var roofs = STRUCT([roof1,roof2]);
COLOR([0.9,0.94,0.75])(roofs);

/* Forniture */
var braccioli = STRUCT(REPLICA(2)([grid(0.1,0,0.1,0.2,1,1),T([1])([1])]));
var sedile = grid(0.1,0.2,0.1,1,1,0.5);
var schienale = grid(0,0,0.1,1.2,0.1,1.5);
var poltrona = STRUCT([braccioli,sedile,schienale]);
COLOR([0.86,0.80,0.69])(poltrona);
var poltrone = STRUCT(REPLICA(2)([poltrona,T([1])([3.5])]));
var poltroneIngresso = T([0,1])([32.5,8])(poltrone);

var poltroneInterne = T([0,1])([42,8.5])(R([2])([-PI])(poltrona));

var base = STRUCT([plan,piscine,statua,muriPiscina1,muriPiscina2,
					muroPanca,muroInterno,muroIngresso,muriBagno,
					panca1,scale,muriVetro,roofs,gridCrossPillar,poltroneInterne,poltroneIngresso]);

DRAW(base);