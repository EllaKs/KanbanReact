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
      columns: columnList,
      searchFilter: ""
    };
    this.updateCardCounter = this.updateCardCounter.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  componentDidMount() {
    this.setState({
      searchFilter: this.props.searchValue
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      searchFilter: nextProps.searchValue
    });

    if (this.state.searchFilter !== "") {
      this.handleFilterChange();
    }
  }

  handleFilterChange() {
    let updatedCardList = []
    if (this.state.searchFilter !== "" && this.state.searchFilter !== undefined) {
      updatedCardList = this.state.cards.filter(card => {
        const custName = card.customerName.toLowerCase();
        const content = card.content.toLowerCase();
        const owner = card.owner.toLowerCase();
        const filter = this.state.searchFilter.toLowerCase();
        // console.log("Filter:", filter)
        // console.log("Name", custName)

        if (custName.includes(filter) || content.includes(filter) || owner.includes(filter)) {
          console.log("found you", card.id)
          updatedCardList.push(card)
        }
        // if (custName === filter) { //Input kanbanbräde...
        //   console.log("found you")
        //   updatedCardList.push(card)
        // }
        return updatedCardList
      })
    }
    else {
      return
    }

    this.setState({
      cards: updatedCardList
    });
  }

  updateCardCounter() {
    this.props.cardCounter();
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
    this.updateCardCounter(columnId);
  }

  updateColumnState(cardId, columnId) {
    var prevColumnId = 0;
    var updatedCards = [...this.state.cards];
    var index = this.state.cards.findIndex(card => card.id === cardId)
    prevColumnId = updatedCards[index].columnIndex
    updatedCards[index].columnIndex = columnId;

    if (prevColumnId !== columnId) {
      this.setState({ cards: updatedCards })
    }
  }

  render() {
    const { columnId, column, filterNames } = this.props;
    const { cards } = this.state;
    const backgroundColor = this.state.isOver ? "#dce4ef" : "";
    const overflowY = column.quantityOfCards >= 6 ? "scroll" : "hidden";

    if (columnId < 5) {
      if (filterNames === "Show all") {
        return (
          <div
            className="column"
            onDragOver={e => this.onDragOver(e, columnId)}
            onDragLeave={e => this.onDragLeave(e)}
            onDrop={e => this.onDrop(e, columnId)}
            style={{ backgroundColor, overflowY }}
          >
            <div id="head">
              <div id="title">{column.name}&emsp;&emsp; <span id="quantity">{column.quantityOfCards}</span></div>
            </div>
            <div id="body">
              <hr />
              {cards.filter(card => card.columnIndex === columnId)
                .map(card => {
                  return (
                    <Card
                      key={card.id}
                      card={card}
                      cardId={card.id}
                      columnIndex={card.columnIndex}
                      updateCardCounter={this.updateCardCounter}
                    />
                  );
                })}
            </div>
          </div>
        );
      } else {
        return (
          <div
            className="column"
            onDragOver={e => this.onDragOver(e, columnId)}
            onDragLeave={e => this.onDragLeave(e)}
            onDrop={e => this.onDrop(e, columnId)}
            style={{ backgroundColor, overflowY }}
          >
            <div id="head">
              <div id="title">{column.name}&emsp;&emsp; <span id="quantity">{column.quantityOfCards}</span></div>
            </div>
            <div id="body">
              <hr />
              {cards.filter(card => card.customerName === filterNames && card.columnIndex === columnId)
                .map(card => {
                  return (
                    <Card
                      key={card.id}
                      card={card}
                      cardId={card.id}
                      columnIndex={card.columnIndex}
                      updateCardCounter={this.updateCardCounter}
                    />
                  );
                })}
            </div>
          </div>
        );
      }
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
        >{column.name}</div>
      )
    }
  }
}

export default Column;
