import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const burgerPurchaseFail = (value) => {
    return {
        type: actionTypes.BURGER_PURCHASE_FAIL,
        payload: value
    }
}

const burgerPurchaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.BURGER_PURCHASE_SUCCESS,
        orderData: orderData,
        id: id
    }
}

const burgerPurchaseStart = () => {
    return {
        type: actionTypes.BURGER_PURCHASE_SUCCESS,
    }
}

export const burgerPurchase = (orderData, token) => {
    return (dispatch, getState) => {
        console.log(getState);
        dispatch(burgerPurchaseStart());
        axios.post('/orders.json?auth=' + token, orderData).then(res => {
            dispatch(burgerPurchaseSuccess(res.data.name, orderData))
        }, err => {
            dispatch(burgerPurchaseFail())
        })
    }
}

export const purchaseOnInit = () => {
    return {
        type: actionTypes.BURGER_PURCHASE_ONINIT,
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSucess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = () => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL
    }
}

export const fetchOrders = (token) => {
    return (dispatch, getState) => {
        console.log(getState());
        console.log(token);
        dispatch(fetchOrdersStart());
        axios.get('/orders.json?auth=' + token).then(res => {
            console.log(res.data)
            let orders = [];
            for (let ing in res.data) {
                orders.push({
                    ...res.data[ing],
                    id: ing
                })
            }
            dispatch(fetchOrdersSucess(orders));
        }).catch(err => {
            dispatch(fetchOrdersFail())
        })
    }
}