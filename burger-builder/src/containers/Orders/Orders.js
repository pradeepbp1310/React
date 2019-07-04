import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders';

class Orders extends Component {
    state = {
        orders: null,
        error: false
    }
    componentDidMount() {
        axios.get('/orders.json').then(res => {
            console.log(res.data)
            let orders = [];
            for (let ing in res.data) {
                orders.push({
                    ...res.data[ing],
                    id: ing
                })
            }
            this.setState({
                orders: orders
            })

        }).catch(err => {
            this.setState({
                error: true
            })
        })
    }

    render() {

        return (
            <div>
                {
                    this.state.orders ? this.state.orders.map(o => {
                        return <Order orders={o} key={o.id}/>
                    }) : null
                }
            </div>
        );

    }
}

export default withErrorHandler(Orders, axios);