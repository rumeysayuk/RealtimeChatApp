import React, {useEffect, useState, createRef} from 'react';
import {withRouter} from "react-router-dom";

const Chatroom = ({match, socket}) => {
    const chatroomId = match.params.id;
    const [messages, setMessages] = useState([]);
    const messageRef = createRef();
    const sendMessage = () => {
        if (socket) {
            socket.emit("chatroomMessage", {
                chatroomId,
                message: messageRef.current.value,
            })
        }
    }


    useEffect(() => {
        if (socket) {
            socket.emit("joinRoom", {
                chatroomId,
            });
            socket.on("newMessage", ({message}) => {
                setMessages([...messages, message]);
            });
        }

        return () => {
            if (socket) {
                socket.emit("leaveRoom", {
                    chatroomId,
                });
            }

        };

    }, [])
    return (
        <div className="chatroomPage">
            <div className="chatroomSection">
                <div className="cardHeader">Chatroom Name</div>
                <div className="chatroomContent">
                    {messages.map((message,i) => (
                        <div key={chatroomId} className="message">
                            <span className="otherMessage">{message.name}:</span>{" "}
                            {message.message}
                        </div>
                    ))}

                </div>
                <div className="chatroomActions">
                    <div>
                        <input type="text" name="message" placeholder="Say something!" ref={messageRef}/>
                    </div>
                    <div>
                        <button className="join" onClick={sendMessage}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(Chatroom);
