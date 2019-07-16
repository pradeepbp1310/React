import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    price: 100,
    error: false,
    building: false
}

const addIngredient = (state, action) => {
    const updateIngredient = { [action.payload.ingredientType]: state.ingredients[action.payload.ingredientType] + 1 }
    const updateIngredients = updateObject(state.ingredients, updateIngredient);
    const updateState = {
        ingredients: updateIngredients,
        price: (state.price + action.payload.newPrice),
        building: true
    }
    return updateObject(state, updateState)
}

const deleteIngredient = (state, action) => {
    const updateIng = { [action.payload.ingredientType]: state.ingredients[action.payload.ingredientType] - 1 }
    const updateIngs = updateObject(state.ingredients, updateIng);
    const updateS = {
        ingredients: updateIngs,
        price: (state.price - action.payload.newPrice),
        building: true
    }
    return updateObject(state, updateS)
}

const initIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            salad: action.payload.salad,
            meat: action.payload.salad,
            cheese: action.payload.cheese,
            bacon: action.payload.bacon
        },
        price: 100,
        error: false,
        building: false
    }
}

const fetchIngredient = (state) => {
    return updateObject(state, { error: true })
}

const burgerBuilder = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.INIT_INGREDIENT: return initIngredient(state, action);
        case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredient(state, action);
        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
        case actionTypes.DELETE_INGREDIENT: return deleteIngredient(state, action);
        default: return state
    }

}

export default burgerBuilder;