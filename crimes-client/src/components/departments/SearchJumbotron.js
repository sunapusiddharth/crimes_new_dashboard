import React, { Fragment, Component, createRef } from 'react'
import '../../styles/search_jumbotron.css'
import { Form, FormControl, Button, Jumbotron, Collapse } from 'react-bootstrap'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PageLoader from '../../common/PageLoader'
import {filtersChanged} from '../../actions/departmentActions'

//filters to be used : state , domain_type, city , organization 

class SearchJumbotron extends Component {
    constructor() {
        super()
        this.input_ref = createRef()
        this.state_ref = createRef()
        this.organization_ref = createRef()
        this.domain_type_ref = createRef()
        this.city_ref = createRef()
        this.state = {
            filter_open: 0
        }
    }

    submitForm = (event) => {
        // debugger
        let query_word = this.input_ref.current.value
        // let city = this.city_ref.current.value
        // let domain_type = this.domain_type_ref.current.value
        // // let organization = this.organization_ref.current.value
        // let state = this.state_ref.current.value
        
        this.props.history.push(`/departments/search?query=${query_word}`)
        event.preventDefault()
    }

    filterCollapse = ()=>{
        this.setState({ filter_open: !this.state.filter_open })
    }

    filterChanged = function (batch_type, event) {
        let filter_object = {}
        filter_object[batch_type] = event.target.value
        this.props.dispatch(filtersChanged(filter_object))
    }

    render() {
        let bgImg = '/assets/police_bg.jpg'
        let divStyle = {
            color: 'blue',
            // backgroundImage: 'url(' + this.props.single_crime.urlToImage?this.props.single_crime.urlToImage:'/assets/crime_news_background.jpg' + ')',
            backgroundImage: `url(${bgImg})`,
        }
        if (this.props.all_departments_loading) {
            return <PageLoader loading={this.props.all_departments_loading} />
        } else {
            console.log("this_props", this.props)
            return (
                <Fragment>
                    <Jumbotron style={divStyle} fluid>
                        <section className="search-sec">
                            <div className="container">
                                <form novalidate="novalidate" onSubmit={this.submitForm}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="row">
                                                <div className="col-lg-1 col-md-1 col-sm-12 p-0">
                                                    <button type="button" aria-expanded="filters_collapse" className="btn btn-info" onClick={this.filterCollapse}>Filter</button>
                                                </div>
                                                <div className="col-lg-7 col-md-7 col-sm-12 p-0">
                                                    <input type="text" id="input_query" ref={this.input_ref} className="form-control search-slt" placeholder="Search for departments" />
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-sm-12 p-0">
                                                    <button type="submit" className="btn btn-danger wrn-btn">Find Departments</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Collapse in={this.state.filter_open}>
                                        <div id="filters_collapse">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-sm-12 p-0">
                                                    <input type="text" className="form-control search-slt" list="cities" placeholder="Cities"
                                                        onChange={this.filterChanged.bind(this, "selected_city")}
                                                        value={this.props.selected_city}
                                                        ref={this.city_ref}
                                                    />
                                                    <datalist id="cities">
                                                        {this.props.city.map((name, index) => {
                                                            return <option key={index} value={name}>
                                                                {name}
                                                            </option>
                                                        })}
                                                    </datalist>
                                                </div>

                                                <div className="col-lg-4 col-md-4 col-sm-12 p-0">
                                                    <input type="text" className="form-control search-slt" list="states" placeholder="State"
                                                        onChange={this.filterChanged.bind(this, "selected_state")}
                                                        value={this.props.selected_state}
                                                        ref={this.state_ref}
                                                    />
                                                    <datalist id="states">
                                                        {this.props.state.map((name, index) => {
                                                            return <option key={index} value={name}>
                                                                {name}
                                                            </option>
                                                        })}
                                                    </datalist>
                                                </div>

                                                <div className="col-lg-4 col-md-4 col-sm-12 p-0">
                                                    <input type="text" className="form-control search-slt" list="domain_type" placeholder="Domain"
                                                        onChange={this.filterChanged.bind(this, "selected_domain_type")}
                                                        value={this.props.selected_domain_type}
                                                        ref={this.domain_type_ref}
                                                    />
                                                    <datalist id="domain_type">
                                                        {this.props.domain_types.map((name, index) => {
                                                            return <option key={index} value={name}>
                                                                {name}
                                                            </option>
                                                        })}
                                                    </datalist>
                                                </div>
                                            </div>
                                        </div>
                                    </Collapse>
                                </form>
                            </div>
                        </section>
                    </Jumbotron>
                </Fragment>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    city: state.departmentReducer.city,
    state: state.departmentReducer.state,
    organization: state.departmentReducer.organization,
    domain_types: state.departmentReducer.domain_types,
    all_departments_loading: state.departmentReducer.all_departments_loading,
    selected_state: state.departmentReducer.selected_state,
    selected_domain_type: state.departmentReducer.selected_domain_type,
    selected_city: state.departmentReducer.selected_city
})

export default withRouter(connect(mapStateToProps, null)(SearchJumbotron))
