var socket = io();

var peebreak = false;
// //debounce
// var oneTrade = true; //trade debounce;
// var tradeTime = 1000;// for trade
// var lastTrade = 0;
// var lastButt = 0;
// var debounce = 800;

// var buttons = [];
var butt;
var mouthButts = [];
var meatButts = [];
var skinButts = [];
var handButts = [];
var mouthButt, meatButt, skinButt, handButt, menuButt, statsButt;
var mouthMenu, meatMenu, skinMenu, handMenu, menu;
var abButt, footButt, handstandButt, pushupButt, squatButt, dabButt, stretchButt;
var cookieButt, waterButt, lemonButt, breathButt, jalapenoButt;
var flogButt, shockButt, slapButt;
var paintButt, juggleButt, clothingoffButt, clothingonButt;
var oneButt; //to rule them all
var stopButt;
var clothesCount = 7; //starting # of articles of clothing, to prevent nudity :(
// var ab = 'ab';
// var foot = 'foot';
//category colors
var musclesCol, mouthCol, skinCol, handsCol, menuCol;

function setup(){
	// noCanvas();
	//- - - - - overall
	var screenSize = windowHeight - 100;
	var canvas = createCanvas(int(screenSize * .666), screenSize);
 	canvas.parent('myCanvas');
	background(0, 150, 50);

/* variable width buttons
	textSize(height/(8 + atmanRanks.length));
	hLine = (height-100)/(atmanRanks.length + 1);
	for(var i = 0; i < atmanRanks.length; i++){
		var place = i +1;
		text(place + ". " + atmanRanks[i].name + ": " + atmanRanks[i].pts, width/2, ((i+1) * hLine) + 100);
	}
	*/

	//category colors
	musclesCol = color(46, 184, 46, 100); //green
	mouthCol = color(255, 117, 26, 100); //orange
	skinCol = color(77, 166, 255, 100); //blue
	handsCol = color(255, 102, 204, 100); //pink
	menuCol = color(100,100,155, 100); //

	//starting menus
	menu = true;
	mouthMenu = false;
	meatMenu = false;
	skinMenu = false;
	handMenu = false;
	stats = false;

	//- - - - - - meat
	abButt = createButton('Ab Ripper X');
	abButt.style('background-color', musclesCol);
	abButt.mousePressed(function(){
		socket.emit('buttPress', 'ab');
	});

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
	flogButt = createButton('no pain no salvation'); //too obtuse?
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
		if(clothesCount > 1){
			clothesCount--;
			socket.emit('buttPress', 'clothes OFF');
		}
	});

	clothingonButt = createButton('put ON article of clothing');
	clothingonButt.style('background-color', handsCol);
	clothingonButt.mousePressed(function(){
		if(clothesCount < 13){
			clothesCount++;
			socket.emit('buttPress', 'clothes ON');
		}
	});

	menuButt = createButton('Menu');
	menuButt.style('background-color', menuCol);
	menuButt.mousePressed(function(){
		removeButts();
		menu = true;
		oneButt = false;
	});
/*
	mouthButt = createButton('MOUTH');
	mouthButt.style('background-color', mouthCol);
	mouthButt.mousePressed(function(){
		removeButts();
		mouthMenu = true;
		oneButt = false;
	});

	meatButt = createButton('MEAT');
	meatButt.style('background-color', meatCol);
	meatButt.mousePressed(function(){
		removeButts();
		meatMenu = true;
		oneButt = false;
	});

	skinButt = createButton('SKIN');
	skinButt.style('background-color', skinCol);
	skinButt.mousePressed(function(){
		removeButts();
		skinMenu = true;
		oneButt = false;
	});

	handButt = createButton('HANDS');
	handButt.style('background-color', handsCol);
	handButt.mousePressed(function(){
		removeButts();
		handMenu = true;
		oneButt = false;
	});

	statsButt = createButton('Menu');
	statsButt.style('background-color', menuCol);
	statsButt.mousePressed(function(){
		removeButts();
		stats = true;
		oneButt = false;
	});
	*/

	// - - - - - heartbeat
	socket.on('heartbeat',
		function(data){
      peebreak = data.peebreak;
			mouthButts = data.mouthButts;
			meatButts = data.meatButts;
			skinButts = data.skinButts;
			handButts = data.handButts;
		}
	);
}

function draw() {
	if (menu){
		if(!oneButt){
			mainMenu();
			oneButt = true;
		}
	}

	if(peebreak){
		fill(135, 50);
		rect(width/2, height/2, width/2, height/2);
		textSize(72);
		fill(0);
		text('PEE BREAK', width/2, height/2);
	}
		socket.on('gameOverC',
			function(){
				// gameOver = true;
			}
		);
}

function buttPress(butt){
	socket.emit('buttPress', butt);
	// 	function(){
	// 		var data = butt;
	// 	}
	// );
}

function removeButts(){
	if(mouthMenu){
		for (var i = mouthButts.length -1; i >= 0; i--){
			mouthButts[i].remove();
		}
		mouthMenu = false;
	}
	if(meatMenu){
		for (var i = meatButts.length -1; i >= 0; i--){
			meatButts[i].remove();
		}
		meatMenu = false;
	}
	if(skinMenu){
		for (var i = skinButts.length -1; i >= 0; i--){
			skinButts[i].remove();
		}
		skinMenu = false;
	}
	if(handMenu){
		for (var i = handButts.length -1; i >= 0; i--){
			handButts[i].remove();
		}
		handMenu = false;
	}
	if(menu){
		mouthButt.remove();
		meatButt.remove();
		skinButt.remove();
		handButt.remove();
		statsButt.remove();
		menu = false;
	}
}

function mainMenu(){
	mouthButt = createButton('MOUTH');
	mouthButt.style('background-color', mouthCol);
	mouthButt.parent('myCanvas');
	mouthButt.mousePressed(function(){
		removeButts();
		mouthMenu = true;
		oneButt = false;
	});

	meatButt = createButton('MEAT');
	meatButt.style('background-color', meatCol);
	meatButt.parent('myCanvas');
	meatButt.mousePressed(function(){
		removeButts();
		meatMenu = true;
		oneButt = false;
	});

	skinButt = createButton('SKIN');
	skinButt.style('background-color', skinCol);
	skinButt.parent('myCanvas');
	skinButt.mousePressed(function(){
		removeButts();
		skinMenu = true;
		oneButt = false;
	});

	handButt = createButton('HANDS');
	handButt.style('background-color', handsCol);
	handButt.parent('myCanvas');
	handButt.mousePressed(function(){
		removeButts();
		handMenu = true;
		oneButt = false;
	});

	statsButt = createButton('Menu');
	statsButt.style('background-color', menuCol);
	statsButt.mousePressed(function(){
		removeButts();
		stats = true;
		oneButt = false;
	});
}
