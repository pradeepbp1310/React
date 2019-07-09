import * as actionTypes from './actionTypes';

const saveResult = (res) => {
    return {
        type: actionTypes.STORE_RESULT,
        payload: res
    }
}
export const storeResult = (res) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(saveResult(res))
        }, 2000)
    }
}

export const deleteResult = (value) => {
    return {
        type: actionTypes.DELETE_RESULT,
        payload: value
    }
}
