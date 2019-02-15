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
      searchValue: "",
      filterValue: "",
      filteredCardsList: []
    };
    this.updateCardCounter = this.updateCardCounter.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  componentDidMount() {
    this.handleFilterChange();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.filterValue !== prevState.filterValue || nextProps.searchValue !== prevState.searchValue) {
      return { searchValue: nextProps.searchValue, filterValue: nextProps.filterValue };
    }
    else return null;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filterValue !== this.props.filterValue || prevProps.searchValue !== this.props.searchValue) {
      this.setState({ filterValue: this.props.filterValue });
      this.setState({ searchValue: this.props.searchValue });
      this.handleFilterChange(this.state.searchValue, this.state.filterValue);
    }
  }

  handleFilterChange(searchValue, filterValue) {
    const { cards } = this.state;
    this.setState({
      filteredCardsList: cards
    })

    if (searchValue === undefined && filterValue === undefined) {
      this.setState({
        filteredCardsList: cards
      })
    }
    else {
      let updatedCardsList = []
      if (searchValue !== "" && searchValue !== undefined) {
        this.setState({
          filteredCardsList: []
        })

        this.state.cards.filter(card => {
          const custName = card.customerName.toLowerCase();
          const content = card.content.toLowerCase();
          const owner = card.owner.toLowerCase();
          const filter = searchValue.toLowerCase();

          if (custName.includes(filter) || content.includes(filter) || owner.includes(filter)) {
            updatedCardsList.push(card)
          }
          return updatedCardsList
        })

        this.setState({
          filteredCardsList: updatedCardsList
        })
      }
      if (filterValue !== "" && filterValue !== undefined) {
        this.setState({
          filteredCardsList: []
        })

        this.state.cards.filter(card => {
          if (card.customerName === filterValue) {
            updatedCardsList.push(card)
          }
          return updatedCardsList
        })

        this.setState({
          filteredCardsList: updatedCardsList
        })
      }
    }
  }

  updateCardCounter() {
    this.props.cardCounter();
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

  /* Drag and Drop */
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

  render() {
    const { columnId, column } = this.props;
    const { filteredCardsList } = this.state;
    const backgroundColor = this.state.isOver ? "#dce4ef" : "";
    const overflowY = column.quantityOfCards >= 6 ? "scroll" : "hidden";

    if (columnId < 5) {
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
            {filteredCardsList.filter(card => card.columnIndex === columnId)
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
