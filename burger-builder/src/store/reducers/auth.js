import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    error: null,
    loading: false,
    token: null,
    userId: null,
    authRedirectPath: '/'
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.userId,
        token: action.token,
        loading: false,
        error: null
    })
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state) => {
    return updateObject(state, {
        token: null,
        userId: null
    })
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.authRedirectPath
    })
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return updateObject(state, { loading: true, error: null });
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
        default:
            return state
    }
}

export default authReducer;