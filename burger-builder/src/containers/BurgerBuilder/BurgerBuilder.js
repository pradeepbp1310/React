import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/action';

const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 30,
    meat: 50,
    bacon: 40
}

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        showSpinner: false,
        error: false
    }

    // componentDidUpdate(prevState) {
    //     if (prevState.ingredients !== this.props.ingredients) {
    //         this.updatePurchaseState(this.props.ingredients);
    //     }
    // }

    componentDidMount() {
        axios.get('/ingredients.json').then(res => {
            const ing = { ...res.data }
            this.props.onLoad(ing);
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

        return isPurchased > 0;
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
        this.props.history.push('/checkout');
    }

    render() {
        console.log(this.props)
        const disableInfo = { ...this.props.ingredients };

        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }

        let burger = this.state.error ? <p style={{ textAlign: 'center' }}>Ingredients can not be loaded right now'</p> : <Spinner />;
        let orders = null;

        if (this.props.ingredients) {
            orders = <OrderSummary
                ingredient={this.props.ingredients}
                continue={this.continuePurchase}
                totalprice={this.props.price}
            />
            burger = (<Aux>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls
                    ingredientAdded={this.props.addIngredientHandler}
                    ingredientRemoved={this.props.removeIngredientHandler}
                    disableInfo={disableInfo}
                    price={this.props.price}
                    purchaseable={this.updatePurchaseState(this.props.ingredients)}
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients.ingredients,
        price: state.ingredients.price
    }
}

const mapDisptachToProps = dispatch => {
    return {
        addIngredientHandler: (ingType) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            payload: {
                ingredientType: ingType,
                newPrice: INGREDIENT_PRICES[ingType]
            }
        }),
        removeIngredientHandler: (ingType) => dispatch({
            type: actionTypes.DELETE_INGREDIENT,
            payload: {
                ingredientType: ingType,
                newPrice: INGREDIENT_PRICES[ingType]
            }
        }),
        onLoad: (ing) => dispatch({ type: actionTypes.ONLOAD, value: ing })
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(withErrorHandler(BurgerBuilder, axios));