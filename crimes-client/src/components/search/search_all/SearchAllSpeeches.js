import React, { Component, Fragment,createRef } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import { connect } from 'react-redux'
import { searchSpeeches } from '../../../actions/searchActions'
import PageLoader from '../../../common/PageLoader';
import SpeechCard from "./SpeechCard";
import {Card} from 'react-bootstrap'
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme();

export class SearchAllSpeeches extends Component {
    constructor(props) {
        super(props);
        this.state = { offset: 0 };
        this.ref = createRef()
    }
    componentDidMount() {
        this.props.dispatch(searchSpeeches(this.props.query_word, 0, 10,0))
    }

    componentDidUpdate(prevProps,prevState){
        if(this.props.query_word != prevProps.query_word){
            this.props.dispatch(searchSpeeches(this.props.query_word, 0, 10,0))
            return false
        }
        return true
    }

    handleClick(offset) {
        this.setState({ offset })
        this.props.dispatch(searchSpeeches(this.props.query_word,offset, 10,0))
        this.ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        // debugger
    }

    render() {
        if (this.props.speeches_loading) {
            return <PageLoader loading={this.props.speeches_loading} />
        } else {
            let speeches = this.props.speeches && this.props.speeches.hits && this.props.speeches.hits.hits
            speeches = !isNaN(speeches) || typeof speeches != 'undefined'?speeches:[]  // incase there is no post above line will return 0.
            console.log("from speeches ",speeches,this.props.speeches)
            if (!speeches.length) {
                return <div  className="w-100">No Data</div>
            } else {
                return (
                    <MuiThemeProvider theme={theme} >
                        <Fragment>
                            <div   ref={this.ref}>
                                <ul  >
                                    {speeches.map(speech =>
                                        <div className="" key={speech._id}>
                                            <SpeechCard data={speech} />
                                        </div>
                                    )}
                                </ul>
                            </div>
                        </Fragment>
                        <Pagination
                            limit={10}
                            offset={this.props.offset_speeches}
                            total={this.props.total_speeches}
                            onClick={(e, offset) => this.handleClick(offset)}
                        />
                    </MuiThemeProvider>
                );
            }
        }
    }
}

const mapStateToProps = (state) => ({
    speeches: state.searchReducer.speeches,
    speeches_loading: state.searchReducer.speeches_loading,
    total_speeches: state.searchReducer.total_speeches,
    offset_speeches: state.searchReducer.offset_speeches,
    query_word:state.searchReducer.query_word
})

export default connect(mapStateToProps, null)(SearchAllSpeeches)
