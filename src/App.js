import React, { Component } from "react";
import "./App.scss";
import Board from './components/Board'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Board />
      </div>
    );
  }
}

export default App;


