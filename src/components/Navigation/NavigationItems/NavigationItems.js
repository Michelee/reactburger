import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
    let mostrar = props.mostrar? classes.open : classes.close
    return(
    <ul className={[classes.NavigationItems,mostrar].join(' ')} >
        <NavigationItem link="/">
            Build
        </NavigationItem>
        {props.isAuthenticated 
            ? <NavigationItem link="/orders"> Orders </NavigationItem>
            : null
        }
        
        {!props.isAuthenticated  
            ? <NavigationItem link="/auth"> Authenticate </NavigationItem> 
            : <NavigationItem link="/logout"> Logout </NavigationItem> 
        }
    </ul>
)}

export default navigationItems;