import * as actionTypes from '../actions/actionTypes';

const initialValue = {
    orders: [],
    loading: false
}

const orders = (state = initialValue, action) => {
    console.log(action)
    switch (action.type) {
        case actionTypes.BURGER_PURCHASE_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.BURGER_PURCHASE_SUCCESS:
            return {
                ...state,
                orders: action.payload,
                loading: false
            }

        case actionTypes.BURGER_PURCHASE_FAIL:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}

export default orders;