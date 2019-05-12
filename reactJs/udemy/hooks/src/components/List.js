import React from 'react';
    
const list = (props) => {
    console.log('Rendering the lists...');

    return (
        <ul>
            {props.items.map(item => <li key={item.id} onClick={props.clicked.bind(this, item.id)}>{item.name}</li>)}
        </ul>
    );
};
    
export default list;