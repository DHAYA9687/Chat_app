import {io} from "socket.io-client"
const socket=io("http://localhost:3000")
const messageForm=document.querySelector(".message-form")
const messageInput=document.querySelector(".message-input")
const messageContainer=document.querySelector(".message-container")


const displayMessage=(message,type="received")=>{
    const div=document.createElement("div")
    div.classList.add("message",type)
    div.innerHTML=`
                <p class="message-content">${message}</p>
                <span class="message-time">10:31 AM</span>
            `
    messageContainer.appendChild(div)
}


socket.on("connect",()=>{
    alert(`Connected to server:${socket.id}`)
    const p = document.createElement("p")
    p.innerText="Connected to server:"+socket.id
    document.querySelector(".chat-header").appendChild(p)
})
messageForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const message=messageInput.value
    if(message.trim()===""){
        return
    }
    displayMessage(message,)
    messageInput.value=""
})