import apiAxios from "../lib/axios/axios";
import * as actionTypes from "../store/actionTypes"

export const login = (data) => apiAxios.post("user/Login", data)
export const register = (data) => apiAxios.post("user/register", data)
export const logOut = () =>  (dispatch) => {
    dispatch({type: actionTypes.LOG_OUT})
}
