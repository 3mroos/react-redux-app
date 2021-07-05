const reducer = (state =5, action) => {
    return {
        FirstName: action,
        LastName: null,
        UserName: null,
        Password: null,
    }
}
export default reducer;