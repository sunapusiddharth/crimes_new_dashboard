import React from 'react'
import { connect } from 'react-redux';
import {thousand_separator} from '../../../../helpers/number_helper'

function Introduction(props) {
    // debugger
    let agencies_count = props.crime_rates.reduce(function(prev, cur) {
        return prev + cur.totalAmount;
      }, 0);
    let data_collection = `In ${props.end_year_main}, the FBI expanded crime offense statistics for the nation are based on data received from ${thousand_separator(agencies_count)} law enforcement agencies in the country that year.`
    // switch (props.data_collection) {
    //     case 'Crime':
    //         data_collection=`In ${props.end_year}, the FBI  estimated  glossary lookup  crime statistics for the nation are based on data received from ${props.agencies_count} law enforcement agencies in the country that year.`
    //         break;
    //     case 'Expanded_Homicide_Data':
    //         data_collection= `In ${props.end_year}, the FBI expanded homicide crime statistics for the nation are based on  ${props.agencies_count} law enforcement agencies in the country that year who elected to submit a expanded homicide report.`
    //         break;
    //     case 'Expanded_Property_Crime_Data':

    //         break;
    //     case 'Arrest':

    //         break;
    //     case 'Preliminary_Semiannual_Uniform_Crime_Report':

    //         break;
    //     default:
    //             data_collection=`In ${props.state.cdeReducer.crime_rates_loading,}, the FBI  estimated  glossary lookup  crime statistics for the nation are based on data received from ${props.agencies_count} law enforcement agencies in the country that year.`
    //         break;
    // }
    return (
        <div>
            <h2>{props.state}</h2>
            <hr />
            <p>Expanded Property Crime Data for the nation are derived from  summary (SRS)  glossary lookup  and incident (NIBRS)  glossary lookup  reports voluntarily submitted to the FBI.</p>
            <p>{data_collection}</p>
        </div>
    )
}

const mapStateToProps = state =>({
    end_year_main:state.cdeReducer.end_year_main,
    crime_rates:state.cdeReducer.crime_rates,
    selected_state:state.cdeReducer.selected_state,
})

export default connect(mapStateToProps,null)(Introduction)
