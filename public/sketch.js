var socket = io();

var atman;
var atmans = [];
var mapTiles = [];
var freeFud = [];

// var bgColor;
//- - - - - player setup
var input, submit, redSlide, greenSlide, blueSlide, colorChoose, startButt;
var name = ' ';
var redCol = 0;
var greenCol = 0;
var blueCol = 0;
var shapeYes = true; //no shapes yet
var colorYes = false; //if selected color
var nameYes = false; //if input name
var joined = false; //if they've left character creation
var tutorial = false; //if they did the tutorial
var gameSetup = false; //game setup after player creation UGH "setup"

//- - - - -  trading
var tradeTarget = ' '; // player selected
var tradeId; //player's id
var tradeFud = ' '; // item selected
// var tradeCan = false; //if both above are true, can trade
var tradeButt; //trade button
var tradeMsg = false; //for msg overlay
var lastTrader; //person last traded with
var tatos, morks, upples; //fud buttons
//fud item containers
var tato = 0;
var mork = 0;
var upple= 0;
//trade quantity
var tato4u = 0;
var mork4u = 0;
var upple4u = 0;
//debounce
var oneTrade = true; //trade debounce;
var tradeTime = 1000;// for trade
var lastTrade = 0;
var lastButt = 0;
var debounce = 800;

var tatoCol;
var morkCol;
var uppleCol;

var triScale = 20; //fud triangle scaling

//- - - - - - - - map
// var slots = []; //nested array?

var upButt, downButt, leftButt, rightButt; //movement
//- - - - - - - - game over
var gameOver = false; //if time's up

function setup(){
	//- - - - - overall
	var screenSize = windowHeight - 100;
	var canvas = createCanvas(int(screenSize * .666), screenSize);
 	canvas.parent('myCanvas');
	background(0, 150, 50);
	textAlign(CENTER);

	// - - - - -  player start screen
	textSize(30);
	fill(0);
	text('Choose Your Color', width/2, height/12);
	redSlide = createSlider(0,255,40);
	redSlide.position(width/3, 3 * height/7 - height/20);
	greenSlide = createSlider(0,255,255);
	greenSlide.position(width/3, 3 * height/7);
	blueSlide = createSlider(0,255,188);
	blueSlide.position(width/3, 3 * height/7 + height/20);
	colorChoose = createButton('I want to be this color!');
	colorChoose.parent('myCanvas'); //need?
	colorChoose.position(width/3, 4 * height/7);
	colorChoose.mousePressed(colorPush);
	text('Enter Your Name', width/2, 8 * height/12);
	input = createInput('type name here');
	input.parent('myCanvas');
	input.position(width/4, 5 * height / 7);
	submit = createButton('submit name');
	submit.parent('myCanvas');
	submit.position(3* width/4, 5 * height / 7);
	submit.mousePressed(playerName);
	upButt = createButton('up');
	upButt.parent('myCanvas');
	upButt.hide(); //create so not undefined in function later
	downButt = createButton('down');
	downButt.parent('myCanvas');
	downButt.hide();
	leftButt = createButton('left');
	leftButt.parent('myCanvas');
	leftButt.hide();
	rightButt = createButton('right');
	rightButt.parent('myCanvas');
	rightButt.hide();

	var tatoCol = color(255,253,0,50);
	var morkCol = color(0,51,153,50);
	var uppleCol = color(179,0,89,50);

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
			atmans = data.atmans;
			mapTiles = data.mapTiles;
			// freeFud = data.freeFud;
		}
	);
}

