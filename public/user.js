var socket = io();

var peebreak = false;
// //debounce
// var oneTrade = true; //trade debounce;
// var tradeTime = 1000;// for trade
// var lastTrade = 0;
// var lastButt = 0;
// var debounce = 800;

var mouthButts = [];
var meatButts = [];
var skinButts = [];
var handButts = [];
var menuButts = [];
var mouthButtsM = [];
var meatButtsM =[];
var skinButtsM = [];
var handButtsM = [];
var menuButtsM = [];
var mouthButt, meatButt, skinButt, handButt, menuButt, statsButt;
var mouthMenu, meatMenu, skinMenu, handMenu, menu;
var abButt, footButt, handstandButt, pushupButt, squatButt, dabButt, stretchButt;
var cookieButt, waterButt, lemonButt, breathButt, jalapenoButt;
var flogButt, shockButt, slapButt;
var paintButt, juggleButt, clothingoffButt, clothingonButt;
var oneButt; //to rule them all
var stopButt;
var stopPerformance;
var oneStop = false;
var clothesCount; //starting # of articles of clothing, to prevent nudity :(

//category colors
var meatCol, mouthCol, skinCol, handsCol, menuCol;

function setup(){
	noCanvas();
	//- - - - - overall
	// var screenSize = windowHeight - 100;
	// var canvas = createCanvas(int(screenSize * .666), screenSize);
 	// canvas.parent('myCanvas');
	// background(0, 150, 50);

/* variable width buttons
	textSize(height/(8 + atmanRanks.length));
	hLine = (height-100)/(atmanRanks.length + 1);
	for(var i = 0; i < atmanRanks.length; i++){
		var place = i +1;
		text(place + ". " + atmanRanks[i].name + ": " + atmanRanks[i].pts, width/2, ((i+1) * hLine) + 100);
	}
	*/

	//category colors
	meatCol = color(46, 184, 46, 100); //green
	mouthCol = color(255, 117, 26, 100); //orange
	skinCol = color(77, 166, 255, 100); //blue
	handsCol = color(255, 102, 204, 100); //pink
	menuCol = color(100,100,155, 100); //
	stopCol = color(255, 0, 0);

	//starting menus
	menu = true;
	mouthMenu = true;
	meatMenu = true;
	skinMenu = true;
	handMenu = true;
	stats = false;


	//- - - - - - - mouth
	cookieButt = createButton('nom on a cookie');
	cookieButt.style('background-color', mouthCol);
	cookieButt.parent('myCanvas');
	cookieButt.mousePressed(function(){
		socket.emit('buttPress', 'cookie');
	});
	mouthButts.push(cookieButt);


	waterButt = createButton('slurp some water');
	waterButt.style('background-color', mouthCol);
	waterButt.mousePressed(function(){
		socket.emit('buttPress', 'water');
	});
	mouthButts.push(waterButt);


	lemonButt = createButton('suckle a lime');
	lemonButt.style('background-color', mouthCol);
	lemonButt.mousePressed(function(){
		socket.emit('buttPress', 'lemon');
	});
	mouthButts.push(lemonButt);


	breathButt = createButton('find a deep breath');
	breathButt.style('background-color', mouthCol);
	breathButt.mousePressed(function(){
		socket.emit('buttPress', 'breath');
	});
	mouthButts.push(breathButt);


	jalapenoButt = createButton('pepper chomp');
	jalapenoButt.style('background-color', mouthCol);
	jalapenoButt.mousePressed(function(){
		socket.emit('buttPress', 'jalapeno');
	});
	mouthButts.push(jalapenoButt);


	//- - - - - - meat
	abButt = createButton('Ab Ripper X');
	abButt.style('background-color', meatCol);
	abButt.mousePressed(function(){
		socket.emit('buttPress', 'ab');
	});
	meatButts.push(abButt);


	handstandButt = createButton('invert body');
	handstandButt.style('background-color', meatCol);
	handstandButt.mousePressed(function(){
		socket.emit('buttPress', 'handstand');
	});
	meatButts.push(handstandButt);

	pushupButt = createButton('push the earth away');
	pushupButt.style('background-color', meatCol);
	pushupButt.mousePressed(function(){
		socket.emit('buttPress', 'pushup');
	});
	meatButts.push(pushupButt);


	squatButt = createButton('accrue thigh mass');
	squatButt.style('background-color', meatCol);
	squatButt.mousePressed(function(){
		socket.emit('buttPress', 'squat');
	});
	meatButts.push(squatButt);


	dabButt = createButton('#dab');
	dabButt.style('background-color', meatCol);
	dabButt.mousePressed(function(){
		socket.emit('buttPress', 'dab');
	});
	meatButts.push(dabButt);


	stretchButt = createButton('stretch, for your health');
	stretchButt.style('background-color', meatCol);
	stretchButt.mousePressed(function(){
		socket.emit('buttPress', 'stretch');
	});
	meatButts.push(stretchButt);


	//- - - - - - - skin
	flogButt = createButton('no pain no salvation'); //too obtuse?
	flogButt.style('background-color', skinCol);
	flogButt.mousePressed(function(){
		socket.emit('buttPress', 'flog');
	});
	skinButts.push(flogButt);


	shockButt = createButton('Shock face');
	shockButt.style('background-color', skinCol);
	shockButt.mousePressed(function(){
		socket.emit('buttPress', 'shock');
	});
	skinButts.push(shockButt);


	slapButt = createButton('slap yourself');
	slapButt.style('background-color', skinCol);
	slapButt.mousePressed(function(){
		socket.emit('buttPress', 'slap');
	});
	skinButts.push(slapButt);


	//- - - - - - - hands

	paintButt = createButton('paint yourself');
	paintButt.style('background-color', handsCol);
	paintButt.mousePressed(function(){
		socket.emit('buttPress', 'paint');
	});
	handButts.push(paintButt);


	juggleButt = createButton('juggle dildos');
	juggleButt.style('background-color', handsCol);
	juggleButt.mousePressed(function(){
		socket.emit('buttPress', 'juggle');
	});
	handButts.push(juggleButt);



	clothingoffButt = createButton('take OFF article of clothing');
	clothingoffButt.style('background-color', handsCol);
	clothingoffButt.mousePressed(function(){
		if(clothesCount > 1){
			// clothesCount--;
			socket.emit('buttPress', 'clothes OFF');
		}
	});
	handButts.push(clothingoffButt);


	clothingonButt = createButton('put ON article of clothing');
	clothingonButt.style('background-color', handsCol);
	clothingonButt.mousePressed(function(){
		if(clothesCount < 14){
			// clothesCount++;
			socket.emit('buttPress', 'clothes ON');
		}
	});
	handButts.push(clothingonButt);


	//- - - - - -  menus
	menuButt = createButton('Menu');
	menuButt.style('background-color', menuCol);
	menuButt.mousePressed(function(){
		removeButts();
		menu = true;
		oneButt = false;
	});

	// mouthButts.push(menuButt);
	// meatButts.push(menuButt);
	// skinButts.push(menuButt);
	// handButts.push(menuButt);


	mouthButt = createButton('MOUTH');
	mouthButt.style('background-color', mouthCol);
	mouthButt.mousePressed(function(){
		removeButts();
		mouthMenu = true;
		oneButt = false;
	});
	menuButts.push(mouthButt);

	meatButt = createButton('MEAT');
	meatButt.style('background-color', meatCol);
	meatButt.mousePressed(function(){
		removeButts();
		meatMenu = true;
		oneButt = false;
	});
	menuButts.push(meatButt);

	skinButt = createButton('SKIN');
	skinButt.style('background-color', skinCol);
	skinButt.mousePressed(function(){
		removeButts();
		skinMenu = true;
		oneButt = false;
	});
	menuButts.push(skinButt);

	handButt = createButton('HANDS');
	handButt.style('background-color', handsCol);
	handButt.mousePressed(function(){
		removeButts();
		handMenu = true;
		oneButt = false;
	});
	menuButts.push(handButt);

	statsButt = createButton('Stats');
	statsButt.style('background-color', menuCol);
	statsButt.mousePressed(function(){
		removeButts();
		stats = true;
		oneButt = false;
	});
	menuButts.push(statsButt);

	stopButt = createButton('STOP PERFORMANCE');
	stopButt.style('background-color', stopCol);
	stopButt.mousePressed(function(){
		oneStop = true;
		socket.emit('stop request');
	});

	removeButts();

	menu = true;
	// - - - - - heartbeat
	socket.on('heartbeat',
		function(data){
      // peebreak = data.peebreak;
			menuButtsM = data.menuButts;
			mouthButtsM = data.mouthButts;
			meatButtsM = data.meatButts;
			skinButtsM = data.skinButts;
			handButtsM = data.handButts;
			// console.log('heartbeat');
			clothesCount = data.clothesCount;
			stopPerformance = data.stopPerformance;
		}
	);

	socket.on('drop',
		function(data){

		})
}

