import React, { Component, Fragment, createRef } from 'react'
import { connect } from 'react-redux'
import '../../../styles/crime_individual.css'
import { fetchDepartmentWithoutDetails, getIndividualVacancy } from '../../../actions/departmentActions'
import PageLoader from '../../../common/PageLoader'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade';
import { withRouter } from 'react-router-dom';

class Vacancy extends Component {

    componentDidMount() {
        console.log("CDM", this.props)
        let vacancies_id = this.props.match.params.vacancies_id
        let dept_id = this.props.match.params.dept_id
        this.props.dispatch(fetchDepartmentWithoutDetails(dept_id))
        this.props.dispatch(getIndividualVacancy(vacancies_id))
    }

    render() {
        if (this.props.loading_vacancy || this.props.department_loading_without_details) {
            return <PageLoader loading={this.props.loading_vacancy && this.props.department_loading_without_details} />
        } else {
            let department = this.props.department_without_details
            let vacancy = this.props.vacancy
            return (
                <Fragment>
                    <div className="w3-light-grey">
                        <div className="w3-bar w3-black w3-hide-small">
                            <a href={`/department/${department._id}/forms`} className="w3-bar-item w3-button">Forms</a>
                            <a href={`/department/${department._id}/recent_posts`} className="w3-bar-item w3-button">Recent Posts</a>
                            <a href={`/department/${department._id}/press_release`} className="w3-bar-item w3-button">Press Releases</a>
                            <a href={`/department/${department._id}/vacancies`} className="w3-bar-item w3-button">Jobs</a>
                            <a href={`/department/${department._id}/speeches`} className="w3-bar-item w3-button">Speeches</a>
                            <a href={`/department/${department._id}/news`} className="w3-bar-item w3-button">News</a>
                        </div>
                        <div className="w3-content" style={{ maxWidth: "1600px" }}>
                            <header className="w3-container w3-center w3-padding-21 w3-white">
                                <h3 className="w3-xxxmeduim"><b>{department.name}</b></h3>
                                <h6>{department.agency},{department.organization}<span className="w3-tag">{department.city},{department.state}</span></h6>
                            </header>
                        </div>
                    </div>
                    <hr />
                    <br />
                    <h2>{vacancy.title}</h2>
                    {vacancy.hiring_office} ,{vacancy.hiring_org && vacancy.hiring_org.name}
                    <p>Posted on : {vacancy.created}</p>
                    <p>Deadline: {vacancy.deadline ? vacancy.deadline : 'No deadline info'} </p>
                    {vacancy.location && <p>Address: { vacancy.location.thoroughfare},{vacancy.location.locality},{vacancy.location.administrative_area},{vacancy.location.country}</p>}
                    <h5>Summary</h5>
                    <p dangerouslySetInnerHTML={{ __html:vacancy.body}}/>
                    <h5>Qualifications</h5>
                    <p dangerouslySetInnerHTML={{ __html:vacancy.qualifications}}/>
                    <p>Salary : {vacancy.salary}</p>
                    <h5>Application Process</h5>
                    <p dangerouslySetInnerHTML={{ __html:vacancy.application_process}}/>
                    <h5>About Office</h5>
                    <p dangerouslySetInnerHTML={{ __html:vacancy.about_office}}/>
                </Fragment>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    vacancy: state.departmentReducer.vacancy,
    loading_vacancy: state.departmentReducer.loading_vacancy,
    department_loading_without_details: state.departmentReducer.department_loading_without_details,
    department_without_details: state.departmentReducer.department_without_details,
})

export default withRouter(connect(mapStateToProps, null)(Vacancy))
