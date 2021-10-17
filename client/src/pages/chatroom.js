import React, {useState, useEffect, useRef} from "react";
import {Link, withRouter} from "react-router-dom";
import makeToast from "../Toaster";
import ChatroomMessage from "../components/chatroomMessage/chatroomMessage";
import * as chatroomService from "../services/chatroomService"

const Chatroom = ({match, socket}) => {
    const chatroomId = match.params.id;
    const [messages, setMessages] = useState([]);
    const messageRef = useRef();
    const [userId, setUserId] = useState("");
    const sendMessage = () => {
        if (socket) {
            socket.emit("chatroomMessage", {
                chatroomId,
                message: messageRef.current.value,
            });
            messageRef.current.value = "";
        }
    };
    useEffect(() => {
        if (chatroomId){
            chatroomService.getMessages(chatroomId).then((res)=>{
                setMessages(res.data.data)
            }).catch((err)=>{
                makeToast("error", err.response?.data?.message)
            })
        }
    }, [chatroomId])
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (socket) {
            socket.emit("joinRoom", {
                chatroomId,
            });
            if (token) {
                const payload = JSON.parse(atob(token.split(".")[1]));
                setUserId(payload.id);
            }
            if (socket) {
                socket.on("newMessage", (message) => {
                    const newMessages = [...messages, message];
                    setMessages(newMessages);
                });
            }
        }
        return () => {
            if (socket) {
                socket.emit("leaveRoom", {
                    chatroomId,
                });
            }
        };
    }, [messages]);

    return (
        <div className="chatroomPage">
            <div className="chatroomSection">
                <div className="cardHeader">Chatroom Name</div>
                <div className="chatroomContent">
                    {messages.map((message) => (
                        <ChatroomMessage userId={userId} message={message}/>
                    ))}
                </div>
                <div className="chatroomActions">
                    <div>
                        <input type="text" name="message" placeholder="Say something!" ref={messageRef}/>
                    </div>
                    <div>
                        <button className="join" onClick={sendMessage}>Send</button>
                    </div>
                    <Link to={"/dashboard"}>
                        <button>All Chatrooms</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Chatroom);
