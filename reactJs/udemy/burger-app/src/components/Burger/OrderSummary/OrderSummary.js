import React, { Component } from 'react';

import Aux from '../../../hoc/Auxi/Aux';
import Button from '../../UI/Button/Button';
    
class OrderSummary extends Component {
    componentWillUpdate() {
        //console.log('[OrderSummary] componentWillUpdate');
    }

    render() {
        const ingredientsSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                    <span style={{textTransfrom: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>);
        });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A Yummy Burger just waiting foy you:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>TOTAL PRICE: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    }
}
    
export default OrderSummary;