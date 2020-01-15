import React, { Component, Fragment,createRef } from 'react'
import { connect } from 'react-redux'
import '../../../styles/search_all.css'
import DepartmentSearchBox from '../../departments/DepartmentSearchBox';
import { searchPosts } from '../../../actions/searchActions'
import PageLoader from '../../../common/PageLoader';
import Pagination from '../../../common/Pagination'
import { Card, Badge } from 'react-bootstrap'
import PostSearchCard from './PostSearchCard';


class AllPostsSearch extends Component {
    constructor() {
        
        super()
        this.state = { allCountries: [], currentCountries: [], currentPage: null, totalPages: null, totalRecords: null, pageLimit: 10,
            search_query: '' }
        this.ref = createRef() 
    }

    componentDidMount() {
        
        //just to get the count 
        this.props.dispatch(searchPosts("", {}, 0,10))
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
        this.props.dispatch(searchPosts(this.state.search_query, {}, (from-10), pageLimit))
        this.setState({ currentPage, totalPages, pageLimit })
    }

    render() {
        if (this.props.posts_loading) {
            return <PageLoader loading={this.props.posts_loading} />
        } else {
            if (!Object.keys(this.props.search_results).length) {
                return <Fragment>
                    <h3>Search Blog Posts</h3>
                    <p>All bogs within this department can be searched here . You can bookmark your favourite blogposts here or bookmark a department to follow its posts.Filter through year using the slider on left.</p>
                    <div className="row search_people" ref={this.ref}>
                        <div className="col-lg-12 col-md-12 ">
                            <DepartmentSearchBox searchAction={searchPosts} sidhu={"sasasa"} changeSearchQuery={this.changeSearchQuery} />
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
                const totalCountries = this.props.total_posts;
                console.log("currentCountries=", currentCountries,totalCountries)
                if (totalCountries === 0) return null;
                const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
                return (
                    <Fragment>
                        <div className="row search_people" ref={this.ref}>
                            <div className="col-lg-8 col-md-8 ">
                            <DepartmentSearchBox changeSearchQuery={this.changeSearchQuery}  searchAction={searchPosts} sidhu={"search_people"}/>
                            </div>
                            <div className="col-lg-4 col-md-4 page_count" >
                            {currentPage && (
                            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                Page <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
                            </span>
                        )}
                            </div>
                        </div>
                        <p className="additional_metadata_people_search">Find people using the filters or by entering keywords.Person can be searched using name, education , employment details.Criminals can be searched by the prisons in which they were held or using cases where their names appear.
                                    Uses elasticsearch nested indexing and querying to give results , by default name is given more priority.Facets are provided to give a general idea of people belonging to different categories.Highlighted term is shown in more info .Using css we can see additional info about that person.Click on show more<Badge variant="dark">coming soon</Badge> to view more details about a person.
                                </p>
                        {currentCountries.map(result => <PostSearchCard key={result._id} result={result} />)}
                        <div className="container mb-5">
                            <div className="row d-flex flex-row py-5">
                                <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                        <h2 className={headerClass}>
                                            <strong className="text-secondary">{totalCountries}</strong> Posts
                                    </h2>
                                    </div>
                                    <div className="d-flex flex-row py-4 align-items-center">
                                        <Pagination totalRecords={this.props.total_posts} pageLimit={10} pageNeighbours={1} onPageChanged={this.onPageChanged} />
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
    search_results: state.searchReducer.posts,
    loading: state.searchReducer.posts_loading,
    total_posts: state.searchReducer.total_posts,
})

export default connect(mapStateToProps, null)(AllPostsSearch)
