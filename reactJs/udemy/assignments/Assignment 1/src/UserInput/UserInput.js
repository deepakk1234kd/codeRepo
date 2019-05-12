import React from 'react';

const userInput = (props) => {
    const style={
        borderRadius: '10px',
        boxShadow: '0 2px 3px #ccc'
    }

    return (
        <div>
            <input style={style} type="text" onChange={props.changeName} value={props.name}/>
        </div>
    )
}

export default userInput;