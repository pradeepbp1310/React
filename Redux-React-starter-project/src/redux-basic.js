const redux = require('redux');

// Reducers
const initialState = {
    count: 0
}

const rootReducer = (state = initialState, action) => {
    if (action.type == 'INC_COUNTER') {
        return {
            ...state,
            count: state.count + 1
        }
    }
    if (action.type === 'ADD_COUNTER') {
        return {
            ...state,
            count: state.count + action.payload.value
        }
    }
    return state;
}

// Store
const store = redux.createStore(rootReducer)
console.log(store.getState());

// Subscription
store.subscribe(() => {
    console.log('store.subscribe(): ', store.getState())
})

// Dispatching Actions
store.dispatch({ type: 'INC_COUNTER' });
store.dispatch({ type: 'ADD_COUNTER', payload: { value: 100 } });
console.log(store.getState());