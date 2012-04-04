/* Definire 3 domini rispettivamente in 1D,2D,3D */

var domain1d = DOMAIN([[1,2]])([4]);
var domain2d = DOMAIN([[3,4],[1,5]])([4,4]);
var domain3d = DOMAIN([[5,6],[1,5],[1,5]])([4,4,4]);


/*Definire un dominio [0,10] e applicare una funzione che alzi il segmento (la coordinata y aumenta di 1)*/
var domainmap = DOMAIN([[0,10]])([10]);

var mapping = function(p){
	var u = p[0];

	return [u, 1];
};

var mapped = MAP(mapping)(domainmap);

/* Scrivere una funzione che trasformi i punti del dominio in una bisettrice */
var bisettrice = function(p){
	var u = p[0];

	return [u,u];
};

var mapped2 = MAP(bisettrice)(domainmap);

/* Scrivere una funzione che trasformi i punti del dominio in un sin */
var domainPI = DOMAIN([[0,2*PI]])([20])

var sin = function(p){
	var u = p[0];

	return [u,Math.sin(u)];
};

var mapped3 = MAP(sin)(domainPI);


/* Scrivere una funzione che disegni un cerchio prendendo come input il raggio r e il numero n di intervalli in cui suddividere il dominio */

var drawCircle = function(r,n){
	var domainCircle= DOMAIN([[0,2*PI]])([n]);
	var circ = MAP(function(p){
		var u = p[0];

		return [r*Math.cos(u)sin(u-(PI/2)),r*Math.sin(u)*cos(u-(PI/2))];
	})(domainCircle);
	DRAW(circ);
};

/* 
	Scrivere una funzione che disegni un piano cilindrico prendendo come input il raggio r, l'altezza h, 
	i numeri n ed m di intervalli in cui suddividere i domini di partenza, e un array di colori [r,g,b]
*/

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

/* 
	Scrivere una funzione che disegni una sfera prendendo come input il raggio r,il numero n di intervalli 
	in cui suddividere il dominio e un array di colori [r,g,b]
*/

var drawSphere = function(r,n,color){
	var sphereDomain = DOMAIN([[0,PI],[0,2*PI]])([n,n]);
	var sphere = MAP(function(p){
		var u = p[0]-PI/2;
		var v = p[1]-PI;
		return [r*Math.cos(u)*Math.sin(v),r*Math.cos(u)*Math.cos(v),r*Math.sin(u)];
	})(sphereDomain);
	COLOR(color)(sphere);
    DRAW(sphere);

};