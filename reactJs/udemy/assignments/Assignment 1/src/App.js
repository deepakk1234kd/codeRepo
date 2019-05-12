import React, { Component } from 'react';
import './App.css';

import UserInput from './UserInput/UserInput'
import UserOutput from './UserOutput/UserOutput'

class App extends Component {
  state = {
    userName: "Deepak"
  }

  nameChangeHandler = (event) => {
    this.setState({
      userName: event.target.value
    })
  }

  render() {
    return (
      <div className="App">
      <h1>Assignment 1</h1>

        <UserInput changeName={this.nameChangeHandler} name={this.state.userName} ></UserInput>

        <UserOutput name={this.state.userName} ></UserOutput>
        <UserOutput name={this.state.userName} ></UserOutput>
        <UserOutput name={this.state.userName} ></UserOutput>
      </div>
    );
  }
}

export default App;
