import { createStore } from 'redux';

const initialState = {
    users: JSON.parse(localStorage.getItem('users')) ? JSON.parse(localStorage.getItem('users')) : [],
    articles: JSON.parse(localStorage.getItem('articles')) ? JSON.parse(localStorage.getItem('articles')) : [],
    editIndex: -1
}
const reducer = (state = initialState, action) => {
    console.log(`reducer->`, action);
    let copy = Object.assign({}, state);
    switch (action.type) {
        case "Add_New_User":
            copy.users = [...copy.users, action.payload];
            localStorage.setItem('users', JSON.stringify(copy.users)); //save users into local storage
            return copy;
        case "Add_New_Article":
            copy.articles = [action.payload, ...copy.articles];
            localStorage.setItem('articles', JSON.stringify(copy.articles))
            return copy;
        case "Delete_Article":
            copy.articles = copy.articles.filter(article => article.content !== action.payload.content && article.title !== action.payload.title);
            localStorage.setItem('articles', JSON.stringify(copy.articles))
            return copy;
        case "Edit_Article_Marker":
            copy.editIndex = action.payload;
            return copy;
        case "Edit_Article":
            copy.articles[copy.editIndex] = action.payload;
            localStorage.setItem('articles', JSON.stringify(copy.articles))
            copy.editIndex = -1
            return copy;
        case "Cancel_Edit":
            copy.editIndex = -1
            return copy;
        default:
            return state
    }
}
const store = createStore(reducer);

export default store;