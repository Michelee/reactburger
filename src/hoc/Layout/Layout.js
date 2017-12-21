import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHanlder = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHanlder = () => {
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            };
        });
    }

    render(){
        return (
            <Aux>
            <SideDrawer 
                isAuthenticated={this.props.isAuthenticated}
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHanlder}
            />
            <Toolbar 
                isAuthenticated={this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHanlder}
            />
             <main className={classes.Content}>
                 {this.props.children}
             </main> 
         </Aux>
        )
    }
    
    
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);