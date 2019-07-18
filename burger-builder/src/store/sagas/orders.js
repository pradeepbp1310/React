import { put } from 'redux-saga/effects';
import { burgerPurchaseStart, burgerPurchaseSuccess, burgerPurchaseFail, fetchOrdersStart, fetchOrdersSucess, fetchOrdersFail } from '../actions/order';
import axios from '../../axios-orders';

export function* burgerPurchaseSaga(action) {
    yield put(burgerPurchaseStart());
    try {
        yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(burgerPurchaseSuccess());
    }
    catch (error) {
        put(burgerPurchaseFail());
    }
}

export function* fetchOrdersSaga(action) {
    yield put(fetchOrdersStart());
    try {
        const queryParams = yield '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
        const response = yield axios.get('/orders.json' + queryParams);
        let orders = [];
        for (let ing in response.data) {
            yield orders.push({
                ...response.data[ing],
                id: ing
            })
        }
        yield put(fetchOrdersSucess(orders));
    }
    catch (err) {
        yield put(fetchOrdersFail())
    }
}