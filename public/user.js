var socket = io();



// //debounce
// var oneTrade = true; //trade debounce;
// var tradeTime = 1000;// for trade
// var lastTrade = 0;
// var lastButt = 0;
// var debounce = 800;

//- - - - - - - - map
// var slots = []; //nested array?

// var upButt, downButt, leftButt, rightButt; //movement
//- - - - - - - - game over
// var gameOver = false; //if time's up
var buttons = [];
var butt;
var abButt, footButt, handstandButt, pushupButt, squatButt, dabButt, stretchButt;
var cookieButt, waterButt, lemonButt, breathButt;
var flogButt, shockButt, slapButt;
var paintButt, juggleButt, clothingoffButt, clothingonButt;
var stopButt;
var ab = 'ab';
var foot = 'foot';

function setup(){
	//- - - - - overall
	var screenSize = windowHeight - 100;
	var canvas = createCanvas(int(screenSize * .666), screenSize);
 	canvas.parent('myCanvas');
	background(0, 150, 50);
	textAlign(CENTER);
	//
	// for (i = 0; i < buttons.length; i++){
	//
	// }

	// - - - - -  player start screen
	// textSize(30);
	// fill(0);
	//buttons -- can't use for loop to set all this up?
	abButt = createButton('ab workout');
	abButt.parent('myCanvas');
	// abButt.mousePressed(buttPress(ab));
	abButt.mousePressed(abPress);

	footButt = createButton('jump on one foot');
	footButt.parent('myCanvas');
	footButt.mousePressed(footPress);


	//map slots -- 20
	// for (var y = 0; y < 5; y++){
	// 	slots[y] = [];
	// 	for (var x = 0; x < 4; x ++){
	// 		slots[y][x] = {
	// 			x: x * width/5,
	// 			y: y * height/6
	// 		}
	// 	}
	// }

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
background(200,100,0);
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
