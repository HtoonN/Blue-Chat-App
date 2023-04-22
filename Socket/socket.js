const socketIo = require("socket.io");
const socketCorsConfig = require("../Config/socketCorsConfig");
const socketAuth = require("./Middleware/SocketAuth");
const socketController = require("./SocketController/SocketController");

class CreateIo {
  constructor(app) {
    this.io = socketIo(app, {
      cors: socketCorsConfig,
    });
    this.io.use(socketAuth);
  }

  connect() {
    console.log("Socket is started");

    this.io.on("connection", (socket) => {
      socketController(socket, this.io);
    });
  }
}

module.exports = CreateIo;
