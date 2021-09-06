import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";

const Index = (props) => {
    const history = useHistory();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            history.push("/login");
        } else {
            history.push("/dashboard");
        }
    }, [0]);
    return (
        <div></div>
    )
}

export default Index;
