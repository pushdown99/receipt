'use strict';

let gclients = [];

module.exports = {

  grpc: function (port) {
    const grpc = require("grpc");
    const protoLoader = require("@grpc/proto-loader");

    const server  = new grpc.Server();
    const address = "0.0.0.0:" + port;

    console.log('Listener: ', 'grpc  listening on port ' + port);

    let proto = grpc.loadPackageDefinition(
        protoLoader.loadSync(__dirname + "/protos/chat.proto", {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
      })
    );

    server.addService(proto.example.Chat.service, { join: this.gjoin, send: this.gsend });
    server.bind(address, grpc.ServerCredentials.createInsecure());
    server.start();
  },

  gjoin: function (call, callback) {
    gclients.push(call);
    this.gnotify({ user: "Server", text: "new user joined ..." });
  },

  gsend: function (call, callback) {
    this.gnotify(call.request);
  },

  gnotify: function (message) {
    gclients.forEach(client => { client.write(message); });
  },

};

