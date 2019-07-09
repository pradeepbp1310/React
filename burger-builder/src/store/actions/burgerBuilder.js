import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (value) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: value
    }
}

export const deleteIngredient = (value) => {
    return {
        type: actionTypes.DELETE_INGREDIENT,
        payload: value
    }
}

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENT_FAILED,
    }
}

const initIngredient = (ingredient) => {
    return {
        type: actionTypes.INIT_INGREDIENT,
        payload: ingredient
    }
}

export const setIngredient = () => {
    return dispatch => {
        axios.get('/ingredients.json').then(res => {
            dispatch(initIngredient(res.data));
        }).catch(error => {
            dispatch(fetchIngredientFailed());
        })
    }
}