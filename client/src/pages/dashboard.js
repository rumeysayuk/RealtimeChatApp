import React, {useState, useEffect, createRef} from 'react';
import {Link, useHistory} from "react-router-dom";
import makeToast from "../Toaster";
import {logOut} from "../store/actions/auth";
import {useDispatch} from "react-redux";
import * as chatroomService from "../services/chatroomService";

const Dashboard = () => {
    const [chatrooms, setChatrooms] = useState([]);
    const nameRef = createRef();
    const history = useHistory();
    const dispatch = useDispatch();
    const getChatrooms = () => {
        chatroomService.getChatroom().then(res => {
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
        chatroomService.createChatroom(name).then((res) => {
            makeToast("success", res.data.message);
            setChatrooms([...chatrooms, res.data.chatroom])
        }).catch((err) => {
            makeToast("error", err.response?.data?.message);
        });
    }
    const handleLogOut = (e) => {
        e.preventDefault();
        dispatch(logOut())
        history.push("/Login")
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
            <button onClick={() => createChatroom()}>Create Chatroom</button>
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
            <button onClick={handleLogOut}>Çıkış yap</button>
        </div>
    );
};

export default Dashboard;
