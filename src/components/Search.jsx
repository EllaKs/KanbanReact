import React, { Component } from 'react'
import { cardsList } from '../lists/listOfCards'
import "../styles/filter.scss"

class Search extends Component {
    constructor() {
        super()
        this.state = {
            cards: cardsList
        }
    }

    getAllNames() {

    }

    render() {
        return (
            <div>
                {/* <input placeholder="Sök..." /> */}
            </div>
        )
    }
}

export default Search;