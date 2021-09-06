import React, {createRef} from 'react';
import makeToast from "../Toaster";
import axios from "axios";
import {withRouter, useHistory} from "react-router-dom";

const Login = (props) => {
    const emailRef = createRef();
    const history = useHistory();
    const passwordRef = createRef();

    const loginUser = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios.post("http://localhost:8000/user/login", {
            email,
            password,
        })
            .then((res) => {
              //res.data.messag
                makeToast("success", "Başarılı işleeeem");
                localStorage.setItem("token", res.data.token);
                history.push("/dashboard");
                props.setupSocket();
            })
            .catch((err) => {
                console.log(err)
                if (err && err.res && err.res.data && err.res.data.message)
                    makeToast("error", err.res.data.message);
            });
    };
    return (
        <div className="card">
            <div className="cardHeader">Login</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" placeholder="ex@example.com" ref={emailRef}/>
                </div>
                <div className="inputGroup">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="Your Password" ref={passwordRef}/>
                </div>
                <button onClick={loginUser}>Login</button>
            </div>
        </div>
    );
};


export default withRouter(Login);
