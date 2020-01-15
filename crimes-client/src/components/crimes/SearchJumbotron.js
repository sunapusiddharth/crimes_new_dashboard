import React, { Fragment, Component,createRef } from 'react'
import '../../styles/search_jumbotron.css'
import { Form, FormControl, Button, Jumbotron, Container } from 'react-bootstrap'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';



class SearchJumbotron extends Component {
    constructor() {
        super()
        this.input_ref = createRef()   
        this.select_ref = createRef()
    }

    submitForm = (event) =>{
        let query_word = this.input_ref.current.value
        let category = this.select_ref.current.value
        console.log("query_word=",this.props)
        this.props.history.push(`/crimes/search?query=${query_word}`)
        event.preventDefault()
    }

    render() {
        let bgImg = '/assets/police_bg.jpg'
        let divStyle = {
            color: 'blue',
            // backgroundImage: 'url(' + this.props.single_crime.urlToImage?this.props.single_crime.urlToImage:'/assets/crime_news_background.jpg' + ')',
            backgroundImage: `url(${bgImg})`,
        }
        return (
            <Fragment>
                <Jumbotron style={divStyle} fluid>
                    <section className="search-sec">
                        <div className="container">
                            <form novalidate="novalidate" onSubmit={this.submitForm}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6 col-sm-12 p-0">
                                                <input type="text" id="input_query"  ref={this.input_ref} className="form-control search-slt" placeholder="Search for crimes,incidents,victims,accused,people related to crimes..." />
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                                <select className="form-control search-slt"  ref={this.select_ref} id="exampleFormControlSelect1">
                                                    <option>Select Offense Code</option>
                                                    <option>Murder</option>
                                                </select>
                                            </div>
                                            <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                                <button type="submit" className="btn btn-danger wrn-btn">Find Crimes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </section>
                </Jumbotron>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({

})

export default withRouter(connect(mapStateToProps, null)(SearchJumbotron) )
