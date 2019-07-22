import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { authLogout } from '../../../store/actions/auth';
import { connect } from 'react-redux';

const Logout = props => {
    useEffect(() => {
        props.onLogout();
    }, [])
    return (<Redirect to='/' />)
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);