import React, {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {io} from "socket.io-client";
import makeToast from "./Toaster";
import register from "./pages/register";
import index from "./pages/index";
import Login from "./pages/Login/login";
import Dashboard from "./pages/dashboard";
import Chatroom from "./pages/Chatroom/chatroom";

function App() {
    const [socket, setSocket] = useState(null);
    const baseUrl="http://localhost:8000";

    const setupSocket = () => {
        const token = localStorage.getItem("token");
        if (token && !socket) {
            const newSocket = io(baseUrl, {
                query: {
                    token: localStorage.getItem("token"),
                },
            });
            newSocket.on("disconnect", () => {
                setSocket(null);
                setTimeout(setupSocket, 3000);
                makeToast("error", "socket disconnected!");
            });
            newSocket.on("connect", () => {
                makeToast("success", "socket connected...");
            });
            setSocket(newSocket);
        }
    };
    useEffect(() => {
        setupSocket();
    });
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"} component={index} exact/>
                <Route path="/login" render={() => <Login setupSocket={setupSocket}/>} exact/>
                <Route path={"/register"} component={register} exact/>
                <Route path={"/dashboard"} render={() => <Dashboard socket={socket}/>} exact/>
                <Route path={"/chatroom/:id"} render={() => <Chatroom socket={socket}/>} exact/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
