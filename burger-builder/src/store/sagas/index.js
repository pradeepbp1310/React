import { takeEvery } from 'redux-saga/effects';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import * as actionTypes from '../actions/actionTypes';
import { initIngredientSaga } from './burgerBuilder';
import { burgerPurchaseSaga, fetchOrdersSaga } from './orders';



export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_LOGOUT_INITIATE, logoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.CHECK_AUTH_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENT, initIngredientSaga)
}

export function* watchOrders() {
    yield takeEvery(actionTypes.BURGER_PURCHASE, burgerPurchaseSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);

}