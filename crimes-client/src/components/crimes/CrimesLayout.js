// jumbotron , search bar at centre of jumbotron , recently commited in centre full width navigator type  
// all crimes sorted by date in left ,  recently viewed crimes and marked crimes , tags.
import React, { Component, Fragment, createRef } from 'react'
import { connect } from 'react-redux'
import { Nav, Form, FormControl, Media, Button, Navbar, Jumbotron, Container, Badge } from 'react-bootstrap'

import {fetchLatestCrime } from '../../actions/crimeActions';
import PageLoader from '../../common/PageLoader';
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade';
import { withRouter } from 'react-router-dom';
import SearchJumbotron from './SearchJumbotron';
import CrimesNavigator from './CrimesNavigator';
import PaginatedCrimes from './PaginatedCrimes';
import '../../styles/crimes.css'


class CrimesLayout extends Component {
    constructor() {
        super()
        this.ref = createRef()
    }

    componentDidMount() {
        if (!this.props.latest_crimes.length) this.props.dispatch(fetchLatestCrime())
    }

    componentDidUpdate(prevProps) {
        // let news_id = this.props.match.params.id
        // if (prevProps.match.params.id != this.props.match.params.id) {
        // this.props.dispatch(fetchSingleCrimeNews(news_id))
        // }
    }

   

    render() {
        return <Fragment>
            <SearchJumbotron onSearch={this.onSearch} />
            <br />
            <br />
            <hr />
            {this.props.latest_crimes_loadng ?
                <PageLoader loading={this.props.latest_crimes_loadng} /> :
                <CrimesNavigator className="card_navigator" title="Recently Commited Crimes" data={this.props.latest_crimes.length && this.props.latest_crimes} />
            }
            <br />
            <br />
            <hr />
            <PaginatedCrimes/>
        </Fragment>
    }


}

const mapStateToProps = (state) => ({
    latest_crimes: state.crimeReducer.latest_crimes,
    latest_crimes_loadng: state.crimeReducer.latest_crimes_loadng,
})
export default withRouter(connect(mapStateToProps, null)(CrimesLayout))
