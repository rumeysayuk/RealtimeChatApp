import React from 'react';
import makeToast from "../../Toaster";
import {useFormik} from 'formik';
import {useDispatch} from "react-redux";
import {withRouter, useHistory} from "react-router-dom";
import * as authService from "../../services/authService";
import {login} from "../../store/actions/auth";
import * as Yup from 'yup';
import useStyles from "./styles"

const Login = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const classes=useStyles();
    const validationSchema = Yup.object({
        password: Yup.string().required("Zorunlu alan"),
        email: Yup.string().email('Geçersiz e-mail adresi').required('Zorunlu alan'),
    });
    const {handleSubmit, handleChange, values, errors} = useFormik({
        initialValues: {
            password: '',
            email: '',
        },
        validationSchema,
        onSubmit: values => {
            loginUser(values)
        },
    });

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
        <div className={classes.card}>
            <div className="cardHeader">Login</div>
            <div className="cardBody">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        placeholder="E-mail"
                        onChange={handleChange}
                        values={values.email}
                        className={classes.input}
                    />
                    {errors.email ? errors.email : null}
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        values={values.password}
                        className={classes.input}

                    />
                    {errors.password ? errors.password : null}
                    <button type="submit">Kayıt Ol</button>
                </form>
            </div>
        </div>
    );
};

export default withRouter(Login);
