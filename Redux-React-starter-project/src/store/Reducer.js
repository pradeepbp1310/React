import * as actionTypes from './actions/actionTypes';
const intialState = {
    counter: 0,
    result: []
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter + 1
            }
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            }
        case actionTypes.ADD:
            return {
                ...state,
                counter: (state.counter + action.payload.value)
            }

        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: (state.counter - action.payload.value)
            }
        case actionTypes.RESET:
            return {
                ...state,
                counter: 0
            }
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                result: state.result.concat({ value: state.counter, id: new Date() })

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