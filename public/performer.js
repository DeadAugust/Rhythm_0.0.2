// var socket = io('/sharedScreen');
var socket = io();

var queue = [];
var stats = [];
var nextCommand;
var peebreak = false;

var mouthButts = [];
var meatButts = [];
var skinButts = [];
var handButts = [];
var menuButts = [];
var mouthButt, meatButt, skinButt, handButt, menuButt, statsButt;
var mouthMenu, meatMenu, skinMenu, handMenu, menu;
var abButt, footButt, handstandButt, pushupButt, squatButt, dabButt, stretchButt;
var cookieButt, waterButt, lemonButt, breathButt, jalapenoButt;
var flogButt, shockButt, slapButt;
var paintButt, juggleButt, clothingoffButt, clothingonButt;
var oneButt; //to rule them all
var stopButt;
var stopPerformance = false;
var clothesCount; //starting # of articles of clothing, to prevent nudity :(

//category colors
var meatCol, mouthCol, skinCol, handsCol, menuCol;




// var started = false;
// var command = 'start';

// var now, next, next2, next3, next4, next5; //queue desplay

function setup(){
  // noCanvas();
  createCanvas(windowWidth, windowHeight/3);
  textAlign(CENTER);
  textSize(height/10);
  background(0,150,50);
  // startButton = createButton('start Game');
  // startButton.parent('myCanvas');
  // startButton.position(4* width/5, height/8);
  // startButton.mousePressed(startGame);

  //category colors
  meatCol = color(46, 184, 46, 100); //green
  mouthCol = color(255, 117, 26, 100); //orange
  skinCol = color(77, 166, 255, 100); //blue
  handsCol = color(255, 102, 204, 100); //pink
  menuCol = color(100,100,155, 100); //

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
		if (event.type != 'touchstart'){
			socket.emit('buttPress', 'cookie');
		}
	});
	mouthButts.push(cookieButt);


	waterButt = createButton('slurp some water');
	waterButt.style('background-color', mouthCol);
	waterButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			socket.emit('buttPress', 'water');
		}
	});
	mouthButts.push(waterButt);


	// lemonButt = createButton('suckle a lime');
	// lemonButt.style('background-color', mouthCol);
	// lemonButt.mousePressed(function(){
	// 	if (event.type != 'touchstart'){
	// 		socket.emit('buttPress', 'lemon');
	// 	}
	// });
	// mouthButts.push(lemonButt);


	breathButt = createButton('find a deep breath');
	breathButt.style('background-color', mouthCol);
	breathButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			socket.emit('buttPress', 'breath');
		}
	});
	mouthButts.push(breathButt);


	jalapenoButt = createButton('pepper chomp');
	jalapenoButt.style('background-color', mouthCol);
	jalapenoButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			socket.emit('buttPress', 'jalapeno');
		}
	});
	mouthButts.push(jalapenoButt);


	//- - - - - - meat
	abButt = createButton('Ab Ripper X');
	abButt.style('background-color', meatCol);
	abButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			socket.emit('buttPress', 'ab');
		}
	});
	meatButts.push(abButt);


	handstandButt = createButton('invert body');
	handstandButt.style('background-color', meatCol);
	handstandButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			socket.emit('buttPress', 'handstand');
		}
	});
	meatButts.push(handstandButt);

	pushupButt = createButton('push the earth away');
	pushupButt.style('background-color', meatCol);
	pushupButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			socket.emit('buttPress', 'pushup');
		}
	});
	meatButts.push(pushupButt);


	squatButt = createButton('accrue thigh mass');
	squatButt.style('background-color', meatCol);
	squatButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			socket.emit('buttPress', 'squat');
		}
	});
	meatButts.push(squatButt);


	dabButt = createButton('#dab');
	dabButt.style('background-color', meatCol);
	dabButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			socket.emit('buttPress', 'dab');
		}
	});
	meatButts.push(dabButt);


	stretchButt = createButton('stretch, for your health');
	stretchButt.style('background-color', meatCol);
	stretchButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			socket.emit('buttPress', 'stretch');
		}
	});
	meatButts.push(stretchButt);


	//- - - - - - - skin
	flogButt = createButton('no pain no salvation'); //too obtuse?
	flogButt.style('background-color', skinCol);
	flogButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			socket.emit('buttPress', 'flog');
		}
	});
	skinButts.push(flogButt);


	shockButt = createButton('Shock face');
	shockButt.style('background-color', skinCol);
	shockButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			socket.emit('buttPress', 'shock');
		}
	});
	skinButts.push(shockButt);


	slapButt = createButton('slap yourself');
	slapButt.style('background-color', skinCol);
	slapButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			socket.emit('buttPress', 'slap');
		}
	});
	skinButts.push(slapButt);


	//- - - - - - - hands

	paintButt = createButton('paint yourself');
	paintButt.style('background-color', handsCol);
	paintButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			socket.emit('buttPress', 'paint');
		}
	});
	handButts.push(paintButt);


	juggleButt = createButton('juggle dildos');
	juggleButt.style('background-color', handsCol);
	juggleButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			socket.emit('buttPress', 'juggle');
		}
	});
	handButts.push(juggleButt);



	clothingoffButt = createButton('take OFF article of clothing');
	clothingoffButt.style('background-color', handsCol);
	clothingoffButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			if(clothesCount > 1){
				// clothesCount--;
				socket.emit('buttPress', 'clothes OFF');
			}
		}
	});
	handButts.push(clothingoffButt);


	clothingonButt = createButton('put ON article of clothing');
	clothingonButt.style('background-color', handsCol);
	clothingonButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			if(clothesCount < 14){
			// clothesCount++;
				socket.emit('buttPress', 'clothes ON');
			}
		}
	});
	handButts.push(clothingonButt);


	//- - - - - -  menus
	menuButt = createButton('Menu');
	menuButt.style('background-color', menuCol);
	menuButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			removeButts();
			menu = true;
			oneButt = false;
		}
	});

	// mouthButts.push(menuButt);
	// meatButts.push(menuButt);
	// skinButts.push(menuButt);
	// handButts.push(menuButt);


	mouthButt = createButton('MOUTH');
	mouthButt.style('background-color', mouthCol);
	mouthButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			removeButts();
			mouthMenu = true;
			oneButt = false;
		}
	});
	menuButts.push(mouthButt);

	meatButt = createButton('MEAT');
	meatButt.style('background-color', meatCol);
	meatButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			removeButts();
			meatMenu = true;
			oneButt = false;
		}
	});
	menuButts.push(meatButt);

	skinButt = createButton('SKIN');
	skinButt.style('background-color', skinCol);
	skinButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			removeButts();
			skinMenu = true;
			oneButt = false;
		}
	});
	menuButts.push(skinButt);

	handButt = createButton('HANDS');
	handButt.style('background-color', handsCol);
	handButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			removeButts();
			handMenu = true;
			oneButt = false;
		}
	});
	menuButts.push(handButt);

	statsButt = createButton('Stats');
	statsButt.style('background-color', menuCol);
	statsButt.mousePressed(function(){
		if (event.type != 'touchstart'){
			removeButts();
			stats = true;
			oneButt = false;
		}
	});
	menuButts.push(statsButt);

  removeButts();

  menu = true;

