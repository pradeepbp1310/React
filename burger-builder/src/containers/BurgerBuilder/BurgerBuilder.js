import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        prices: 100,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients) {
        const isPurchased = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, ele) => {
                return sum + ele;
            }, 0);

        this.setState({
            purchaseable: isPurchased > 0
        })
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
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        if (this.state.ingredients[type] <= 0) { return }
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = this.state.ingredients[type] - 1;
        const newPrice = this.state.prices - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients, prices: newPrice
        })
        this.updatePurchaseState(updatedIngredients);
    }

    orderNow = () => {
        this.setState({
            purchasing: true
        })
    }

    closeModal = () => {
        this.setState({
            purchasing: false
        })
    }

    render() {
        const disableInfo = { ...this.state.ingredients };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} closemodal={this.closeModal}>
                    <OrderSummary
                        ingredient={this.state.ingredients} closemodal={this.closeModal}
                        totalprice={this.state.prices}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disableInfo={disableInfo}
                    price={this.state.prices}
                    purchaseable={this.state.purchaseable}
                    order={this.orderNow}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;