import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    //Now this state is access through redux state
    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }

    // No need to use this method since the ingredients are now access trough the store,
    // The burger builder container now does not send query params to this container
    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     let price = 0;
    //     const ingredients = { }
    //         for (let param of query.entries()){
    //             if(param[0] === 'price'){
    //                 price = param[1];
    //             }else{
    //                 ingredients[param[0]] = +param[1]
    //             }
                
    //         }
    //     this.setState({ingredients, totalPrice: price})
       
    // }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render(){
        let summary = <Redirect to="/" />

        if (this.props.ingredients){
            summary = (
                <div>
                    <CheckoutSummary 
                    ingredients={this.props.ingredients}
                    checkoutCancel={this.checkoutCancelHandler}
                    checkoutContinue={this.checkoutContinueHandler}
                />
                    <Route 
                        path={this.props.match.path + '/contact-data'}
                        component={ContactData}
                    />
                    {/* 
                    OLd way to pass the props not this is change because of redux
                    <Route path={this.props.match.path + '/contact-data'} 
                    render={(props) => (
                        <ContactData 
                            ingredients={this.props.ingredients} 
                            totalPrice={this.props.totalPrice}
                            {...props}
                            />
                        )}
                    /> */}
                </div>
                
            );
        }
        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);