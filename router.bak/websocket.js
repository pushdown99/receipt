'use strict';

let wclients = [];

module.exports = {
  ws: function (port) {
    const websocket = require('ws')
    const wss = new websocket.Server({ port: port });

    console.log('Listener: ', 'wsock listening on port ' + port);

    wss.on('connection', function connection(ws) {
      let client = {}
      client.license = "";
      client.ws = ws;
      wclients.push(client);

      ws.on('open', function open() {
        console.log('open');
        ws.send('something');
      });

      ws.on('message', function incoming(data) {
        console.log(data.toString());
        let obj = JSON.parse(data.toString());
        let command   = obj.Command;
        let license   = obj.License;
        let message   = obj.Message;
        let timestamp = obj.Timestamp;

        switch(command) {
        case 'Join': 
          for (var n=0; n < wclients.length; n++) {
            if(wclients[n].ws == ws) {
              wclients[n].license = license;
            }
          }
        }
        ws.send('{"Command": "Okay", "Message": ""}');
      });
    });
  },

  wsend: function (license, message) {
    for (var n=0; n < wclients.length; n++) {
      if(wclients[n].license == license) wclients[n].ws.send(message);
    }
  },

  wsendAll: function (message) {
    for (var n=0; n < wclients.length; n++) {
        wclients[n].ws.send(message);
    }
  },

};

