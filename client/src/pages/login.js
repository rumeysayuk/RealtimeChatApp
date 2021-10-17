import React from 'react';
import makeToast from "../Toaster";
import {Formik, Field, Form} from "formik";
import {useDispatch} from "react-redux";
import {withRouter, useHistory, Link} from "react-router-dom";
import * as authService from "../services/authService";
import {login} from "../store/actions/auth";

const Login = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const loginUser = (values) => {
        authService.login(values)
            .then((res) => {
                dispatch(login(res.data))
                makeToast("success", res.data.message);
                history.push("/dashboard")
                props.setupSocket();

            }).catch((err) => {
            if (err && err.res && err.res.data && err.res.data.message)
                makeToast("error", err.res.data.message);
        })
    };
    return (
        <div className="card">
            <div className="cardHeader">Login</div>
            <div className="cardBody">
                <Formik
                    initialValues={{email: "", password: ""}}
                    onSubmit={async (values) => loginUser(values)}>
                    <Form style={{margin: 20}}>
                        <Field name="email" id="email" type="email" placeholder="ex@example.com"/>
                        <Field name="password" type="password" id="password" placeholder="Your Password"/>
                        <button type={"submit"} style={{marginBottom: 20}} onClick={loginUser}>Login</button>
                        <Link to={"/register"}>
                            <button type={"submit"}>Register</button>
                        </Link>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default withRouter(Login);
