import React, { Component ,createRef} from 'react'
import { connect } from 'react-redux'
import { Media, Badge } from 'react-bootstrap'
import { fetchCrimeNews } from '../../actions/crimeNewsActions'
import PageLoader from '../../common/PageLoader';
import Pagination from '../../common/Pagination';
import {Link} from 'react-router-dom'

class NewsSmall extends Component {
    constructor(props) {
        super(props)
        this.state = { onceLoaded:false,allCountries: [], currentCountries: [], currentPage: null, totalPages: null, totalRecords: null, pageLimit: 10 }
        this.ref = createRef() 
    }

    componentDidMount() {
        this.props.dispatch(fetchCrimeNews(0, 10))
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
        this.props.dispatch(fetchCrimeNews(from, pageLimit))
    }


    render() {
        if (this.props.crimes_loading) {
            return <PageLoader loading={this.props.crimes_loading} />
        } else {
            if (!this.props.crimes.length) {
                // debugger
                return <div >No data </div>
            } else {
                // debugger
                var { currentPage, totalPages } = this.state;
                currentPage = currentPage == null?1:currentPage
                totalPages = totalPages == null?Math.ceil(this.props.total_crimes/10):totalPages
                // debugger
                let currentCountries = this.props.crimes
                const totalCountries = this.props.total_crimes
                console.log("currentCountries=", currentCountries,totalCountries)
                if (totalCountries === 0) return null;
                const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
            return (
                <div className="news_small">
                    <h3 className="pull-left">{this.props.title ? this.props.title : 'News'}</h3>
                    <hr />
                    <br />
                    {currentPage && (
                            <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                                Page <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
                            </span>
                        )}
                    <ul className="list-unstyled"  ref={this.ref}>
                        {currentCountries.map(news => {
                            let date = new Date(news.publishedAt)
                            let date_string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                            return (<Link to={`/news/single/${news._id}`}><Media as="li" key={news._id}>
                                <img
                                    className="mr-3 news_images_pagination"
                                    src={news.urlToImage}
                                    alt="Generic placeholder"
                                />
                                <Media.Body>
                                    <h7>{news.title} </h7>
                                    <p>
                                        {news.description}
                                    </p>
                                    <div className="pagination_news_footer">
                                    <small className="text-muted">{date_string}</small>
                                    <small className="text-muted"> Hits:{news.hits}</small>
                                    <Badge variant="dark">{news.tags}</Badge>
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
                                            <strong className="text-secondary">{totalCountries}</strong> News Articles
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
    crimes: state.crimeNewsReducer.crimes,
    crimes_loading: state.crimeNewsReducer.crimes_loading,
    total_crimes:state.crimeNewsReducer.total_crimes,
})



export default connect(mapStateToProps, null)(NewsSmall)
