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
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  rectMode(CENTER);

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
    // console.log(queue[0]);

    // now.html(test);
    now.html(queue[0]);
    next.html(queue[1]);
    next2.html(queue[2]);
    next3.html(queue[3]);
    next4.html(queue[4]);
    next5.html(queue[5]);

    queueBoxes();

}

function queueBoxes(){
  for (var i = 0; i < 6; i++){
    if(queue[i] == undefined){
      queue[i] = 'needs input';
    }
  }
  var now = str(queue[0]);
  var next = str(queue[1]);
  var next2 = str(queue[2]);
  var next3 = str(queue[3]);
  var next4 = str(queue[4]);
  var next5 = str(queue[5]);
  noStroke();

  fill(255, 25);
  rect(width/2, 13 * height/24, width - width/2, height/12); //next5
  fill(200, 75);
  rect(width/2, 12 * height/24, width - width/3, height/11); //next4
  fill(150, 125);
  rect(width/2, 11 * height/24, width - width/4, height/10); //next3
  fill(100, 175);
  rect(width/2, 10 * height/24, width - width/5, height/9); //next2
  fill(50, 225);
  rect(width/2, 9 * height/24, width - width/10, height/8); //next
  fill(0);
  rect(width/2, 2 * height/9, width - width/20, height/6); //now
  //commands
  textSize(100);
  fill(255);
  text(now,width/2,  9 * height/36);
  textSize(50);
  fill(200, 200);
  text(next, width/2, 9* height/24);
  textSize(40);
  fill(150, 150);
  text(next2, width/2, 10 * height/24);
  textSize(30);
  fill(150, 100);
  text(next3, width/2, 11 * height/24);
  textSize(20);
  fill(50, 50);
  text(next4, width/2, 12 * height/24);
  textSize(10);
  fill(25, 25);
  text(next5, width/2, 13 * height/24);








}
