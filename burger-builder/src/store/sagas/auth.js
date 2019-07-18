import { delay } from 'redux-saga/effects';
import { put } from 'redux-saga/effects';
import { logoutSucceed, authLogout, authStart, authSuccess, checkAuthTimeOut, authFail } from '../actions/auth';
import axios from 'axios';

export function* logoutSaga() {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expiresIn * 1000);
    yield put(authLogout());
}

export function* authUserSaga(action) {
    yield put(authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDQ4ojNz6fqtS7rtqO5KpiLowxHoyikBfE';
    if (!action.isSginup) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDQ4ojNz6fqtS7rtqO5KpiLowxHoyikBfE'
    }

    try {
        const response = yield axios.post(url, authData);
        yield localStorage.setItem('token', response.data.idToken);
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(authSuccess(response.data.idToken, response.data.localId));
        yield put(checkAuthTimeOut(response.data.expiresIn))
    }
    catch (error) {
        yield put(authFail(error.response.data.error));
    }

}

export function* authCheckStateSaga() {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(authLogout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expirationDate <= new Date()) {
            yield put(authLogout());
        }
        else {
            const userId = yield localStorage.getItem('userId');
            yield put(authSuccess(token, userId));
            yield put(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000))
        }
    }
}