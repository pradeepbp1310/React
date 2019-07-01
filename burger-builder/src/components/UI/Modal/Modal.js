import React, { Component } from 'react';
import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
// Only update when there is a change in the props
    shouldComponentUpdate(nextProps){
        return nextProps.show !== this.props.show;
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.closemodal} />
                <div className={classes.Modal}
                    style={
                        {
                            transform: this.props.show ? 'TranslateY(0)' : 'TranslateY(-100vh)',
                            opacity: this.props.show ? '1' : '0'
                        }
                    }
                >
                    {this.props.children}
                </div>
            </Aux>

        );
    }
}

export default Modal;