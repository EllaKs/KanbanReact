import React, { Component } from "react";

class Card extends Component {
  onDragStart(e, cardId, columnIndex) {
    e.dataTransfer.setData("text/plain", cardId, columnIndex);
  }

  render() {
    const { cardId, card } = this.props;
    return (
      <div
        className="card"
        draggable
        key={cardId}
        onDragStart={e => this.onDragStart(e, card.id, card.columnIndex)}
      >
        {/* <div>{cardId}</div>
        <div>{card.customerName}</div>
        <div>{card.content}</div>
        <div>{card.prio}</div>
        <div>{card.owner}</div> */}

        <div className="flex-container">
          <div style={{ fontWeight: 600 }}>{cardId}</div>
          <div>{card.customerName}</div>
          <div>{card.content}</div>
          <div>Priority: {card.priority}</div>
          <div>{card.owner}</div>
          <div>Column: {card.columnIndex}</div>
        </div>
      </div>
    );
  }
}

export default Card;
