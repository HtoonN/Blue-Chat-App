const SaveMessage = require("../../UserClasses/Chat/SaveMessage");

const messageController = async (socket, obj, sendIo) => {
  const sender = obj.sender.toString();
  const receiver = obj.receiver.toString();
  const message = obj.text.toString();
  const type = obj.type.toString();
  const io = sendIo;

  if (obj.attachFiles) {
    const attachFiles = obj.attachFiles;
    if (type === "PM") {
      const result = await new SaveMessage({
        sender,
        receiver,
        message,
        attachFiles,
      }).savePersonalMessage();

      io.to(obj.receiver).emit("receive-message-from-friend", result);
      socket.emit("send-message-successful", { ...result, tempId: obj.tempId });
    } else if (type === "GM") {
      const result = await new SaveMessage({
        sender,
        receiver,
        message,
        attachFiles,
      }).saveGroupMessage();

      socket.broadcast.to(obj.receiver).emit("receive-message-from-group", result);
     socket.emit("send-message-successful", { ...result, tempId: obj.tempId });
//socket.emit("receive-message-from-group", { ...result, tempId: obj.tempId });
    }
  } else {
    if (type === "PM") {
      const result = await new SaveMessage({
        sender,
        receiver,
        message,
      }).savePersonalMessage();

      io.to(obj.receiver).emit("receive-message-from-friend", result);
      socket.emit("send-message-successful", { ...result, tempId: obj.tempId });
    } else if (type === "GM") {
      const result = await new SaveMessage({
        sender,
        receiver,
        message,
      }).saveGroupMessage();

      socket.broadcast.to(obj.receiver).emit("receive-message-from-group", result);
      socket.emit("send-message-successful", { ...result, tempId: obj.tempId });
//socket.emit("receive-message-from-group", { ...result, tempId: obj.tempId });
    } else {
      socket.emit("error", "You have to send PM or GM");
    }
  }
};

module.exports = messageController;
