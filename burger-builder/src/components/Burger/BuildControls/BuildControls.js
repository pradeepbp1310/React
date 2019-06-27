import React from 'react';
import classes from './BuildControls.module.css';
import BuilControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Bacon', type: 'bacon' },
];

const buildControls = () => {
    return (
        <div className={classes.BuildControls}>
            {
                controls.map(ctrl =>
                    (<BuilControl key={ctrl.label} label={ctrl.label} />)
                )
            }
        </div>
    )
}

export default buildControls;