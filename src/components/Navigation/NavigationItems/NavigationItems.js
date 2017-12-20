import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
    let mostrar = props.mostrar? classes.open : classes.close
    return(
    <ul className={[classes.NavigationItems,mostrar].join(' ')} >
        <NavigationItem
            link="/"
        >
            Build
        </NavigationItem>
        <NavigationItem
            link="/orders"
        >
            Orders
        </NavigationItem>
        <NavigationItem
            link="/auth"
        >
            Authenticate
        </NavigationItem>
    </ul>
)}

export default navigationItems;