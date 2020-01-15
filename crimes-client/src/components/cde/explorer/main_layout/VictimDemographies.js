import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PageLoader from '../../../../common/PageLoader';
import { fetchVictimsRelationship } from '../../../../actions/cdeActions'
import { Dropdown } from 'react-bootstrap'
import HorizontalBarChartSimple from '../../../../common/HorizontalBarChartSimple';
import BarChartD3 from '../../../../common/BarChartD3';

class VictimDemographies extends Component {
    constructor() {
        super()
        this.state = {
            offense_code: 'aggravated-assault',
            year_range: 'current_year',
            year_ranges: ["current_year", "past_2_years", "past_5_years"],
            offenses: [],
            start_year: 2017,
            end_year: 2017,
            selected_year: 2017,
            type: '',
            chart_data: []
        }
    }

    componentDidMount() {
        let type
        if (this.props.selected_state == 'United States') {
            this.setState({ type: 'national' })
            type = 'national'
        } else {
            this.setState({ type: 'state' })
            type = 'state'
        }
        //to load the init data we will filter in render function.
        this.props.dispatch(fetchVictimsRelationship(type, this.state.offense_code, this.state.start_year, this.state.end_year))
    }



    onYearChange = (year) => {
        let start_year = 0
        let end_year = 2017
        if (year == 'last2years') {
            start_year = end_year - 2
            this.setState({ start_year, end_year })
        } else if (year == 'last5years') {
            start_year = end_year - 5
            this.setState({ start_year, end_year })
        } else {
            start_year = end_year - 10
            this.setState({ start_year, end_year })
        }
        this.props.dispatch(fetchVictimsRelationship(this.state.type, this.state.offense_code, start_year, end_year))
    }
    render() {
        if (this.props.victim_relationship_loading) {
            return <PageLoader loading={this.props.victim_relationship_data} />

        } else {
            if (!this.props.victim_relationship_data.length) {
                return <div className="no_data">NO Data</div>
            } else {
                //provide data in format :
                //[{state:"CA",stats:[no of years ]}]
                //eg: write query to get data for all types for the last 2 years , last 5 years , last 10 years
                // console.log("prosp", this.props.victim_relationship_data, this.state.start_year, this.state.end_year)
                let year_range = ["last2years", "last5years", "last10years"]
                // debugger
                // debugger;
                // console.log("chart_data=",this.state.chart_data)
                return (
                    <Fragment>
                        <h3>Victims Relationship to Offender</h3>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {this.state.year_range}
                </Dropdown.Toggle>
                            <Dropdown.Menu className="states_menu">
                                {year_range && year_range.map((range, index) => <Dropdown.Item onSelect={() => this.onYearChange(range)} key={index} href="#/action-1" >{range == 'last2years' ? 'Last two Years' : range == "last5years" ? 'Last five Years' : 'Last ten Years'}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                        <BarChartD3 data={this.props.victim_relationship_data} />
                        {/* <HorizontalBarChartSimple data={this.props.victim_relationship_data}/> */}
                    </Fragment>
                )
            }
        }
    }
}

const mapStateToProps = (state) => {
    console.log("inside mapstatetoprops")
    return {
        victim_relationship_data: state.cdeReducer.victim_relationship_data,
        victim_relationship_loading: state.cdeReducer.victim_relationship_loading,
        selected_state: state.cdeReducer.selected_state,
    }
}

export default connect(mapStateToProps, null)(VictimDemographies)
