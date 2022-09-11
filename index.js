const express = require("express");
const cors = require("cors")();
const app = express();
app.use(cors);//dont know but cors cousing local server not to connect
const server = require("http").createServer(app);
const { Server } = require("socket.io");


require('./startup/db')()
require('./routes/index')(app);



// ========================================================================================

//tips for server:
//io refers to server includes every socket in that.
//socket are just socket(20 digit id) assign to user.
//socket comunicate between the io.
//socket.broadcast.emit emite event to every socket excluding sender.
//io.emit emits event to every socket within that io including sender.
const io = new Server(server, { cors: { origin: "*" } });
require('./socket/socketIndex')(io)

// ==========================================================================================



app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("app is started on port",process.env.PORT);
  }
});
server.listen(process.env.PORT||3001, () => {
  console.log("Socket server started on 3001");
});
