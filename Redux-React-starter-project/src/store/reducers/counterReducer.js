import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const intialState = {
    counter: 0,
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT:
            return updateObject(state, { counter: state.counter + 1 });
        case actionTypes.DECREMENT:
            return updateObject(state, { counter: state.counter - 1 });
        case actionTypes.ADD:
            return updateObject(state, { counter: (state.counter + action.payload.value) });
        case actionTypes.SUBTRACT:
            return updateObject(state, { counter: (state.counter - action.payload.value) });
        case actionTypes.RESET:
            return updateObject(state, { counter: 0 });
        default:
            return state;
    }
}

export default reducer;