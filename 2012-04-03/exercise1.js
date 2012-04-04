var quad = function(x,y,dx,dy){
	return POLYLINE([[x,y],[x,y+dy],[x+dx,y+dy],[x+dx,y],[x,y]]);
};

var grid = function(quad){
	return function(h,w,dh,dw){
		var base_x = REPLICA(w)([quad,T([0])([dw])]);
		var base = STRUCT(base_x);
		var grid = REPLICA(h)([base,T([1])([dh])]);
		return STRUCT(grid);
	}
};

var simpleWall = function(x,y,dx,dy){
	return POLYLINE([[x,y],[x+dx,y+dy]]);
}

var zona1 = grid(quad(0,0,1,1))(2,1,1,1);

var zona2a = grid(quad(1,10,1,1))(7,20,1,1);
var zona2b1 = grid(quad(1,17,1,1))(5,8,1,1);
var zona2b2 = grid(quad(1,22,1,0.2))(1,8,1,1);
var zona2c = grid(quad(1,0,1,1))(1,20,1,1);
var zona2 = STRUCT([zona2a,zona2b1,zona2b2,zona2c]);

var zona3 = grid(quad(21,0,1,1))(17,15,1,1);

var zona4a = grid(quad(36,0,1,1))(1,3,1,1);
var zona4b = grid(quad(36,4,1,1))(13,3,1,1);
var zona4 = STRUCT([zona4a,zona4b]);

var zona5 = grid(quad(39,4,1,1))(13,8,1,1);

var zona6 = grid(quad(47,4,1,1))(1,4,1,1);

var zona7 = grid(quad(51,4,1,1))(2,1,1,1);

var piscina1 = POLYLINE([[1,1],[1,10]]);
var piscina2 = POLYLINE([[47,16],[51,16],[51,5]]);

//gradini larghi 0.3 ripetuti ogni 0.6, migliorare
var tras_gradini = T([0])([0.7]);
var gradino2 = grid(quad(36.35,1,0.35,1))(3,1,1,1);
var gradino1 = grid(quad(36,1,0.35,1.5))(2,1,1.5,1);
var grad_disp = REPLICA(4)([gradino1,tras_gradini]);
var grad_a = STRUCT(grad_disp);
var grad_pari = REPLICA(4)([gradino2,tras_gradini]);
var grad_b = STRUCT(grad_pari);
var scale = STRUCT([grad_a,grad_b]);

COLOR([0,0,0])(scale);

var base = STRUCT([zona1,zona2,zona3,zona4,zona5,zona6,zona7,piscina1,piscina2,scale]);

/*Muri granito*/

var muro1 = quad(7.5,14.98,19,0.17);
var muro2 = quad(37.6,15.98,13.35,0.22);
var muro3 = quad(50.95,16.2,0.25,-11.4);
var muro4 = quad(41.35,4.8,9.6,0.25);
var muroPiscina2 = STRUCT([muro1,muro4,muro3,muro2]);
COLOR([0,0,0])(muroPiscina2);
var muro5 = quad(36.98,11.25,5.52,0.25);
var muro6 = quad(25.18,7.15,8.5,0.25);

var muroA = STRUCT([muroPiscina2,muro5,muro6]);
COLOR([0,0,0])(muroA);
var muroPiscina1a = quad(1,1.01,7.01,-0.21);
var muroPiscina1b = quad(0.8,0.8,0.21,21.6);
var muroPiscina1c = quad(1.01,22.21,7.98,0.19);
var muroPiscina1da = quad(8.99,22.4,0.2,-1.9);
var muroPiscina1db = quad(8.99,18.8,0.2,-2.1);
var muroPiscina1dc = quad(8.99,20.5,0.2,-1.7);
var finestraPiscina1da = simpleWall(8.99,20.5,0.2,-1.7);
var finestraPiscina1db = simpleWall(8.99,18.8,0.2,1.7);

var muroPiscina1 = STRUCT([muroPiscina1a,muroPiscina1b,muroPiscina1c,muroPiscina1da,muroPiscina1db,muroPiscina1dc,finestraPiscina1db,finestraPiscina1da]);

var muriGranito = STRUCT ([muroPiscina1,muroA]);
COLOR([0,0,0])(muriGranito);

/*Muri vetro */

