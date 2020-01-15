import React, { Component } from 'react'

const Suggestions = (props) => {
    const options = props.results.map(r => {
        let {city,state,agency,organization} = r._source.suggest.contexts 
        return(
            <li key={r._id}>
            <div >
            <p>{r.text}</p>
                <dv className="row">
                    <dv className="col">{agency}</dv>
                    <dv className="col">{organization}</dv>
                </dv>
                <dv className="row">
                    <dv className="col">{city}</dv>
                    <dv className="col">{state}</dv>
                </dv>
            </div>
        </li>
        )
        })
    return <ul>{options}</ul>
}
class FormsSearchBox extends Component {
    state = {
        query: '',
        results: []
    }

    getInfo = (query) => {
        fetch('http://localhost:8004/api/search/forms/autocomplete', {
            method: 'post',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({
                "prefix": query
            })
        }).then(res=>res.json())
            .then(data => {
                let result_items = data.suggest.dept_suggestion[0].options
                this.setState({
                    results: result_items
                })
            })
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    this.getInfo(this.state.query)
                }
            } else if (!this.state.query) {
            }
        })
    }

    render() {
        return (
            <form>
                <input
                    placeholder="Search for..."
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                />
                <Suggestions results={this.state.results} />
            </form>
        )
    }
}

export default FormsSearchBox