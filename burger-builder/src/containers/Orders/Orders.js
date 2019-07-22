import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../axios-orders';
import { fetchOrders } from '../../store/actions/order';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';

const Orders = props => {

    useEffect(() => {
        props.fetchOrdersInit(props.token, props.userId)
    }, [])


    let load = props.loading ? <Spinner /> : (
        <div>
            {
                props.orders ? props.orders.map(o => {
                    return <Order orders={o} key={o.id} />
                }) : null
            }
        </div>
    );
    return load;
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrdersInit: (token, userId) => dispatch(fetchOrders(token, userId))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios)));