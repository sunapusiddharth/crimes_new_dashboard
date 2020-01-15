import React, { Fragment ,Component,useState,useEffect} from 'react'
import LineGraphD3 from '../../../../common/LineGraphD3';
import { connect } from 'react-redux'
import {Dropdown} from 'react-bootstrap'
import PageLoader from '../../../../common/PageLoader';


class  CrimeRatesChart extends Component {
    constructor(){
        super()
        this.state={
            chart_data:[],
            selected_offense:'',
            offenses:[],
            offense:'aggravated-assault'
        }
    }
    
    changeChartData =(offense)=>{
        this.setState({offense})
    }

    render(){
        let offenses = this.props.crime_rates.map(offense=>offense._id)
   
    // console.log("crime_rates=",this.state)
    // debugger;
    if(this.props.crime_rates_loading){
        return <PageLoader loading={this.props.crime_rates_loading}/>
    }else if(!this.props.crime_rates.length){
        return <div className="no_data">no data </div>
    }else{
        let data = this.props.crime_rates.map(crime => {
            if (crime._id == this.state.offense) {
                let values_mapped = crime.values.map(val => {
                    if (val.year > 2006) {
                        return { x: val.year, y: (val.value / 1000) }
                    }
    
                }).filter(el => el != null)
                return {
                    name: crime._id,
                    values: values_mapped
                }
            }
    
        }).filter(el => el != null)
        console.log("data inside render",data)
        // debugger
    return (
       
        <Fragment>
            <h1 className="chart_title">Crime Rates in the {this.props.selected_state}, {this.props.start_year_main}- {this.props.end_year_main}</h1>
            <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {this.state.offense}
                </Dropdown.Toggle>
                    <Dropdown.Menu  className="states_menu">
                        {offenses && offenses.map((offense_code,index)=><Dropdown.Item onSelect={()=>this.changeChartData(offense_code)} key={index}  href="#/action-1" >{offense_code}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                {/* {this.state.chart_data.length && <div>State data :{this.state.chart_data[0].name}</div>}     */}
            <LineGraphD3 data={data} />
        </Fragment>
    )
}
    }
    
}


const mapStateToProps = state => ({
    crime_rates: state.cdeReducer.crime_rates,
    crime_rates_loading:state.cdeReducer.crime_rates_loading,
    selected_state: state.cdeReducer.selected_state,
    start_year_main: state.cdeReducer.start_year_main,
    end_year_main: state.cdeReducer.end_year_main,
})

export default connect(mapStateToProps, null)(CrimeRatesChart)