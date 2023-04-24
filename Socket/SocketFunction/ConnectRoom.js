const connectRoom = (roomId, socket) => {
  try {
    socket.join(roomId);
    socket.emit("connected-to-room", "connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectRoom;
