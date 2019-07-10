import * as actionTypes from '../actions/actionTypes';
import updateObject from '../utility';

const initialState = {
    ingredients: null,
    price: 100,
    error: false
}

const addIngredient = (state, action) => {
    const updateIngredient = { [action.payload.ingredientType]: state.ingredients[action.payload.ingredientType] + 1 }
    const updateIngredients = updateObject(state.ingredients, updateIngredient);
    const updateState = {
        ingredients: updateIngredients,
        price: (state.price + action.payload.newPrice)
    }
    return updateObject(state, updateState)
}

const deleteIngredient = (state, action) => {
    const updateIng = { [action.payload.ingredientType]: state.ingredients[action.payload.ingredientType] - 1 }
    const updateIngs = updateObject(state.ingredients, updateIng);
    const updateS = {
        ingredients: updateIngs,
        price: (state.price - action.payload.newPrice)
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
        error: false
    }
}

const fetchIngredient = (state) => {
    return updateObject(state, { error: true })
}

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_INGREDIENT: return initIngredient;
        case actionTypes.FETCH_INGREDIENT_FAILED: return fetchIngredient;
        case actionTypes.ADD_INGREDIENT: return addIngredient(state);
        case actionTypes.DELETE_INGREDIENT: return deleteIngredient(state, action);
        default: return state
    }

}

export default burgerBuilder;