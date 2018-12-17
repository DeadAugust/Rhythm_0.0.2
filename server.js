

var queue = [];
var peebreak = false;

var mouthButts = [];
var meatButts = [];
var skinButts = [];
var handButts = [];
var menuButts = [];

var clothesCount = 7;
var stopPerformance;
var stopCount = 0;
var stopLimit = 3;
var end = false;


//- - - - - stats

function Stats(name){
  this.name = name;
  this.count = 0;
}

var stats = [];
var cookieStats = new Stats('eat cookie');
stats.push(cookieStats);
// console.log(stats);
var waterStats = new Stats('drink water');
stats.push(waterStats);
// var limeStats = new Stats('suck lime');
// stats.push(limeStats);
var breathStats = new Stats('take breath');
stats.push(breathStats);
var pepperStats = new Stats('chomp pepper');
stats.push(pepperStats);
var abStats = new Stats('ab workout');
stats.push(abStats);
var handstandStats = new Stats('handstand');
stats.push(handstandStats);
var pushupStats = new Stats('pushup');
stats.push(pushupStats);
var squatStats = new Stats('squat');
stats.push(squatStats);
var dabStats = new Stats('dab');
stats.push(dabStats);
var stretchStats = new Stats('stretch');
stats.push(stretchStats);
var flogStats = new Stats('flog self');
stats.push(flogStats);
var shockStats = new Stats('shock face');
stats.push(shockStats);
var slapStats = new Stats('slap face');
stats.push(slapStats);
var paintStats = new Stats('paint body');
stats.push(paintStats);
var juggleStats = new Stats('juggle dildos');
stats.push(juggleStats);
var clothingoffStats = new Stats('clothes OFF');
stats.push(clothingoffStats);
var clothingonStats = new Stats('clothes ON');
stats.push(clothingonStats);
console.log(stats);

 // uncomment for heroku
// shiffman heroku set up &&
// socket.io set up tutorial
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.use(express.static('public'));


http.listen(port, function(){
  console.log('listening on ' + port);
})

/*
//for local dev
var express = require('express');
var app = express();

var server = app.listen(3000);

app.use(express.static('public'));

console.log('Socket server running');

var io = require('socket.io')(server);
*/
//new
var path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/public/indexUser.html'));
});

app.get('/display', function(req,res){
  res.sendFile(path.join(__dirname + '/public/indexDisplay.html'));
});

app.get('/me', function(req,res){
  res.sendFile(path.join(__dirname + '/public/indexPerformer.html'));
});



setInterval(heartbeat, 33);
function heartbeat(){ //so this is the only thing sent from server???
  var data = {
    queue: queue,
    peebreak: peebreak,
    menuButts: menuButts,
    mouthButts: mouthButts,
    meatButts: meatButts,
    skinButts: skinButts,
    handButts: handButts,
    clothesCount: clothesCount,
    stopPerformance: stopPerformance,
    end: end,
    stats: stats
  }
  io.sockets.emit('heartbeat', data);
  // console.log(data);
}

//- - - - - - - game states
// var startGame = false; //whether or not game has started
// var oneGame = true; //attempt at stopping score screen spam

// var time

// var sharedScreenId;

//- - - - - - overall fud counts + points
// var totalTatos, totalMorks, totalUpples, totalFud; //across whole game
// var pointScale = 200; //points
// var tatoPts, morkPts, upplePts;//end game value percentage for each fud type
// var tatoRank, morkRank, uppleRank;//negative flip if middle rank
// var atmanRanks = []; //final score rankings

// - - - - - - - events
io.sockets.on('connection',
  function(socket){
    console.log("connected: " + socket.id);

    socket.on('start',
      function(data){
        // var atman = new Atman(socket.id, data.x, data.y, data.name, data.r, data.g, data.b, data.tile);
        // atmans.push(atman);
        // console.log(atmans);
      }
    );

    socket.on('update',
      function(data){
        menuButts = data.menuButts;
  			mouthButts = data.mouthButts;
  			meatButts = data.meatButts;
  			skinButts = data.skinButts;
  			handButts = data.handButts;
      }
    );

    socket.on('buttPress',
      function(data){
        command = data;
        if(command == 'clothes OFF'){
          clothesCount--;
        }
        if(command == 'clothes ON'){
          clothesCount++;
        }
        console.log(command);
        queue.push(command);
        for (var i = 0; i < stats.length; i++){
          if(command == stats[i].name){
            stats[i].count++;
          }
        }
        console.log(stats);
        // socket.broadcast.emit('newCommand', queue);
      }
    );

    socket.on('next',
      function(){
        queue.splice(0, 1);
      }
    );

    socket.on('peebreak',
      function(){
        peebreak = !peebreak;
      }
    );

    socket.on('stop active',
      function(data){
        stopPerformance = data;
      }
    );

    socket.on('stop request',
      function(){
        console.log(stopCount);
        stopCount++;
        if(stopCount >= stopLimit){
          end = true;
          console.log('end');
          // socket.emit('end');
        }
      }
    );

    socket.on('disconnect',
      function(data){
        console.log("Client has disconnected");
      }
    );
  }
)
