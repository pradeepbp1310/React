import React from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
    // Only update when there is a change in the props
    // shouldComponentUpdate(nextProps) {
    //     return (nextProps.show !== this.props.show) || (nextProps.children !== this.props.children);
    // }


    return (
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
}

export default React.memo(Modal,
    (nextProps, prevProps) => {
        return (nextProps.show === prevProps.show) && (nextProps.children === prevProps.children);
    });