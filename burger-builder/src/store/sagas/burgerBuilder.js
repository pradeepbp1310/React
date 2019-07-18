import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import { setIngredient, fetchIngredientFailed } from '../actions/burgerBuilder';

export function* initIngredientSaga() {
    try {
        const response = yield axios.get('/ingredients.json');
        yield put(setIngredient(response.data));
    }
    catch (error) {
        yield put(fetchIngredientFailed());
    }
}