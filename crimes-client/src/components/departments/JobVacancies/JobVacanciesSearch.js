import React, { Component, Fragment,createRef } from 'react'
import { connect } from 'react-redux'
import '../../../styles/search_all.css'
import DepartmentSearchBox from '../../departments/DepartmentSearchBox';
import { searchVacancies } from '../../../actions/searchActions'
import PageLoader from '../../../common/PageLoader';
import Pagination from '../../../common/Pagination'
import { Card, Badge } from 'react-bootstrap'
import JobVacanciesSearchCard from './JobVacanciesSearchCard';


class JobVacanciesSearch extends Component {
    constructor() {
        
        super()
        this.state = { allCountries: [], currentCountries: [], currentPage: null, totalPages: null, totalRecords: null, pageLimit: 10,
            search_query: '' }
        this.ref = createRef() 
    }

    componentDidMount() {
        
        //just to get the count 
        this.props.dispatch(searchVacancies("", {}, 0,10))
    }

    changeSearchQuery = (search_query) => {
        this.setState({ search_query })
    }


    onPageChanged = data => {
        const { currentPage, totalPages, pageLimit } = data;
        let from = (currentPage * pageLimit) + 1
        console.log("focus obj=t",this.myInp)
        this.ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        this.props.dispatch(searchVacancies(this.state.search_query, {}, (from-10), pageLimit))
        this.setState({ currentPage, totalPages, pageLimit })
    }

    render() {
        if (this.props.vacancies_loading) {
            return <PageLoader loading={this.props.vacancies_loading} />
        } else {
            // debugger
            if (!(this.props.search_results &&  this.props.search_results.hits && this.props.search_results.hits.hits.length)) {
                // debugger
                return <Fragment>
                    <h3>Search Job Vacancies</h3>
                    <p>All speehes within this department can be searched here . You can bookmark your favourite blogposts here or bookmark a department to follow its posts.Filter through year using the slider on left.</p>
                    <div className="row search_people" ref={this.ref}>
                        <div className="col-lg-12 col-md-12 ">
                            <DepartmentSearchBox searchAction={searchVacancies} sidhu={"sasasa"} changeSearchQuery={this.changeSearchQuery} />
                        </div>
                        <Card className="no_results_page_card">
                            <Card.Title>No Results</Card.Title>
                            <Card.Body>Sorry no resulst found please try by changing the terms or filters</Card.Body>
                        </Card>
                    </div>
                </Fragment>
            } else {
                // debugger
                const { currentPage, totalPages } = this.state;
                let currentCountries = this.props.search_results.hits.hits
                const totalCountries = this.props.total_vacancies;
                console.log("currentCountries=", currentCountries,totalCountries)
                if (totalCountries === 0) return null;
                const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
                return (
                    <Fragment>
                        <div className="row search_people" ref={this.ref}>
                            <div className="col-lg-8 col-md-8 ">
                            <DepartmentSearchBox changeSearchQuery={this.changeSearchQuery}  searchAction={searchVacancies} sidhu={"search_people"}/>
                            </div>
                            <div className="col-lg-4 col-md-4 page_count" >
                            {currentPage && (
                            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                Page <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
                            </span>
                        )}
                            </div>
                        </div>
                        <p className="additional_metadata_people_search">Find vacancies in the job vacancy data provided for each dept.Click on show more to view more details about a vacancy.</p>
                        {currentCountries.map(result => <JobVacanciesSearchCard key={result._id} result={result} />)}
                        <div className="container mb-5">
                            <div className="row d-flex flex-row py-5">
                                <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                        <h2 className={headerClass}>
                                            <strong className="text-secondary">{totalCountries}</strong> Vacancies
                                    </h2>
                                    </div>
                                    <div className="d-flex flex-row py-4 align-items-center">
                                        <Pagination totalRecords={this.props.total_vacancies} pageLimit={10} pageNeighbours={1} onPageChanged={this.onPageChanged} />
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
    search_results: state.searchReducer.vacancies,
    vacancies_loading: state.searchReducer.vacancies_loading,
    total_vacancies: state.searchReducer.total_vacancies,
})

export default connect(mapStateToProps, null)(JobVacanciesSearch)
