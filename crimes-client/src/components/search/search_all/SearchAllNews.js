import React, { Component, Fragment, createRef } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import { connect } from 'react-redux'
import { fetchCrimeNewsSearch } from '../../../actions/crimeNewsActions'
import PageLoader from '../../../common/PageLoader';
import NewsCard from "./NewsCard";
import { Badge } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme();

export class SearchAllNews extends Component {
    constructor(props) {
        super(props);
        this.state = { offset: 0 };
        this.ref = createRef()
    }
    componentDidMount() {
        this.props.dispatch(fetchCrimeNewsSearch(this.props.query_word, 0, 5, 0))
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.query_word != prevProps.query_word) {
            this.props.dispatch(fetchCrimeNewsSearch(this.props.query_word, 0, 5, 0))
            return false
        }
        return true
    }

    handleClick(offset) {
        this.setState({ offset })
        this.props.dispatch(fetchCrimeNewsSearch(this.props.query_word, offset, 5, 0))
        this.ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
        // debugger
    }

    render() {
        if (this.props.crime_news_search_results_loading) {
            return <PageLoader loading={this.props.crime_news_search_results_loading} />
        } else {
            if (!this.props.crime_news_search_results.length) {
                return <div >No data </div>
            } else {
                return (
                    <MuiThemeProvider theme={theme} >
                        <Fragment>
                            <div ref={this.ref}>
                                {this.props.crime_news_search_results.map(news =>
                                    <div className="" key={news._id}>
                                        <NewsCard data={news} />
                                    </div>
                                )}
                            </div>
                        </Fragment>
                        <Pagination
                            limit={5}
                            offset={this.props.offset_crime_news}
                            total={this.props.crime_news_search_results_total}
                            onClick={(e, offset) => this.handleClick(offset)}
                        />
                    </MuiThemeProvider>
                );
            }
        }
    }
}

const mapStateToProps = (state) => ({
    crime_news_search_results: state.crimeNewsReducer.crime_news_search_results,
    crime_news_search_results_loading: state.crimeNewsReducer.crime_news_search_results_loading,
    crime_news_search_results_total: state.crimeNewsReducer.crime_news_search_results_total,
    offset_crime_news: state.crimeNewsReducer.offset_crime_news,
    query_word: state.searchReducer.query_word
})

export default connect(mapStateToProps, null)(SearchAllNews)
