import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';

function Registration(props) {
    const [state, setState] = useState({ fname: "", lname: "", email: "", password: "" });
    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <form id="form_registration">
            <div className="userImage">
                <img src="userimage.png"></img>
            </div>
            <div className="form">
                <input type="text" placeholder="First Name" value={props.fname} onChange={props.inputChanged} id="fname"></input>
                <input type="text" placeholder="Last Name" value={props.lname} onChange={props.inputChanged} id="lname"></input>
                <input type="text" placeholder="User Name (Email)" value={props.email} onChange={props.inputChanged} id="email"></input>
                <input type="password" placeholder="Password" value={props.password} onChange={props.inputChanged} id="password"></input>
            </div>
            <button type="button" className="btn btn-primary" onClick={register}>Register</button>
        </form>
    )
}
const mapStateToProps = (state) => {
    return {
        fname: state.registration.fname,
        lname: state.registration.lname,
        email: state.registration.email,
        password: state.registration.password
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        inputChanged: (e) => {
            console.log('changed', e.target.value);
            const action = { type: e.target.getAttribute("id"), text: e.target.value };
            dispatch(action);
        }
    }
}
const register = (props) => {
    if (validate('form_registration')) {
        alert('register')
    }
}

// TODO: validate more for email patterens and re-password and special charachters
const validate = (formId) => {
    var elements = document.getElementById(formId).elements;

    for (var i = 0, element; element = elements[i++];) {
        if ((element.type === "text" || element.type === "email" || element.type === "password") && element.value == "") {
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