// - - - - - - persistent
  nextCommand = createButton('done, next command');
  nextCommand.mousePressed(function(){
    if (event.type != 'touchstart'){
      socket.emit('next');
    }
  });

  peebreak = createButton('PEE BREAK');
  peebreak.mousePressed(function(){
    if (event.type != 'touchstart'){
      socket.emit('peebreak');
    }
  });

  stopButt = createButton('Stop Active');
  stopButt.mousePressed(function(){
    if (event.type != 'touchstart'){
      stopPerformance = !stopPerformance;
      socket.emit('stop active', stopPerformance);
    }
  });



  socket.on('heartbeat',
    function(data){
      clothesCount = data.clothesCount;
      queue = data.queue;
      stats = data.stats;
    }
  );

  socket.on('newCommand',
    function(data){
      queue = data;
      console.log(queue);
    });
}




function draw (){
    noStroke();
    fill(0, 102, 153);
    textSize(height/8);
    rectMode(CENTER);
    textAlign(CENTER);
    rect(width/2, windowHeight/6, width, windowHeight/5);
    fill(0, 51, 183); //dark blue mork
    textSize(windowHeight/10);
    stroke(0);
    strokeWeight(3);
    fill(255);
    var current = str(queue[0]);
    text(current,width/2, windowHeight/5);

    // if(peebreak){
    //   background(135);
    //   textSize(72);
    //   text('PEE BREAK', width/2, height/2);
    // }

    showButts();

    var data = {
      menuButts: menuButts,
      mouthButts: mouthButts,
      meatButts: meatButts,
      skinButts: skinButts,
      handButts: handButts
    }

    socket.emit('update', data);
}

// function mousePressed(){
//   console.log(handButts);
//   var me = 5;
//   var test = [0, 3, 5, 8];
//   function findBoy(element) {
//     return element == me;
// }
//   console.log(test.findIndex(findBoy));
// }
function keyPressed() {
  if ((keyCode === 32) || (keyCode === ENTER)){
    socket.emit('next');
  }

}
// function masterButts(){
//   for (var i = menuButts.length -1; i >= 0; i--){
//     menuButts[i].show();
//   }
// }
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
	if(menu){
		for (var i = menuButts.length -1; i >= 0; i--){
		   menuButts[i].show();
		}
	}
	if(mouthMenu){
		console.log('show');
		menuButt.show();
		for (var i = mouthButts.length -1; i >= 0; i--){
			mouthButts[i].show();
		}
	}
	if(meatMenu){
		menuButt.show();
		for (var i = meatButts.length -1; i >= 0; i--){
			meatButts[i].show();
		}
	}
	if(skinMenu){
		menuButt.show();
		for (var i = skinButts.length -1; i >= 0; i--){
			skinButts[i].show();
		}
	}
	if(handMenu){
		menuButt.show();
		for (var i = handButts.length -1; i >= 0; i--){
			handButts[i].show();
		}
	}
  if(stats){
    menuButt.show();
  }
}
