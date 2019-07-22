import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';
import { connect } from 'react-redux';
import { burgerPurchase } from '../../../store/actions/order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'input',
                placeholder: 'Name'
            },
            value: '',
            validations: {
                required: true,
            },
            valid: false,
            touched: false
        },
        address: {
            elementType: 'input',
            elementConfig: {
                type: 'input',
                placeholder: 'Address'
            },
            value: '',
            validations: {
                required: true,
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'input',
                placeholder: 'Street'
            },
            value: '',
            validations: {
                required: true,
            },
            valid: false,
            touched: false
        },
        zipCode: {
            elementType: 'input',
            elementConfig: {
                type: 'input',
                placeholder: 'Zip'
            },
            value: '',
            validations: {
                required: true,
            },
            valid: false,
            touched: false
        },
        city: {
            elementType: 'input',
            elementConfig: {
                type: 'input',
                placeholder: 'City'
            },
            value: '',
            validations: {
                required: true,
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'input',
                placeholder: 'Email'
            },
            value: '',
            validations: {
                required: true,
                minLength: 3,
                maxLength: 6
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                type: 'select',
                placeholder: 'Delivery Method',
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]

            },
            value: '',
            validations: {
                required: true,
            },
            valid: false,
            touched: false
        },
    })

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formEle in orderForm) {
            formData[formEle] = orderForm[formEle].value;
        }

        const data = {
            ingredients: props.ingredients,
            price: props.price,
            orders: formData,
            userId: props.userId
        }
        props.onBurgerPurchase(data, props.token);
    }

    function inputChangeHandler(event, inputIdentifier) {
        const updatedElem = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validations),
            touched: true
        })
        const updatedForm = updateObject(orderForm, {
            [inputIdentifier]: updatedElem
        })

        setOrderForm(updatedForm)
    }


    let elem = null;
    if (props.loading) {
        elem = <Spinner />
    } else {
        let inputElement = [];
        for (let inp in orderForm) {
            inputElement.push(
                {
                    id: inp,
                    elementType: orderForm[inp].elementType,
                    elementConfig: orderForm[inp].elementConfig,
                    value: orderForm[inp].value,
                    valid: orderForm[inp].valid,
                    shouldValidate: orderForm[inp].validations,
                    touched: orderForm[inp].touched
                }
            )
        }
        let isDisabled = inputElement.every(i => i.valid);
        elem = (
            <React.Fragment>
                <form className={classes.ContactData} onSubmit={orderHandler}>
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

                    <Button btnType='Success' disabled={!isDisabled}>ORDER</Button>
                </form>
            </React.Fragment>
        )
    }
    return elem;
}


const mapStateToProps = state => {
    return {
        ingredients: state.ingredients.ingredients,
        price: state.ingredients.price,
        loading: state.order.loading,
        order: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onBurgerPurchase: (data, token) => dispatch(burgerPurchase(data, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));