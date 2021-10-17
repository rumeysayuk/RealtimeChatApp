import * as actionTypes from "../actionTypes";
// import * as localStorageService from "../../services/localStorageService"
const authReducer = (state = {authData: null, token: null}, action) => {
    switch (action.type) {
        case actionTypes.AUTH:
            localStorage.setItem("token", action.data.token);
            return {...state, authData: action.data.result, token: action.data.token};
        case actionTypes.LOG_OUT:
            localStorage.removeItem("token");
            return {...state, authData: null}
        case actionTypes.GET_USER:
            localStorage.getItem("token")
            return {...state, authData: action.data}
        default:
            return state;
    }
}

export default authReducer;
