import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHanlder = () => {
        this.setState({showSideDrawer: false});
    }
    render(){
        return (
            <Aux>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHanlder}/>
            <Toolbar />
             <main className={classes.Content}>
                 {this.props.children}
             </main> 
         </Aux>
        )
    }
    
    
}

export default Layout;