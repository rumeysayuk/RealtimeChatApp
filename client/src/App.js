import {useState, useEffect} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import login from "./pages/login";
import register from "./pages/register";
import index from "./pages";
import dashboard from "./pages/dashboard";
import chatroom from "./pages/chatroom";
import {io} from "socket.io-client";
import makeToast from "./Toaster";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Chatroom from "./pages/chatroom";

function App() {
    const [socket, setSocket] = useState(null);
    const setupSocket = () => {
        const token = localStorage.getItem("CC_Token");
        if (token  && !socket) {
            const newSocket = io("http://localhost/8000", {
                query: {
                    token: localStorage.getItem("CC_Token"),
                },
            });
            newSocket.on("disconnect", () => {
                setSocket(null);
                setTimeout(setupSocket, 3000);
                makeToast("error", "socket disconnected!");
            });
            newSocket.on("connect", () => {
                makeToast("success", "socket connected");
            });
            setSocket(newSocket);
        }
    };
    useEffect(() => {
        setupSocket();
    }, []);
    return (
        <BrowserRouter>
            <Switch>
                <Route path={"/"} component={index} exact/>
                <Route path={"/login"} render={() => <Login setupSocket={setupSocket}/>} exact/>
                <Route path={"/register"} component={register} exact/>
                <Route path={"/dashboard"} render={() => <Dashboard socket={socket}/>} exact/>
                <Route path={"/chatroom/:id"} render={() => <Chatroom socket={socket}/>} exact/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
