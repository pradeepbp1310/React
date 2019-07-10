import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders';
import { fetchOrders } from '../../store/actions/order';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrdersInit()
    }

    render() {
        let load = this.props.loading ? <Spinner /> : (
            <div>
                {
                    this.props.orders ? this.props.orders.map(o => {
                        return <Order orders={o} key={o.id} />
                    }) : null
                }
            </div>
        );
        return load;
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrdersInit: () => dispatch(fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));