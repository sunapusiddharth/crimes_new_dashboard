import React, { Component, Fragment, createRef, useState } from 'react'
import { connect } from 'react-redux'
import { Form, FormControl, Media, Button, Navbar, Badge, Collapse, Card } from 'react-bootstrap'
// import '../../styles/search_results.css'
import { searchDepartments, filtersChanged, fetchAllDepartments } from '../../actions/departmentActions'
import PageLoader from '../../common/PageLoader';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"
import { withRouter } from 'react-router-dom';
import DepartmentSearchResultCard from './DepartmentSearchResultCard'
import faker from 'faker'

class DepartmentSearchResults extends Component {
    constructor() {
        super()
        this.state = {
            searched_keyword: '',
            isFetching: false,
            start: 0,
            loaded: false,
            filter_open: 0
        }
        this.input_ref = createRef()
        this.state_ref = createRef()
        this.organization_ref = createRef()
        this.domain_type_ref = createRef()
        this.city_ref = createRef()
    }

    fetchMoreListItems = () => {
        console.log("inside_saerch_renderer 2", this.state)
        let query_word = this.input_ref.current.value
        this.props.history.push({
            pathname: '/departments/search',
            search: '?query=' + query_word
        })
        this.setState({ search_keyword: query_word, isFetching: false, start: (this.state.start + 10), loaded_once: true })
        this.props.dispatch(searchDepartments(query_word, this.state.start, 10, false))
    }

    componentDidMount() {
       
        var params = new URLSearchParams(this.props.location.search);
        var search_keyword = params.get('query');
        this.input_ref.current.value = search_keyword
        window.addEventListener('scroll', this.handleScroll);
        this.setState({ search_keyword })
        if (!this.props.city.length || !this.props.state.length || !this.props.domain_types.length) this.props.dispatch(fetchAllDepartments(0, 10))
        this.props.dispatch(searchDepartments(search_keyword, 0, 10, true))
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleOnScroll);
    }

    componentDidUpdate() {
        // console.log("hi here cdu start")
        window.addEventListener('scroll', this.handleScroll);
        if (!this.state.isFetching || this.state.start >= (this.props.search_results_total > 10 ? this.props.search_results_total : 10)) return
        console.log("hi here cdu", this.state, this.props.search_results_total)
        this.fetchMoreListItems()
    }

    handleScroll = () => {
        //  console.log(window.innerHeight + document.docducumentElement.scrollTop)
        var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        var clientHeight = document.documentElement.clientHeight || window.innerHeight;
        var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
        if (scrolledToBottom) {
            console.log("in")
            if (this.state.start < this.props.search_results_total) this.setState({ isFetching: true })

        } else {
            // console.log("else")
        }
    }

    onSearch = (event) => {
        let query_word = this.input_ref.current.value
        this.props.history.push({
            pathname: '/departments/search',
            search: '?query=' + query_word
        })
        this.setState({ search_keyword: query_word })
        this.props.dispatch(searchDepartments(query_word, 0, 10, true))
        event.preventDefault()
    }

    filterCollapse = () => {
        this.setState({ filter_open: !this.state.filter_open })
    }

    filterChanged = function (batch_type, event) {
        let filter_object = {}
        filter_object[batch_type] = event.target.value
        this.props.dispatch(filtersChanged(filter_object))
    }

    render() {
        let date = faker.date.past()
        console.log("faker",faker.date.past())
        // debugger
        let { search_keyword } = this.state
        return (
            <Fragment>
                {/* <Navbar bg="dark" variant="dark">
                    <Link to="/department"><Navbar.Brand>Crimes</Navbar.Brand></Link>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" ref={this.ref} />
                        <Button variant="outline-info" type="submit" onClick={this.onSearch}>Search</Button>
                    </Form>
                </Navbar> */}
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
                                            <button type="submit" className="btn btn-danger wrn-btn" onClick={this.onSearch}>Find Departments</button>
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
                                                {this.props.city && this.props.city.length && this.props.city.map((name, index) => {
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
                                                {this.props.state && this.props.state.length && this.props.state.map((name, index) => {
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
                                                {this.props.domain_types && this.props.domain_types.length && this.props.domain_types.map((name, index) => {
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
                <br /><br />
                <hr />
                {this.props.search_results_loading && !this.props.search_results.length ? <PageLoader loading={this.props.search_results_loading} /> :
                    <SearchResultsRender data={this.props.search_results} total={this.props.department_search_results_total} search_keyword={search_keyword} start={this.state.start} />
                }
                }
                    {this.state.isFetching && 'Fetching more list items...'}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    search_results: state.departmentReducer.search_results,
    search_results_loading: state.departmentReducer.search_results_loading,
    department_search_results_total: state.departmentReducer.department_search_results_total,
    city: state.departmentReducer.city,
    state: state.departmentReducer.state,
    organization: state.departmentReducer.organization,
    domain_types: state.departmentReducer.domain_types,
    selected_state: state.departmentReducer.selected_state,
    selected_domain_type: state.departmentReducer.selected_domain_type,
    selected_city: state.departmentReducer.selected_city
})



const SearchResultsRender = (props) => {

    console.log("inside_saerch_renderer", props)
    if (props.data && props.data.length) {
        return props.data.map(result => <DepartmentSearchResultCard result={result} />)
    } else {
        return <Card>
            <Card.Body>
                No results found for your search terms .Please change the filters or query term.
                </Card.Body>
        </Card>
    }
}
export default withRouter(connect(mapStateToProps, null)(DepartmentSearchResults)) 
