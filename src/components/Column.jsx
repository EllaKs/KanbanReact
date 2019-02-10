import React, { Component } from "react";
import Card from "./Card";
//import { cards } from "../lists/listOfCards";

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [
        {
          id: 9461,
          customerName: "Kanban board",
          content: "Lägg till allvarlighetsgrad på kort",
          columnIndex: 0,
          owner: "EK",
          prio: "high"
        },
        {
          id: 9127,
          customerName: "Kanban board",
          content: "Lägg till titel på kort",
          columnIndex: 2,
          owner: "EK",
          prio: "low"
        },
        {
          id: 9137,
          customerName: "Kanban board",
          content: "Skapa knapp för 'Klar' och 'Ingen åtgärd'",
          columnIndex: 4,
          owner: "EK",
          prio: "medium"
        },
        {
          id: 9634,
          customerName: "Kanban board",
          content: "Importera DND",
          columnIndex: 1,
          owner: "EK",
          prio: "medium"
        },
        {
          id: 9655,
          customerName: "MeMyselfAndI",
          content: "Drick kaffe",
          columnIndex: 3,
          owner: "EK",
          prio: "high"
        }
      ]
    };
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

  onDragOver(e, columnId) {
    e.preventDefault(); //Preventing default action of elem to happen. Ex submit button to submit a form.
  }

  onDrop(e, columnId) {
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
    // const {connectDropTarget, isOver, card} = this.props;
    // const backgroundColor = isOver ? "grey" : ""

    const { columnId, column } = this.props;

    return (
      // <div className="column" style={{backgroundColor}}>
      <div
        className="column"
        onDragOver={e => this.onDragOver(e, columnId)}
        onDrop={e => this.onDrop(e, columnId)}
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
