import React, { Fragment, Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PageLoader from '../../../../common/PageLoader';
import {fetchPePer1000 } from '../../../../actions/cdeActions';
import LineChartHigh from '../../../../common/LineChartHigh';

//giev a line series with year filter .


class PEper1000 extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    componentDidMount() {
        this.props.dispatch(fetchPePer1000())
    }

    render() {
        if (this.props.pe_per_1000_loading) {
            return <PageLoader loading={this.props.pe_per_1000_loading} />
        } else if (!this.props.pe_per_1000.length) {
            return <div className="no_data">no data </div>
        } else {
            let data = []
            let years_for_duplicate = []
            this.props.pe_per_1000.map(year_data => {
                if(!years_for_duplicate.includes(year_data.data_year)){
                    years_for_duplicate.push(year_data.data_year)
                data.push(year_data.pe_ct_per_1000)
                }
            })
            let series = [{
                name:"police employment per 1000",
                data
            }]
            console.log("from line chart pe per 1000 ", series)
            return (
                <Fragment>
                    <LineChartHigh series={series} pointStart ={Math.min(...years_for_duplicate)} subtitle = "some susbtitle" ytitle="some y axis " title="Total arrests made in the year" />
                </Fragment>
            )
        }
    }

}


const mapStateToProps = state => ({
    selected_state: state.cdeReducer.selected_state,
    pe_per_1000: state.cdeReducer.pe_per_1000,
    pe_per_1000_loading: state.cdeReducer.pe_per_1000_loading
})

export default connect(mapStateToProps, null)(PEper1000)