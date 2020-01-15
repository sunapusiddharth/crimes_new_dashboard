import React, { Fragment, Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'react-bootstrap'
import PageLoader from '../../../../common/PageLoader';
import { fetchArrestsNationalDrug } from '../../../../actions/cdeActions';
import PieChartDrillDownHigh from '../../../../common/PieChartDrillDownHigh';
import randomColor from 'randomcolor';

//giev a line series with year filter .


class DrugSummaryPieChart extends Component {
    constructor() {
        super()
        this.state = {
            chart_year: 2016,
            years: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchArrestsNationalDrug())
    }

    onYearChange = (chart_year) => {
        this.setState({ chart_year })
    }

    render() {
        if (this.props.arrests_national_drug_loading) {
            return <PageLoader loading={this.props.arrests_national_drug_loading} />
        } else if (!this.props.arrests_national_drug.length) {
            return <div className="no_data">no data </div>
        } else {
            let series = {}
            let drilldown = {}
            this.props.arrests_national_drug.map(year_data => {
                if (year_data.year == this.state.chart_year) {
                    series = {
                        name: "Arrests",
                        colorByPoint: true,
                        data: [
                            {
                                name: "Total Manufacturer",
                                y: (year_data.total_manufacture / year_data.total_arrests) * 100,
                                drilldown: "total_manufacture",
                                color: randomColor({
                                    hue: 'red'
                                })
                            },
                            {
                                name: "Total Possess",
                                y: (year_data.total_possess / year_data.total_arrests) * 100,
                                drilldown: "total_possess",
                                color: randomColor({
                                    hue: 'red'
                                })
                            },
                            {
                                name: "Other Arrests",
                                y: ((year_data.total_arrests - (year_data.total_possess + year_data.total_manufacture)) / year_data.total_arrests) * 100,
                                drilldown: null,
                                color: randomColor({
                                    hue: 'red'
                                })
                            }
                        ]
                    }

                    drilldown = {
                        series: [
                            {
                                name: "Total Manufacturer",
                                id: "total_manufacture",
                                data: [
                                    ["opioid manufacture", (year_data.opioid_manufacture / year_data.total_manufacture) * 100],
                                    ["marijuana manufacture", (year_data.marijuana_manufacture / year_data.total_manufacture) * 100],
                                    ["synthetic manufacture", (year_data.synthetic_manufacture / year_data.total_manufacture) * 100],
                                    ["other manufacture", (year_data.other_manufacture / year_data.total_manufacture) * 100],
                                ]
                            },
                            {
                                name: "Total Possess",
                                id: "total_possess",
                                data: [
                                    ["opioid possess", (year_data.opioid_possess / year_data.total_manufacture) * 100],
                                    ["marijuana possess", (year_data.marijuana_possess / year_data.total_manufacture) * 100],
                                    ["synthetic possess", (year_data.synthetic_possess / year_data.total_manufacture) * 100],
                                    ["other possess", (year_data.other_possess / year_data.total_manufacture) * 100],
                                ]
                            }
                        ]
                    }
                    return
                }
            })
            console.log("from piechart drug summary ", series, drilldown)
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
                    <PieChartDrillDownHigh series={series} drilldown={drilldown} title="Total Drug Arrests made" />
                </Fragment>
            )
        }
    }

}


const mapStateToProps = state => ({
    selected_state: state.cdeReducer.selected_state,
    arrests_national_drug: state.cdeReducer.arrests_national_drug,
    arrests_national_drug_loading: state.cdeReducer.arrests_national_drug_loading
})

export default connect(mapStateToProps, null)(DrugSummaryPieChart)