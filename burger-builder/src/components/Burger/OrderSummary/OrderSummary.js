import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
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
            <Button btnType={'Success'} clicked={props.closemodal}>Continue</Button>
        </Aux>
    )
}

export default orderSummary;