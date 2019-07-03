import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 30,
    meat: 50,
    bacon: 40
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        prices: 100,
        purchaseable: false,
        purchasing: false,
        showSpinner: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json').then(res => {
            this.setState({
                ingredients: res.data
            })
        }).catch(error => {
            this.setState({
                error: true
            })
        })
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

    continuePurchase = () => {
        let query = [];
        for (let i in this.state.ingredients) {
            query.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
        }
        query.push('price=' + this.state.prices);
        const queryString = query.join('&');
        this.setState({
            showSpinner: true
        })
        this.props.history.push(
            {
                pathname: '/checkout',
                search: '?' + queryString
            }
        );
    }

    render() {
        const disableInfo = { ...this.state.ingredients };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let burger = this.state.error ? <p style={{ textAlign: 'center' }}>Ingredients can not be loaded right now'</p> : <Spinner />;
        let orders = null;

        if (this.state.ingredients) {
            orders = <OrderSummary
                ingredient={this.state.ingredients}
                continue={this.continuePurchase}
                totalprice={this.state.prices}
            />
            burger = (<Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disableInfo={disableInfo}
                    price={this.state.prices}
                    purchaseable={this.state.purchaseable}
                    order={this.orderNow}
                />

            </Aux>)
            if (this.state.showSpinner) {
                orders = <Spinner />
            }
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} closemodal={this.closeModal}>
                    {orders}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);