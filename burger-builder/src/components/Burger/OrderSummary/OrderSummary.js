import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    // Order summary page renders each time when any of the parent page renders
    // to avoid this implement componentshouldupdate lifecycle in parent wrapped class
    componentWillUpdate() {
        console.log('OrderSummary component');
    }

    render() {
        const ingredientList = Object.keys(this.props.ingredient).map(igKey => {
            return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {this.props.ingredient[igKey]}</li>
        })
        return (
            <Aux>
                <h1>Your Order Summary</h1>
                <p>Your Burger contains following ingredients!</p>
                <ul>
                    {ingredientList}
                </ul>
                <p><strong>Total price: {this.props.totalprice}</strong></p>
                <Button btnType={'Danger'} clicked={this.props.closemodal}>Cancel</Button>
                <Button btnType={'Success'} clicked={this.props.closemodal}>Continue</Button>
            </Aux>
        )
    }
}

export default OrderSummary;