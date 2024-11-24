import {io} from "socket.io-client"
const socket=io("http://localhost:3000")
socket.on("connect",()=>{
    alert(`Connected to server:${socket.id}`)
})
