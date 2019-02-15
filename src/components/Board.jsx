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
      filterValue: "",
      searchValue: ""
    }
    this.handleFilter = this.handleFilter.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
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

  handleFilter(value) {
    this.setState({
      filterValue: value
    })
    this.cardCounter(value, undefined)
  }

  handleSearch(value) {
    this.setState({
      searchValue: value
    })
    this.cardCounter(undefined, value)
  }

  cardCounter(filterVal, searchVal) {
    if (filterVal === "") filterVal = undefined
    if (searchVal === "") searchVal = undefined

    const { cards, columns } = this.state;
    let updatedColumns = [];

    columns.forEach(col => {
      col.quantityOfCards = 0
    });

    if (filterVal === undefined && searchVal === undefined) {
      for (var i = 0; i < cards.length; i++) {
        updatedColumns = columns.filter(col => {
          if (col.id === cards[i].columnIndex) {
            col.quantityOfCards += 1;
          }
          return updatedColumns;
        });
      }
    }
    else {
      if (filterVal !== undefined) {
        for (var y = 0; y < cards.length; y++) {
          updatedColumns = columns.filter(col => {
            if (col.id === cards[y].columnIndex && cards[y].customerName === filterVal) {
              col.quantityOfCards += 1;
            }
            return updatedColumns;
          });
        }
      }
      else {
        this.state.cards.filter(card => {
          const custName = card.customerName.toLowerCase();
          const content = card.content.toLowerCase();
          const owner = card.owner.toLowerCase();
          const filter = searchVal.toLowerCase();

          if (custName.includes(filter) || content.includes(filter) || owner.includes(filter)) {

            updatedColumns = columns.filter(col => {
              if (card.columnIndex === col.id) {
                col.quantityOfCards += 1;
              }
              return updatedColumns
            })
          }
        })
      }
    }
    this.setState({
      columns: updatedColumns
    });
  }

  render() {
    const { columns, distinctNames, filterValue } = this.state;
    return (
      <div className="board">
        <div id="top">
          <h1>Kanban Board</h1>
          <div id="search">
            <Search updateSearchValue={this.handleSearch} />
          </div>
          <div id="filter">
            <Filter distinctNames={distinctNames} onSelectedFilter={this.handleFilter} />
          </div>

          <div id="top-columns">
            {columns
              .filter(column => column.id >= columns.length - 2)
              .map(column => {
                return (
                  <Column column={column} columnId={column.id} key={column.id} filterNames={filterValue} cardCounter={this.cardCounter} />
                )
              }
              )}
          </div>
        </div>

        <div id="bottom">
          {columns.slice(0, 5).map(column => {
            return (
              <Column
                column={column}
                columnId={column.id}
                key={column.id}
                cardCounter={this.cardCounter}
                quantityOfCards={column.quantityOfCards}
                filterValue={filterValue}
                searchValue={this.state.searchValue} />
            )
          }
          )}
        </div>
      </div>
    );
  }
}

export default Board;
