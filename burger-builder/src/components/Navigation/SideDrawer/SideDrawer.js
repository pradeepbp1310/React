import React from 'react';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {
    let classesAdded = [classes.SideDrawer, classes.Open];
    if (!props.show) {
        classesAdded = [classes.SideDrawer, classes.Close]
    }
    return (
        <div className={classesAdded.join(' ')}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </nav>
        </div>
    )
}

export default sideDrawer;