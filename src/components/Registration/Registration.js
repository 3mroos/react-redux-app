import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from "react-router-dom";

function Registration(props) {
    //props will contain the users list from the store

    let history = useHistory();
    // const [state, setState] = useState({ fname: "Imran", lname: "Sababheh", email: "abc@abc.com", password: "123" });
    const [state, setState] = useState({
        fname: "",
        lname: "",
        email: "",
        password: ""
    });
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
                <h1>Welcome Back !</h1>
                <p>Have an account ? Sign In here</p>
                <Link className="loginBtn" to="/">
                    SIGN IN
                </Link>
            </div>
            <form id="form_registration" className="login_form">
                <h2 className="form_title">Create Account</h2>
                <small className="form_sub">Please Enter Your Personal Information to Sign Up</small>
                <div className="form">
                    <input type="text" placeholder="First Name" value={state.fname} onChange={handleChange} name="fname"></input>
                    <input type="text" placeholder="Last Name" value={state.lname} onChange={handleChange} name="lname"></input>
                    <input type="text" placeholder="User Name (Email)" value={state.email} onChange={handleChange} name="email"></input>
                    <input type="password" placeholder="Password" value={state.password} onChange={handleChange} name="password"></input>
                </div>
                <button type="button" className="btn btn-login" onClick={() => props.register(state, props, history)}>Register</button>

            </form>
        </div>
    )
}
const mapStateToProps = (state) => {
    console.log(state);
    return {
        users: state.users,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        register: (state, props, history) => {
            if (validate('form_registration')) {

                //validate user uniqueness
                let valid = true;
                if (props.users) {
                    props.users.forEach((e) => {
                        if (e.email === state.email) valid = false;
                    })
                }
                if (!valid) {
                    alert('This email address already registered, please login!');
                    return;
                }
                let newUser = {
                    fname: state.fname,
                    lname: state.lname,
                    email: state.email,
                    password: state.password
                }
                const action = { type: 'Add_New_User', payload: newUser };
                dispatch(action);

                history.push("/");
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
    if (document.getElementById('form_registration').getElementsByClassName('error').length) {
        return false;
    }
    return true;
}
export default connect(mapStateToProps, mapDispatchToProps)(Registration);