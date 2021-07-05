import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from "react-router-dom";

function Login(props) {
    //props will contain the users list from the store

    let history = useHistory();

    // const [state, setState] = useState({ email: "abc@abc.com", password: "123" });
    const [state, setState] = useState({ email: "", password: "" });
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="login_container">
            <div className="login_info">
                <h1>Create an account</h1>
                <p>Join us to today to benifit nothing</p>
                <Link className="loginBtn" to="/register">
                    REGISTER
                </Link>
            </div>
            <form id="form_login" className="login_form">
                <h2 className="form_title mt-40">Sign in to Create</h2>
                <small className="form_sub">Please Enter Your Login Information to Sign In</small>
                <div className="form">
                    <input type="text" placeholder="User Name (Email)" value={state.email} onChange={handleChange} name="email"></input>
                    <input type="password" placeholder="Password" value={state.password} onChange={handleChange} name="password"></input>
                </div>
                <button type="button" className="btn btn-login mt-40 mb-40" onClick={() => props.login(state, props, history)}>SIGN IN</button>

            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (state, props, history) => {
            if (validate('form_login')) {

                //validate user exisistance
                let isAuthenticated = false;
                let userIndex = -1;
                if (props.users) {
                    props.users.forEach((e, index) => {
                        if (e.email === state.email) {
                            if (e.password === state.password) {
                                isAuthenticated = true;
                                userIndex = index;
                            }
                        }
                    })
                }
                if (!isAuthenticated) {
                    alert('Please check your credintials, if you a new user please register!');
                    return;
                }
                //save user info into localstorage
                let obj = {
                    'userAuth': true,
                    userInfo: props.users[userIndex]
                }
                localStorage.setItem("user", JSON.stringify(obj))
                history.push("/home");
            }
        }
    }
}
// TODO: validate more for email patterens and re-password and special charachters
const validate = (formId) => {
    var elements = document.getElementById(formId).elements;

    for (var i = 0, element; element = elements[i++];) {
        if ((element.type === "text" || element.type === "email" || element.type === "password") && element.value === "") {
            element.classList.add('error');
        } else {
            element.classList.remove('error');
        }
    }
    if (document.getElementById(formId).getElementsByClassName('error').length) {
        return false;
    }
    return true;
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);