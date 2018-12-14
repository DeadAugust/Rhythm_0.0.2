// var socket = io('/sharedScreen');
var socket = io();

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

function setup(){
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  textSize(height/10);
  background(0,150,50);
  // startButton = createButton('start Game');
  // startButton.parent('myCanvas');
  // startButton.position(4* width/5, height/8);
  // startButton.mousePressed(startGame);

  socket.on('heartbeat',
    function(data){
      // atmans = data.atmans;
    }
  );

  socket.on('newCommand',
    function(data){
      console.log('new');
      command = data;
    });
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
    text(command, width/2, height/3);
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

}
