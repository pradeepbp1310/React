import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.InputElement} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case ('select'):
            console.log(props);
            inputElement = (
                <select className={classes.InputElement} {...props.elementConfig} onChange={props.changed} value={props.value}>
                    {
                        props.elementConfig.options.map(o => {
                            return <option value={o.value} key={o.value}>{o.displayValue}</option>
                        })

                    }
                </select>
            );
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props.elementConfig} value={props.value} />;
            return inputElement;
    }


    return (
        <div className={classes.Input}>
            {/* <label className={classes.Label}>{props.label}: </label> */}
            {inputElement}
        </div>
    )
}

export default input;