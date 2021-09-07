import React, {useState, useEffect, createRef} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import makeToast from "../Toaster";


const Dashboard = (props) => {
    const [chatrooms, setChatrooms] = useState([]);
    const nameRef = createRef();
    const getChatrooms = () => {
        axios.get("http://localhost/8000/chatroom", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
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
    const createChatroom = () => {
        const name = nameRef.current.value;
        axios.post("http://localhost:8000/chatroom", {
            name,
        })
            .then((response) => {
                console.log(response)
                makeToast("success", response.data.message);
                props.history.push("/dashboard");
            })
            .catch((err) => {
                 console.log(err);
                if (err && err.response && err.response.data && err.response.data.message)
                    makeToast("error", err.response.data.message);
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
