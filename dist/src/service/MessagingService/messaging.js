const ChatHandler = async (io, message) => {
    io.to(message.room_id).emit("receive_message", `${message.message_text}`);
};
export default ChatHandler;
