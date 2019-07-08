import * as actionTypes from '../actions/action';

const initialState = {
    price: 0
}

const price = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PRICE:
            return {
                ...state,
                price: action.value
            }
        default:
            return state
    }
}

export default price;