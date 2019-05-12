import React from 'react';

import cssClasses from './Input.css';
    
const input = (props) => {
    let inputElement = null;
    let errorMessage = null;
    const inputClasses = [cssClasses.InputElement];

    if(props.touched && props.shouldValidate && props.invalid) {
        inputClasses.push(cssClasses.Invalid);
        errorMessage = <p className={cssClasses.ErrorMessage}>Please enter valid value</p>
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = <select className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                    <option value={option.value} key={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>;
            break;
        default :
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}/>;
    }
    
    return (
        <div className={cssClasses.Input}>
            <label className={cssClasses.Label}>{props.label}</label>
            {inputElement}
            {errorMessage}
        </div>
    );
};
    
export default input;