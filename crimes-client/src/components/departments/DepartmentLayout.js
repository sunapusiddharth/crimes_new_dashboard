// jumbotron , search bar at centre of jumbotron , recently commited in centre full width navigator type  
// all crimes sorted by date in left ,  recently viewed crimes and marked crimes , tags.
import React, { Component, Fragment, createRef } from 'react'
import { connect } from 'react-redux'
import { Nav, Form, FormControl, Media, Button, Navbar, Jumbotron, Container, Badge } from 'react-bootstrap'
import {fetchAllDepartments} from '../../actions/departmentActions';
import PageLoader from '../../common/PageLoader';
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade';
import { withRouter } from 'react-router-dom';
import SearchJumbotron from './SearchJumbotron';
import PaginatedDepartments from './PaginatedDepartments';
import '../../styles/departments_layout.css'

class DepartmentLayout extends Component {
    constructor() {
        super()
        this.ref = createRef()
    }

    componentDidMount() {
        if (!this.props.all_departments.length) this.props.dispatch(fetchAllDepartments(0,10))
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
            <PaginatedDepartments/>
        </Fragment>
    }


}

const mapStateToProps = (state) => ({
    all_departments: state.departmentReducer.all_departments,
    all_departments_loading: state.departmentReducer.all_departments_loading,
})
export default withRouter(connect(mapStateToProps, null)(DepartmentLayout))
