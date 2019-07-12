import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import styles from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import { connect } from 'react-redux';

class Layout extends Component {
    state = {
        showDrawer: false
    }

    toggleSideDrawer = () => {
        this.setState(prevState => {
            return ({
                showDrawer: !prevState.showDrawer
            })
        })
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.state.showDrawer} clicked={this.toggleSideDrawer} />
                <Toolbar toggle={this.toggleSideDrawer} isAuth={this.props.isAuth} />
                <SideDrawer show={this.state.showDrawer} isAuth={this.props.isAuth} />
                <main className={styles.Content}>{this.props.children}</main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);