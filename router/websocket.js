'use strict';

let wclients = [];

module.exports = {
  ws: function (port) {
    const websocket = require('ws')
    const wss = new websocket.Server({ port: port });

    console.log('Listener: ', 'wsock listening on port ' + port);

    wss.on('connection', function connection(ws) {
      wclients.push(ws);

      ws.on('open', function open() {
        console.log('open');
        ws.send('something');
      });

      ws.on('message', function incoming(data) {
        console.log(data.toString());
        ws.send('something');
      });
    });
  },

  wsend: function (message) {
    for (var n=0; n < wclients.length; n++) {
        wclients[n].send(message);
    }
  },

};

