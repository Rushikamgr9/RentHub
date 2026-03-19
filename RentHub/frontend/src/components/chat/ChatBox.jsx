import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ChatBox(){
  const [message,setMessage] = useState("");
  const [chat,setChat] = useState([]);

  useEffect(()=>{
    socket.on("receive_message",(data)=>{
      setChat(prev=>[...prev,data]);
    })
  },[]);

  const sendMessage = ()=>{
    if(message.trim()==="") return;
    socket.emit("send_message",message);
    setChat(prev=>[...prev,message]);
    setMessage("");
  }

  return(
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-scroll border p-3 mb-2">
        {chat.map((m,i)=><p key={i}>{m}</p>)}
      </div>
      <div className="flex">
        <input className="flex-1 p-2 border" value={message} onChange={e=>setMessage(e.target.value)} placeholder="Type message"/>
        <button className="bg-blue-500 text-white px-4 py-2" onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}