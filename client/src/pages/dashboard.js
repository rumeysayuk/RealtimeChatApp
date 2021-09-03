import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";


const Dashboard = (props) => {
    const [chatrooms, setChatrooms] = useState([]);

    const getChatrooms = () => {
        axios.get("http://localhost/8000/chatroom", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("CC_Token"),
            },
        })
            .then(res => {
                setChatrooms(res.data);
            })
            .catch(err => {
                setTimeout(getChatrooms, 3000);
            });
    };
    useEffect(() => {
        getChatrooms();

    }, []);
    return (
        <div className="card">
            <div className="cardHeader">ChatRoom Create</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="chatroomName">Name</label>
                    <input type="text" name="chatroomName" id="chatroomName" placeholder="Chocolate12"/>
                </div>
            </div>
            <button>Create Chatroom</button>
            <div className="chatrooms">
                {chatrooms.map(chatroom => (
                    <div key={chatroom._id} className="chatroom">
                        <div>{chatroom.name}</div>
                        <Link to={"/chatroom/" + chatroom._id}>
                            <div className="join">Join</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Dashboard;
