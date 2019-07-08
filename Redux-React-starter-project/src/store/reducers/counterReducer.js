import * as actionTypes from '../actions/actions';
const intialState = {
    counter: 0,
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
        default:
            return state;
    }
}

export default reducer;