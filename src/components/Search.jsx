import React, { Component } from 'react'
import "../styles/search.scss"

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchValue: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            searchValue: event.target.value
        });
        this.props.updateSearchValue(this.state.searchValue);
    }

    render() {
        return (
            <div >
                <input
                    type="text"
                    id="search"
                    value={this.state.searchValue}
                    placeholder="Sök..."
                    onChange={this.handleChange} />
            </div>
        )
    }
}

export default Search;