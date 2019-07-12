import * as actionTypes from './actionTypes';
import axios from 'axios';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const getExpirationTime = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout())
        }, expiresIn * 1000)
    }
}

const authSuccess = (res) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: res.idToken,
        userId: res.localId
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
        token: null,
        userId: null
    }
}

export const auth = (email, password, isSginup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email,
            password,
            returnSecureToken: true
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDQ4ojNz6fqtS7rtqO5KpiLowxHoyikBfE';
        console.log(isSginup)
        if (!isSginup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDQ4ojNz6fqtS7rtqO5KpiLowxHoyikBfE'
        }

        axios.post(url, authData).then(response => {
            console.log(response)
            dispatch(authSuccess(response.data));
            dispatch(getExpirationTime(response.data.expiresIn))
        })
            .catch(err => {
                console.log(err)
                dispatch(authFail(err.response.data.error));
            })
    }
}