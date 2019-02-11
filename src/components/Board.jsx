import React, { Component } from "react";
import Column from "./Column";
import { columnList } from "../lists/listOfColumns";

class Board extends Component {
  constructor() {
    super()
    this.state = {
      columns: []
    }
  }

  componentDidMount() {
    this.setState({
      columns: columnList
    });
  }

  render() {
    const { columns } = this.state;
    return (
      <div className="board">
        <div id="top">
          <h1>Kanban Board</h1>
          <div>
            {columns.slice(5, 7).map(column => (
              <Column column={column} columnId={column.id} key={column.id} />
            ))}
          </div>
        </div>

        <div id="bottom">
          {columns.slice(0, 5).map(column => (
            <Column column={column} columnId={column.id} key={column.id} quantityOfCards={column.quantityOfCards} />
          ))}
        </div>
      </div>
    );
  }
}

export default Board;
