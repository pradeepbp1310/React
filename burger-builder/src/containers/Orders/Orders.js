import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders';
import { fetchOrders } from '../../store/actions/order';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';

class Orders extends Component {

    componentDidMount() {
        console.log(this.props.token)
        this.props.fetchOrdersInit(this.props.token)
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
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrdersInit: (token) => dispatch(fetchOrders(token))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios)));