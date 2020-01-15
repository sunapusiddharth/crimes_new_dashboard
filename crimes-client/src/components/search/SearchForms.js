import React, { Component, Fragment, createRef } from 'react'
import { connect } from 'react-redux'
import '../../styles/search_all.css'
import DepartmentSearchBox from '../departments/DepartmentSearchBox';
import SearchResultFormCard from '../search/SearchResultFormCard'
import { searchDepartmentAttachments } from '../../actions/searchActions'
import PageLoader from '../../common/PageLoader';
import Pagination from '../../common/Pagination'
import { Card } from 'react-bootstrap'

class SearchForms extends Component {
    constructor() {
        super()
        this.state = {
            allCountries: [], currentCountries: [], currentPage: null, totalPages: null, totalRecords: null, pageLimit: 10,
            search_query: ''
        }
        this.ref = createRef()
    }

    componentDidMount() {
        this.props.dispatch(searchDepartmentAttachments("", '', 0, 10))
    }

    onPageChanged = data => {
        // to resolve pagination do something in here . I think something is breaking in this ..
        const { currentPage, totalPages, pageLimit } = data;
        let from = (currentPage * pageLimit) + 1
        console.log("focus obj=t", this.myInp)
        this.ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
        this.setState({ currentPage, totalPages, pageLimit })
        this.props.dispatch(searchDepartmentAttachments(this.state.search_query, '', from, pageLimit))
    }

    changeSearchQuery = (search_query) => {
        this.setState({ search_query })
    }

    render() {
        if (this.props.loading) {
            return <PageLoader loading={this.props.loading} />
        } else {
            if (!this.props.forms.length) {
                // debugger
                return <Fragment>
                    <div className="row search_people" ref={this.ref}>
                        <div className="col-lg-12 col-md-12 ">
                            <DepartmentSearchBox searchAction={searchDepartmentAttachments} sidhu={"sasasa"} changeSearchQuery={this.changeSearchQuery} />
                        </div>
                        <Card className="no_results_page_card">
                            <Card.Title>No Results</Card.Title>
                            <Card.Body>Sorry no resulst found please try by changing the terms or filters</Card.Body>
                        </Card>
                    </div>
                </Fragment>
            } else {
                const { currentPage, totalPages } = this.state;
                let currentCountries = this.props.forms
                const totalCountries = this.props.total_forms
                console.log("currentCountries=", currentCountries.length,totalCountries)
                if (totalCountries === 0) return null;
                const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
                console.log("current_data=", currentCountries.length, this.state)
                return (
                    <Fragment>
                        <div className="row search_people" ref={this.ref}>
                            <div className="col-lg-8 col-md-8 ">
                                <DepartmentSearchBox changeSearchQuery={this.changeSearchQuery} searchAction={searchDepartmentAttachments} sidhu={"sasasa"} />
                            </div>
                            <div className="col-lg-4 col-md-4 page_count" >
                                {currentPage && (
                                    <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                        Page <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
                                    </span>
                                )}
                            </div>
                        </div>
                        <p className="search_brief">Shows all the forms present in the system along with the department to which it belongs .Click on more if you want more information about the department.A small brief about the form's content is provided if present.</p>
                        {currentCountries.map(result => <SearchResultFormCard key={result._id} result={result} />)}
                        <div className="container mb-5">
                            <div className="row d-flex flex-row py-5">
                                <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                        <h2 className={headerClass}>
                                            <strong className="text-secondary">{totalCountries}</strong> matching Forms
                                    </h2>
                                    </div>
                                    <div className="d-flex flex-row py-4 align-items-center">
                                        <Pagination totalRecords={totalCountries} pageLimit={10} pageNeighbours={1} onPageChanged={this.onPageChanged} />
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
    forms: state.searchReducer.forms,
    forms_loading: state.searchReducer.forms_loading,
    total_forms: state.searchReducer.total_forms
})

export default connect(mapStateToProps, null)(SearchForms)
