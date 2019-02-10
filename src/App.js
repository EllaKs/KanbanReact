import React, { Component } from "react";
import "./App.css";
import Board from './components/Board'
import Menu from './components/Menu'

class App extends Component{
  render() {
        return (
      <div className="app">
      <Menu/>
      <Board />
      </div>
    );
  }
}
 
export default App;


