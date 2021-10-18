import React from 'react';
import makeToast from "../Toaster";
import {Link, useHistory, withRouter} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import * as authService from "../services/authService";
import {register} from "../store/actions/auth";
import {useDispatch} from "react-redux";
import * as Yup from "yup";

const Register = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const validationSchema = Yup.object({
        name: Yup.string().required("Zorunlu alan"),
        password: Yup.string().required("Zorunlu alan"),
        email: Yup.string().email('Geçersiz e-mail adresi').required('Zorunlu alan'),
    });

    const registerUser = (values) => {
        authService.register(values)
            .then((res) => {
                dispatch(register(res.data.result))
                makeToast("success", res.data.message);
                history.push("/Login");
            }).catch((err) => {
            if (err && err.res && err.res.data && err.res.data.message)
                makeToast("error", err.res.data.message);
        })
    };
    return (
        <div className="card">
            <div className="cardHeader">Register</div>
            <div className="cardBody">
                <Formik
                    initialValues={{name: "", email: "", password: ""}}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => registerUser(values)}>
                    <Form style={{margin: 20}}>
                        <Field name="name" id="name" type="text" placeholder="rumeysa"/>
                        <Field name="email" id="email" type="email" placeholder="ex@example.com"/>
                        <Field name="password" type="password" id="password" placeholder="Your Password"/>
                        <button type={"submit"} style={{marginBottom: 20}} onClick={registerUser}>Register</button>
                        <Link to={"/Login"}>
                            <button type={"submit"}>Login</button>
                        </Link>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};
export default withRouter(Register);
