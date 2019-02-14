import React, { Component } from 'react'
import "../styles/filter.scss"

class Filter extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: []
        }
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.setState({
            value: this.props.selectedValue
        })
    }

    handleChange() {
        var names = document.getElementById("select").value;
        this.props.onSelectedFilter(names);
    }

    render() {
        const { distinctNames } = this.props;

        return (
            <div id="dropdown">
                <select id="select" onChange={this.handleChange}>
                    <option value="Show all">Visa alla</option>
                    {distinctNames
                        .map(name => {
                            return (
                                <option key={name} value={name}>{name}</option>
                            );
                        }
                        )}
                </select>
            </div>
        )
    }
}

export default Filter;