import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";

const io = new Server(3000, {
  cors: {
    origin: [
      "http://localhost:5173", // Frontend
      "https://admin.socket.io/", // Admin UI
    ],
    methods: ["GET", "POST"],
    credentials:true,
    allowedHeaders: ["Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"],
  },
});


//
// Admin UI
instrument(io, { auth:false });


//namespace USER
const userIo = io.of("/user");
userIo.on("connection", (socket) => {
  console.log(`User namespace connected: ${socket.id}`);
  socket.on("disconnect", (reason) => {
    console.log(`User namespace disconnected: ${socket.id}, Reason: ${reason}`);
  });
});
userIo.use((socket,next)=>{
    if(socket.handshake.auth.token){
        socket.username=getusername(socket.handshake.auth.token)
        console.log("socket username:",socket.username)
        next()
    }
    else{
        next(new Error("please send Token"))
    }

})


function getusername(token){
 return token
}

//connection establishment
io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.on("send-message", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("receive-msg", message);
    } else {
      socket.to(room).emit("receive-msg", message);
    }
  });

  socket.on("join-room", (room, cb) => {
    socket.join(room);
    cb(`Joined room: ${room}`);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Socket disconnected: ${socket.id}, Reason: ${reason}`);
  });
  socket.on("ping",count=>{
    console.log('count:'+count)
  })
});
