import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import classes from './ContactData.module.css';

class ContactData extends Component {

    state = {
        showSpinner: false,
        orderForm: {
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
        }
    }

    checkValidity(value, validationRules) {
        let isValid = true;
        if (validationRules.required) {
            isValid = (value.trim() !== '') && isValid;
        }
        if (validationRules.minLength) {
            isValid = (value.length >= validationRules.minLength) && isValid;
        }
        if (validationRules.maxLength) {
            isValid = (value.length <= validationRules.maxLength) && isValid;
        }
        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formEle in this.state.orderForm) {
            formData[formEle] = this.state.orderForm[formEle].value;
        }

        this.setState({
            showSpinner: true,

        })

        const data = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orders: formData
        }

        axios.post('/orders.json', data).then(res => {
            console.log(res);
            this.setState({
                showSpinner: false,
            })
            console.log(this.props)
            this.props.history.replace('/');
        },
            err => {
                console.log(err);
                this.setState({
                    showSpinner: false,
                })
            }
        )
    }

    inputChangeHandler(event, inputIdentifier) {
        let updatedForm = {
            ...this.state.orderForm
        }
        const updatedElem = {
            ...updatedForm[inputIdentifier]
        }
        updatedElem.value = event.target.value;
        updatedForm[inputIdentifier] = updatedElem;
        updatedForm[inputIdentifier].valid = this.checkValidity(updatedElem.value, updatedForm[inputIdentifier].validations);
        updatedForm[inputIdentifier].touched = true;
        this.setState({
            orderForm: updatedForm
        })
    }
    render() {
        let elem = null;
        if (this.state.showSpinner) {
            elem = <Spinner />
        } else {
            let inputElement = [];
            for (let inp in this.state.orderForm) {
                inputElement.push(
                    {
                        id: inp,
                        elementType: this.state.orderForm[inp].elementType,
                        elementConfig: this.state.orderForm[inp].elementConfig,
                        value: this.state.orderForm[inp].value,
                        valid: this.state.orderForm[inp].valid,
                        shouldValidate: this.state.orderForm[inp].validations,
                        touched: this.state.orderForm[inp].touched
                    }
                )
            }
            let isDisabled = inputElement.every(i => i.valid);
            console.log(isDisabled)
            elem = (
                <React.Fragment>
                    <form className={classes.ContactData} onSubmit={this.orderHandler}>
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

                        <Button btnType='Success' disabled={!isDisabled}>ORDER</Button>
                    </form>
                </React.Fragment>
            )
        }
        return elem;

    }
}

export default ContactData;