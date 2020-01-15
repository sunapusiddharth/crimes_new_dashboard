import React, { Component, Fragment, createRef, useState } from 'react'
import { connect } from 'react-redux'
import { Form, FormControl, Media, Button, Navbar, Badge, Collapse } from 'react-bootstrap'
import '../../../styles/crime_search_results.css'
import { searchAutoCompletePeople } from '../../../actions/searchActions';
import PageLoader from '../../../common/PageLoader';
import '../../../styles/autocomplete_people.css'
import SearchResultsRender from './SearchResultsRender';


class AutoCompletePeople extends Component {
    constructor() {
        super()
        this.ref = createRef()
        this.state = {
            searched_keyword: '',
            isFetching: false,
            start: 50,
            loaded: false,
            show_results:false
        }

    }

    // fetchMoreListItems = () => {
    //     let query_word = this.ref.current.value
    //     this.setState({ search_keyword: query_word, isFetching: false, start: (this.state.start + 50), loaded_once: true })
    //     this.props.dispatch(searchAutoCompletePeople(query_word,{}, this.state.start, 50, false))
    // }

   

    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleOnScroll);
    // }

    // componentDidUpdate() {
    //     // console.log("hi here cdu start")
    //     window.addEventListener('scroll', this.handleScroll);
    //     if (!this.state.isFetching || this.state.start >= (this.props.crime_search_results_total > 50 ? this.props.crime_search_results_total : 50)) return
    //     console.log("hi here cdu", this.state, this.props.crime_search_results_total)
    //     this.fetchMoreListItems()
    // }

    // handleScroll = () => {
    //     //  console.log(window.innerHeight + document.docducumentElement.scrollTop)
    //     var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    //     var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    //     var clientHeight = document.documentElement.clientHeight || window.innerHeight;
    //     var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    //     if (scrolledToBottom) {
    //         console.log("in")
    //         if (this.state.start < this.props.crime_search_results_total) this.setState({ isFetching: true })

    //     } else {
    //         // console.log("else")
    //     }
    // }

    // initSearch= ()=>{
    //     this.setState({show_results:true})
    //     this.props.dispatch(searchAutoCompletePeople('', {}, false, this.state.start, 50, false))
    // }
    componentDidMount() {
        console.log("here cdm")
        this.setState({show_results:true})
        this.props.dispatch(searchAutoCompletePeople('', {}, false, this.state.start, 50, false))
        // this.props.dispatch(searchAutoCompletePeople('', {}, false, this.state.start, 50, false))
    }

    onFocusOut = ()=>{
        console.log("hi here")
        this.setState({show_results:false})
    }
    searchMore = (event) => {
        let query_word = this.ref.current.value
        this.setState({ search_keyword: query_word, isFetching: false, start: (this.state.start + 50), loaded_once: true })
        this.props.dispatch(searchAutoCompletePeople(query_word, {}, true, this.state.start, 50, false))
    }

    onSearch = (event) => {
        console.log(this.ref.current, this.ref)
        let query_word = this.ref.current.value
        this.setState({ search_keyword: query_word })
        this.props.dispatch(searchAutoCompletePeople(query_word, {}, false, 0, 50, true))
        event.preventDefault() // comment ?
    }

    render() {
        console.log("hi_here2",this.state.show_results)
        let { search_keyword } = this.state
        let people = this.props.people
        return (
            <Form.Group className="autocomplete_form">
                <FormControl type="text" placeholder="Search" className="mr-sm-2" ref={this.ref} onChange={this.onSearch}  
                // onFocus={this.initSearch}
                />
                {/* <Button variant="outline-info" type="submit" onClick={this.onSearch}>Search</Button> */}

                {this.props.search_loading && !people ? <PageLoader loading={this.props.search_loading} /> :
                   <SearchResultsRender  show_results={this.state.show_results} person_type={this.props.person_type} searchMore={this.searchMore} data={people} search_keyword={search_keyword} start={this.state.start} />
                }
            </Form.Group>
        )
    }
}

const mapStateToProps = (state) => ({
    search_loading: state.searchReducer.search_loading,
    people: state.searchReducer.autocomplete_people
})

export default connect(mapStateToProps, null)(AutoCompletePeople)
