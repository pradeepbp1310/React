import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    price: 100,
    error: false
}

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_INGREDIENT:
            return {
                ...state,
                ingredients: action.payload,
                error: false
            }
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return {
                ...state,
                error: true
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

export default burgerBuilder;