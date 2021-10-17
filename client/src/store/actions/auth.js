import * as actionTypes from "../actionTypes";

export const login = (data) => async (dispatch) => dispatch({type: actionTypes.AUTH, data})
export const register = (data) => async (dispatch) => dispatch({type: actionTypes.AUTH, data})

export const logOut = () => async (dispatch) => {
    dispatch({type: actionTypes.LOG_OUT});
}
