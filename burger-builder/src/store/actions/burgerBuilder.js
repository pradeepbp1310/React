import * as actionTypes from './actionTypes';

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

export const setIngredient = (ingredient) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        payload: ingredient
    }
}

export const initIngredient = () => {
    return {
        type: actionTypes.INIT_INGREDIENT
    }
}