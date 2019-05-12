import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import cssClasses from './Burger.css';
    
const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey+i} type={igKey}/>;
        })
        ).reduce((arr, curr) => {
            return arr.concat(curr);
        }, []);

    if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please add ingredients here</p>
    }

    return (
        <div className={cssClasses.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};
    
export default burger;