const io=require("socket.io")(3000,{
    cors:{
        origin:["http://localhost:5173"]
    }
})

io.on("connection",socket=>{
    console.log("New connection")
    socket.on('send-message',(message,room)=>{
        if(room==''){
            socket.broadcast.emit('receive-msg',message)
        }
        else{
            socket.to(room).emit('receive-msg',message);
        }
    })
    socket.on('join-room',room=>{
        socket.join(room)
    })

   
    console.log(socket.id)
});