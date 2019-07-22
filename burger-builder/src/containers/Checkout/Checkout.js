import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Checkout = props => {
    
    const cancelCheckoutHandler = () => {
        props.history.goBack()
    }

    const continueCheckoutHandler = () => {
        props.history.push('/checkout/contact-data');
    }

    let summary = (<Redirect to='/' />);

    if (props.ingredients) {
        if (props.purchased) {
            props.history.replace('/');
        }
        summary = (
            <div>
                <CheckoutSummary
                    ingredients={props.ingredients}
                    cancelCheckout={cancelCheckoutHandler}
                    continueCheckout={continueCheckoutHandler}
                />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>)
    }
    return summary;
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);