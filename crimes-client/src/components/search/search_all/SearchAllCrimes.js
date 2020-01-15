import React, { Component, Fragment,createRef } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import { connect } from 'react-redux'
import { searchCrimes } from '../../../actions/searchActions'
import PageLoader from '../../../common/PageLoader';
import CrimeCard from "./CrimeCard";
import { Badge } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';


const theme = createMuiTheme();

export class SearchAllCrimes extends Component {
    constructor(props) {
        super(props);
        this.state = { offset: 0 };
        this.ref = createRef()
    }
    componentDidMount() { 
        this.props.dispatch(searchCrimes(this.props.query_word, [], 0, 5))
    }

    
    
    componentDidUpdate(prevProps,prevState){
        if(this.props.query_word != prevProps.query_word){
            this.props.dispatch(searchCrimes(this.props.query_word, [], 0, 5))
            return false
        }
        return true
    }

    handleClick(offset) {
        this.setState({ offset })
        this.props.dispatch(searchCrimes(this.props.query_word, [], offset, 5))
        this.ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        // debugger
    }

    render() {
        if (this.props.crimes_loading) {
            return <PageLoader loading={this.props.crimes_loading} />
        } else {
            if (!this.props.crimes.length) {
                return <div >No data </div>
            } else {
                return (
                    <MuiThemeProvider theme={theme} >
                        <Fragment>
                            <div   ref={this.ref}>
                                <ul  >
                                    {this.props.crimes.map(crime =>
                                        <div className="" key={crime._id}>
                                            <CrimeCard data={crime} />
                                        </div>
                                    )}
                                </ul>
                            </div>
                        </Fragment>
                        <Pagination
                            limit={5}
                            offset={this.props.offset_crimes}
                            total={this.props.total_crimes}
                            onClick={(e, offset) => this.handleClick(offset)}
                        />
                    </MuiThemeProvider>
                );
            }
        }
    }
}

const mapStateToProps = (state) => ({
    crimes: state.searchReducer.crimes,
    crimes_loading: state.searchReducer.crimes_loading,
    total_crimes: state.searchReducer.total_crimes,
    offset_crimes: state.searchReducer.offset_crimes,
    query_word:state.searchReducer.query_word
})

export default connect(mapStateToProps, null)(SearchAllCrimes)
