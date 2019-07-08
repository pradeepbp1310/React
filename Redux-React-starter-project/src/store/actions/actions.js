export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const RESET = 'RESET';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';

export const increment = () => {
    return {
        type: INCREMENT
    }
}

export const decrement = () => {
    return {
        type: DECREMENT,
    }
}

export const add = (value) => {
    console.log(value)
    return {
        type: ADD,
        payload: value
    }
}

export const subtract = (value) => {
    return {
        type: SUBTRACT,
        payload: value
    }
}

export const reset = () => {
    return {
        type: RESET
    }
}

export const storeResult = (value) => {
    return {
        type: STORE_RESULT,
        payload: value
    }
}

export const deleteResult = (value) => {
    return {
        type: DELETE_RESULT,
        payload: value
    }
}
