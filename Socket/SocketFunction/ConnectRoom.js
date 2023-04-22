const connectRoom = (roomId, io, socket) => {
  try {
    socket.join(roomId);
    io.to(roomId).emit("connected-to-room", "connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectRoom;
