import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';
const intialState = {
    result: [],
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return updateObject(state, { result: state.result.concat({ value: action.payload, id: new Date() }) })

        case actionTypes.DELETE_RESULT:
            return updateObject(state, { result: state.result.filter(res => res.id !== action.payload) })
        default:
            return state;
    }
}

export default reducer;