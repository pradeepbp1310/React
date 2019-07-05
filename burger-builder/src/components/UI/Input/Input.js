import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
    console.log(props)
    let inputElement = null;
    const validClass = [classes.InputElement];
    let validationError = null;
    if (props.valid && props.shouldValidate && props.touched) {
        validClass.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.valueType}</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={validClass.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea className={validClass.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select className={validClass.join(' ')} {...props.elementConfig} onChange={props.changed} value={props.value}>
                    <option value="" key='default' >Select Method</option>
                    {
                        props.elementConfig.options.map(o => {
                            return <option value={o.value} key={o.value} >{o.displayValue}</option>
                        })

                    }
                </select>
            );
            break;
        default:
            inputElement = <input className={validClass.join(' ')} {...props.elementConfig} value={props.value} />;
            return inputElement;
    }


    return (
        <div className={classes.Input}>
            {/* <label className={classes.Label}>{props.label}: </label> */}
            {inputElement}
            {validationError}
        </div>
    )
}

export default input;