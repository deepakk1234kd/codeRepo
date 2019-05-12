import React from 'react'

const textValidation = (props) => {
    
    let textSuggestion = null;

    if(props.wordLength<1){
        textSuggestion = <p>Type Something Please!!</p>
    } else if (props.wordLength<6){
        textSuggestion = <p>Text Length is Short!!</p>
    } else if (props.wordLength<11){
        textSuggestion = <p>Text Length is Ok!!</p>
    } else {
        textSuggestion = <p>Text Length is Long!!</p>
    }

    return textSuggestion;
};

export default textValidation;