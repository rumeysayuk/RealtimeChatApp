import React, {createRef} from 'react';
import makeToast from "../Toaster";
import axios from "axios";

const Register = (props) => {
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();

    const registerUser = (props) => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios
            .post("http://localhost:8000/user/register", {
                name,
                email,
                password,
            })
            .then((response) => {
                makeToast("success", response.data.message);
                props.history.push("/login");
            })
            .catch((err) => {
                // console.log(err);
                if (err && err.response && err.response.data && err.response.data.message)
                    makeToast("error", err.response.data.message);
            });
    };
    return (
        <div className="card">
            <div className="cardHeader">Register</div>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" placeholder="rumoo" ref={nameRef}/>
                </div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder="ex@example.com" ref={emailRef}/>
            </div>
            <div className="inputGroup">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Your Password" ref={passwordRef}/>
            </div>
            <button onClick={registerUser}>Register</button>
        </div>
    );
};
export default Register;
