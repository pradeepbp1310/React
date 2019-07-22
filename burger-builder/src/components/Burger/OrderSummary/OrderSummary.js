import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = props => {
    // Order summary page renders each time when any of the parent page renders
    // to avoid this implement componentshouldupdate lifecycle in parent wrapped class
    // componentWillUpdate() {
    //     console.log('OrderSummary component');
    // }

    const ingredientList = Object.keys(props.ingredient).map(igKey => {
        return <li key={igKey}><span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {props.ingredient[igKey]}</li>
    })
    return (
        <Aux>
            <h1>Your Order Summary</h1>
            <p>Your Burger contains following ingredients!</p>
            <ul>
                {ingredientList}
            </ul>
            <p><strong>Total price: {props.totalprice}</strong></p>
            <Button btnType={'Danger'} clicked={props.closemodal}>Cancel</Button>
            <Button btnType={'Success'} clicked={props.continue}>Continue</Button>
        </Aux>
    )

}

export default OrderSummary;