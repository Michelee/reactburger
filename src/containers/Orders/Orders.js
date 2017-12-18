import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreator from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component{
    
    componentDidMount(){
        this.props.onInitOrders();
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchedOrders = [];
        //         for(let key in res.data){
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             })
        //         }
        //         this.setState({loading: false, orders: fetchedOrders});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false})
        //     })
    }

    render(){
        let orders = <Spinner />;

        if (!this.props.loading){
            orders = this.props.orders.map(order => {
                        return (
                            <Order 
                                key={order.id}
                                ingredients={order.ingredients}
                                price={order.price}
                            />
                        )
                    })
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitOrders : () => dispatch(actionCreator.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));