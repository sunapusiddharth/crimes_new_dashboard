import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchArrestsNational, fetchArrestsNationalAdult, fetchArrestsNationalDrug, fetchArrestsNationalJuvenile } from '../../../../actions/cdeActions'
import PageLoader from '../../../../common/PageLoader';
import { Dropdown } from 'react-bootstrap'
import GroupedDrillChartArrestsAdult from './GroupedDrillChartArrestsAdult';


class AdultSummaryChart extends Component {

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
        this.props.dispatch(fetchArrestsNationalAdult())
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
        if (this.props.arrests_national_adult_loading) {
            return <PageLoader loading={this.props.arrests_national_adult_loading} />
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
            this.props.arrests_national_adult.map((category, index) => {
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
                                ["18", doc.m_18],
                                ["19", doc.m_19],
                                ["20", doc.m_20],
                                ["21", doc.m_21],
                                ["22", doc.m_22],
                                ["23", doc.m_23],
                                ["24", doc.m_24],
                                ["25_29", doc.m_25_29],
                                ["30-34", doc.m_30_34],
                                ["35-39", doc.m_35_39],
                                ["40-44", doc.m_40_44],
                                ["45-49", doc.m_45_49],
                                ["50-54", doc.m_50_54],
                                ["55-59", doc.m_55_59],
                                ["60-64", doc.m_60_64],
                                ["65 plus", doc.m_65p]  
                            )
                            female_drilldown.name = `female population by age group for ${doc.year}`
                            female_drilldown.id = `female_${category._id.toLowerCase().split(" ").join("_")}`
                            female_drilldown.data.push(
                                ["18", doc.f_18],
                                ["19", doc.f_19],
                                ["20", doc.f_20],
                                ["21", doc.f_21],
                                ["22", doc.f_22],
                                ["23", doc.f_23],
                                ["24", doc.f_24],
                                ["25-29", doc.f_25_29],
                                ["30-34", doc.f_30_34],
                                ["35-39", doc.f_35_39],
                                ["40-44", doc.f_40_44],
                                ["45-49", doc.f_45_49],
                                ["50-54", doc.f_50_54],
                                ["55-59", doc.f_55_59],
                                ["60-64", doc.f_60_64],
                                ["65 plus", doc.f_65p],
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
                        <Dropdown.Toggle variant="success" id="dropdown-adult_summary">
                            {this.state.chart_year}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="states_menu_adult_summary">
                            {this.state.years && this.state.years.map((year, index) => <Dropdown.Item onSelect={() => this.onYearChange(year)} key={index} href="#/action-1" >{year}</Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    {this.props.arrests_national_adult.length && <GroupedDrillChartArrestsAdult chart_data={chart_data} />}
                </Fragment>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    selected_state: state.cdeReducer.selected_state,
    arrests_national_adult: state.cdeReducer.arrests_national_adult,
    arrests_national_adult_loading: state.cdeReducer.arrests_national_adult_loading

})

export default connect(mapStateToProps, null)(AdultSummaryChart)
