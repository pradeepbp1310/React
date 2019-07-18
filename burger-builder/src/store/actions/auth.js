import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_INITIATE
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = expiresIn => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expiresIn: expiresIn
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
        token: null,
        userId: null
    }
}

export const auth = (email, password, isSginup) => {
    return {
        type: actionTypes.AUTH_USER,
        email, password, isSginup
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        authRedirectPath: path
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.CHECK_AUTH_STATE
    }
}