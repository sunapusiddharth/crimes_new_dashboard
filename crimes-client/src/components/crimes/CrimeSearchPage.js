import React, { Component, Fragment, createRef, useState } from 'react'
import { connect } from 'react-redux'
import { Form, FormControl, Media, Button, Navbar, Badge, Collapse } from 'react-bootstrap'
import '../../styles/crime_search_results.css'
import { fetchCrimeSearch, saveSearchTerm } from '../../actions/crimeActions';
import PageLoader from '../../common/PageLoader';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"

import CrimeFacetsMaterialUI from './CrimeFacetsMaterialUI';


class CrimeSearchPage extends Component {
    constructor() {
        super()
        this.ref = createRef()
        this.state = {
            searched_keyword: '',
            isFetching: false,
            start: 10,
            loaded: false
        }

    }

    fetchMoreListItems = () => {
        console.log("cdm  23")
        let query_word = this.ref.current.value
        this.props.history.push({
            pathname: '/crimes/search',
            search: '?query=' + query_word
        })
        this.setState({ search_keyword: query_word, isFetching: false, start: (this.state.start + 10), loaded_once: true })
        this.props.dispatch(fetchCrimeSearch(query_word, this.state.start, 10, false))
    }

    componentDidMount() {
        var params = new URLSearchParams(this.props.location.search);
        var search_keyword = params.get('query');
        this.ref.current.value = search_keyword
        window.addEventListener('scroll', this.handleScroll);
        this.setState({ search_keyword })
        this.props.dispatch(saveSearchTerm(search_keyword))
        this.props.dispatch(fetchCrimeSearch(search_keyword, 0, 10, true))
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleOnScroll);
    }



    componentDidUpdate() {
        // debugger;
        // console.log("hi here cdu start")

        if (!this.state.isFetching || this.state.start >= (this.props.crime_search_results_total > 10 ? this.props.crime_search_results_total : 10)) return
        console.log("hi here cdu", this.state, this.props.crime_search_results_total)
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
            if (this.state.start < this.props.crime_search_results_total) this.setState({ isFetching: true })

        } else {
            // console.log("else")
        }
    }

    onSearch = (event) => {
        console.log(this.ref.current, this.ref)
        let query_word = this.ref.current.value
        this.props.history.push({
            pathname: '/crimes/search',
            search: '?query=' + query_word
        })
        this.setState({ search_keyword: query_word })
        this.props.dispatch(fetchCrimeSearch(query_word, 0, 10, true))
        event.preventDefault()
    }

    onSearchValueChange = (event) => {
        this.props.dispatch(saveSearchTerm(event.target.value))
    }

    render() {
        let { search_keyword } = this.state
        return (
            <Fragment>
                <div className="crime_search_page">
                <Navbar bg="dark" variant="dark">
                    <div className="row">
                        <div className="col-lg-2 col-md-2">
                            <Link to="/crimes"><Navbar.Brand>Crimes</Navbar.Brand></Link>
                        </div>
                        <div className="col-lg-10 col-md-10">
                            <Form inline>
                                <div className="row">
                                    <div className="col-lg-8 col-md-8">
                                        <FormControl type="text" placeholder="Search" className="mr-sm-2" ref={this.ref} onChange={this.onSearchValueChange} />
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <Button variant="outline-info" type="submit" onClick={this.onSearch}>Search</Button>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Navbar>
                <hr />
                <div className="row">
                    <div className="col-lg-4 col-md-4">
                        <CrimeFacetsMaterialUI />
                    </div>
                    <div className="col-lg-8 col-md-8">
                        {this.props.crime_search_results_loading && !this.props.crime_search_results.length ? <PageLoader loading={this.props.crime_search_results_loading} /> :
                            <SearchResultsRender data={this.props.crime_search_results} total={this.props.crime_search_results_total} search_keyword={search_keyword} start={this.state.start} />
                        }
                    </div>
                </div>
                }
                    {this.state.isFetching && 'Fetching more list items...'}
                    </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    crime_search_results: state.crimeReducer.crime_search_results,
    crime_search_results_loading: state.crimeReducer.crime_search_results_loading,
    crime_search_results_total: state.crimeReducer.crime_search_results_total,
})



