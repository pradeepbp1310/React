import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialValue = {
    orders: [],
    loading: false,
    purchased: false
}

const orders = (state = initialValue, action) => {
    switch (action.type) {
        case actionTypes.BURGER_PURCHASE_START:
            return updateObject(state, { loading: true, purchased: false })
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
            return updateObject(state, { loading: true })
        case actionTypes.BURGER_PURCHASE_ONINIT:
            return updateObject(state, { loading: false })
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state, { loading: true })
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state, { loading: false, orders: action.orders })
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state, { loading: false })
        default:
            return state
    }
}

export default orders;