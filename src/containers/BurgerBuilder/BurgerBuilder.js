import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreator from '../../store/actions/index';


// const INGREDIENT_PRICES = {
//     salad: 0.5,
//     cheese: 0.4,
//     meat: 0.3,
//     bacon: 0.7
// }

class BurgerBuilder extends Component{
    state = {
        purchasing: false
    }

    updatePurchaseState(ingredients){

        const sum = Object.keys(ingredients)
        .map(key => {
            return ingredients[key]
        })
        .reduce((prev, current) => {
                return current + prev
            }, 0);
        
        console.log(sum)
        return sum > 0;
    }

    //Old methods, now these are managed by redux
    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ingredients[type];
    //     const updatedCounted = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ingredients
    //     };

    //     updatedIngredients[type] = updatedCounted
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;

    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     })

    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ingredients[type];
    //     if (oldCount <= 0){
    //         return;
    //     }
            
    //     const updatedCounted = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.props.ingredients
    //     };

    //     updatedIngredients[type] = updatedCounted
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;

    //     this.setState({
    //         totalPrice: newPrice,
    //         ingredients: updatedIngredients
    //     })

    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true})
        }else {
            this.props.history.push('/auth');
        }
        
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    // Old method, now the ingredients are not being passed with queryParams, 
    // but now on the Checkout container, it has access to the global store
    // purchaseContinueHandler = () => {
    //     const queryParams = [];
    //     for (let i in this.props.ingredients){
    //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]))
    //     }

    //     queryParams.push('price=' + this.props.totalPrice);

    //     const queryString = queryParams.join('&')

    //     this.props.history.push({
    //         pathname: '/checkout',
    //         search: '?' + queryString
    //     });
    // }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }


    componentDidMount(){
        this.props.onInitIngredients();
        // axios.get('https://react-burger-3b1f8.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         console.log(response)
        //         this.setState({
        //             ingredients: response.data
        //         })
        //     })
        //     .catch(error => {
        //         this.setState({error : true});
        //     })
        // ;


    }

    render(){
        const disableInfo = {
            ...this.props.ingredients
        };

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients cant be loaded</p> : <Spinner />;

        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

                
        if(this.props.ingredients){
            
            burger = (
                <Aux>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls 
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disableInfo}
                    price={this.props.totalPrice}
                    purchaseable={this.updatePurchaseState(this.props.ingredients)}
                    ordered={this.purchaseHandler}
                    isAuthenticated={this.props.isAuthenticated}
                />
            </Aux>
            );

            orderSummary = (
                <OrderSummary 
                    ingredients={this.props.ingredients}
                    totalPrice={this.props.totalPrice}
                    purchaseCanceled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );

        }

        // if (this.state.loading){
        //     orderSummary = <Spinner />;
        // }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingredientName) => {
            return dispatch(
                actionCreator.addIngredient(ingredientName)
            )
        },
        onIngredientRemoved: (ingredientName) => {
            return dispatch(
                actionCreator.removeIngredient(ingredientName)
            )
        },
        onInitIngredients: () => {
            return dispatch(
                actionCreator.initIngredients()
            )
        },
        onInitPurchase: () => dispatch(actionCreator.purchaseInit())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));