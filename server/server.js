const io=require("socket.io")(3000,{
    cors:{
        origin:["http://localhost:5173"]
    }
})

io.on("connection",socket=>{
    console.log("New connection")
    socket.emit("welcome","Welcome to the chat")
    console.log(socket.id)
});