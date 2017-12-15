import React, { Component } from 'react';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component{
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Yeimer Molina',
                address: {
                    street: 'Altamirada',
                    zipCode: '5001',
                    country: 'Venezuela'
                },
                email: 'yeimer.molina@gmail.com'
            },
            deliveryMethod: 'fast'
        }
        axios.post('/orders.json', order)
            .then(response => {
                console.log(response);
                   this.setState({
                       loading: false
                   });

                   this.props.history.push('/');
            })  
            .catch(error => {
                console.log(error);
           this.setState({
                       loading: false
                   })
            })  
        ;

    }

    render(){
        let form = (
            <form>
                <input type="text" name="name" placeholder="Name"/>
                <input type="email" name="email" placeholder="Email"/>
                <input type="text" name="street" placeholder="Street"/>
                <input type="text" name="postal" placeholder="Postal Code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if (this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;