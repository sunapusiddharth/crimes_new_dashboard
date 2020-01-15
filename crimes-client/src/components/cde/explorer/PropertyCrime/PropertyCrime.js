import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchPropertyStolen , fetchPropertyRecovered} from '../../../../actions/cdeActions'
import PageLoader from '../../../../common/PageLoader';
import { Dropdown } from 'react-bootstrap'
import HorizontalBarChartSimple from '../../../../common/HorizontalBarChartSimple';
import LineChartHigh from '../../../../common/LineChartHigh';


class PropertyCrime extends Component {

    constructor() {
        super()
        this.state = {
            offense_code: 'aggravated-assault',
            year: 2017,
            year_range: 'past_10_years',
            year_ranges: [ "past_2_years", "past_5_years","past_10_years"],
            start_year: 0,
            end_year: 2017,
            years: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
            offenses: []
        }
    }

    componentDidMount() {
        let type
        if (this.props.selected_state == 'United States') {
            type = 'national'
        } else {
            type = 'state'
        }
        this.props.dispatch(fetchPropertyStolen(type))
        this.props.dispatch(fetchPropertyRecovered(type))
    }

    onRangeChange = (range)=>{
        let type
        if (this.props.selected_state == 'United States') {
            type = 'national'
        } else {
            type = 'state'
        }
        this.setState({year_range:range})
        let range_key = 0
        range_key =range == 'past_2_years'?2:range == 'past_5_years'?5:range == 'past_10_years'?10:0
        this.props.dispatch(fetchPropertyStolen(type,0,range_key))
        this.props.dispatch(fetchPropertyRecovered(type,0,range_key))
    }
    render() {
        let year_range = ["last2years", "last5years", "last10years"]
        if (this.props.property_stolen_loading && this.props.property_recovered_loading) {
            return <PageLoader loading={this.props.property_stolen_loading && this.props.property_recovered_loading} />
        } else {
            console.log("from property_crime",this.props.property_stolen_chart)
            
            return (
                <Fragment>
                    <h2>Property Stolen and Recovered in the United States</h2>
                    <p>The charts below provides property types, the reported value of stolen property, and the value of recovered property as reported to the FBI’s UCR Program. These values encompass all crimes and property type for the year selected and are not restricted to the selected offense.</p>
                    <div className="row">
                        <p>Click on the filters to provide year range:</p>
                        <div className="col">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {this.state.year_range}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="states_menu">
                                    {this.state.year_ranges && this.state.year_ranges.map((range, index) => <Dropdown.Item onSelect={() => this.onRangeChange(range)} key={index} href="#/action-1" >{range}</Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <br />
                    <hr />
                    <br />
                    <h4>Property Stolen</h4>
                    {/* <HorizontalBarChartSimple data={this.props.property_stolen_chart} width={500} height={400}/> */}
                   {this.props.property_recovered.length?<LineChartHigh chart_id="stolen_line_chart_high" series={ this.props.property_recovered_chart} subtitle="sasa" ytitle = "sasasa" title="ssasasa" pointStart={this.props.property_stolen_chart_start_point} />:<div className="">No data present for this year</div>} 
                    <hr/>
                    <h4>Property Recovered</h4>
                    {this.props.property_stolen.length?<LineChartHigh chart_id="recovered_line_chart_high" series={ this.props.property_stolen_chart} subtitle="sasa" ytitle = "sasasa" title="ssasasa" pointStart={this.props.property_recovered_chart_start_point} />:<div className="">No data present for this year</div>} 
                    {/* <HorizontalBarChartSimple data={this.props.property_recovered_chart} width={500} height={400}/> */}

                </Fragment>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    property_stolen_chart: state.cdeReducer.property_stolen_chart,
    property_stolen: state.cdeReducer.property_stolen,
    property_stolen_loading: state.cdeReducer.property_stolen_loading,
    property_recovered_chart: state.cdeReducer.property_recovered_chart,
    property_recovered: state.cdeReducer.property_recovered,
    property_recovered_loading: state.cdeReducer.property_recovered_loading,
    selected_state: state.cdeReducer.selected_state,
    property_recovered_chart_start_point:state.cdeReducer.property_recovered_chart_start_point,
    property_stolen_chart_start_point:state.cdeReducer.property_stolen_chart_start_point,
})

export default connect(mapStateToProps, null)(PropertyCrime)
