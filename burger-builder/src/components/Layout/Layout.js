import React from 'react';
import Aux from '../../hoc/Auxiliary';
import styles from './Layout.module.css'

const layout = (props) => (
    <Aux>
        <div className={styles.Content}>Toolbar, Backdrop, SideDrawer</div>
        <main>{props.children}</main>
    </Aux>
)

export default layout;