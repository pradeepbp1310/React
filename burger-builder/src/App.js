import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/auth';
import { withRouter, Redirect } from 'react-router-dom';

import { Route, Switch } from 'react-router-dom';

class App extends Component {

  componentDidMount() {
    this.props.checkAuth()
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth}></Route>
        <Route path='/' exact component={BurgerBuilder}></Route>
        <Redirect to='/' />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={Checkout}></Route>
          <Route path='/orders' component={Orders}></Route>
          <Route path='/logout' component={Logout}></Route>
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
