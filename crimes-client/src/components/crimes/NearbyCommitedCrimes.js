import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { Media, Badge ,Card} from 'react-bootstrap'
import { fetchNearbyCrimes } from '../../actions/crimeActions'
import PageLoader from '../../common/PageLoader';
import Pagination from '../../common/Pagination';
import { Link } from 'react-router-dom'
import {calculateDistanceBetweenTwoCoordinates} from '../../helpers/number_helper'

class NearbyCommitedCrimes extends Component {
    constructor(props) {
        super(props)
        this.state = { onceLoaded: false, allCountries: [], currentCountries: [], currentPage: null, totalPages: null, totalRecords: null, pageLimit: 10 }
        this.ref = createRef()
    }

    componentDidMount() {
        this.props.dispatch(fetchNearbyCrimes(0, 10))
    }

    onPageChanged = data => {
        var { currentPage, totalPages, pageLimit } = data;
        let from = (currentPage * pageLimit) + 1
        console.log("focus obj=t", this.myInp)
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
        this.props.dispatch(fetchNearbyCrimes((from-10), pageLimit))
    }

    render() {
        if (this.props.nearby_crimes_loading) {
            return <PageLoader loading={this.props.nearby_crimes_loading} />
        } else {
            if (!this.props.nearby_crimes.length) {
                // debugger
                return <div >No data </div>
            } else {
                // debugger
                var { currentPage, totalPages } = this.state;
                currentPage = currentPage == null ? 1 : currentPage
                totalPages = totalPages == null ? Math.ceil(this.props.nearby_crimes_total / 10) : totalPages
                // debugger
                let currentCountries = this.props.nearby_crimes
                const totalCountries = this.props.nearby_crimes_total
                console.log("currentCountries=", currentCountries, totalCountries)
                if (totalCountries === 0) return null;
                const headerClass = ['text-dark py-2 pr-4 m-0', currentPage ? 'border-gray border-right' : ''].join(' ').trim();
                return (
                    <div className="news_small">
                        {currentPage && (
                            <span className="">
                                Page <span className="font-weight-bold">{currentPage}</span> / <span className="font-weight-bold">{totalPages}</span>
                            </span>
                        )}
                        <ul className="list-unstyled" ref={this.ref}>
                            {currentCountries.map(record => {
                                let news = record && record._source
                                let origin_coordinates_lat = this.props.crime.loc && this.props.crime.loc.coordinates && this.props.crime.loc.coordinates[1]
                                let origin_coordinates_lon = this.props.crime.loc && this.props.crime.loc.coordinates && this.props.crime.loc.coordinates[0]
                                let destination_coordinates_lat = record._source && record._source.location &&  record._source.location.lat
                                let destination_coordinates_lon = record._source && record._source.location &&  record._source.location.lon
                                let distance_from_crime_in_km = ''
                                // debugger
                                // console.log()
                                if(origin_coordinates_lat && origin_coordinates_lon && destination_coordinates_lat && destination_coordinates_lat){
                                    distance_from_crime_in_km = calculateDistanceBetweenTwoCoordinates(origin_coordinates_lat,
                                        origin_coordinates_lon,destination_coordinates_lat,destination_coordinates_lon)
                                }
                                return (<Link to={`/crimes/single/${record._id}`} key={record._id}><Media as="li" key={record._id}>
                                    <img
                                        className="mr-3 news_images_pagination"
                                        src={news.imageUrl}
                                        alt="Generic placeholder"
                                    />
                                    <Media.Body>
                                        <h6>{news.title} </h6>
                                        <div className="pagination_news_footer">
                                            <small className="text-muted">{news.occurence_on_date}</small>
                                            <Badge variant="dark">{news.category}</Badge>
                                            <p>Address : {news.address} , {news.city}, {news.state}</p>
                                            <p>Distance : {distance_from_crime_in_km} km</p>
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
                                        <Pagination totalRecords={totalCountries} pageLimit={10} pageNeighbours={1} onPageChanged={this.onPageChanged} currentPage={currentPage} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                        <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>Nearby crimes aggregated by distance</Card.Title>
                                        <Card.Text>{Object.keys(this.props.nearby_crimes_buckets).map((bucket_key,index)=><p key={index}><strong>{bucket_key.split('_').join(' ').toUpperCase()}</strong>
                                        <strong>Count: {this.props.nearby_crimes_buckets[bucket_key].doc_count}</strong></p> )}</Card.Text>
                                    </Card.Body>
                                </Card>
                        </div>
                    </div>
                )
            }
        }
    }
}

const mapStateToProps = (state) => ({
    nearby_crimes_loading: state.crimeReducer.nearby_crimes_loading,
    nearby_crimes: state.crimeReducer.nearby_crimes,
    nearby_crimes_total: state.crimeReducer.nearby_crimes_total,
    nearby_crimes_buckets: state.crimeReducer.nearby_crimes_buckets,
})



export default connect(mapStateToProps, null)(NearbyCommitedCrimes)
