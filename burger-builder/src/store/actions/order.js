import * as actionTypes from './actionTypes';

export const burgerPurchaseFail = (value) => {
    return {
        type: actionTypes.BURGER_PURCHASE_FAIL,
        payload: value
    }
}

export const burgerPurchaseSuccess = () => {
    return {
        type: actionTypes.BURGER_PURCHASE_SUCCESS,
        // orderData: orderData,
        // id: id
    }
}

export const burgerPurchaseStart = () => {
    return {
        type: actionTypes.BURGER_PURCHASE_SUCCESS,
    }
}

export const burgerPurchase = (orderData, token) => {
    return {
        type: actionTypes.BURGER_PURCHASE,
        orderData, token
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

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        token, userId
    }
}