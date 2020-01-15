import React, { Component, Fragment, createRef } from 'react'
import { connect } from 'react-redux'
import { Nav, Form, FormControl, Media, Button, Navbar } from 'react-bootstrap'
import '../../styles/news.css'
import CardNavigator from './CardNavigator';
import NewsSmall from './NewsSmall';
import Tags from './Tags';
import { MostPopular } from './MostPopular';
import Footer from './Footer';
import { fetchCrimeAggregated, fetchCrimeNews, fetchSingleCrimeNews } from '../../actions/crimeNewsActions';
import FeaturedNews from './FeaturedNews';
import PageLoader from '../../common/PageLoader';
import CategorisedNews from './CategorisedNews';
import {Link} from 'react-router-dom'

class NewsLayout extends Component {
    constructor() {
        super()
        this.ref = createRef()
    }

    onSearch = (event) => {
       console.log(this.ref.current,this.ref)
       let query_word = this.ref.current.value
       this.props.history.push(`/news/search?query=${query_word}`)
       event.preventDefault()
    }

    componentDidMount() {
        this.props.dispatch(fetchCrimeAggregated())
        // this.props.dispatch(fetchCrimeNews())
    }

    render() {
        return (
            <Fragment>
                <Navbar bg="dark" variant="dark">
                <Link to="/news"><Navbar.Brand>Crime News</Navbar.Brand></Link>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" ref={this.ref} />
                        <Button variant="outline-info" type="submit" onClick={this.onSearch}>Search</Button>
                    </Form>
                </Navbar>
                <div className="featured_image_news">
                    <FeaturedNews />
                </div>

                {/* Card Navigator */}
                <br />
                {this.props.crimes_aggregated_loading ?
                    <PageLoader loading={this.props.crimes_aggregated_loading} /> :
                    <CardNavigator className="card_navigator" title="Top Headlines" data={this.props.crimes_aggregated && this.props.crimes_aggregated[0] && this.props.crimes_aggregated[0]['top headlines'] && this.props.crimes_aggregated[0]["top headlines"]} />
                }
                <br />
                {this.props.crimes_aggregated_loading ?
                    <PageLoader loading={this.props.crimes_aggregated_loading} /> :
                    <CardNavigator className="card_navigator" title="Trending Last Month" data={this.props.crimes_aggregated && this.props.crimes_aggregated[0] && this.props.crimes_aggregated[0]['trending last month'] && this.props.crimes_aggregated[0]["trending last month"]} />
                }
                <br />
                {this.props.crimes_aggregated_loading ?
                    <PageLoader loading={this.props.crimes_aggregated_loading} /> :
                    <CardNavigator className="card_navigator" title="Most Popular of All Time" data={this.props.crimes_aggregated && this.props.crimes_aggregated[0] && this.props.crimes_aggregated[0]['most popular of all time'] && this.props.crimes_aggregated[0]["most popular of all time"]} />
                }
                <br />
                {this.props.crimes_aggregated_loading ?
                    <PageLoader loading={this.props.crimes_aggregated_loading} /> :
                    <CategorisedNews className="card_navigator" data={this.props.crimes_aggregated && this.props.crimes_aggregated[0] && this.props.crimes_aggregated[0]['categorised data'] && this.props.crimes_aggregated[0]["categorised data"]} />
                }
                <br />
                <hr />

                <div className="row">
                    <div className="col-lg-8">
                        <NewsSmall />
                    </div>
                    <div className="col-lg-4">
                        {this.props.crimes_aggregated_loading ?
                            <PageLoader loading={this.props.crimes_aggregated_loading} /> :
                            <Tags className="card_navigator" data={this.props.crimes_aggregated && this.props.crimes_aggregated[0] && this.props.crimes_aggregated[0]['categorizedByTags'] && this.props.crimes_aggregated[0]["categorizedByTags"]} />
                        }
                        <MostPopular />
                    </div>
                </div>
                {/* pagination comp */}
                <br />
                {this.props.crimes_aggregated_loading ?
                    <PageLoader loading={this.props.crimes_aggregated_loading} /> :
                    <Footer data={this.props.crimes_aggregated && this.props.crimes_aggregated[0] && this.props.crimes_aggregated[0]['trending last month'] && this.props.crimes_aggregated[0]["trending last month"]} />
                }
               

            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    crimes_aggregated: state.crimeNewsReducer.crimes_aggregated,
    crimes_aggregated_loading: state.crimeNewsReducer.crimes_aggregated_loading
})
export default connect(mapStateToProps, null)(NewsLayout)
