import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
function Header(props) {

    const userInfo = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).userInfo : {};
    const [state] = useState({ userInfo: userInfo });

    let history = useHistory();
    const logout = function () {
        history.push("/");
        localStorage.removeItem('user');
        setTimeout(() => {
        }, 500);
    }
    return (
        <div className="header">
            <div className="logo">
                <img src="logo.png" alt=""></img>
            </div>
            <div className="info">
                <img src="logout.png" onClick={logout} className="logoutIcon" title="Sign out" alt=""></img>
                <span>{state.userInfo.fname}</span>
                <span className="rounded"></span>
            </div>
        </div>
    )

}
export default Header;