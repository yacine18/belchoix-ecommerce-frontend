import axios from 'axios'
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS
} from '../constants/productConstants'

export const listProduct = ({name = ''}) => async (dispatch) => {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    try {
        const { data } = await axios.get(`http://localhost:5000/api/products?name=${name}`)
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: message
        })
    }
}

export const detailsProduct = productId => async dispatch => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId })
    try {
        const {data} = await axios.get(`/api/products/${productId}`)
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: message
        })
    }
}