import React from 'react';
import classes from './Order.module.css';

const order = (props) => {
    console.log(props);

    let ing = [];
    for (let i in props.orders.ingredients) {
        ing.push(
            {
                name: i,
                amount: props.orders.ingredients[i]
            }
        )
    }

    return (
        <div className={classes.Order}>
            <p><strong>Ingredients: </strong>
                {
                    ing.map(i => { return <span key={i.name} className={classes.Ingredients}>{i.name} ({i.amount}) </span> }
                    )
                }
            </p>
            <p><strong>Price:</strong> INR {props.orders.price}</p>
        </div>
    )
}

export default order;