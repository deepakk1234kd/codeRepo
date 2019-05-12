import React, { useState } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import cssClasses from './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/actionCreators/index';
import { updateObject, checkValidity } from '../../../common/utility';

const contactData = props => {
    const [orderForm, setOrderForm] = useState({
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipcode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zip Code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your EMail'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliverySpeed: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    value: 'fastest',
                    validation: {},
                    valid: true
                },
            });
        const [isFormValid, setIsFormValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        };
        
        props.onOrderBurger(order, props.token);
    }

    const inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(orderForm[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputIdentifier].validation),
            touched: true
        });

        const updatedOrderForm = updateObject(orderForm, {
            [inputIdentifier]: updatedFormElement
        });

        let isFormValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            isFormValid = isFormValid && updatedOrderForm[inputIdentifier].valid;
        }

        setOrderForm(updatedOrderForm);
        setIsFormValid(isFormValid);    
    }

    const formElementsArray = [];
    for(let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        });
    }

    let form = (
        <form onSubmit = {orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    touched={formElement.config.touched}
                    shouldValidate={formElement.config.validation}
                    invalid={!formElement.config.valid}
                    changed={(event) => inputChangedHandler(event, formElement.id)}/>
            ))}
            <Button btnType="Success" disabled={!isFormValid}>ORDER</Button>
        </form>
    );
    
    if(props.loading) {
        form = <Spinner />
    }
    return (
        <div className={cssClasses.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};
    
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));