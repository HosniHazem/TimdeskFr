import React,{useEffect, useState} from "react";
import Pusher from "pusher-js";
import axios from "axios"
import $ from "jquery";
function Messages() {
    let info = sessionStorage.getItem("token");
   
  const token = JSON.parse(info);  
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  let info1 = sessionStorage.getItem("user");
  const userInfo = JSON.parse(info1);
    const [username, setUsername] = useState(userInfo.name);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    let allMessages = [];
    
    useEffect(() => {
        
        Pusher.logToConsole = true;

        const pusher = new Pusher('b6bfcd456ba13476ee6e', {
            cluster: 'eu'
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', function (data) {
            allMessages.push(data);
            setMessages(allMessages);
        });
    }, []);
//     setInterval(function(){
//         $("#yourDiv").load(window.location.href + " #yourDiv" );
//   }, 3000);
    const submit = async e => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/messages', {
            method: 'POST',
            headers: {'Content-Type': 'application/json','Authorization': `Bearer ${token}`},
            body: JSON.stringify({
                username,
                message
            })
        });

        setMessage('');
        console.log(messages)
    
    }

    return (
        <div className="container">
            <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
                <div
                    className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
                    <input className="fs-5 fw-semibold" disabled value={username}
                           onChange={(e)=> setUsername(e.target.value)}/>
                </div>
                <div className="list-group list-group-flush border-bottom scrollarea " id="yourDiv">
                    {messages.map(message => {
                        return (
                            <div className="list-group-item list-group-item-action py-3 lh-tight">
                                <div className="d-flex w-100 align-items-center justify-content-between">
                                    <strong className="mb-1">{message.username}</strong>
                                </div>
                                <div className="col-10 mb-1 small">{message.message}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <form onSubmit={e => submit(e)}>
                <input className="form-control" placeholder="Write a message" value={message}
                       onChange={(e)=> setMessage(e.target.value)}
                />
            </form>
        </div>
    );
}

export default Messages;