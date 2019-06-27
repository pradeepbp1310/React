import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 30,
    meat: 50,
    bacon: 40
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            meat: 0,
            bacon: 0
        },
        prices: 100
    }

    addIngredientHandler = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = oldIngredientCount + 1;
        const oldPrice = this.state.prices;
        const newPrice = oldPrice + INGREDIENT_PRICES[type];

        this.setState({
            ingredients: updatedIngredients, prices: newPrice
        })
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0) { return }
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = this.state.ingredients[type] - 1;
        const newPrice = this.state.prices - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients, prices: newPrice
        })
    }

    render() {
        const disableInfo = { ...this.state.ingredients };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        console.log(disableInfo);
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disableInfo={disableInfo}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;