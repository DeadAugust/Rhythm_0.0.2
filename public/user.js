var socket = io();



// //debounce
// var oneTrade = true; //trade debounce;
// var tradeTime = 1000;// for trade
// var lastTrade = 0;
// var lastButt = 0;
// var debounce = 800;

var buttons = [];
var butt;
var abButt, footButt, handstandButt, pushupButt, squatButt, dabButt, stretchButt;
var cookieButt, waterButt, lemonButt, breathButt, jalapenoButt;
var flogButt, shockButt, slapButt;
var paintButt, juggleButt, clothingoffButt, clothingonButt;
var stopButt;
// var ab = 'ab';
// var foot = 'foot';
//category colors
var musclesCol, mouthCol, skinCol, handsCol;

function setup(){
	noCanvas();
	//- - - - - overall
	// var screenSize = windowHeight - 100;
	// var canvas = createCanvas(int(screenSize * .666), screenSize);
 	// canvas.parent('myCanvas');
	// background(0, 150, 50);
	// textAlign(CENTER);

	//category colors
	musclesCol = color(46, 184, 46, 200); //green
	mouthCol = color(255, 117, 26, 200); //orange
	skinCol = color(77, 166, 255, 200); //blue
	handsCol = color(255, 102, 204, 200); //pink

	//- - - - - - muscles
	abButt = createButton('Ab Ripper X');
	abButt.style('background-color', musclesCol);
	abButt.mousePressed(function(){
		socket.emit('buttPress', 'ab');
	});

	// footButt = createButton('jump on one foot');
	// footButt.style('background-color', musclesCol);
	// footButt.mousePressed(function(){
	// 	socket.emit('buttPress', 'foot');
	// });

	handstandButt = createButton('invert body');
	handstandButt.style('background-color', musclesCol);
	handstandButt.mousePressed(function(){
		socket.emit('buttPress', 'handstand');
	});

	pushupButt = createButton('push the earth away');
	pushupButt.style('background-color', musclesCol);
	pushupButt.mousePressed(function(){
		socket.emit('buttPress', 'pushup');
	});

	squatButt = createButton('accrue thigh mass');
 	squatButt.style('background-color', musclesCol);
 	squatButt.mousePressed(function(){
 		socket.emit('buttPress', 'squat');
 	});


	dabButt = createButton('#dab');
 	dabButt.style('background-color', musclesCol);
 	dabButt.mousePressed(function(){
 		socket.emit('buttPress', 'dab');
 	});

	stretchButt = createButton('stretch, for your health');
	stretchButt.style('background-color', musclesCol);
	stretchButt.mousePressed(function(){
		socket.emit('buttPress', 'stretch');
	});

	//- - - - - - - mouth
	cookieButt = createButton('nom on a cookie');
	cookieButt.style('background-color', mouthCol);
	cookieButt.mousePressed(function(){
		socket.emit('buttPress', 'cookie');
	});


	waterButt = createButton('slurp some water');
	waterButt.style('background-color', mouthCol);
	waterButt.mousePressed(function(){
		socket.emit('buttPress', 'water');
	});


	lemonButt = createButton('suckle a lemon');
	lemonButt.style('background-color', mouthCol);
	lemonButt.mousePressed(function(){
		socket.emit('buttPress', 'lemon');
	});

	breathButt = createButton('find a deep breath');
	breathButt.style('background-color', mouthCol);
	breathButt.mousePressed(function(){
		socket.emit('buttPress', 'breath');
	});

	jalapenoButt = createButton('chomp on a jalapeno');
	jalapenoButt.style('background-color', mouthCol);
	jalapenoButt.mousePressed(function(){
		socket.emit('buttPress', 'jalapeno');
	});

	//- - - - - - - skin
	flogButt = createButton('mea flogga'); //too obtuse?
	flogButt.style('background-color', skinCol);
	flogButt.mousePressed(function(){
		socket.emit('buttPress', 'flog');
	});

	shockButt = createButton('Shock face');
	shockButt.style('background-color', skinCol);
	shockButt.mousePressed(function(){
		socket.emit('buttPress', 'shock');
	});

	slapButt = createButton('slap yourself');
	slapButt.style('background-color', skinCol);
	slapButt.mousePressed(function(){
		socket.emit('buttPress', 'slap');
	});

	//- - - - - - - hands

	paintButt = createButton('paint yourself');
	paintButt.style('background-color', handsCol);
	paintButt.mousePressed(function(){
		socket.emit('buttPress', 'paint');
	});

	juggleButt = createButton('juggle dildos');
	juggleButt.style('background-color', handsCol);
	juggleButt.mousePressed(function(){
		socket.emit('buttPress', 'juggle');
	});


	clothingoffButt = createButton('take OFF article of clothing');
	clothingoffButt.style('background-color', handsCol);
	clothingoffButt.mousePressed(function(){
		socket.emit('buttPress', 'clothes OFF');
	});

	clothingonButt = createButton('put ON article of clothing');
	clothingonButt.style('background-color', handsCol);
	clothingonButt.mousePressed(function(){
		socket.emit('buttPress', 'clothes ON');
	});

	// - - - - - heartbeat
	socket.on('heartbeat',
		function(data){
			// atmans = data.atmans;
			// mapTiles = data.mapTiles;
			// freeFud = data.freeFud;
		}
	);
}

function draw() {
// background(200,100,0);
		// var data = {
		// 	x: atman.x,
		// 	y: atman.y,
		// 	t: tato,
		// 	m: mork,
		// 	u: upple,
		// 	tile: atman.tile
		// };
		// socket.emit('update', data);
		socket.on('gameOverC',
			function(){
				// gameOver = true;
			}
		);
}

function abPress(){
	socket.emit('buttPress', 'ab')
}
function footPress(){
	socket.emit('buttPress', 'foot')
}

function buttPress(butt){
	socket.emit('buttPress', butt);
	// 	function(){
	// 		var data = butt;
	// 	}
	// );
}
