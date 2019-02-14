/* eslint-disable no-loop-func */
import React, { Component } from "react";
import Column from "./Column";
import Filter from './Filter';
import Search from './Search'
import { columnList } from "../lists/listOfColumns";
import { cardsList } from '../lists/listOfCards';
import "../styles/board.scss"

class Board extends Component {
  constructor() {
    super()// super() calls the constructor from the class which this class has been extended from. Here it is the React.Component-class
    this.state = {
      columns: columnList,
      cards: cardsList,
      distinctNames: [],
      selectedFilterValue: "Show all"
    }
    this.handleFilter = this.handleFilter.bind(this)
    this.cardCounter = this.cardCounter.bind(this)
  }

  componentDidMount() {
    this.getDistinctCustomerNames();
    this.cardCounter();
  }

  getDistinctCustomerNames() {
    const { cards } = this.state;

    let namesArray = [...new Set(cards.map(c => c.customerName))];

    this.setState({
      distinctNames: namesArray,
    })
  }

  handleFilter(names) {
    this.setState({
      selectedFilterValue: names
    })
  }

  cardCounter() {
    const { cards, columns } = this.state;

    let updatedColumns = [];

    columns.forEach(col => {
      col.quantityOfCards = 0
    });

    for (var i = 0; i < cards.length; i++) {
      updatedColumns = columns.filter(col => {
        if (col.id === cards[i].columnIndex) {
          console.log("test", col.id, cards[i].columnIndex)
          col.quantityOfCards += 1;
        }
        console.log("updatedCol", updatedColumns)
        return updatedColumns;
      });
    }

    this.setState({
      columns: updatedColumns
    });
  }

  render() {
    const { columns, distinctNames, selectedFilterValue } = this.state;
    return (
      <div className="board">
        <div id="top">
          <h1>Kanban Board</h1>
          <div>
            <Search />
            <Filter distinctNames={distinctNames} onSelectedFilter={this.handleFilter} />
          </div>

          <div>
            {columns
              .filter(column => column.id >= columns.length - 2)
              .map(column => {
                return (
                  <Column column={column} columnId={column.id} key={column.id} filterNames={selectedFilterValue} />
                )
              }
              )}
          </div>
        </div>

        <div id="bottom">
          {columns.slice(0, 5).map(column => {
            return (
              <Column column={column} columnId={column.id} key={column.id} cardCounter={this.cardCounter} quantityOfCards={column.quantityOfCards} filterNames={selectedFilterValue} />
            )
          }
          )}
        </div>
      </div>
    );
  }
}

export default Board;
