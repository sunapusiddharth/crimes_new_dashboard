import React, { Component } from 'react'
import { connect } from 'react-redux'
import {loadAllCrimeData} from '../../../../actions/cdeActions'
import PageLoader from '../../../../common/PageLoader';
import Introduction from './Introduction';
import PropertyCrime from './PropertyCrime';

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
                    
                    <hr/>
                    <PropertyCrime/>
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
