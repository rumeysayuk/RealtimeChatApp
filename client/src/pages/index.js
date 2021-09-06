import React, {useEffect} from 'react';

const Index = (props) => {
    useEffect(() => {
        const token = localStorage.getItem("CC_Token");
        if (!token) {
            props.history.push("/login");
        } else {
            props.history.push("/dashboard");
        }
    }, [0]);
    return (
        <div></div>
    )
}

export default Index;