const SearchResultsRender = (props) => {
    const [openAccussed, setOpenAccussed] = useState(false);
    const [openVictims, setOpenVictims] = useState(false);
    const [openSuspects, setOpenSuspects] = useState(false);
    return (
        <Fragment>
            <hgroup class="mb20">
                <h1>Search Results</h1>
                <h2 class="lead"><strong class="text-danger">{props.total}</strong> You searched for term "<strong class="text-danger">{props.search_keyword}</strong>" </h2>
                <p>Search records in title and content . Title field used edge ngram analyzer helps in partial searching of words possible.By default results are sorted first by score , then published date and then by the no of hits.</p>
            </hgroup>
            {props.data && props.data.length ? <section class="col-xs-12 col-sm-6 col-md-12">
                {/* <CrimeSearchFeaturedPersonResult data={props.data.slice(0,1)}/> */}
                {props.data.map(data => {
                    let record = data && data._source
                    if (!record) return <div></div>
                    let date = new Date(record.occurence_on_date)
                    let date_string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                    let time_string = `${date.getHours()}:${date.getMinutes()}`

                    return <article class="crime_search search-result row">
                        <div class="col-xs-12 col-sm-12 col-md-3 search_result_image">
                            <a href="#" title="Lorem ipsum" class="thumbnail"><img src={record.imageUrl} alt={record.title} /></a>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-2">
                            <ul class="meta-search">
                                <li><FontAwesomeIcon icon={faCalendar} /> <span>{date_string}</span></li>
                                <li><FontAwesomeIcon icon={faTimesCircle} /><span>{time_string}</span></li>
                                <li><Badge variant="dark">{record.category}</Badge></li>
                            </ul>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-7 excerpet">
                            <h3><a href={`/crimes/single/${data._id}`} title="" dangerouslySetInnerHTML={{ __html: data.highlight && data.highlight.title && data.highlight.title.length ? data.highlight.title[0] : record.title }}></a></h3>
                            <p>Occurred on : <Badge variant="light">{date_string}</Badge> at {record.address} in the district of {record.disctrict},{record.street}</p>
                            <p dangerouslySetInnerHTML={{ __html: data.highlight && data.highlight.description && data.highlight.description.length ? data.highlight.description[0] : record.description }}></p>
                            <div className="row crime_people">
                                <div className="col" onClick={() => setOpenVictims(!openVictims)} aria-expanded="victims_collapse">
                                    Victims: <Badge variant="danger">{record.victims.length}</Badge>
                                    <Collapse in={openVictims}>
                                        <div id="victims_collapse">
                                            {record.victims && record.victims.map((victim, index) => <p key={`crime_victim_${index}`} className="crime_people">{victim}</p>)}
                                        </div>
                                    </Collapse>
                                </div>
                                <div className="col" onClick={() => setOpenSuspects(!openSuspects)} aria-expanded="suspects_collapse">
                                    Suspects: <Badge variant="danger"  >{record.suspects.length}</Badge>
                                    <Collapse in={openSuspects}>
                                        <div id="suspects_collapse">
                                            {record.suspects && record.suspects.map((suspect, index) => <p key={`crime_suspect_${index}`} className="crime_people">{suspect}</p>)}
                                        </div>
                                    </Collapse>
                                </div>
                                <div className="col" onClick={() => setOpenAccussed(!openAccussed)} aria-expanded="accussed_collapse">
                                    Accussed: <Badge variant="danger"  >{record.accussed.length}</Badge>
                                    <Collapse in={openAccussed}>
                                        <div id="accussed_collapse">
                                            {record.accussed && record.accussed.map((person, index) => <p key={`crime_accussed_${index}`} className="crime_people">{person}</p>)}
                                        </div>
                                    </Collapse>
                                </div>
                            </div>
                        </div>
                    </article>
                }
                )}
            </section>
                : <ul className="list-unstyled"><Media as="li">
                    <h3>{(props.start >= (props.total > 10 ? props.total : 10) && props.loaded_once) ? "You have reached end" : "Sorry no results found !!! Please try again by changing the keywords."}</h3>
                </Media></ul>}
        </Fragment>
    )
}
export default connect(mapStateToProps, null)(CrimeSearchPage)
