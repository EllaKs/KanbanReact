import React, { Component } from "react";
import "../styles/card.scss"

class Card extends Component {
  getInitials(owner) {
    var fullName = owner.split(' '),
      initials = fullName[0].substring(0, 1).toUpperCase();

    if (fullName.length > 1) {
      initials += fullName[fullName.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  }

  getPrioColor(prio) {
    switch (prio) {
      case 1:
        prio = "#f64329";
        break;
      case 2:
        prio = "#f2cc74";
        break;
      case 3:
        prio = "#75d886";
        break;
      default:
        prio = "#75d886";
    }
    return prio;
  }

  copyInfo(cardId, customerName) {
    let info = cardId + " " + customerName;
    const elem = document.createElement('textarea'); //Create a text area elem
    elem.value = info; //Set value to the string
    document.body.appendChild(elem); //Append text to current html doc
    elem.select(); //Select content
    document.execCommand('copy'); //To copy to clipboard
    document.body.removeChild(elem); //remove elem
  }

  onDragStart(e, cardId) {
    e.dataTransfer.setData("text/plain", cardId);
  }

  render() {
    const { cardId, card } = this.props;
    let initials = this.getInitials(card.owner)
    let backgroundColor = this.getPrioColor(card.priority)
    let avatar = typeof card.userPhoto !== 'undefined' ? <img id="userphoto" alt="userphoto" src={card.userPhoto} /> : <div id="initials">{initials}</div>
    return (
      <div
        className="card"
        draggable
        key={cardId}
        onDragStart={e => this.onDragStart(e, card.id)}
      >
        <div className="flex-container">
          <div id="prioColor" style={{ backgroundColor }}></div>
          <div>
            <span id="cardId">{cardId}</span>
            <span id="customerName">{card.customerName}
              <button onClick={e => this.copyInfo(cardId, card.customerName)}>&#128458;</button>
            </span>
          </div>
          <div>{card.content}</div>
          <div>{avatar}</div>
        </div>
      </div>
    );
  }
}

export default Card;