var muroVetro1 = quad(29.95,13.6,10,0.05);
var muroVetro2 = quad(38.75,4.95,0.05,6.3);
var muroVetro3 = quad(42.5,5.05,-0.05,6.2);
var muroVetro4 = quad(29.95,4.95,11.40,0.04);
var muroVetro5 = quad(44.7,6.7,0.05,7.6);
var muroVetro6ext = STRUCT(REPLICA(2)([simpleWall(30.98,7.4,0,6.2),T([0])([1])]));
var muroVetro6intInf = STRUCT(REPLICA(3)([simpleWall(31.1,7.6,0,2.8),T([0])([0.4])]));
var muroVetro6intSup = STRUCT(REPLICA(2)([muroVetro6intInf,T([1])([3.2])]));
var muroVetro6 = STRUCT([muroVetro6ext,muroVetro6intInf,muroVetro6intSup]);
var portaVetro1a = POLYLINE([[39.95,13.62],[39.95,13.8],[39,13.8]]);
var portaVetro1b = POLYLINE([[39,15.8],[39.95,15.8],[39.95,16]]);
var portaVetro1 = STRUCT([portaVetro1a,portaVetro1b]); 

var portaVetro2a = POLYLINE([[29.98,4.95],[29.98,5.1],[30.98,5.1]]);
var portaVetro2b = POLYLINE([[30.98,7.05],[29.98,7.05],[29.98,7.15]]);
var portaVetro2 = STRUCT([portaVetro2a,portaVetro2b]);

var muriVetro = STRUCT([muroVetro3,muroVetro2,muroVetro4,muroVetro1,muroVetro5,muroVetro6,portaVetro1,portaVetro2]);
COLOR([0.1,0.1,0.1])(muriVetro);

/*Panche*/

var panca1sx = quad(7.9,14.1,2.4,0.7);
var panca1dx = T([0])([12.9])(panca1sx);
var panca1centrale = grid(quad(10.3,14.1,2.1,0.7))(1,5,1,2.1);
var panca1 = STRUCT([panca1sx,panca1dx,panca1centrale]);
COLOR([0,0,0])(panca1);

/*Bagni*/

var muroBagno1a = quad(4.98,16.99,0.04,2);
var muroBagno1b = quad(4.98,20,0.04,2.21);
var portaBagno1 = simpleWall(4.98,20,Math.cos(PI/4),-Math.sin(PI/4));
var bagno1 = STRUCT([muroBagno1a,muroBagno1b,portaBagno1]);

var muroBagno2a = quad(5.01,20.8,0.9,0.02);
var muroBagno2b = quad(6.7,20.8,2.29,0.02);
var portaBagno2 = simpleWall(6.7,20.8,-Math.cos(PI/4),Math.sin(PI/4));
var bagno2 = STRUCT([muroBagno2a,muroBagno2b,portaBagno2]);

var muroBagno3a = quad(6.99,22,0.02,0.21);
var muroBagno3b = quad(6.99,20.8,0.02,0.3);
var portaBagno3 = simpleWall(6.99,21.1,1,0);
var bagno3 = STRUCT([muroBagno3a,muroBagno3b,portaBagno3]);

var muroBagno4a = quad(1,16.99,6,0.01);
var muroBagno4b = quad(8,16.99,1,0.01);
var portaBagno4 = simpleWall(8,16.99,-Math.cos(PI/4),Math.sin(PI/4));
var bagno4 = STRUCT([muroBagno4a,muroBagno4b,portaBagno4]);

var muroBagno5 = quad(8.99,20.5,0.01,-1.7);

var bagno = STRUCT([bagno1,bagno2,bagno3,bagno4,muroBagno5]);
COLOR([0,0,0])(bagno);

/* crossPillar*/

var crossPillar_h = quad(-0.075,-0.02,0.15,0.04);
var crossPillar_v = quad(-0.02,-0.075,0.04,0.15);
var crossPillar = STRUCT([crossPillar_v,crossPillar_h]);
var tCrossPillar = T([0,1])([26,7])(crossPillar);
var rCrossPillar = STRUCT(REPLICA(4)([tCrossPillar,T([0])([(6+1/3)])]));

var gridCrossPillar = STRUCT(REPLICA(2)([rCrossPillar,T([1])([7])]));

/* Roof */
var roof1 = grid(0.3,13.3,3.1,9.6,9.6,0.1);
/*Plan */

var plan = STRUCT([base,muriVetro,panca1,portaVetro1,portaVetro2,muroA,muriGranito,bagno,gridCrossPillar]);
DRAW(plan);
