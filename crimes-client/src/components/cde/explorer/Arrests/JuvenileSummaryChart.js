import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchArrestsNational, fetchArrestsNationalAdult, fetchArrestsNationalDrug, fetchArrestsNationalJuvenile } from '../../../../actions/cdeActions'
import PageLoader from '../../../../common/PageLoader';
import { Dropdown } from 'react-bootstrap'
import GroupedDrillChartArrestsJuvenile from './GroupedDrillChartArrestsJuvenile';


class JuvenileSummaryChart extends Component {

    constructor() {
        super()
        this.state = {
            offense_code: 'aggravated-assault',
            year: 2017,
            chart_year: 2016,
            year_range: 'current_year',
            year_ranges: ["current_year", "past_2_years", "past_5_years"],
            start_year: 0,
            end_year: 2017,
            years: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017],
            offenses: [],

        }
    }

    componentDidMount() {
        let type
        if (this.props.selected_state == 'United States') {
            type = 'national'
        } else {
            type = 'state'
        }
        this.props.dispatch(fetchArrestsNationalJuvenile())
        // this.props.dispatch(fetchPropertyRecovered(type,2017,''))
    }

    onYearChange = (year) => {
        this.setState({ chart_year: year })
    }

    onRangeChange = (range) => {
        this.setState({ year_range: range })
    }
    render() {

        let year_range = ["last2years", "last5years", "last10years"]
        if (this.props.arrests_national_juvenile_loading) {
            return <PageLoader loading={this.props.arrests_national_juvenile_loading} />
        } else {
            // form the chart data here :
            let categories = []
            let drilldown_series = []
            let chart_series = []
            let total_male_series_data = []
            let total_female_series_data = []
            let total_population_data = []
            let total_agencies_data = []
            let chart_years = []
            // debugger
            //for drilldown series give male_2016 female_2016 and inside age_group , value
            this.props.arrests_national_juvenile.map((category, index) => {
                if (index < 15 && category._id !=='All Other Offenses') { //only show few items since page width is less .
                    categories.push(category._id)
                    let male_drilldown = {
                        name: '',
                        id: '',
                        data: []
                    }
                    let female_drilldown = {
                        name: '',
                        id: '',
                        data: []
                    }
                    category.docs.map(doc => {
                        if (doc.year == this.state.chart_year) {
                            total_population_data.push(doc.population)
                            total_male_series_data.push({ name: category._id, y: doc.total_male, drilldown: `male_${category._id.toLowerCase().split(" ").join("_")}` })
                            total_female_series_data.push({ name: category._id, y: doc.total_female, drilldown: `female_${category._id.toLowerCase().split(" ").join("_")}` })
                            total_agencies_data.push({ name: category._id, y: doc.agencies })
                            male_drilldown.name = `male population by age group for ${doc.year}`
                            male_drilldown.id = `male_${category._id.toLowerCase().split(" ").join("_")}`
                            male_drilldown.data.push(
                                ["0-9", doc.m_0_9],
                                ["10-12", doc.m_10_12],
                                ["13-14", doc.m_13_14],
                                ["15", doc.m_15],
                                ["16", doc.m_16],
                                ["17", doc.m_17]
                            )
                            female_drilldown.name = `female population by age group for ${doc.year}`
                            female_drilldown.id = `female_${category._id.toLowerCase().split(" ").join("_")}`
                            female_drilldown.data.push(
                                ["0-9", doc.f_0_9],
                                ["10-12", doc.f_10_12],
                                ["13-14", doc.f_13_14],
                                ["15", doc.f_15],
                                ["16", doc.f_16],
                                ["17", doc.f_17]
                            )
                            drilldown_series.push(male_drilldown)
                            drilldown_series.push(female_drilldown)
                            if (!chart_years.includes(doc.year)) chart_years.push(doc.year)
                        }
                    })
                }
            })
            let chart_data = {
                categories,
                drilldown_series,
                chart_series,
                chart_years,
                total_agencies_data,
                total_female_series_data,
                total_male_series_data,
                total_population_data,
                title: ""
            }
            return (
                <Fragment>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {this.state.chart_year}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="states_menu">
                            {this.state.years && this.state.years.map((year, index) => <Dropdown.Item onSelect={() => this.onYearChange(year)} key={index} href="#/action-1" >{year}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    {this.props.arrests_national_juvenile.length && <GroupedDrillChartArrestsJuvenile chart_data={chart_data} />}
                </Fragment>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    selected_state: state.cdeReducer.selected_state,
    arrests_national_juvenile: state.cdeReducer.arrests_national_juvenile,
    arrests_national_juvenile_loading: state.cdeReducer.arrests_national_juvenile_loading

})

export default connect(mapStateToProps, null)(JuvenileSummaryChart)
