import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';
import classes from './OrderSummary.css';

class  OrderSummary extends Component {
    componentWillUpdate(){
        console.log("UPDATE")
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransform: 'capitalize'}}>
                    {igKey}</span>: {this.props.ingredients[igKey]}
                </li>
            )
        })
    return (
        <Aux>
            <h3 style={{color: '#2b3c54'}}>ORDER SUMMARY</h3>
            <h4 style={{color: '#2b3c54'}}>Ingredients:</h4>
            <ul className={classes.Summary}>
                {ingredientSummary}
            </ul>
            <p style={{color: '#2b3c54'}}><strong>Total: {this.props.totalPrice.toFixed(2)}$</strong></p>
            <div className={classes.Buttons}>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CHECKOUT</Button>
            </div>
            
        </Aux>
    )
    }
}

    


export default OrderSummary;