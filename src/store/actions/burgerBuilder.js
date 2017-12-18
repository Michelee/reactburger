import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const addIngredient = (ingredientName) =>{
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingredientName
    }
}

export const removeIngredient = (ingredientName) =>{
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: ingredientName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fechIngredientsFail = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAIL,
        error: true
    }
}

export const initIngredients = () => {
    return dispatch => {
            axios.get('https://react-burger-3b1f8.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fechIngredientsFail());
            })
        ;
    }
}