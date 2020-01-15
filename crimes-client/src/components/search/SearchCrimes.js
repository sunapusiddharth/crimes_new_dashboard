import React, { Component, Fragment,createRef } from 'react'
import { connect } from 'react-redux'
import '../../styles/search_all.css'
import DepartmentSearchBox from '../departments/DepartmentSearchBox';
import SearchResultCrimeCard from '../search/SearchResultCrimeCard'
import {searchCrimes} from '../../actions/searchActions'
import PageLoader from '../../common/PageLoader';
import Pagination from '../../common/Pagination'


class SearchCrimes extends Component {
    constructor() {
        super()
        this.state = { allCountries: [], currentCountries: [], currentPage: null, totalPages: null, totalRecords: null, pageLimit: 10 }
        this.ref = createRef() 
    }

    componentDidMount(){
        this.props.dispatch(searchCrimes("", '', 0, 10))
    }

    onPageChanged = data => {
        const { currentPage, totalPages, pageLimit } = data;
        let from = (currentPage * pageLimit) + 1
        console.log("focus obj=t",this.myInp)
        this.ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        this.props.dispatch(searchCrimes("", '', from, pageLimit))
        this.setState({ currentPage, totalPages, pageLimit })
    }


    render() {
        if (this.props.loading) {
            return <PageLoader loading={this.props.loading}/>
        } else {
            if( !this.props.crimes.length){
                return <div className="no_results page_layout">No data found</div>
            }else{
                const { currentPage, totalPages } = this.state;
                let currentCountries = this.props.crimes
                const totalCountries = this.props.total_crimes
                console.log("currentCountries=", currentCountries)
                if (totalCountries === 0) return null;
                const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
                return (
                    <Fragment>
                        <div className="row search_people" ref={this.ref}>
                            <div className="col-lg-8 col-md-8 ">
                            <DepartmentSearchBox searchAction={searchCrimes} sidhu={"sasasa"}/>
                            </div>
                            <div className="col-lg-4 col-md-4 page_count" >
                            {currentPage && (
                            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                Page <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
                            </span>
                        )}
                            </div>
                        </div>
                        {currentCountries.map(result => <SearchResultCrimeCard key={result._id} result={result} id={result._id}/>)}
                        <div className="container mb-5">
                            <div className="row d-flex flex-row py-5">
                                <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                        <h2 className={headerClass}>
                                            <strong className="text-secondary">{totalCountries}</strong> Crimes
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
    crimes:state.searchReducer.crimes,
    crimes_loading:state.searchReducer.crimes_loading,
    total_crimes:state.searchReducer.total_crimes
})

export default connect(mapStateToProps, null)(SearchCrimes)
