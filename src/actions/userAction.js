import axios from 'axios'
import {
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    USER_SIGN_OUT,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS
} from '../constants/userConstants'


export const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } })
    try {
        const { data } = await axios.post('/api/users/login', { email, password })
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: message
        })
    }
}

export const register = (name, mobile, email, password) => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, mobile, email, password } })
    try {
        const { data } = await axios.post('http://127.0.0.1:5000/api/users/register', { name, mobile, email, password })
        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: message
        })
    }
}

export const signout = () => dispatch => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    dispatch({ type: USER_SIGN_OUT })
}

export const detailsUser = userId => async (dispatch, getState) => {
    dispatch({ type: USER_DETAILS_REQUEST, payload: userId })
    const { userSignin: { userInfo } } = getState()
    try {
        const { data } = await axios.get(`/api/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: message
        })
    }
}

export const profileUserUpdate = user => async (dispatch, getState) => {
    dispatch({ type: USER_UPDATE_REQUEST, payload: user })
    try {
        const { userSignin: { userInfo } } = getState()
        const { data } = await axios.put(`/api/users/profile`, {user}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })
        dispatch({
            type: USER_UPDATE_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: message
        })
    }
}