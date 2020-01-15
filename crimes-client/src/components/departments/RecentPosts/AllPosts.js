import React, { Component, Fragment, createRef } from 'react'
import { connect } from 'react-redux'
import { getAllPosts } from '../../../actions/departmentActions';
import { CardColumns, Card,Badge } from 'react-bootstrap'
import PageLoader from '../../../common/PageLoader';
import '../../../styles/department_post.css'
import Pagination from '../../../common/Pagination'
import { substrWords } from '../../../helpers/text_helper';
import {Link} from 'react-router-dom'

class AllPosts extends Component {
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
            department_id:0
         }
        this.ref = createRef()
        
    }

    componentDidMount() {
        this.props.dispatch(getAllPosts())
    }


    onPageChanged = data => {
        if (!this.state.firstPageLoaded) {
            const { currentPage, totalPages, pageLimit } = data;
            let from = currentPage + 1
            this.ref.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
            this.props.dispatch(getAllPosts(from))
            this.setState({ currentPage, totalPages, pageLimit, firstPageLoaded: true })
        } else {
            if (data.currentPage != 1) {
                const { currentPage, totalPages, pageLimit } = data;
                let from = currentPage
                this.ref.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
                this.props.dispatch(getAllPosts(from))
                this.setState({ currentPage, totalPages, pageLimit })
            }
        }
    }

    render() {
        let department_id  = this.props.match.params.dept_id
        if (this.props.all_posts_loading) {
            return <PageLoader loading={this.props.all_posts_loading} />
        } else {
            if (!this.props.all_posts.length) {
                return <div className="no_results" >No Results</div>
            } else {
                const { currentPage, totalPages } = this.state;
                let currentCountries = this.props.all_posts
                const totalCountries = this.props.total_posts
                if (totalCountries === 0) return null;
                const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
                return (
                    <Fragment>
                        <h3 ref={this.ref} >All posts here:</h3>
                        {currentPage && (
                            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                Page <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
                            </span>
                        )}
                        <CardColumns className="mb-4">
                            {currentCountries.map(result => {
                                let date = result.created? new Date(result.created):new Date()
                                let date_string = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
                                let trimmed_body = substrWords(result.body,50)
                                return <Card className="dept_post_card h-100" style={{height:"auto !important"}}>
                                <Card.Img variant="top" src="holder.js/100px160"  />
                                <Card.Body>
                                    <Card.Title>{result.title}</Card.Title>
                                    <Card.Text dangerouslySetInnerHTML={{ __html:trimmed_body}}/>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted pull-left">{date_string}</small>
                                    <Badge variant="dark">
                                        <Link to={`/department/${department_id}/posts/${result._id}`} className="pull_right">show more</Link>
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
                                            <strong className="text-secondary">{totalCountries}</strong> Crimes
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
    all_posts: state.departmentReducer.posts,
    all_posts_loading: state.departmentReducer.all_posts_loading,
    total_posts: state.departmentReducer.total_posts,
})



export default connect(mapStateToProps, null)(AllPosts)
