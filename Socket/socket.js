const socketIo = require("socket.io");
const socketCorsConfig = require("../Config/socketCorsConfig");
const initializeUser = require("./SocketInitializedUser");

class CreateIo {
  constructor(app) {
    this.io = socketIo(app, {
      cors: socketCorsConfig,
    });
  }

  connect() {
    console.log("Socket is started");
    this.io.on("connection", (socket) => {
      initializeUser(socket);

      socket.on("message", (msg) => {
        console.log(msg);
        this.io.to(msg.room).emit("receive", `${msg.msg}`);
      });

      socket.on("disconnect", () => {
        console.log("A user is disconnected");
        console.log(socket.handshake.auth.userId);
      });
    });
  }
}

module.exports = CreateIo;
