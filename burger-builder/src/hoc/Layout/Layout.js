import React, { useState } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import styles from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import { connect } from 'react-redux';

const Layout = (props) => {
    const [showDrawer, setShowDrawer] = useState(false);

    const toggleSideDrawer = () => {
        setShowDrawer(!showDrawer)
    }

    return (
        <Aux>
            <Backdrop show={showDrawer} clicked={toggleSideDrawer} />
            <Toolbar toggle={toggleSideDrawer} isAuth={props.isAuth} />
            <SideDrawer show={showDrawer} isAuth={props.isAuth} clicked={toggleSideDrawer} />
            <main className={styles.Content}>{props.children}</main>
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);