function draw() {
	if (!joined){ //- - - - - - during setup
		if (shapeYes && colorYes && nameYes){
			if (!startButt){
				hideDom();
				startButt = createButton('START');
				startButt.parent('myCanvas');
				startButt.position(width/3, height/3);
			}
			background(155);
			fill(0);
			textSize(24);
			text('click START to join game', width/2, height/4);
			startButt.mousePressed(newPlayer);
		}
		else{
			fill(redSlide.value(), greenSlide.value(), blueSlide.value());
			ellipse(width/2, height/5, height/6, height/6);
			text(name, width/2, height/4 + 80);
			textSize(20);
			fill(redSlide.value(), 0, 0);
			text('red', width/4, 3 * height/7 - height/20);
			fill(0, greenSlide.value(), 0);
			text('green', width/4, 3 * height/7);
			fill(0, 0, blueSlide.value());
			text('blue', width/4, 3 * height/7 + height/20);
		}
	}
	else if (!gameSetup){
		if (!tutorial){
			startingFud = int(random(3));
			if (startingFud == 0){
				tato++;
			}
			else if (startingFud == 1){
				mork++;
			}
			else{
				upple++;
			}
		}
		//color not working yet, save til later
		tatos = createButton('tatos: ' + tato);
		tatos.style('background-color', tatoCol);
		tatos.mousePressed(tradeTato);
		morks = createButton('morks: ' + mork);
		morks.style('background-color', morkCol);
		morks.mousePressed(tradeMork);
		upples = createButton('upples:' + upple);
		upples.style('background-color', uppleCol);
		upples.mousePressed(tradeUpple);
		gameSetup = true;
		moveButtons();
	}
	else if(gameOver){
		background(100, 0, 40);
		textSize(40);
		fill(0);
		text('times up!', width/2, height/2);
	}
	else{ //- - - - - after setup, main game
		// background(0, 150, 50); //where can I put this?
		background(mapTiles[atman.tile].r,mapTiles[atman.tile].g,mapTiles[atman.tile].b)
		if (tradeMsg){
			stroke(255);
			strokeWeight(2);
			textSize(24);
			fill(0);
			text("You traded with " + lastTrader, width/2, height/2);
		}
		console.log(tradeMsg);
		//update map
		for (var i = atmans.length - 1; i >= 0; i--){
			var id = atmans[i].id;
			if ((id !== socket.id)&&(atman.tile == atmans[i].tile)){
				noStroke();
				fill(atmans[i].r, atmans[i].g, atmans[i].b);
				ellipse(atmans[i].x, atmans[i].y, 30, 30);
				if(atmans[i].id == tradeId){
					stroke(255,255,0);
					strokeWeight(6);
					ellipse(atmans[i].x, atmans[i].y, 40, 40);
				}
				noStroke();
				fill(0);
				textSize(18);
				text(atmans[i].name, atmans[i].x, atmans[i].y + 40);
			}
		}
		atman.show();
		meName();
		// textSize(18);
		// if (((atman.r + atman.g + atman.b) / 3) < 100){
		// 	fill(255);
		// }
		// else {
		// 	fill(0);
		// }
		// noStroke();
		// text('me', atman.x, atman.y + 5);

		//fud pick up and map display
		console.log(freeFud);
		for(var i = freeFud.length -1; i >= 0; i--){
			if(freeFud[i].tile == atman.tile){
				// freeFud[i].show();
				noStroke();
				fill(freeFud[i].r, freeFud[i].g, freeFud[i].b);
				ellipse(30,30,30,30);
				triangle(freeFud[i].cX, freeFud[i].cY + triScale,
					freeFud[i].cX - triScale, freeFud[i].cY - triScale/2,
					freeFud[i].cX + triScale, freeFud[i].cY - triScale/2);
			}
		}

		var data = {
			x: atman.x,
			y: atman.y,
			t: tato,
			m: mork,
			u: upple,
			tile: atman.tile
		};
		socket.emit('update', data);

		if (tradeTarget !== ' ' && tradeFud !== ' '){
			if (oneTrade){
				tradeButt = createButton('Trade ' + tradeTarget + " a" + tradeFud);
				tradeButt.mousePressed(trade);
				oneTrade = false;
			}
		}

		socket.on('fudCheck',
			function(data){
				freeFud = data;
			}
		);

		socket.on('trade',
			function(data){
				tradeTime = millis();
				if(tradeTime - lastTrade >= debounce){
					tato += data.idTato;
					mork += data.idMork;
					upple += data.idUpple;
					console.log('trade from ' + data.nameFrom);
					stroke(0, 200);
					strokeWeight(2);
					fill(255, 200);
					textSize(22);
					if (data.idTato == 1){ //make individual functions, toggle, loop text
						text(data.nameFrom + " sent you a Tato", width/2, height/2);
					}
					else if (data.idMork == 1){
						text(data.nameFrom + " sent you some Mork", width/2, height/2);
					}
					else{
						text(data.nameFrom + " sent you an upple", width/2, height/2);
					}
					buttonRefresh();
					lastTrade = tradeTime;
					tradeMsg = true;
					lastTrader = data.nameFrom;
				}
			}
		);

		socket.on('gameOverC',
			function(){
				gameOver = true;
			}
		);
	}
}

