import React, { Component, Fragment, createRef } from 'react'
import { connect } from 'react-redux'
import { getAllVacancies ,fetchDepartmentWithoutDetails} from '../../../actions/departmentActions';
import { CardColumns, Card, Badge } from 'react-bootstrap'
import PageLoader from '../../../common/PageLoader';
import '../../../styles/department_post.css'
import Pagination from '../../../common/Pagination'
import { Link } from 'react-router-dom'

class AllVacanices extends Component {
    constructor() {
        super()
        this.state = {
            allCountries: [],
            currentCountries: [],
            currentPage: null,
            totalPages: null,
            totalRecords: null,
            pageLimit: 20,
            firstPageLoaded: false,
            department_id: 0
        }
        this.ref = createRef()

    }

    componentDidMount() {
        let dept_id = this.props.match.params.dept_id
        this.props.dispatch(fetchDepartmentWithoutDetails(dept_id))
        this.props.dispatch(getAllVacancies())

    }


    onPageChanged = data => {
        if (!this.state.firstPageLoaded) {
            const { currentPage, totalPages, pageLimit } = data;
            let from = currentPage + 1
            this.ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            this.props.dispatch(getAllVacancies(from))
            this.setState({ currentPage, totalPages, pageLimit, firstPageLoaded: true })
        } else {
            if (data.currentPage != 1) {
                const { currentPage, totalPages, pageLimit } = data;
                let from = currentPage
                this.ref.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
                this.props.dispatch(getAllVacancies(from))
                this.setState({ currentPage, totalPages, pageLimit })
            }
        }
    }

    render() {
        let department_id = this.props.match.params.dept_id
        if (this.props.all_vacancies_loading || this.props.department_loading_without_details) {
            return <PageLoader loading={this.props.all_vacancies_loading && this.props.department_loading_without_details} />
        } else {
            if (!this.props.all_vacancies.length) {
                return <div className="no_results" >No Results</div>
            } else {
                const { currentPage, totalPages } = this.state;
                let currentCountries = this.props.all_vacancies
                const totalCountries = this.props.total_vacancies
                let department  = this.props.department_without_details
                if (totalCountries === 0) return null;
                const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
                return (
                    <Fragment>
                        <div className="w3-light-grey">
                            <div className="w3-bar w3-black w3-hide-small">
                                <a href={`/department/${department_id}/forms`} className="w3-bar-item w3-button">Forms</a>
                                <a href={`/department/${department_id}/recent_posts`} className="w3-bar-item w3-button">Recent Posts</a>
                                <a href={`/department/${department_id}/press_release`} className="w3-bar-item w3-button">Press Releases</a>
                                <a href={`/department/${department_id}/vacancies`} className="w3-bar-item w3-button">Jobs</a>
                                <a href={`/department/${department_id}/speeches`} className="w3-bar-item w3-button">Speeches</a>
                                <a href={`/department/${department_id}/news`} className="w3-bar-item w3-button">News</a>
                            </div>
                            <div className="w3-content" style={{ maxWidth: "1600px" }}>
                                <header className="w3-container w3-center w3-padding-21 w3-white">
                                    <h3 className="w3-xxxmeduim"><b>{department.name}</b></h3>
                                    <h6>{department.agency},{department.organization}<span className="w3-tag">{department.city},{department.state}</span></h6>
                                </header>
                            </div>
                        </div>
                        <h3 ref={this.ref}>All vacancies here:</h3>
                        {currentPage && (
                            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                Page <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
                            </span>
                        )}
                        <CardColumns className="mb-4">
                            {currentCountries.map(result => {
                                let date = result.created ? new Date(result.created) : new Date()
                                let date_string = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
                                return <Card className="dept_post_card h-100" style={{ height: "auto !important" }}>
                                    <Card.Body>
                                        <Card.Title>{result.title}</Card.Title>
                                        <strong>{result.position}</strong> at {result.location && result.location.thoroughfare}, {result.location && result.location.locality},{result.location && result.location.administrative_area}
                                        Salary - {result.salary && result.salary}
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted pull-left">{result.practice_area},{date_string}</small>
                                        <Badge variant="dark">
                                            <Link to={`/department/${department_id}/vacancies/${result._id}`} className="pull_right">show more</Link>
                                        </Badge>
                                    </Card.Footer>
                                </Card>
                            })}
                        </CardColumns>

                        <div className="container mb-5">
                            <div className="row d-flex flex-row py-5">
                                <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                        <h2 className={headerClass}>
                                            <strong className="text-secondary">{totalCountries}</strong> vacancies
                                            </h2>
                                    </div>
                                    <div className="d-flex flex-row py-4 align-items-center">
                                        <Pagination totalRecords={totalCountries} pageLimit={20} pageNeighbours={1} onPageChanged={this.onPageChanged} loadPageOne={false} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        }
    }
}

const mapStateToProps = (state) => ({
    all_vacancies: state.departmentReducer.vacancies,
    all_vacancies_loading: state.departmentReducer.all_vacancies_loading,
    total_vacancies: state.departmentReducer.total_vacancies,
    department_loading_without_details: state.departmentReducer.department_loading_without_details,
    department_without_details: state.departmentReducer.department_without_details,
})

export default connect(mapStateToProps, null)(AllVacanices)
