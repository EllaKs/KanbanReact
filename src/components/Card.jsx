import React, { Component } from "react";

class Card extends Component {
  onDragStart(e, cardId) {
    e.dataTransfer.setData("text/plain", cardId);
  }

  render() {
    const { cardId, card } = this.props;
    return (
      <div
        className="card"
        draggable
        key={cardId}
        onDragStart={e => this.onDragStart(e, card.id)}
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
          <div>{card.prio}</div>
          <div>{card.owner}</div>
        </div>
      </div>
    );
  }
}

export default Card;

/*{id: 9461,
   customerName: "Kanban board",
    content: "Improve column layout",
     columnIndex: 2,
      owner: "EK",
       prio: "high" }
       
       */
