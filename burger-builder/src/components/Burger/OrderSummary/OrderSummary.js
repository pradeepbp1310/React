import React from 'react';
import Aux from '../../../hoc/Auxiliary';

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
        </Aux>
    )
}

export default orderSummary;