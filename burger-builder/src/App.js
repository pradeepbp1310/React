import React, { useEffect, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import { authCheckState } from './store/actions/auth';
import { withRouter, Redirect } from 'react-router-dom';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';

import { Route, Switch } from 'react-router-dom';

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
})

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
})

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
})


const App = props => {
  useEffect(() => {
    props.checkAuth();
  }, []);

  console.log('app');

  let routes = (
    <Switch>
      <Route path='/auth' render={props => <Auth {...props} />}></Route>
      <Route path='/' exact component={BurgerBuilder}></Route>
      <Redirect to='/' />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/checkout' render={props => <Checkout {...props} />}></Route>
        <Route path='/orders' render={props => <Orders {...props} />}></Route>
        <Route path='/logout' render={props => <Logout {...props} />}></Route>
        <Route path='/auth' render={props => <Auth {...props} />}></Route>
        <Route path='/' exact component={BurgerBuilder}></Route>
        <Redirect to='/' />
      </Switch>
    );
  }
  return (
    <Layout>
      <Suspense fallback={() => <div>Loading...</div>}>{routes}</Suspense>
    </Layout>
  );
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
