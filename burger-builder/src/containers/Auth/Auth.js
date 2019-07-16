import React, { Component } from 'react';
import classes from './Auth.module.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { setAuthRedirectPath } from '../../store/actions/auth';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
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
        },
        isSignup: false
    }

    componentDidMount() {
        if (!this.props.burgerBuilder && this.props.authRedirectPath !== '/checkout') {
            this.props.setAuthRedirectPath();
        }
    }


    inputChangeHandler(event, controlName) {
        const updatedControls = updateObject(this.state.controls,
            {
                [controlName]:
                    updateObject(this.state.controls[controlName], {
                        value: event.target.value,
                        valid: checkValidity(event.target.value, this.state.controls[controlName].validations),
                        touched: true
                    })
            })
        this.setState({
            controls: updatedControls
        })
    }

    loginHandler = (event) => {
        this.props.onLogin(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
        event.preventDefault();
    }

    switchHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        })
    }

    render() {
        let inputElement = [];
        for (let inp in this.state.controls) {
            inputElement.push(
                {
                    id: inp,
                    elementType: this.state.controls[inp].elementType,
                    elementConfig: this.state.controls[inp].elementConfig,
                    value: this.state.controls[inp].value,
                    valid: this.state.controls[inp].valid,
                    shouldValidate: this.state.controls[inp].validations,
                    touched: this.state.controls[inp].touched
                }
            )
        }
        let isDisabled = inputElement.every(i => i.valid);
        let error = null;
        if (this.props.error) {
            error = this.props.error.message;
        }

        let authRedirect = null;
        if (this.props.isAuth) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        let element = (
            <div className={classes.Auth}>
                {error}
                {authRedirect}
                <form onSubmit={this.loginHandler}>
                    {
                        inputElement.map(inp => {
                            return <Input
                                elementType={inp.elementType}
                                value={inp.value}
                                elementConfig={inp.elementConfig}
                                key={inp.id}
                                changed={(event) => { this.inputChangeHandler(event, inp.id) }}
                                valid={!inp.valid}
                                shouldValidate={inp.shouldValidate}
                                touched={inp.touched}
                                valueType={inp.id}
                            />
                        })
                    }

                    <Button btnType='Success' disabled={!isDisabled}>{!this.state.isSignup ? 'LOGIN' : 'Sign UP'}</Button>
                </form>
                <Button btnType='Danger' clicked={this.switchHandler}>SWITCH TO {this.state.isSignup ? 'Login' : 'Sign UP'}</Button>
            </div>
        )
        if (this.props.loading) {
            element = <Spinner />;
        }
        return element
    }
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