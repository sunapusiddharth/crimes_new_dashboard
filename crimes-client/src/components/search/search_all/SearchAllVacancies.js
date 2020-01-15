import React, { Component, Fragment,createRef } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import { connect } from 'react-redux'
import { searchVacancies } from '../../../actions/searchActions'
import PageLoader from '../../../common/PageLoader';
import VacancyCard from "./VacancyCard";
import {Card} from 'react-bootstrap'
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme();

export class SearchAllVacancies extends Component {
    constructor(props) {
        super(props);
        this.state = { offset: 0 };
        this.ref = createRef()
    }
    componentDidMount() {
        this.props.dispatch(searchVacancies(this.props.query_word, 0, 10,0))
    }

    componentDidUpdate(prevProps,prevState){
        if(this.props.query_word != prevProps.query_word){
            this.props.dispatch(searchVacancies(this.props.query_word, 0, 10,0))
            return false
        }
        return true
    }

    handleClick(offset) {
        this.setState({ offset })
        this.props.dispatch(searchVacancies(this.props.query_word,offset, 10,0))
        this.ref.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        // debugger
    }

    render() {
        if (this.props.vacancies_loading) {
            return <PageLoader loading={this.props.vacancies_loading} />
        } else {
            let vacancies = this.props.vacancies && this.props.vacancies.hits && this.props.vacancies.hits.hits
            vacancies = !isNaN(vacancies) || typeof vacancies != 'undefined'?vacancies:[]  // incase there is no post above line will return 0.
            console.log("from vacancies ",vacancies,this.props.vacancies)
            if (!vacancies.length) {
                return <div  className="w-100">No Data</div>
            } else {
                return (
                    <MuiThemeProvider theme={theme} >
                        <Fragment>
                            <div   ref={this.ref}>
                                <ul  >
                                    {vacancies.map(vacancy =>
                                        <div className="" key={vacancy._id}>
                                            <VacancyCard data={vacancy} />
                                        </div>
                                    )}
                                </ul>
                            </div>
                        </Fragment>
                        <Pagination
                            limit={10}
                            offset={this.props.offset_vacancies}
                            total={this.props.total_vacancies}
                            onClick={(e, offset) => this.handleClick(offset)}
                        />
                    </MuiThemeProvider>
                );
            }
        }
    }
}

const mapStateToProps = (state) => ({
    vacancies: state.searchReducer.vacancies,
    vacancies_loading: state.searchReducer.vacancies_loading,
    total_vacancies: state.searchReducer.total_vacancies,
    offset_vacancies: state.searchReducer.offset_vacancies,
    query_word:state.searchReducer.query_word
})

export default connect(mapStateToProps, null)(SearchAllVacancies)
