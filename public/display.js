// var socket = io('/sharedScreen');
var socket = io();

var queue = [];
var peebreak = false;

//- - - - - - - timer
var startTime = false; //timer on/off
var timer; //millis tracker
var clock; //countdown display
var clockMin;
var clockSec;
var clockHour;


// var started = false;
var command = 'start';
var end = false;
var oneEnd = false;

var now, next, next2, next3, next4, next5; //queue desplay

function setup(){ //1440, 2457, 1140, 2560)
  console.log(windowWidth, windowHeight, displayWidth, displayHeight);
  // createCanvas(windowWidth, windowHeight);
  // createCanvas(displayWidth, displayHeight);
  createCanvas(1400, 2520); //perfectly sized for external vertical monitor

  textAlign(CENTER);
  rectMode(CENTER);

  textSize(height/10);
  background(0,150,50);



  socket.on('heartbeat',
    function(data){
      queue = data.queue;
      peebreak = data.peebreak;
      end = data.end;
    }
  );

  // socket.on('end',
  //   function(){
  //     console.log('end');
  //     end = true;
  //   }
  // );

}

function draw (){
  if(end){
    if(!oneEnd){
      fill(255, 0, 0, 180);
      rect(width/2, height/2, width, height);
      stroke(0);
      strokeWeight(10);
      textSize(150);
      fill(255, 255, 255);
      text('STOP', width/2, height/2);
      oneEnd = true;
    }
  }
  else{
    // timer
    background(0,150,50);
    clock = int(millis() / 1000);
    clockMin = int(clock / 60);
    clockSec = int(clock % 60);
    clockHour = int(clockMin / 60);
    textSize(height/10);
    strokeWeight(4);
    stroke(0);
    fill(255);
    if (clockSec < 10 && clockMin <10){
      text(clockHour + ":0" + clockMin + ":0" + clockSec, width/2, height/9);
    }
    else if(clockSec < 10){
      text(clockHour + ":" + clockMin + ":0" + clockSec, width/2, height/9);
    }
    else if(clockMin < 10){
      text(clockHour + ":0" + clockMin + ":" + clockSec, width/2, height/9);
    }
    else text(clockHour + ":" + clockMin + ":" + clockSec, width/2, height/9);

    // now.html(queue[0]);
    // next.html(queue[1]);
    // next2.html(queue[2]);
    // next3.html(queue[3]);
    // next4.html(queue[4]);
    // next5.html(queue[5]);

    queueBoxes();
    if(peebreak){
      fill(200, 255, 0, 150);
      rect(width/2, height/2, width, height);
      textSize(82);
      fill(100, 90, 255);
      text('PEE BREAK', width/2, height/2);
    }
  }
}

function queueBoxes(){
  //update text
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
  //blocks
  noStroke();
  fill(255, 25);
  rect(width/2, 13 * height/24, width - 2* width/3, height/12); //next5
  fill(200, 75);
  rect(width/2, 12 * height/24, width - width/2, height/11); //next4
  fill(150, 125);
  rect(width/2, 11 * height/24, width - width/3, height/10); //next3
  fill(100, 175);
  rect(width/2, 10 * height/24, width - width/4, height/9); //next2
  fill(50, 225);
  rect(width/2, 9 * height/24, width - width/5, height/8); //next
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
