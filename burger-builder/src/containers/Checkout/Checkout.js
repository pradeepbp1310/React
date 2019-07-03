import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route } from 'react-router-dom';


class Checkout extends Component {
    state = {
        ingredients: null,
        price: null
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        console.log(query)
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            if (param[0] === 'price') {
                price = param[1]
            }
            else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ ingredients: ingredients, price: price })
    }

    cancelCheckoutHandler = () => {
        this.props.history.goBack()
    }

    continueCheckoutHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients} price={this.state.price}
                    cancelCheckout={this.cancelCheckoutHandler}
                    continueCheckout={this.continueCheckoutHandler}
                />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={() => <ContactData ingredients={this.state.ingredients} price={this.state.price} {...this.props}/>}
                />
            </div>
        )
    }
}

export default Checkout;