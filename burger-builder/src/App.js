import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/auth';
import { withRouter, Redirect } from 'react-router-dom';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import { Route, Switch } from 'react-router-dom';

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
})


class App extends Component {
  componentDidMount() {
    this.props.checkAuth()
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth}></Route>
        <Route path='/' exact component={BurgerBuilder}></Route>
        <Redirect to='/' />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={asyncCheckout}></Route>
          <Route path='/orders' component={asyncOrders}></Route>
          <Route path='/logout' component={Logout}></Route>
          <Route path='/auth' component={asyncAuth}></Route>
          <Route path='/' exact component={BurgerBuilder}></Route>
          <Redirect to='/' />
        </Switch>
      );
    }
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => dispatch(authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
