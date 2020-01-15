import React, { Component } from 'react'
import { connect } from 'react-redux'
import {loadAllCrimeData} from '../../../../actions/cdeActions'
import PageLoader from '../../../../common/PageLoader';
import Introduction from './Introduction';
import PEper1000 from './PEper1000';
import PEBreakoutChart from './PEBreakoutChart';

 class MainPage extends Component {
    componentDidMount(){
        this.props.dispatch(loadAllCrimeData())
    }
    render() {
        if (this.props.crime_rates_loading) {
            return <PageLoader loading={this.props.crime_rates_loading}/>
        } else {
            return (
                <div>
                    <Introduction />
                    <hr/>
                    <h3>Police Employment per 1000 civilians</h3>
                    <PEper1000/>
                    <hr/>
                    <PEBreakoutChart/>
                </div>
            )   
        }
    }
}

const mapStateToProps = (state) => ({
    crime_rates_loading:state.cdeReducer.crime_rates_loading,
    crime_rates:state.cdeReducer.crime_rates,
    selected_state:state.cdeReducer.selected_state,
})



export default connect(mapStateToProps, null)(MainPage)
