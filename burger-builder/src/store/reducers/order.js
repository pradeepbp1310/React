import * as actionTypes from '../actions/actionTypes';

const initialValue = {
    orders: [],
    loading: false,
    purchased: false
}

const orders = (state = initialValue, action) => {
    console.log(action)
    switch (action.type) {
        case actionTypes.BURGER_PURCHASE_START:
            return {
                ...state,
                loading: true,
                purchased: false
            }
        case actionTypes.BURGER_PURCHASE_SUCCESS:
            const newOrder = { ...state.orders };
            return {
                ...state,
                orders: newOrder.concat(action.orderData),
                loading: false,
                id: action.id,
                purchased: true
            }

        case actionTypes.BURGER_PURCHASE_FAIL:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.BURGER_PURCHASE_ONINIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default orders;