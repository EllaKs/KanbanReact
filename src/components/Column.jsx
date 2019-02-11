import React, { Component } from "react";
import Card from "./Card";
import { cardsList } from "../lists/listOfCards";
import { columnList } from "../lists/listOfColumns";

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOver: false,
      cards: [],
      columns: []
    };
  }

  componentDidMount() {
    this.setState({
      cards: cardsList,
      columns: columnList
    });
    this.cardCounter();
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
    // this.increaseCardQuantity(columnId);
  }

  updateColumnState(cardId, columnId) {
    var prevColumnId = 0;
    var updatedCards = [...this.state.cards];
    var index = this.state.cards.findIndex(card => card.id === cardId)
    prevColumnId = updatedCards[index].columnIndex
    updatedCards[index].columnIndex = columnId;
    this.setState({ cards: updatedCards })
    console.log("Updated cards", this.state.cards);
    this.cardCounter();

    // this.decreaseCardQuantity(prevColumnId);
  }

  // increaseCardQuantity(columnId) {
  //   var updatedColumns = [...this.state.columns];
  //   var index = this.state.columns.findIndex(col => col.id === columnId)
  //   updatedColumns[index].quantityOfCards += 1;

  //   this.setState({ columns: updatedColumns })
  //   console.log("incr", updatedColumns[index].quantityOfCards);
  // }

  // decreaseCardQuantity(columnId) {
  //   var updatedColumns = [...this.state.columns];
  //   var index = this.state.columns.findIndex(col => col.id === columnId)
  //   updatedColumns[index].quantityOfCards -= 1;

  //   this.setState({ columns: updatedColumns })
  //   console.log("decr", updatedColumns[index].quantityOfCards);
  // }

  cardCounter() {
    const { cards, columns } = this.state;
    console.log("cardcounter!")

    for (var i = 0; i < cards.length; i++) {
      for (var y = 0; y < columns.length; y++) {
        if (cards[i].columnIndex === columns[y].id)
          console.log("träff")
        columns[y].quantityOfCards += 1;
        console.log(columns[y].quantityOfCards)
      }
    }
    // console.log("cardcounter!")
    // this.state.columns.forEach(col => {
    //   this.state.cards.forEach(card => {
    //     if (card.columnIndex === col.id) {
    //       col.quantityOfCards++
    //     }
    //   });
    // });


    // var updatedColumns = [...this.state.columns];
    // var index = this.state.columns.findIndex(col => col.id === columnId)
    // updatedColumns[index].quantityOfCards += 1;

    // // this.setState({ columns: updatedColumns })
    // console.log("count", updatedColumns[index].quantityOfCards);
  }

  render() {
    const backgroundColor = this.state.isOver ? "#aaafb3" : "";
    const { columnId } = this.props;

    console.log("column", columnId)
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
            <span id="title">{this.props.column.name} {this.props.column.quantityOfCards}</span>
          </div>
          <div id="body">
            <hr />
            {this.state.cards.map(card => {
              if (columnId === card.columnIndex) {
                return (
                  <Card
                    key={card.id}
                    card={card}
                    cardId={card.id}
                    columnIndex={card.columnIndex}
                  />
                );
              }
            })}
          </div>
        </div>

      );
    }
    else {
      const backgroundColor = this.state.isOver ? "#aaafb3" : "";
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
