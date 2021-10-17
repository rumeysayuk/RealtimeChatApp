import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";

const Index = () => {
    const history = useHistory();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            history.push("/login");
        } else {
            history.push("/dashboard");
        }
    });
    return (
        <div></div>
    )
}

export default Index;
