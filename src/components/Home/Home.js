import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import Header from '../Header/Header'

import AddNewArticle from '../AddArticle/AddArticle'

function Home(props) {
    //props will contain the users list from the store

    const [visibility, setVisibility] = useState(false);

    let history = useHistory();
    let userObj = JSON.parse(localStorage.getItem('user'))
    if (!userObj) {
        history.push("/")
    }

    return (
        <div className="container">
            <Header />

            <button className="btn mt-10 mb-10" onClick={() => setVisibility(!visibility)}>Add new Article</button>
            {
                (visibility) ? <AddNewArticle setvisibility={setVisibility} /> : null
            }
            {

                props.articles.map((e, index) => {
                    return (
                        <div className="card" key={index}>
                            <img src="delete_icon.png" className="icon deleteIcon" title="Delete Article" alt="" onClick={() => props.deleteArticle(e)}></img>
                            <img src="edit_icon.png" className="icon editIcon" title="Edit Article" alt="" onClick={() => props.editArticle(index, setVisibility)}></img>
                            <img className="article_img" src={e.image} alt="" />
                            <div className="card_text">
                                <div className="flex align-center ">
                                    <h2>{e.title}</h2>
                                    <small className="margin-auto">{e.date}</small>
                                </div>
                                <p dangerouslySetInnerHTML={{ __html: e.content }}></p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        articles: state.articles,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteArticle: (article) => {
            const action = { type: 'Delete_Article', payload: article };
            dispatch(action);

        },
        editArticle: (index, setVisibility) => {
            setVisibility(false);
            const action = { type: 'Edit_Article_Marker', payload: index };
            dispatch(action);
            setTimeout(() => {
                window.scrollTo(0, 0)
                setVisibility(true);
            }, 50);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);