//alphabetize functions? where do socket functions go?

function mousePressed(){
	// console.log(slots);
	for (var i = atmans.length - 1; i >=0; i--){
		if((mouseX >= atmans[i].x - 20) && (mouseX <= atmans[i].x + 20)
			&& (mouseY >= atmans[i].y - 20) && (mouseY <= atmans[i].y + 20)){
					tradeMsg = false;
					if (atmans[i].id !== socket.id){
						tradeTarget = atmans[i].name;
						tradeId = atmans[i].id;
						if(!oneTrade){
							tradeButt.remove();
						}
						oneTrade = true;
						// console.log(tradeId);
					}
		}
	}
}

function mouseDragged(){
//need to toggle so only during game, not setup?
	for (var i = atmans.length -1; i >= 0; i--){ //could be fun if they're repelling away from items
		if (socket.id !== atmans[i].id){
			if ((dist(mouseX, mouseY, atmans[i].x, atmans[i].y) > 100)
				&& (mouseX >= 50 && mouseX <= width-50)
				&& (mouseY >= 50 && mouseY <= height-50)){ //why isn't this working anymore?
				atman.x = mouseX;
				atman.y = mouseY;
				atman.show();
			}
		}
	}
	for(var i = freeFud.length -1; i >= 0; i--){
			atman.x = mouseX;
			atman.y = mouseY;
			atman.show();
		if(freeFud[i].tile == atman.tile){
			if((dist(mouseX, mouseY, freeFud[i].cX, freeFud[i].cY)) < 10){
				tato += freeFud[i].t;
				mork += freeFud[i].m;
				upple += freeFud[i].u;
				freeFud.splice(i, 1);
				socket.emit('eat', freeFud);
				buttonRefresh();
			}
		}
	}
}

function Fud(tile, cX, cY, r, g, b, t, m, u){
  this.tile = tile;
	this.cX = cX;
	this.cY = cy;
  this.r = r;
  this.g = g;
  this.b = b;
  this.t = t;
  this.m = m;
  this.u = u;

  this.show = function(){
		// noStroke();
		// fill(this.r, this.g, this.b);
		// ellipse(30,30,30,30);
		// triangle(this.cX, this.cY + triScale,
		// 	this.cX - triScale, this.cY - triScale/2,
		// 	this.cX + triScale, this.cY - triScale/2);
  }
}

function Atman(id, x, y, name, r, g, b, tile){
  this.id = id;
	this.x = x;
  this.y = y;
	this.name = name;
	this.r = r;
	this.g = g;
	this.b = b;
	this.tile = tile;

  this.show = function(){
		// if (this.select){
		// 	stroke(255,255,0);
		// 	strokeWeight(6);
		// }
		// else{
		// 	stroke(0);
		// 	strokeWeight(3);
		// }
		noStroke();
    fill(this.r, this.g, this.b);
    ellipse(this.x, this.y, 40, 40);
  }
}

function playerName(){ //for faster debugging remove
	if (name !== 'me' && name !== 'Me' && name !== 'type name here'
		&& name !== 'please type a different name'){
		name = input.value();
		nameYes = true;
	}
	else{
		input.value('please type a different name');
	}
}

function meName(){
	textSize(18);
	if (((atman.r + atman.g + atman.b) / 3) < 100){
		fill(255);
	}
	else {
		fill(0);
	}
	noStroke();
	text('me', atman.x, atman.y + 5);
}
function colorPush(){
	redCol = redSlide.value();
	greenCol = greenSlide.value();
	blueCol = blueSlide.value();
	colorYes = true;
	fill(redCol, greenCol, blueCol);
	text('Nice Color!', 5* width/6, 4 * height/7);
}

function hideDom(){ //all but start
	input.hide();
	submit.hide();
	redSlide.hide();
	greenSlide.hide();
	blueSlide.hide();
	colorChoose.hide();
}

