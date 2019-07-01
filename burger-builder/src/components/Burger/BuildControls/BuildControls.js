import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Total Price: <strong>{props.price}</strong> INR</p>
            {
                controls.map(ctrl =>
                    (
                        <BuildControl key={ctrl.label} label={ctrl.label}
                            added={() => props.ingredientAdded(ctrl.type)}
                            removed={() => props.ingredientRemoved(ctrl.type)}
                            disable={props.disableInfo[ctrl.type]}
                        />
                    )
                )
            }
            <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.order}>ORDER NOW</button>
        </div>
    )
}

export default buildControls;