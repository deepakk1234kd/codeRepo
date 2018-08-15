import React from 'react';
import './UserOutput.css'
const UserOutput = (props) => {
    return (
        <div className="UserOutput">
            <p>My name is {props.name}</p>
            <p>My name is {props.name}</p>
        </div>
    )
}

export default UserOutput;