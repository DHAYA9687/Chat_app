import {io} from "socket.io-client"
const socket=io("http://localhost:3000")
socket.on("connect",()=>{
    alert(`Connected to server:${socket.id}`)
    const p = document.createElement("p")
    p.innerText="Connected to server:"+socket.id
    document.querySelector(".chat-header").appendChild(p)
})
