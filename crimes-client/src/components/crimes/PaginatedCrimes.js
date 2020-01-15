import React, { Component ,createRef} from 'react'
import { connect } from 'react-redux'
import { Media, Badge } from 'react-bootstrap'
import {fetchPaginatedCrime} from '../../actions/crimeActions'
import PageLoader from '../../common/PageLoader';
import Pagination from '../../common/Pagination';
import {Link} from 'react-router-dom'
import faker from 'faker'

class PaginatedCrimes extends Component {
    constructor(props) {
        super(props)
        this.state = { onceLoaded:false,allCountries: [], currentCountries: [], currentPage: null, totalPages: null, totalRecords: null, pageLimit: 10 }
        this.ref = createRef() 
    }

    componentDidMount() {
        this.props.dispatch(fetchPaginatedCrime(0, 10))
    }

    onPageChanged = data => {
        var { currentPage, totalPages, pageLimit } = data;
        let from = (currentPage * pageLimit) +1
        console.log("focus obj=t",this.myInp)
        this.ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        //   debugger
        //   if(currentPage !=1)this.props.dispatch(fetchCrimeNews(from, pageLimit))
        //   if(!this.state.onceLoaded && currentPage ==1 ){
        //     this.setState({ currentPage, totalPages, pageLimit ,onceLoaded:true})
        //   }else{
        //       if(this.state.onceLoaded && currentPage !=1){
        //         this.setState({ currentPage, totalPages, pageLimit })
        //       }
        //   }
        this.setState({ currentPage, totalPages, pageLimit })
        this.props.dispatch(fetchPaginatedCrime(from, pageLimit))
    }


    render() {
        if (this.props.paginated_crimes_loading) {
            return <PageLoader loading={this.props.paginated_crimes_loading} />
        } else {
            if (!this.props.paginated_crimes.length) {
                // debugger
                return <div >No data </div>
            } else {
                // debugger
                var { currentPage, totalPages } = this.state;
                currentPage = currentPage == null?1:currentPage
                totalPages = totalPages == null?Math.ceil((this.props.paginated_crimes_total-10)/10):totalPages
                // debugger
                let currentCountries = this.props.paginated_crimes
                const totalCountries = this.props.paginated_crimes_total-10
                console.log("currentCountries=", currentCountries,totalCountries)
                if (totalCountries === 0) return null;
                const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
            return (
                <div className="crimes_small ">
                    <h3 className="text-center">{this.props.title ? this.props.title : 'All Crimes'}</h3>
                    <p className='text-center'>Provides all crimes paginated click on each to see more. Search for cimes using the filters .</p>
                    <hr />
                    <br />
                    {currentPage && (
                            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                Page <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
                            </span>
                        )}
                    <ul className="list-unstyled"  ref={this.ref}>
                        {currentCountries.map(news => {
                            let date = new Date(news.occurence_on_date)
                            let date_string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                            return (<Link to={`/crimes/single/${news._id}`}><Media className="all_crimes_paginated_media" as="li" key={news._id}>
                                <img
                                    className="mr-3 news_images_pagination"
                                    src={news.imageUrl}
                                    alt="Generic placeholder"
                                />
                                <Media.Body>
                                    <h7>{news.title} </h7>
                                    <p>{news.address}</p>
                                    <p>
                                        {`${news.description} ${faker.lorem.sentences(30)}`}
                                    </p>
                                    <div className="pagination_news_footer">
                                    <small className="text-muted">{date_string}</small>
                                    <Badge variant="light">{news.category}</Badge>
                                </div>
                                </Media.Body>
                            </Media></Link>)

                        }
                        )}
                    </ul>
                    <div className="container mb-5">
                            <div className="row d-flex flex-row py-5">
                                <div className="w-100 px-4 py-5 d-flex flex-row flex-wrap align-items-center justify-content-between">
                                    <div className="d-flex flex-row align-items-center">
                                        <h2 className={headerClass}>
                                            <strong className="text-secondary">{totalCountries}</strong> Crimes Commited
                                    </h2>
                                    </div>
                                    <div className="d-flex flex-row py-4 align-items-center">
                                        <Pagination totalRecords={totalCountries} pageLimit={10} pageNeighbours={1} onPageChanged={this.onPageChanged} currentPage={currentPage}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            )
            }
        }
    }
}

const mapStateToProps = (state) => ({
    paginated_crimes: state.crimeReducer.paginated_crimes,
    paginated_crimes_loading: state.crimeReducer.paginated_crimes_loading,
    paginated_crimes_total:state.crimeReducer.paginated_crimes_total,
})
export default connect(mapStateToProps, null)(PaginatedCrimes)
