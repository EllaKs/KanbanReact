import React, { Component } from "react";
import Column from "./Column";
import { columnList } from "../lists/listOfColumns";
import { cardsList } from '../lists/listOfCards'

class Board extends Component {
  constructor() {
    super()
    this.state = {
      columns: columnList,
      cards: cardsList
    }
  }

  componentDidMount() {
    this.countCards();
  }

  //Counts cards from start
  countCards() {
    console.log("count");
    const { cards, columns } = this.state;
    let updatedColumns = [];

    for (var i = 0; i < cards.length; i++) {
      updatedColumns = columns.filter(col => {
        if (col.id === cards[i].columnIndex) {
          console.log("increase");
          col.quantityOfCards += 1;
        }
        return updatedColumns;
      });
    }
    console.log("Board", updatedColumns);

    this.setState({
      columns: updatedColumns
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
