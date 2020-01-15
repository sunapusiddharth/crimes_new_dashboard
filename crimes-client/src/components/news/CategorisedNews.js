import React, { Component, Fragment } from 'react'
import { Media,Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'



export default class CategorisedNews extends Component {

    constructor(props) {
        super(props)
        this.state = {
            total_records: props.data && props.data.length,
            records_showing: 3
        }
    }
    showMore = () => {
        console.log("shoMore", this.state.records_showing)
        if (this.state.records_showing <= this.state.total_records) this.setState({ records_showing: (this.state.records_showing + 3) })
    }

    showLess = () => {
        console.log("showLess", this.state.records_showing)
        if (this.state.records_showing > 3) this.setState({ records_showing: (this.state.records_showing - 3) })
    }

    render() {
        if (this.props.data && this.props.data.length) {
            // debugger
            return (
                <Fragment>
                    <h4>Categorised News</h4>
                    <hr size={30}/>
                    <div class="row">
                        {this.props.data.slice(0, this.state.records_showing).map(category =>
                            <div className="categorised_news_list justify-content-left shadow p-3 mb-5 bg-light rounded">
                                <h4>{category._id}</h4>
                                <ul className="list-unstyled categorised_news">
                                    {category.docs.map(doc =><Link to={`/news/single/${doc._id}`}> <li className="list-inline-item"><p>{doc.title} Hits:{doc.hits}</p></li></Link>)}
                                </ul>
                            </div>
                        )}
                    </div>
                    {this.state.records_showing < this.state.total_records && <Button variant="light" className="show_more" onClick={this.showMore}>Show More</Button>}
                    {(this.state.records_showing >= this.state.total_records || this.state.records_showing > 3) && <Button variant="light" className="show_more" onClick={this.showLess}>Show Less</Button>}
                </Fragment>
            )
        } else {
            return <div>No data</div>
        }
    }
}
