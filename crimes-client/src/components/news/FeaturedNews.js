import React, { Fragment } from 'react'
import PageLoader from '../../common/PageLoader'
import { connect } from 'react-redux'
import {substrWords} from '../../helpers/text_helper'
import {Link} from 'react-router-dom'

function FeaturedNews(props) {
    if (props.crimes_aggregated_loading) {
        return <PageLoader loading={props.crimes_aggregated_loading} />
    } else {
        if (!props.crimes_aggregated || !props.crimes_aggregated[0]) return <div class="sorry">Sorry there seems to be some error !!!!</div>
        let top_featured = props.crimes_aggregated[0]["most popular of all time"].slice(0, 1)[0]
        let top_2_featured = props.crimes_aggregated[0]["most popular of all time"].slice(1, 3)
        let top_2_featured_next = props.crimes_aggregated[0]["most popular of all time"].slice(4, 6)
        return (
            <div className="row">
                {top_featured ?
                    <div className="col-lg-6 col-md-12">
                        <Link to ={`/news/single/${top_featured._id}`}><img src={top_featured.urlToImage} alt="test" class="img-responsive" /></Link>
                        <div class="carousel-caption">
                            <p>{substrWords(top_featured.title,10)}</p>
                        </div>
                    </div>
                    : <div className="col-lg-6 col-md-12">
                        <img
                            width={100}
                            height={100}
                            className="ml-3"
                            src="/assets/background.jpg"
                            alt="Generic placeholder"
                        />
                    </div>}
                <div className="col-lg-6 col-md-12">
                    <div className="row">
                        {top_2_featured ?
                            top_2_featured.map(record => <div className="col">
                                <Link to={`/news/single/${record._id}`}><img src={record.urlToImage} alt="test" class="img-responsive" /></Link>
                                <div class="carousel-caption">
                                    <p>{substrWords(record.title,3)}</p>
                                </div>
                            </div>)

                            :
                            <Fragment>
                                <div className="col">
                                    <img
                                        width={100}
                                        height={100}
                                        className="ml-3"
                                        src="/assets/background.jpg"
                                        alt="Generic placeholder"
                                    />
                                </div>
                                <div className="col">
                                    <img
                                        width={100}
                                        height={100}
                                        className="ml-3"
                                        src="/assets/background.jpg"
                                        alt="Generic placeholder"
                                    />
                                </div>
                            </Fragment>
                        }
                    </div>
                    <div className="row">
                        {top_2_featured_next ?
                            top_2_featured_next.map(record =><div className="col">
                                 <Link to={`/news/single/${record._id}`}>
                                <img src={record.urlToImage} alt="test" class="img-responsive" /></Link>
                                <div class="carousel-caption">
                                    <p>{substrWords(record.title,3)}</p>
                                </div>
                            </div>)

                            :
                            <Fragment>
                                <div className="col">
                                    <img
                                        width={100}
                                        height={100}
                                        className="ml-3"
                                        src="/assets/background.jpg"
                                        alt="Generic placeholder"
                                    />
                                </div>
                                <div className="col">
                                    <img
                                        width={100}
                                        height={100}
                                        className="ml-3"
                                        src="/assets/background.jpg"
                                        alt="Generic placeholder"
                                    />
                                </div>
                            </Fragment>
                        }
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    crimes_aggregated: state.crimeNewsReducer.crimes_aggregated,
    crimes_aggregated_loading: state.crimeNewsReducer.crimes_aggregated_loading
})
export default connect(mapStateToProps, null)(FeaturedNews)