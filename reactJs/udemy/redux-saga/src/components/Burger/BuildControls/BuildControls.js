import React from 'react';

import BuildControl from './BuildControl/BuildControl';

import cssClasses from './BuildControls.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];
    
const buildControls = (props) => (
    <div className={cssClasses.BuildControls}>
        <p>Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => {
            return <BuildControl 
            key={ctrl.label} 
            label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}/>
        })}
        <button 
            className={cssClasses.OrderButton} 
            disabled={!props.purchaseable}
            onClick={props.ordered}>{props.isAuth ? 'ORDER NOW' : 'SIGN IN TO CONTINUE'}</button>
    </div>
);
    
export default buildControls;