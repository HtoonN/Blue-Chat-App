const connectRoom = (roomId, socket) => {
  try {
    socket.join(roomId);
    socket.emit("connected-to-room", roomId);
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectRoom;
