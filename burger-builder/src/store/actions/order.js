import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const burgerPurchaseFail = (value) => {
    return {
        type: actionTypes.BURGER_PURCHASE_FAIL,
        payload: value
    }
}

const burgerPurchaseSuccess = (value) => {
    return {
        type: actionTypes.BURGER_PURCHASE_SUCCESS,
        payload: value
    }
}

const burgerPurchaseStart = () => {
    return {
        type: actionTypes.BURGER_PURCHASE_SUCCESS,
    }
}

export const burgerPurchase = (data) => {
    return dispatch => {
        dispatch(burgerPurchaseStart());
        axios.post('/orders.json', data).then(res => {
            dispatch(burgerPurchaseSuccess(res.data))
        }, err => {
            dispatch(burgerPurchaseFail())
        })
    }
}