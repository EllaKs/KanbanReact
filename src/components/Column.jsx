import React, { Component } from "react";
import Card from "./Card";
import { cardsList } from "../lists/listOfCards";

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOver: false,
      cards: []
    };
  }

  componentDidMount() {
    this.setState({
      cards: cardsList
    });
  }
  // componentDidMount() {
  //   this.fillCardArray();
  //   console.log("Did", this.state.cardArray);
  // }

  // fillCardArray() {
  //   const cardArr = cards.map(card => card);
  //   console.log(cardArr);

  //   this.setState(prevState => ({
  //     cardArray: [...prevState.cardArray, cardArr]
  //   }));
  // }

  onDragOver(e) {
    e.preventDefault(); //Preventing default action of elem to happen. Ex submit button to submit a form.'

    this.setState({
      isOver: true
    });
  }

  onDragLeave(e) {
    e.preventDefault();
    this.setState({
      isOver: false
    });
  }

  onDrop(e, columnId) {
    this.setState({
      isOver: false
    });

    let cardId = e.dataTransfer.getData("text/plain");

    console.log("cardId:", cardId, " dropped at:", columnId);

    //Find card by id and create new cardArray with updated category
    let updatedCards = this.state.cards.filter(card => {
      if (card.id == cardId) {
        card.columnIndex = columnId;
      }
      return card;
    });

    this.setState({
      cards: updatedCards
    });

    console.log("Updated cards", this.state.cards);
    // this.setState({
    //   ...this.state.cards,
    //   updatedCards
    // });
  }

  render() {
    const backgroundColor = this.state.isOver ? "grey" : "";

    const { columnId } = this.props;

    return (
      <div
        className="column"
        onDragOver={e => this.onDragOver(e, columnId)}
        onDragLeave={e => this.onDragLeave(e)}
        onDrop={e => this.onDrop(e, columnId)}
        style={{ backgroundColor }}
      >
        <div id="head">
          <div id="title">{this.props.column.name}</div>
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
}

export default Column;
