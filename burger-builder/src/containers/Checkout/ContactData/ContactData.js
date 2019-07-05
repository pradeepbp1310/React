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
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Address'
                },
                value: '',
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Street'
                },
                value: '',
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Zip'
                },
                value: '',
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'City'
                },
                value: '',
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Email'
                },
                value: '',
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
            },
        }
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
        console.log(updatedForm)
        this.setState({
            orderForm: updatedForm
        })
    }
    render() {
        let inputElement = [];
        for (let inp in this.state.orderForm) {
            inputElement.push(
                {
                    id: inp,
                    elementType: this.state.orderForm[inp].elementType,
                    elementConfig: this.state.orderForm[inp].elementConfig,
                    value: this.state.orderForm[inp].value
                }
            )
        }

        let elem = null;

        if (this.state.showSpinner) {
            elem = <Spinner />
        } else {
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
                                />
                            })
                        }

                        <Button btnType='Success'>ORDER</Button>
                    </form>
                </React.Fragment>
            )
        }
        return elem;

    }
}

export default ContactData;