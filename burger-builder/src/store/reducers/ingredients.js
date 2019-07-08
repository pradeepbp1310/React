import * as actionTypes from '../actions/action';

const initialState = {
    ingredients: null,
    price: 100
}

const ingredients = (state = initialState, action) => {
    console.log(action, state);
    switch (action.type) {
        case actionTypes.ONLOAD:
            return {
                ...state,
                ingredients: action.value,
                price: 100
            }
        case actionTypes.ADD_INGREDIENT:
            const oldCount = state.ingredients[action.payload.ingredientType];
            const updatedCount = oldCount + 1;

            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientType]: updatedCount
                },
                price: (state.price + action.payload.newPrice)
            }
        case actionTypes.DELETE_INGREDIENT:
            const count = state.ingredients[action.payload.ingredientType];
            const dlCount = count - 1;
            if (state.ingredients[action.payload.ingredientType] < 0) { return };
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientType]: dlCount
                },
                price: (state.price - action.payload.newPrice)
            }
        default:
            return state
    }

}

export default ingredients;