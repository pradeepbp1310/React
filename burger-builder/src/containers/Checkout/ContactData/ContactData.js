import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        showSpinner: false
    }
    orderHandler = () => {
        this.setState({
            showSpinner: true,
        })
        const data = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Pradeep',
                address: {
                    street: 'Hosakerehalli',
                    zipCode: 560085,
                    city: 'Bengaluru'
                },
                email: 'pradeepbp1310@gmail.com'
            },
            deliveryMethod: 'Superfast',
            paymentMode: 'COD'
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

    render() {
        let elem = null;
        if (this.state.showSpinner) {
            elem = <Spinner />
        } else {
            elem = (
                <React.Fragment>
                    <div className={classes.ContactData}>
                        <form>
                            <div>
                                <label>Name:</label>
                                <input type='text' />
                            </div>
                            <div>
                                <label>Address:</label>
                                <input type='text' />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input type='text' />
                            </div>
                            <div>
                                <label>Phone:</label>
                                <input type='text' />
                            </div>
                        </form>
                        <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
                    </div>
                </React.Fragment>
            )
        }
        return elem;

    }
}

export default ContactData;