import { io} from "socket.io-client";
document.addEventListener("DOMContentLoaded",()=>{
const socket=io("https://chat-app-fp4v.onrender.com",{
    transports:["websocket","polling"],
})

const userSocket = io("https://chat-app-fp4v.onrender.com/user", {auth:{token:"test"},
    transports: ["websocket", "polling"],
  });
  
  userSocket.on("connect", () => {
    console.log("Connected to user namespace:", userSocket.id);
  });
  
 userSocket.on("connect_error",err=>{
    displayMessage(err)
 })
const messageForm=document.querySelector(".message-form")
const messageInput=document.querySelector(".message-input")
const messageContainer=document.querySelector(".message-container")
const roomInput=document.querySelector('#room-input')
const roomButton=document.querySelector("#room-button")
const chatId_Element=document.querySelector("#chat-id")
console.log(chatId_Element)


//get time function
function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert 24-hour format to 12-hour format
    hours = hours % 12;
    hours = hours || 12; // If hour is 0, set it to 12

    // Add leading zero to minutes if needed
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutesFormatted} ${ampm}`;
}


const displayMessage=(message,type="received")=>{
    const time=getCurrentTime()
    const div=document.createElement("div")
    div.classList.add("message",type)
    div.innerHTML=`
                <p class="message-content">${message}</p>
                <span class="message-time">${time}</span>
            `
    messageContainer.appendChild(div)
}


socket.on("connect",(e)=>{
    const socketId=socket.id
    alert(`Connected to server:${socket.id}`)
    const chat="Connected to server:"+socketId
    chatId_Element.innerText=chat;
})


messageForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const message=messageInput.value
    const room = roomInput.value
    if(message.trim()===""){
        return
    }
    displayMessage(message,'sent')
    socket.emit('send-message',message,room)
    messageInput.value=""
})

//join room
roomButton.addEventListener('click',()=>{
    const room = roomInput.value
    socket.emit("join-room",room,message=>{
        displayMessage(message,'received')
    })
})

//receive response from server
socket.on('receive-msg',message=>{
    displayMessage(message,'received')
})

//ping server

let count=0
setInterval(()=>{
     socket.emit("ping",++count)
},1000)

//keyboard control for disconnect and reconnect
document.addEventListener('keydown',e=>{
    if(e.target.matches('input')) return
    if(e.key==='c') socket.connect()
    if(e.key=='d') socket.disconnect()
}) 

});