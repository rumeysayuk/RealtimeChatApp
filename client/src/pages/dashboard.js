import React, {useState, useEffect, createRef} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import makeToast from "../Toaster";
const baseUrl="http://localhost:8000/chatroom";

const Dashboard = (props) => {
    const [chatrooms, setChatrooms] = useState([]);
    const nameRef = createRef();
    const getChatrooms = () => {
        axios.get(baseUrl, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then(res => {
                setChatrooms(res.data.data);
            })
            .catch(err => {
                console.log(err.message)
            });
    };
    useEffect(() => {
        getChatrooms();
    }, []);

    const createChatroom = () => {
        const name = nameRef.current.value;
        axios.post(baseUrl, {
            name,
        })
            .then((response) => {
                makeToast("success", response.data.message);
                props.history.push("/dashboard");
            })
            .catch((err) => {
                makeToast("error", err.response?.data?.message);
            });
    }
    return (
        <div className="card">
            <div className="cardHeader">ChatRooms</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="chatroomName">Chatroom Name</label>
                    <input type="text" name="chatroomName" id="chatroomName" placeholder="Chocolate12" ref={nameRef}/>
                </div>
            </div>
            <button onClick={createChatroom}>Create Chatroom</button>
            <div className="chatrooms">
                {chatrooms.map(chatroom => (
                    <div key={chatroom._id} className="chatroom">
                        <div>{chatroom.name}</div>
                        <Link to={"/chatroom/" + chatroom._id}>
                            <div className="join">Katıl</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
