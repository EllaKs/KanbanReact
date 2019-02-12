import React, { Component } from 'react'
import { cardsList } from '../lists/listOfCards'
import "../styles/filter.scss"

class Filter extends Component {
    constructor() {
        super()
        this.state = {
            cards: cardsList
        }
    }

    getAllNames() {

    }

    render() {
        //Get all names from the card array

        const { cards } = this.state;

        return (
            <div>
                <input placeholder="Sök..." />
                <select>
                    {cards
                        .map(card => {
                            return (
                                <option key={card.id} value={card.customerName}>{card.customerName}</option>
                            );
                        }
                        )}
                </select>
            </div>
        )
    }
}

export default Filter;

{/* <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
                </select > */}