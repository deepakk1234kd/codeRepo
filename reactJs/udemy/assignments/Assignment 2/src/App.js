import React, { Component } from 'react';
import './App.css';
import TextValidation from './TextValidation/TextValidation';
import Char from './Char/Char';

class App extends Component {
  state = {
    word: ""
  }
  
  outputLength = (event) => {
    const word = event.target.value;
    this.setState({word: word})
  }

  deleteLetterHandler = (letterIndex) => {
    let word = this.state.word;
    const charArray = word.split('');
    charArray.splice(letterIndex, 1);
    word = charArray.join('');
    
    this.setState({word: word})
  }

  render() {
    let charList = null;
    const charArray = this.state.word.split('');

    charList = charArray.map((char, index) => {
      return <Char letter={char}
      clicked = {() => this.deleteLetterHandler(index)}
      key = {index}/>
    });

    return (
      <div className="App">
        <h1>Assignment 2</h1>

        <input type="text" onChange={this.outputLength} value={this.state.word}/>
        <p>The length of the string is {this.state.word.length}</p>
        <TextValidation wordLength={this.state.word.length}/>
        {charList}
      </div>
    );
  }
}

export default App;
