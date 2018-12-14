// var socket = io('/sharedScreen');
var socket = io();

// var queue = [];

var done;


// var started = false;
// var command = 'start';

// var now, next, next2, next3, next4, next5; //queue desplay

function setup(){
  createCanvas(windowWidth/2, 200);
  textAlign(CENTER);
  textSize(height/10);
  background(0,150,50);
  // startButton = createButton('start Game');
  // startButton.parent('myCanvas');
  // startButton.position(4* width/5, height/8);
  // startButton.mousePressed(startGame);

  done = createButton('done, next command');
  done.mousePressed(function(){
    socket.emit('next');
  })

  // now.style('background-color', );



  socket.on('heartbeat',
    function(data){
      // atmans = data.atmans;
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
d
