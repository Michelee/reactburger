import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    //Transform object ingregient to array so all the ingredients can be return as jsx
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i)=> {
                return <BurgerIngredient key={igKey + i} type={igKey} />;
            })
        })
        .reduce((arr, el) => {
            return [...el]
            //another wat to do the above
            // return arr.concat(el)
        }, []);
        
        if (transformedIngredients.length === 0){
            transformedIngredients = (
                <p>Please Add your Ingredients</p>
            );
        }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;