function newPlayer(){
	atman = new Atman (socket.id, random(60, width - 60), random(60, height-60),
	 name, redCol, greenCol, blueCol, int(random(9)));
	// var data = {
	// 	id: atman.id,
	// 	x: atman.x,
	// 	y: atman.y,
	// 	name: atman.name,
	// 	r: redCol,
	// 	g: greenCol,
	// 	b: blueCol,
	// 	tile: atman.tile
	// };
	//could have just emit atman huh....
	socket.emit('start', atman);
	console.log(atman);
	joined = true;
	startButt.hide();
}


function moveButtons(){
	// var buttTime = millis();
	// if(buttTime - lastButt >= debounce){ //mobile mouse jumpy fix?
		upButt.remove();
		downButt.remove();
		leftButt.remove();
		rightButt.remove();
		var tile = atman.tile;
		//up
		if(tile - 3 >= 0){
			upButt = createButton('up');
			upButt.parent('myCanvas');
			upButt.position(width/2, height/20);
			upButt.mousePressed(moveUp);
		}
		//down
		if(tile + 3 <= 8){
			downButt = createButton('down');
			downButt.parent('myCanvas');
			downButt.position(width/2, height - height/20);
			downButt.mousePressed(moveDown);
		}
		//left
		if((tile - 1 >= 0)&&(tile != 3)&&(tile != 6)){
			leftButt = createButton('left');
			leftButt.parent('myCanvas');
			leftButt.position(width/20, height/2);
			leftButt.mousePressed(moveLeft);
		}
		//right
		if((tile + 1 <= 8)&&(tile != 2)&&(tile != 5)){
			rightButt = createButton('right');
			rightButt.parent('myCanvas');
			rightButt.position(width - width/20, height/2);
			rightButt.mousePressed(moveRight);
		}
		// lastButt = millis();
	// }
}

function moveUp(){
	atman.tile -= 3;
	moveButtons();
}
function moveDown(){
	atman.tile += 3;
	moveButtons();
}
function moveLeft(){
	atman.tile -= 1;
	moveButtons();
}
function moveRight(){
	atman.tile += 1;
	moveButtons();
}
// function Tile(x,y,w,h,r,g,b){
//   this.x = x;
//   this.y = y;
//   this.w = w;
//   this.h = h;
//   this.r = r;
//   this.g = g;
//   this.b = b;
//
//   this.show = function(){
//     strokeWeight(1);
//     stroke(0);
//     fill(this.r, this.g, this.b);
//     rect(this.x, this.y, this.w, this.h);
//   }
// }

function trade(){
	tato -= tato4u;
	mork -= mork4u;
	upple -= upple4u;
	var data = {
		idTo: tradeId,
		idFrom: socket.id,
		nameTo: tradeTarget,
		nameFrom: atman.name,
		idTato: tato4u,
		idMork: mork4u,
		idUpple: upple4u
	}
	socket.emit('trade', data);
	console.log(data.idTato, data.idMork, data.idUpple);
	stroke(0, 200);
	strokeWeight(2);
	fill(255, 200);
	textSize(22);
	if (data.idTato == 1){
		text("You sent " + data.nameTo + " a tato", width/2, height/2);
	}
	else if (data.idMork == 1){
		text("You sent " + data.nameTo + " some mork", width/2, height/2);
	}
	else{
		text("You sent " + data.nameTo + " an upple", width/2, height/2);
	}
	resetTrade();
	tradeMsg = true;
	lastTrader = data.nameTo;
}

function buttonRefresh(){
	tatos.remove();
	morks.remove();
	upples.remove();
	tatos = createButton('tatos: ' + tato);
	tatos.mousePressed(tradeTato);
	morks = createButton('morks: ' + mork);
	morks.mousePressed(tradeMork);
	upples = createButton('upples:' + upple);
	upples.mousePressed(tradeUpple);
}

function resetTrade(){
	tradeFud = ' ';
	oneTrade = true;
	tradeButt.remove();
	tato4u = 0;
	mork4u = 0;
	upple4u = 0;
	buttonRefresh();
}

function tradeTato(){
	if(tato >= 1){
		tradeFud = ' tato';
		tato4u = 1;
		mork4u = 0;
		upple4u = 0;
	}
}

function tradeMork(){
	if(mork >= 1){
		tradeFud = ' mork';
		tato4u = 0;
		mork4u = 1;
		upple4u = 0;
	}
}

function tradeUpple(){
	if(upple >= 1){
		tradeFud = 'n upple';
		tato4u = 0;
		mork4u = 0;
		upple4u = 1;
	}
}
