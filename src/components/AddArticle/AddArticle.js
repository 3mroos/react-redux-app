import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

import FroalaEditorComponent from 'react-froala-wysiwyg';
import Froalaeditor from 'froala-editor';
Froalaeditor.DefineIcon('alert', { NAME: 'info', SVG_KEY: 'help' });
Froalaeditor.DefineIcon('clear', { NAME: 'remove', SVG_KEY: 'remove' });


function AddNewArticle(props) {
    //props will contain the users list from the store

    let history = useHistory();

    let [state, setState] = useState({
        user: JSON.parse(localStorage.getItem('user')).userInfo.email,
        title: props.articleToEdit ? props.articleToEdit.title : '',
        content: props.articleToEdit ? props.articleToEdit.content : '',
        date: props.articleToEdit ? props.articleToEdit.date : '',
        image: props.articleToEdit ? props.articleToEdit.image : '',
        imagePreview: props.articleToEdit ? props.articleToEdit.image : '',
    });
    let handleChange = e => {
        // text editor case
        if (!e.target) {
            setState(prevState => ({
                ...prevState,
                "content": e
            }));
            return;
        }
        let { name, value } = e.target;
        if (e.target.name === 'image') {
            getBase64();
        }
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    let getBase64 = () => {
        var file = document.querySelector('#imageFile').files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            document.querySelector('#imageFile').setAttribute('base64', reader.result);
            setState(prevState => ({
                ...prevState,
                imagePreview: reader.result
            }))
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    return (
        <form className="form" id="form_article">
            <input type="text" placeholder="Title" name="title" value={state.title} onChange={handleChange}></input>
            <div id="editor" className="mb-10">
                <FroalaEditorComponent onModelChange={(ev) => handleChange(ev)} name="content" model={state.content} tag='textarea' id="content" />
            </div>

            <input type="date" name="date" value={state.date} onChange={handleChange}></input>

            <div className="flex mb-10">
                <input type="file" className="h-100" placeholder="image" name="image" onChange={handleChange} id="imageFile" accept="image/png, image/gif, image/jpeg"></input>
                <img src={state.imagePreview} id="preview" alt="" className="h-100" />
            </div>

            <button type="button" className="btn btn-success" onClick={() => props.addArticle(state, props, history)}>{props.articleToEdit ? 'Edit Article' : 'Add New Article'}</button>
            {
                props.articleToEdit ? (
                    <button type="button" className="btn btn-info float-right" onClick={() => props.cancelEdit(history)}>Cancel Edit</button>
                ) : null
            }
        </form>
    )
}

const mapStateToProps = (state) => {
    return {
        articleToEdit: state.articles[state.editIndex]
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addArticle: (state, props, history) => {
            if (!validate('form_article', state)) {
                return;
            }
            let image = state.imagePreview || document.querySelector('#imageFile').attributes.base64.nodeValue;
            if (!validateImageSizeAndType(image)) {
                return false;
            }
            //save the new article
            let article = {
                user: state.user,
                title: state.title,
                content: state.content,
                date: state.date,
                image: image
            }
            const action = { type: props.articleToEdit ? 'Edit_Article' : 'Add_New_Article', payload: article };
            dispatch(action);
            props.setvisibility(false)

        },
        cancelEdit: (history) => {
            const action = { type: 'Cancel_Edit' };
            dispatch(action);
            history.go(0);
        }
    }
}
// TODO: validate more for email patterens and re-password and special charachters
const validate = (formId, state) => {
    var elements = document.getElementById(formId).elements;

    for (var i = 0, element; element = elements[i++];) {
        if ((element.type === "text" || element.type === "email" || element.type === "password" || element.type === "date") && element.value === "") {
            element.classList.add('error');
        } else {
            element.classList.remove('error');
        }
        if (element.type === 'file') {
            if (!state.imagePreview && !element.value) {
                element.classList.add('error');
            } else {
                element.classList.remove('error');
            }
        }
    }
    if (!document.querySelector("#editor").querySelector('textarea').value) {
        document.querySelector("#editor").classList.add('error');
    } else {
        document.querySelector("#editor").classList.remove('error');

    }
    if (document.getElementById(formId).getElementsByClassName('error').length) {
        return false;
    }
    return true;
}

function validateImageSizeAndType(base64) {
    let imageType = base64.split(';')[0].split('/')[1];
    if (imageType !== 'jpeg' && imageType !== 'png' && imageType !== 'gif' && imageType !== 'jpg') {
        alert('Please select an image file')
        return false;
    }
    base64.substring("data:image/".length, base64.indexOf(";base64"))
    base64 = base64.split(",")[1].split("=")[0];
    var strLength = base64.length;
    var fileLength = strLength - (strLength / 8) * 2;
    var filesize = Math.floor(fileLength / 1024);
    if (filesize > 4000) {
        alert('file must be < 4MB')
        return false;
    } else {
        return true;
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddNewArticle);