function draw() {
	if(!oneButt){
		console.log(mouthMenu, mouthButts, 'mouth');
		console.log(menu, menuButts, 'menu');
		showButts();
		// console.log(mouthMenu, mouthButts, 'mouth after');
		oneButt = true;
	}

	if(stopPerformance && !oneStop){
		stopButt.show();
	}
	else{
		stopButt.hide();
	}

	// if(peebreak){
	// 	fill(135, 50);
	// 	rect(width/2, height/2, width/2, height/2);
	// 	textSize(72);
	// 	fill(0);
	// 	text('PEE BREAK', width/2, height/2);
	// }

}

// function buttPress(butt){
// 	socket.emit('buttPress', butt);
// }
function mousePressed(){
	console.log('mouth', mouthButts, 'skin', skinButts);
}

function removeButts(){
	if(menu){
		for (var i = menuButts.length -1; i >= 0; i--){
			menuButts[i].hide();
		}
		menu = false;
	}
	if(mouthMenu){
		for (var i = mouthButts.length -1; i >= 0; i--){
			mouthButts[i].hide();
		}
		mouthMenu = false;
		menuButt.hide();
	}
	if(meatMenu){
		for (var i = meatButts.length -1; i >= 0; i--){
			meatButts[i].hide();
		}
		meatMenu = false;
		menuButt.hide();

	}
	if(skinMenu){
		for (var i = skinButts.length -1; i >= 0; i--){
			skinButts[i].hide();
		}
		skinMenu = false;
		menuButt.hide();

	}
	if(handMenu){
		for (var i = handButts.length -1; i >= 0; i--){
			handButts[i].hide();
		}
		handMenu = false;
		menuButt.hide();
	}
}

