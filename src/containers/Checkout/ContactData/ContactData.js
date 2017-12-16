import React, { Component } from 'react';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Postal Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'sheapest', displayValue: 'Sheapest'},
                    ]
                },
                value: ''
            }
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
            price: this.props.totalPrice
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

    inputChangedHandler = (event, inputIdentifier) => {
        //Get copy state object
        const updatedOrderForm = {
            ...this.state.orderForm
        }
       
        //get copy object inside copied object
        const updateFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        //Update values and set new state 
        updateFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updateFormElement
        this.setState({
            orderForm: updatedOrderForm
        })
    }

    render(){
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form>
                
                {formElementsArray.map(formElement => (
                    <Input 
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig} 
                        value={formElement.config.value} 
                        key={formElement.id} 
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />    
                ))}
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