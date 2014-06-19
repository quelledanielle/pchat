;(function(exports) {
  /**
   * HTTP server
   */

  var express  = require('express');
  var app      = express();
  var server   = require('http').Server(app);

  server.listen(3000, function() {
    console.log("Listening at localhost:3000...");
  });

  app.get('/', function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
  });

  app.use(express.static(__dirname + '/public'));

  /**
   * PChat server
   */

  var io = require('socket.io')(server);
  var randomName = require('./util/randomName');
  var names = {};

  io.on('connection', function(socket) {
    names[socket.id] = getRandomName(socket.id);
    console.log(names[socket.id] + ' has connected.');

    socket.on('disconnect', function() {
      console.log(names[socket.id] + ' has disconnected.');
    });
  });

  function getRandomName(id) {
    var name = id;
    
    do {
      name = randomName.generate();
    } while (name in Object.keys(names));
    
    return name;
  }

})(this);
