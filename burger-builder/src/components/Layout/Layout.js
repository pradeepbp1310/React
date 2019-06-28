import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import styles from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Backdrop from '../UI/Backdrop/Backdrop';

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
                <Toolbar toggle={this.toggleSideDrawer} />
                <SideDrawer show={this.state.showDrawer} />
                <main className={styles.Content}>{this.props.children}</main>

            </Aux>
        )
    }
}

export default Layout;