import React, { useState, useEffect } from 'react'
import { Card, Media, Jumbotron, Carousel } from 'react-bootstrap';
import { connect } from 'react-redux'
import PageLoader from '../../../common/PageLoader';
import CrimeFeaturedResult from './featured_result_cards/CrimeFeaturedResult';
import VacanciesFeaturedResult from './featured_result_cards/VacanciesFeaturedResult';
import CrimeNewsFeaturedResult from './featured_result_cards/CrimeNewsFeaturedResult';
import PostsFeaturedResult from './featured_result_cards/PostsFeaturedResult';
import { substrWords } from '../../../helpers/text_helper';

function SearchAllJumbotron(props) {
    var responseJson = []
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setDirection(e.direction);
    };

    useEffect(() => {
        // debugger
        //need to do checking in here to load only once
        if ((props.crime_news_search_results_loading || props.crimes_loading || props.posts_loading || props.speeches_loading || props.vacancies_loading)) {
            if (Object.keys(props.crimes_results_raw).length) {
                responseJson.push({ "crimes": props.crimes_results_raw })
            }
            if (Object.keys(props.posts).length) {
                responseJson.push({ "post": props.posts })
            }
            if (Object.keys(props.speeches).length) {
                responseJson.push({ "speeches": props.speeches })
            }
            if (Object.keys(props.vacancies).length) {
                responseJson.push({ "vacancies": props.vacancies })
            }
            if (Object.keys(props.search_crime_news_results_raw).length) {
                responseJson.push({ "news": props.search_crime_news_results_raw })
            }

            //sort base in max-hits :
            responseJson.sort(function (a, b) {
                if (Object.values(a)[0].hits.max_score < Object.values(b)[0].hits.max_score) {
                    return 1
                }

                if (Object.values(a)[0].hits.max_score > Object.values(b)[0].hits.max_score) {
                    return -1
                }
                return 0
            })
        }
    }, []);

    if (props.crime_news_search_results_loading || props.crimes_loading || props.posts_loading || props.speeches_loading || props.vacancies_loading) {
        // return <Jumbotron fluid>
        //     <Carousel activeIndex={index} direction={direction} onSelect={handleSelect} interval={4000} keyboard="true" touch="true" > <Carousel.Item className="featured_resulut"><PageLoader loading={(props.crime_news_search_results_loading || props.crimes_loading || props.posts_loading || props.speeches_loading || props.vacancies_loading)}>Loading featured result please wait .....</PageLoader></Carousel.Item>
        //     </Carousel></Jumbotron>
        return <Jumbotron><h1>No Data</h1></Jumbotron>
    } else {
        //logic to form the featured result using the most trending items : sort all the items:
        // debugger
        if (Object.keys(props.crimes_results_raw).length) {
            responseJson.push({ "crimes": props.crimes_results_raw })
        }
        if (Object.keys(props.posts).length) {
            responseJson.push({ "post": props.posts })
        }
        if (Object.keys(props.speeches).length) {
            responseJson.push({ "speeches": props.speeches })
        }
        if (Object.keys(props.vacancies).length) {
            responseJson.push({ "vacancies": props.vacancies })
        }
        if (Object.keys(props.search_crime_news_results_raw).length) {
            responseJson.push({ "news": props.search_crime_news_results_raw })
        }

        //sort base in max-hits :
        responseJson.sort(function (a, b) {
            if (Object.values(a)[0].hits.max_score < Object.values(b)[0].hits.max_score) {
                return 1
            }

            if (Object.values(a)[0].hits.max_score > Object.values(b)[0].hits.max_score) {
                return -1
            }
            return 0
        })
        let carouselItems = []

        responseJson.map((category, index) => {
            //logic count the no of categories 
            //if > 1 show 3 of each
            let key = Object.keys(category) ? Object.keys(category) : ''
            if (responseJson.length > 1) {
                if (Object.values(category).length && Object.values(category)[0].hits && Object.values(category)[0].hits.hits) {
                    let results = Object.values(category)[0].hits.hits.slice(0, 3)
                    results.map(result=>carouselItems.push(result ))
                }
            } else {
                let results = Object.values(category)[0].hits.hits.slice(0, 5)
                results.map(result=>carouselItems.push(result))
            }
        })
        console.log("carouselItems.push(item)= ", carouselItems)
        console.log("respinseJson ", responseJson)
        if (responseJson.length) {
            return (<Jumbotron fluid>
                <Carousel className="featured_result_carousel" activeIndex={index} direction={direction} onSelect={handleSelect} interval={10000} keyboard="true" touch="true" >
                    {carouselItems.map((item, index) => {
                        if (item._index == 'crimes') {
                            let record = item._source
                                return <Carousel.Item className="featured_resulut" key={`${item._index}-${item._id}`}>
                                    <img
                                        src="/assets/b.jpg"
                                        alt="First slide"
                                    />
                                    <Carousel.Caption >
                                    <span className="row">
                                            <h3 className="pull-left col-lg-10 col-md-10">{record.title}</h3>
                                            <strong className="pull-right col-lg-2 col-md-2"><h5 >{item._index}</h5></strong>
                                        </span>
                                        <p className="row">
                                            <span className="pull-left col-lg-10 col-md-10">{record.address} {record.city}</span>
                                            <span className="pull-left col-lg-2 col-md-2">{record.category}</span>
                                        </p>
                                        <p>{substrWords(record.description,40)}</p>
                                    </Carousel.Caption> 
                                </Carousel.Item>
                        }
                        if (item._index == 'department_posts') {
                            let record = item._source
                                return <Carousel.Item className="featured_resulut" key={`${item._index}-${item._id}`}>
                                    <img
                                        src="/assets/b.jpg"
                                        alt="First slide"
                                    />
                                    <Carousel.Caption >
                                    <span className="row">
                                            <h3 className="pull-left col-lg-10 col-md-10">{record.title}</h3>
                                            <strong className="pull-right col-lg-2 col-md-2"><h5 >{item._index}</h5></strong>
                                        </span>
                                        <p>{substrWords(record.body,40)}</p>
                                    </Carousel.Caption> 
                                </Carousel.Item>
                        }
                        if (item._index == 'crime_news') {
                            let record = item._source
                            let created_date = new Date(record.publishedAt)
                            
                                return <Carousel.Item className="featured_resulut" key={`${item._index}-${item._id}`}>
                                    <img
                                        src="/assets/b.jpg"
                                        alt="First slide"
                                    />
                                    <Carousel.Caption >
                                        <span className="row">
                                            <h3 className="pull-left col-lg-10 col-md-10">{record.title}</h3>
                                            <strong className="pull-right col-lg-2 col-md-2"><h5 >{item._index}</h5></strong>
                                        </span>
                                        <p className="row">
                                            <span className="pull-left col-lg-10 col-md-10">{created_date.getDate()}/{created_date.getMonth()}/{created_date.getFullYear()}</span>
                                            <span className="pull-left col-lg-2 col-md-2">{record.tags}</span>
                                        </p>
                                        <p>{substrWords(record.description,40)}</p>
                                    </Carousel.Caption> 
                                </Carousel.Item>
                        }
                        if (item._index == 'vacancies') {
                            let record = item._source
                                return <Carousel.Item className="featured_resulut" key={`${item._index}-${item._id}`}>
                                    <img
                                        
                                        src="/assets/b.jpg"
                                        alt="First slide"
                                    />
                                    <Carousel.Caption >
                                    <span className="row">
                                            <h3 className="pull-left col-lg-10 col-md-10">{record.title}</h3>
                                            <strong className="pull-right col-lg-2 col-md-2"><h5 >{item._index}</h5></strong>
                                        </span>
                                        <p className="row">
                                            <span className="pull-left col-lg-10 col-md-10">{record.created}</span>
                                            <span className="pull-left col-lg-2 col-md-2">{record.deadline}</span>
                                        </p>
                                        <p>{record.hiring_office} {record.hiring_org_name} {record.location_administrative_area} {record.location_locality} </p>
                                        <p>{substrWords(record.body,40)}</p>
                                    </Carousel.Caption> 
                                </Carousel.Item>
                        }
                    })}
                </Carousel>
            </Jumbotron>
            )
        } else {
            return <Jumbotron fluid>
                <Carousel interval={4000} keyboard="true" touch="true" >
                    <Carousel.Item className="featured_resulut">
                        <Carousel.Caption >
                            <h3>Sorry could find any relevant data for your query</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Jumbotron>
        }
    }
}

const mapStateToProps = (state) => ({
    crimes: state.searchReducer.crimes,
    crimes_loading: state.searchReducer.crimes_loading,
    posts: state.searchReducer.posts,
    posts_loading: state.searchReducer.posts_loading,
    speeches: state.searchReducer.speeches,
    speeches_loading: state.searchReducer.speeches_loading,
    vacancies: state.searchReducer.vacancies,
    vacancies_loading: state.searchReducer.vacancies_loading,
    crime_news_search_results: state.crimeNewsReducer.crime_news_search_results,
    crime_news_search_results_loading: state.crimeNewsReducer.crime_news_search_results_loading,
    crimes_results_raw: state.searchReducer.crimes_results_raw,
    search_departments_results_raw: state.departmentReducer.search_departments_results_raw,
    search_crime_news_results_raw: state.crimeNewsReducer.search_crime_news_results_raw,
})

export default connect(mapStateToProps, null)(SearchAllJumbotron)