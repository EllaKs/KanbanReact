import React, { Component } from "react";
import Card from "./Card";
import { cardsList } from "../lists/listOfCards";
import { columnList } from "../lists/listOfColumns";
import "../styles/column.scss"

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOver: false,
      cards: cardsList,
      columns: columnList
    };
  }

  onDragOver(e) {
    e.preventDefault(); //Preventing default action of elem to happen. Ex submit button to submit a form.'
    this.setState({
      isOver: true
    });
  }

  onDragLeave(e) {
    this.setState({
      isOver: false
    });
  }

  onDrop(e, columnId) {
    this.setState({
      isOver: false
    });

    let dto = e.dataTransfer.getData("text/plain");
    const cardId = parseInt(dto);
    this.updateColumnState(cardId, columnId);
  }

  updateColumnState(cardId, columnId) {
    var prevColumnId = 0;
    var updatedCards = [...this.state.cards];
    var index = this.state.cards.findIndex(card => card.id === cardId)
    prevColumnId = updatedCards[index].columnIndex
    updatedCards[index].columnIndex = columnId;

    if (prevColumnId !== columnId) {
      this.setState({ cards: updatedCards })
      console.log("Updated cards", this.state.cards);
      this.increaseCardQuantity(columnId);
      this.decreaseCardQuantity(prevColumnId);
    }
  }

  increaseCardQuantity(newColumnId) {
    var updatedColumns = [...this.state.columns];
    var index = this.state.columns.findIndex(col => col.id === newColumnId)
    updatedColumns[index].quantityOfCards += 1;

    this.setState({ columns: updatedColumns })
  }

  decreaseCardQuantity(prevColumnId) {
    var updatedColumns = [...this.state.columns];
    var index = this.state.columns.findIndex(col => col.id === prevColumnId)
    updatedColumns[index].quantityOfCards -= 1;

    this.setState({ columns: updatedColumns })
  }

  render() {
    const backgroundColor = this.state.isOver ? "#dce4ef" : "";
    const { columnId } = this.props;

    if (columnId < 5) {
      return (
        <div
          className="column"
          onDragOver={e => this.onDragOver(e, columnId)}
          onDragLeave={e => this.onDragLeave(e)}
          onDrop={e => this.onDrop(e, columnId)}
          style={{ backgroundColor }}
        >
          <div id="head">
            <div id="title">{this.props.column.name}&emsp;&emsp; <span id="quantity">{this.props.column.quantityOfCards}</span></div>
          </div>
          <div id="body">
            <hr />
            {this.state.cards
              .filter(card => card.columnIndex === columnId)
              .map(card => {
                return (
                  <Card
                    key={card.id}
                    card={card}
                    cardId={card.id}
                    columnIndex={card.columnIndex}
                  />
                );
              }
              )}
          </div>
        </div>

      );
    }
    else {
      const backgroundColor = this.state.isOver ? "#dce4ef" : "";
      return (
        <div
          id={columnId === 5 ? 'noaction' : 'done'}
          onDragOver={e => this.onDragOver(e, columnId)}
          onDragLeave={e => this.onDragLeave(e)}
          onDrop={e => this.onDrop(e, columnId)}
          style={{ backgroundColor }}
        >{this.props.column.name}</div>
      )
    }
  }
}

export default Column;
