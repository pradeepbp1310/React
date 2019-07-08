import * as actionTypes from '../actions/actions';
const intialState = {
    result: [],
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                result: state.result.concat({ value: action.counter, id: new Date() })

            }
        case actionTypes.DELETE_RESULT:
            return {
                ...state,
                result: state.result.filter(res => res.id !== action.resId)
            }
        default:
            return state;
    }
}

export default reducer;