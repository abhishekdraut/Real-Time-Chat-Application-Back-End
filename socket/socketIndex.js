function socketHandler(io) {
  io.use((socket, next) => {
    const user_id = socket.handshake.auth.userId;
    console.log(user_id);
    if (!user_id) {
      return next(new Error("invalid username"));
    }
    socket.user_id = user_id;
    next();
  });
  
  
  io.on("connection", (socket) => {
  
    socket.on("sendMessage", (data) => {
      console.log(data)
      
      console.log("========================>");

      io.of("/").sockets.forEach((item) => {
        console.log( `userId of item =${item.user_id}, socket Id of item =${item.id}`);
        
        if (item.user_id == data.to) {
          console.log("user is online =================>with userid =",data.to,"and socket id =",item.id);
          socket.to(item.id).emit("recieveMessage", data);
        }
      });
    });
    socket.on('friendAdded',(data)=>{
      console.log(data)
      
      console.log("friendlist updating=========>");

      io.of("/").sockets.forEach((item) => {
        console.log( `userId of item =${item.user_id}, socket Id of item =${item.id}`);
        
        if (item.user_id == data.friendId) {
          console.log("user is online =================>with userid =",data.friendId,"and socket id =",item.id);
          socket.to(item.id).emit("friendListUpdated", data);
        }
      });
    })
  });
}
module.exports = socketHandler;
