import React, { Fragment, Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Dropdown } from 'react-bootstrap'
import PageLoader from '../../../../common/PageLoader';
import { fetchArrestsNational } from '../../../../actions/cdeActions';
import PieChartHighcharts from '../../../../common/PieChartHighcharts';
import randomColor from 'randomcolor';

//giev a line series with year filter .


class NationalSummaryChart extends Component {
    constructor() {
        super()
        this.state = {
            chart_year: 2016,
            years: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016],
        }
    }

    componentDidMount() {
        if (!this.props.arrests_national.length) this.props.dispatch(fetchArrestsNational())
    }

    onYearChange = (chart_year) => {
        this.setState({ chart_year })
    }

    render() {
        if (this.props.arrests_national_loading) {
            return <PageLoader loading={this.props.arrests_national_loading} />
        } else if (!this.props.arrests_national.length) {
            return <div className="no_data">no data </div>
        } else {
            let data = []
            this.props.arrests_national.map(year_data => {
                if (year_data.year == this.state.chart_year) {
                    Object.keys(year_data).map((key, index) => {
                        if (index < 10 && key !== 'population' && key !== 'year' && key !== 'total_arrests') {
                            let color = randomColor({
                                hue: 'blue'
                            })
                            data.push({
                                name: key, y: (year_data[key] / year_data['total_arrests'] / 100), color
                            })
                        }
                        return
                    })
                    return
                }
            })
            let series = [{
                name: "Arrests",
                data: data
            }]
            console.log("from piechart national summary ", series)
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
                    <PieChartHighcharts data={series} title="Total arrests made in the year" />
                </Fragment>
            )
        }
    }

}


const mapStateToProps = state => ({
    selected_state: state.cdeReducer.selected_state,
    arrests_national: state.cdeReducer.arrests_national,
    arrests_national_loading: state.cdeReducer.arrests_national_loading
})

export default connect(mapStateToProps, null)(NationalSummaryChart)