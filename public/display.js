// var socket = io('/sharedScreen');
var socket = io();

var queue = [];

//- - - - - - - timer
var startTime = false; //timer on/off
// var timeLimit = 80000; //test timer
var timeLimit = 120000; //two mins per round
var timer; //millis tracker
var clock; //countdown display
var clockMin;
var clockSec;
var spawnTimer = 0;//resets after each spawn
var nextSpawn = 1;//how long until next spawn
var spawnFreq = 20;//game-wide scaling for spawn timing


// var started = false;
var command = 'start';

var now, next, next2, next3, next4, next5; //queue desplay

function setup(){
  createCanvas(windowWidth/2, 200);
  textAlign(CENTER);
  textSize(height/10);
  background(0,150,50);
  // startButton = createButton('start Game');
  // startButton.parent('myCanvas');
  // startButton.position(4* width/5, height/8);
  // startButton.mousePressed(startGame);
  now = createP(' ');
  next = createP(' ');
  next2 = createP(' ');
  next3 = createP(' ');
  next4 = createP(' ');
  next5 = createP(' ');

  // now.style('background-color', );



  socket.on('heartbeat',
    function(data){
      queue = data.queue;
    }
  );

//   socket.on('newCommand',
//     function(data){
//       queue = data;
//       console.log(queue);
//     });
// }
}

function draw (){
    noStroke();
    fill(0, 102, 153);
    textSize(height/8);
    rectMode(CENTER);
    textAlign(CENTER);
    fill(0,30,100);
    rect(width/2, height/3, width/2, height/5);
    fill(0, 51, 183); //dark blue mork
    // text(queue[0], width/2, height/3);

    // timer
    socket.emit('rankCheck?', socket.id);
    clock = int(((timeLimit + timer) - millis()) / 1000);
    clockMin = int(clock / 60);
    clockSec = int(clock % 60);
    textSize(height/10);
    strokeWeight(4);
    stroke(0);
    fill(255);
    if (clockSec < 10){
      text(clockMin + ":0" + clockSec, 5 * width/6, height/7);
    }
    else text(clockMin + ":" + clockSec, 5 * width/6, height/7);
    if(millis() - timer >= timeLimit){
      socket.emit('gameOver');
      console.log('game over');
      // finalScores = true;
    }
    // var test = str(queue[0]);
    // console.log(test);
    console.log(queue[0]);

    // now.html(test);
    now.html(queue[0]);
    next.html(queue[1]);
    next2.html(queue[2]);
    next3.html(queue[3]);
    next4.html(queue[4]);
    next5.html(queue[5]);

}