function showButts(){
	// menuButt.style('background-color', menuCol);
	// mouthButt.style('background-color', mouthCol);
	// meatButt.style('background-color', meatCol);
	// skinButt.style('background-color', skinCol);
	// handButt.style('background-color', handsCol);
	// statsButt.style('background-color', menuCol);
	if(menu){
		for (var i = menuButts.length -1; i >= 0; i--){
			// mouthButt.style('background-color', mouthCol);
			// meatButt.style('background-color', meatCol);
			// skinButt.style('background-color', skinCol);
			// handButt.style('background-color', handsCol);
			menuButts[i].show();
		}
	}
	if(mouthMenu){
		console.log('show');
		menuButt.show();
		for (var i = mouthButts.length -1; i >= 0; i--){
			// mouthButts[i].style('background-color', mouthCol);
			mouthButts[i].show();
		}
	}
	if(meatMenu){
		menuButt.show();
		for (var i = meatButts.length -1; i >= 0; i--){
			// meatButts[i].style('background-color', meatCol);
			meatButts[i].show();
		}
	}
	if(skinMenu){
		menuButt.show();
		for (var i = skinButts.length -1; i >= 0; i--){
			// skinButts[i].style('background-color', skinCol);
			skinButts[i].show();
		}
	}
	if(handMenu){
		menuButt.show();
		for (var i = handButts.length -1; i >= 0; i--){
			// handButts[i].style('background-color', handsCol);
			handButts[i].show();
		}
	}
	if(stats){
		menuButt.show();
	}
}
