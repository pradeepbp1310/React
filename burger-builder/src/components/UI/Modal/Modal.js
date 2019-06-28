import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) =>
    (
        <Aux>
            <Backdrop show={props.show} clicked={props.closemodal} />
            <div className={classes.Modal}
                style={
                    {
                        transform: props.show ? 'TranslateY(0)' : 'TranslateY(-100vh)',
                        opacity: props.show ? '1' : '0'
                    }
                }
            >
                {props.children}
            </div>
        </Aux>

    );

export default modal;