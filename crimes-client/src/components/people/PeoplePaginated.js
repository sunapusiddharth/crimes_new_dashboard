import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Pagination from "material-ui-flat-pagination";
import { connect } from 'react-redux'
import { fetchPeople } from '../../actions/peopleActions'
import PageLoader from '../../common/PageLoader';
import PeopleCard from "./PeopleCard";
import '../../styles/people_paginated.css'
import { Badge } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme();


export class PeoplePaginated extends Component {
  constructor(props) {
    super(props);
    this.state = { offset: 0 };
  }

  handleClick(offset) {
    this.setState({ offset })
    this.props.dispatch(fetchPeople(offset, 10))
  }

  render() {
    if (this.props.people_loading) {
      return <PageLoader loading={this.props.people_loading} />
    } else {
      if (!this.props.people.length) {
        return <div >No data </div>
      } else {
        return (
          <MuiThemeProvider theme={theme} >
            <Typography  variant="h2" color="textSecondary" component="h2">People</Typography>
            <Typography variant="body2" color="textSecondary" component="p">Here you find all the people with summary info provided for each person.Filtering will be provided in <Badge variant="dark">future</Badge>.All people accussed , victims , judges , laws , suspects etc. can be found here.This page has been built using material ui with paginated records pulled up using mongodb aggregations</Typography>
            <CssBaseline />
            <Fragment>
              <div className="flex-container">
              {this.props.people.map(person =>
              <div className="" key={person._id}>
                <PeopleCard data={person} />
              </div>
              )}
              </div>
            </Fragment>
            <br/>
            <hr/>
            <Pagination
              limit={10}
              offset={this.props.offset_people}
              total={this.props.total_people}
              onClick={(e, offset) => this.handleClick(offset)}
            />
          </MuiThemeProvider>
        );
      }
    }
  }
}

const mapStateToProps = (state) => ({
  people: state.peopleReducer.people,
  people_loading: state.peopleReducer.people_loading,
  total_people: state.peopleReducer.total_people,
  offset_people: state.peopleReducer.offset_people,
})

export default connect(mapStateToProps, null)(PeoplePaginated)
