import {io} from "socket.io-client"
const socket=io("http://localhost:3000")
const messageForm=document.querySelector(".message-form")
const messageInput=document.querySelector(".message-input")
const messageContainer=document.querySelector(".message-container")
const roomInput=document.querySelector('#room-input')
const roomButton=document.querySelector("#room-button")

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
    const socket_id=socket.id
    alert(`Connected to server:${socket.id}`)
    const p = document.createElement("p")
    p.innerText="Connected to server:"+socket_id
    document.querySelector(".chat-header").appendChild(p)
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
    socket.emit("join-room",room)
})

//receive response from server
socket.on('receive-msg',message=>{
    displayMessage(message,'received')
})