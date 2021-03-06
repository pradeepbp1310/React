import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Checkout extends Component {

    cancelCheckoutHandler = () => {
        this.props.history.goBack()
    }

    continueCheckoutHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render() {
        let summary = (<Redirect to='/' />);

        if (this.props.ingredients) {
            if (this.props.purchased) {
                this.props.history.replace('/');
            }
            summary = (
                <div>
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        cancelCheckout={this.cancelCheckoutHandler}
                        continueCheckout={this.continueCheckoutHandler}
                    />
                    <Route
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                </div>)
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);