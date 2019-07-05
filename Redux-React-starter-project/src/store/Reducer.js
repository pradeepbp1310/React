const intialState = {
    counter: 0,
    result: []
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                ...state,
                counter: state.counter + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                counter: state.counter - 1
            }
        case 'ADD':
            return {
                ...state,
                counter: (state.counter + action.payload.value)
            }

        case 'SUBSTRACT':
            return {
                ...state,
                counter: (state.counter - action.payload.value)
            }
        case 'RESET':
            return {
                ...state,
                counter: 0
            }
        case 'STORE_RESULT':
            return {
                ...state,
                result: state.result.concat({ value: state.counter, id: new Date() })

            }
        case 'DELETE_RESULT':
            return {
                ...state,
                result: state.result.filter(res=> res.id !== action.resId)
            }
        default:
            return state;
    }
}

export default reducer;