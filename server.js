

// var atmans = [];

/*
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
*/

//for local dev
var express = require('express');
var app = express();

var server = app.listen(3000);

app.use(express.static('public'));

console.log('Socket server running');

var io = require('socket.io')(server);
// var shared = io.of('/sharedScreen')

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
    // atmans: atmans,
    // mapTiles: mapTiles,
    // freeFud: freeFud
  }
  io.sockets.emit('heartbeat', data);
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
        // if (atmans.length >= 2){ //so only starts if at least 2 players?
        //   var atman;
        //   totalTatos = 0;
        //   totalMorks = 0;
        //   totalUpples = 0;
        //   totalFud = 0;
        //   for (var i = 0; i < atmans.length; i++){
        //     if (socket.id == atmans[i].id){
        //       atman = atmans[i]; //why in front?
        //       atman.x = data.x;
        //       atman.y = data.y;
        //       atman.t = data.t;
        //       atman.m = data.m;
        //       atman.u = data.u;
        //       atman.tile = data.tile;
        //     }
        //     totalTatos += atmans[i].t;
        //     totalMorks += atmans[i].m;
        //     totalUpples += atmans[i].u;
        //   }
        //   totalFud = totalTatos + totalMorks + totalUpples;
        //   // console.log(totalFud, totalTatos, totalMorks, totalUpples);
        //   rank();
          // console.log(tatoRank, morkRank, uppleRank);

        // }
      }
    );


    socket.on('buttPress',
      function(data){
        command = data;
        socket.broadcast.emit('newCommand', command);
        console.log(command);
      }
    );

    socket.on('disconnect',
      function(data){
        console.log("Client has disconnected");
      }
    );
  }
)
