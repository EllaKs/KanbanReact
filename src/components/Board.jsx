import React, { Component } from "react";
import Column from "./Column";
import { columns } from "../lists/listOfColumns";
import "../App.css";

class Board extends Component {
  render() {
    return (
      <div className="board">
        {columns.slice(0, 5).map((column, columnIndex) => (
          <Column column={column} columnId={columnIndex} key={columnIndex} />
        ))}
      </div>
    );
  }
}

export default Board;
