import React, { Component, Fragment, createRef } from 'react'
import { connect } from 'react-redux'
import { Nav, Form, FormControl, Media, Button, Navbar, Jumbotron, Container, Badge } from 'react-bootstrap'
import '../../styles/news.css'
import CardNavigator from './CardNavigator';
import Tags from './Tags';
import { MostPopular } from './MostPopular';
import Footer from './Footer';
import { fetchCrimeAggregated, fetchCrimeNews, fetchSingleCrimeNews } from '../../actions/crimeNewsActions';
import FeaturedNews from './FeaturedNews';
import PageLoader from '../../common/PageLoader';
import CategorisedNews from './CategorisedNews';
import '../../styles/news.css'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade';
import { withRouter } from 'react-router-dom';



class IndividualNewsLayout extends Component {
    constructor() {
        super()
        this.ref = createRef()
    }

    componentDidMount() {
        console.log("CDM", this.props)
        let news_id = this.props.match.params.id
        if (!this.props.crimes_aggregated.length) this.props.dispatch(fetchCrimeAggregated())
        this.props.dispatch(fetchSingleCrimeNews(news_id))
    }

    componentDidUpdate(prevProps) {
        let news_id = this.props.match.params.id
        if (prevProps.match.params.id != this.props.match.params.id) {
        this.props.dispatch(fetchSingleCrimeNews(news_id))
        }
    }
    
    onSearch = (event) => {
        console.log(this.ref.current, this.ref)
        let query_word = this.ref.current.value
        this.props.history.push(`/news/search?query=${query_word}`)
        event.preventDefault()
    }

    render() {
        console.log("render called again")
        if (this.props.single_crime_loading || this.props.crimes_aggregated_loading) {
            return <PageLoader loading={this.props.single_crime_loading && this.props.crimes_aggregated_loading} />
        } else {
            let bgImg = this.props.single_crime.urlToImage ? this.props.single_crime.urlToImage : '/assets/crime_bg2.jpg'
            let divStyle = {
                color: 'blue',
                // backgroundImage: 'url(' + this.props.single_crime.urlToImage?this.props.single_crime.urlToImage:'/assets/crime_news_background.jpg' + ')',
                backgroundImage: `url(${bgImg})`,
            }
            return (
                <Fragment>
                    <Navbar bg="dark" variant="dark">
                        <Link to="/news"><Navbar.Brand>Crime News</Navbar.Brand></Link>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" ref={this.ref} className="mr-sm-2" />
                            <Button variant="outline-info" onClick={this.onSearch}>Search</Button>
                        </Form>
                    </Navbar>

                    {/* Image card big  */}
                    {Object.keys(this.props.single_crime).length && <Jumbotron style={divStyle} fluid>
                        <Container>
                            <h1></h1>
                            {/* <p>Posted on : {new Date(this.props.single_crime.publishedAt).getDate()+'-'+new Date(this.props.single_crime.publishedAt).getMonth()+'-'+new Date(this.props.single_crime.publishedAt).getFullYear()}</p> */}
                        </Container>
                    </Jumbotron>}
                    <hr />
                    <div className="row">
                        <div className="col-lg-8">
                            {/* Content goes here  */}
                            <h3>{this.props.single_crime.title}</h3>
                            <p className="single_news_author_tag"><b>Published by: {this.props.single_crime.author}</b>   <Badge variant="dark">{this.props.single_crime.tags}</Badge></p>
                            <br />
                            <hr />
                            <Fade effect="fadeInUp">
                                <p>{this.props.single_crime.full_content}</p>
                            </Fade>
                            <br />
                            <p><a href={this.props.single_crime.url}>Click here to go to original source: </a></p>
                        </div>

                        <div className="col-lg-4">
                            {this.props.crimes_aggregated_loading ?
                                <PageLoader loading={this.props.crimes_aggregated_loading} /> :
                                <Fade effect="fadeInUp">
                                    <Tags className="card_navigator" data={this.props.crimes_aggregated && this.props.crimes_aggregated[0] && this.props.crimes_aggregated[0]['categorizedByTags'] && this.props.crimes_aggregated[0]["categorizedByTags"]} />
                                </Fade>
                            }
                            <Fade effect="fadeInUp">
                                <MostPopular />
                            </Fade>
                        </div>
                    </div>
                    <br />
                    {this.props.crimes_aggregated_loading ?
                        <PageLoader loading={this.props.crimes_aggregated_loading} /> :
                        <Fade effect="fadeInUp">
                            <CardNavigator className="card_navigator" title="Trending Last Month" data={this.props.crimes_aggregated && this.props.crimes_aggregated[0] && this.props.crimes_aggregated[0]['trending last month'] && this.props.crimes_aggregated[0]["trending last month"]} />
                        </Fade>
                    }
                    {/* pagination comp */}
                    <br />
                    {this.props.crimes_aggregated_loading ?
                        <PageLoader loading={this.props.crimes_aggregated_loading} /> :
                        <Fade effect="fadeInUp">
                            <Footer data={this.props.crimes_aggregated && this.props.crimes_aggregated[0] && this.props.crimes_aggregated[0]['trending last month'] && this.props.crimes_aggregated[0]["trending last month"]} />
                        </Fade>
                    }


                </Fragment>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    single_crime: state.crimeNewsReducer.single_crime,
    single_crime_loading: state.crimeNewsReducer.single_crime_loading,
    crimes_aggregated: state.crimeNewsReducer.crimes_aggregated,
    crimes_aggregated_loading: state.crimeNewsReducer.crimes_aggregated_loading
})
export default withRouter(connect(mapStateToProps, null)(IndividualNewsLayout))
