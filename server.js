var atmans = [];
var mapTiles = [];
var freeFud = [];

function Atman(id, x, y, name, r, g, b, tile){
  this.id = id;
  this.x = x;
  this.y = y;
  this.name = name;
  this.r = r;
  this.g = g;
  this.b = b;
  this.t;
  this.m;
  this.u;
  this.tile = tile;
}
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
// var shared = io.of('/sharedScreen')
*/
//new
var path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/sharedScreen', function(req,res){
  res.sendFile(path.join(__dirname + '/public/sharedIndex.html'));
});

setInterval(heartbeat, 33);
function heartbeat(){ //so this is the only thing sent from server???
  var data = {
    atmans: atmans,
    mapTiles: mapTiles,
    freeFud: freeFud
  }
  io.sockets.emit('heartbeat', data);
}

//- - - - - - - game states
var startGame = false; //whether or not game has started
var oneGame = true; //attempt at stopping score screen spam

// var time

var sharedScreenId;

//- - - - - - overall fud counts + points
var totalTatos, totalMorks, totalUpples, totalFud; //across whole game
var pointScale = 200; //points
var tatoPts, morkPts, upplePts;//end game value percentage for each fud type
var tatoRank, morkRank, uppleRank;//negative flip if middle rank
var atmanRanks = []; //final score rankings
// - - - - - - - events
io.sockets.on('connection',
  function(socket){
    console.log("new player: " + socket.id);

    socket.on('start',
      function(data){
        var atman = new Atman(socket.id, data.x, data.y, data.name, data.r, data.g, data.b, data.tile);
        atmans.push(atman);
        console.log(atmans);
      }
    );

    socket.on('startGame',
      function(){
        startGame = true;
        console.log(startGame);
      }
    );

    socket.on('startMap',
      function(data){
        mapTiles = data;
      }
    );

    socket.on('update',
      function(data){
        if (atmans.length >= 2){ //so only starts if at least 2 players?
          var atman;
          totalTatos = 0;
          totalMorks = 0;
          totalUpples = 0;
          totalFud = 0;
          for (var i = 0; i < atmans.length; i++){
            if (socket.id == atmans[i].id){
              atman = atmans[i]; //why in front?
              atman.x = data.x;
              atman.y = data.y;
              atman.t = data.t;
              atman.m = data.m;
              atman.u = data.u;
              atman.tile = data.tile;
            }
            totalTatos += atmans[i].t;
            totalMorks += atmans[i].m;
            totalUpples += atmans[i].u;
          }
          totalFud = totalTatos + totalMorks + totalUpples;
          // console.log(totalFud, totalTatos, totalMorks, totalUpples);
          rank();
          // console.log(tatoRank, morkRank, uppleRank);

        }
      }
    );

    socket.on('trade',
      function(data){
        socket.broadcast.to(data.idTo).emit('trade', data);
        if (data.idTato == 1){
          console.log(data.nameFrom + " sent " + data.nameTo + " a Tato");
        }
        else if (data.idMork == 1){
          console.log(data.nameFrom + " sent " + data.nameTo + " a Mork");
        }
        else{
          console.log(data.nameFrom + " sent " + data.nameTo + " an Upple");
        }
      }
    );

    socket.on('spawn',
      function(data){
        freeFud = data;
        console.log(freeFud);
        socket.broadcast.emit('fudCheck', freeFud);
      }
    );

    socket.on('eat',
      function(data){
        freeFud = data;
        console.log(freeFud);
        socket.broadcast.emit('fudCheck', freeFud);
      }
    );

    socket.on('rankCheck?',
      function(data){
        sharedScreenId = socket.id;
        var data = {
          tRank: tatoRank,
          mRank: morkRank,
          uRank: uppleRank
        }
        // console.log('rankCheck ' + socket.id);
        io.to(sharedScreenId).emit('rankCheck', data);
        // socket.broadcast.to(socket.id).emit('rankCheck', data); //broadcast bad?
      }
    );

    socket.on('gameOver',
      function(){
        if(oneGame){
          socket.broadcast.emit('gameOverC'); //just testing client vs main
          fudMath();
          for (var i = atmans.length - 1; i >= 0; i--){
            var myTatoPts, myMorkPts, myUpplePts, myPts;
            myTatoPts = atmans[i].t * tatoPts;
            myMorkPts = atmans[i].m * morkPts;
            myUpplePts = atmans[i].u * upplePts;
            myPts = myTatoPts + myMorkPts + myUpplePts;
            var endman = {
              name: atmans[i].name,
              pts: myPts
            }
            atmanRanks.push(endman);
          }
          // console.log(atmanRanks);
          rankSort();
          // console.log(atmanRanks);
          io.to(sharedScreenId).emit('finalScores', atmanRanks);
          oneGame = false;
        }
      }
    );

    socket.on('disconnect',
      function(data){
        var atman;
        for (var i = 0; i < atmans.length; i++){
          if (socket.id == atmans[i].id){
            atmans.splice(i, 1);
          }
        }
        console.log("Client has disconnected");
      }
    );
  }
)

//- - - - - - - in-game fud ranking //if even at start, no bad?
function rank(){
  if (totalTatos > totalMorks && totalTatos <= totalUpples){
    tatoRank = -1;
    morkRank = 2;
    uppleRank = 1;
  }
  else if(totalTatos > totalUpples && totalTatos <= totalMorks){
    tatoRank = -1;
    morkRank = 1;
    uppleRank = 2;
  }
  else if(totalMorks > totalUpples && totalMorks <= totalTatos){
    tatoRank = 1;
    morkRank = -1;
    uppleRank = 2;
  }
  else if(totalMorks > totalTatos && totalMorks <= totalUpples){
    tatoRank = 2;
    morkRank = -1;
    uppleRank = 1;
  }
  else if(totalUpples > totalTatos && totalUpples <= totalMorks){
    tatoRank = 2;
    morkRank = 1;
    uppleRank = -1;
  }
  else{
    tatoRank = 1;
    morkRank = 2;
    uppleRank = -1;
    // console.log('rank bumb'); //meaningless test
    }
  }



// - - - - - - fud math at end
function fudMath(){
  totalFud = totalTatos + totalMorks + totalUpples;
  tatoPts = Math.floor(totalTatos / totalFud * pointScale * tatoRank);
  morkPts = Math.floor(totalMorks / totalFud * pointScale * morkRank);
  upplePts = Math.floor(totalUpples / totalFud * pointScale * uppleRank);
}
//- - - - - - winner rankings
function rankSort(){
  /* //so sad this didn't work
  for(var i = 1; i < atmanRanks.length; i++){
    for(var j = 0; j < atmanRanks.length; j++){
      if (atmanRanks[i].pts > atmanRanks[j].pts){
        atmanRanks.splice(atmanRanks[j], 0, atmanRanks[i]);
        atmanRanks.splice(atmanRanks[i+1], 1);
        break;
      }
    }
  }
  */
  atmanRanks.sort(function (a, b) {
    return b.pts - a.pts;
  });
}

// function scoreBoard(){
//
//   for (var i = 0; i < atmanRanks.length; i++){
//     var hLine =
//     text
//   }
// }
