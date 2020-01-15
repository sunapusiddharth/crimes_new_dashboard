import React, { Fragment, Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'react-bootstrap'
import PageLoader from '../../../../common/PageLoader';
import { fetchPeBreakout } from '../../../../actions/cdeActions';
import PieChartDrillDownHigh from '../../../../common/PieChartDrillDownHigh';
import randomColor from 'randomcolor';

//giev a line series with year filter .


class PEBreakoutChart extends Component {
    constructor() {
        super()
        this.state = {
            chart_year: 2010,
            years: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010],
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchPeBreakout())
    }

    onYearChange = (chart_year) => {
        this.setState({ chart_year })
    }

    render() {
        if (this.props.pe_breakout_loading) {
            return <PageLoader loading={this.props.pe_breakout_loading} />
        } else if (!this.props.pe_breakout.length) {
            return <div className="no_data">no data </div>
        } else {

            //formula - female_titdal + male_total = civilian_oucnt + demale_officer + male_officer
            let series = {}
            let drilldown = {}
            this.props.pe_breakout.map(year_data => {
                if (year_data.data_year == this.state.chart_year) {
                    let total_population = year_data.male_total_ct + year_data.female_total_ct
                    let total_officers = year_data.male_officer_ct + year_data.female_officer_ct
                    series = {
                        name: "Police Employment",
                        colorByPoint: true,
                        data: [
                            {
                                name: "Total Civilians",
                                y: (year_data.civilian_ct / total_population) * 100,
                                drilldown: "total_civilians",
                                color: randomColor({
                                    hue: 'green'
                                })
                            },
                            {
                                name: "Total Officers",
                                y: (total_officers /total_population) * 100,
                                drilldown: "total_officers",
                                color: randomColor({
                                    hue: 'green'
                                })
                            }
                        ]
                    }

                    drilldown = {
                        series: [
                            {
                                name: "Total Civilians",
                                id: "total_civilians",
                                data: [
                                    ["female civilians", (year_data.female_civilian_ct / year_data.civilian_ct) * 100],
                                    ["male civilians", (year_data.male_civilian_ct / year_data.civilian_ct) * 100]
                                ]
                            },
                            {
                                name: "Total Officers",
                                id: "total_officers",
                                data: [
                                    ["female officers", (year_data.female_officer_ct / total_officers) * 100],
                                    ["male officers", (year_data.male_officer_ct / total_officers) * 100]
                                ]
                            }
                        ]
                    }
                    return
                }
            })
            // debugger    
            console.log("from PE breakout chart ", series, drilldown)
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
                    {/* {this.state.chart_data.length && <div>State data :{this.state.chart_data[0].name}</div>}     */}
                    <PieChartDrillDownHigh series={series} drilldown={drilldown} title="Police Employment Breakout" />
                </Fragment>
            )
        }
    }

}


const mapStateToProps = state => ({
    selected_state: state.cdeReducer.selected_state,
    pe_breakout: state.cdeReducer.pe_breakout,
    pe_breakout_loading: state.cdeReducer.pe_breakout_loading
})

export default connect(mapStateToProps, null)(PEBreakoutChart)