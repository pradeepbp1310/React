import React, { useState, useEffect } from 'react';
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { setAuthRedirectPath } from '../../store/actions/auth';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email'
            },
            value: '',
            validations: {
                required: true,
                email: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validations: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    })

    const [isSignup, setIsSignup] = useState(false);

    useEffect(() => {
        if (!props.burgerBuilder && props.authRedirectPath !== '/checkout') {
            props.setAuthRedirectPath();
        }
    }, [])

    function inputChangeHandler(event, controlName) {
        const updatedControls = updateObject(controls,
            {
                [controlName]:
                    updateObject(controls[controlName], {
                        value: event.target.value,
                        valid: checkValidity(event.target.value, controls[controlName].validations),
                        touched: true
                    })
            })
        setControls(updatedControls)
    }

    const loginHandler = (event) => {
        props.onLogin(controls.email.value, controls.password.value, isSignup);
        event.preventDefault();
    }

    const switchHandler = () => {
        setIsSignup(!isSignup);
    }


    let inputElement = [];
    for (let inp in controls) {
        inputElement.push(
            {
                id: inp,
                elementType: controls[inp].elementType,
                elementConfig: controls[inp].elementConfig,
                value: controls[inp].value,
                valid: controls[inp].valid,
                shouldValidate: controls[inp].validations,
                touched: controls[inp].touched
            }
        )
    }
    let isDisabled = inputElement.every(i => i.valid);
    let error = null;
    if (props.error) {
        error = props.error.message;
    }

    let authRedirect = null;
    if (props.isAuth) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }
    let element = (
        <div className={classes.Auth}>
            {error}
            {authRedirect}
            <form onSubmit={loginHandler}>
                {
                    inputElement.map(inp => {
                        return <Input
                            elementType={inp.elementType}
                            value={inp.value}
                            elementConfig={inp.elementConfig}
                            key={inp.id}
                            changed={(event) => { inputChangeHandler(event, inp.id) }}
                            valid={!inp.valid}
                            shouldValidate={inp.shouldValidate}
                            touched={inp.touched}
                            valueType={inp.id}
                        />
                    })
                }

                <Button btnType='Success' disabled={!isDisabled}>{!isSignup ? 'LOGIN' : 'Sign UP'}</Button>
            </form>
            <Button btnType='Danger' clicked={switchHandler}>SWITCH TO {isSignup ? 'Login' : 'Sign UP'}</Button>
        </div>
    )
    if (props.loading) {
        element = <Spinner />;
    }
    return element
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath,
        burgerBuilder: state.ingredients.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password, isSginup) => dispatch(auth(email, password, isSginup)),
        setAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);