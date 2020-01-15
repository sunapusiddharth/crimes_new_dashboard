import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {changeOffenseCode,changecrimeEndYear,changecrimeStartYear,getVictimsData,getOffenderData} from '../../../../actions/cdeActions'
import PageLoader from '../../../../common/PageLoader';
import {Dropdown} from 'react-bootstrap'
import PieTabs from './PieTabs';
import VictimDemographies from './VictimDemographies';

 class NIBRSData extends Component {

    constructor(){
        super()
        this.state={
            offense_code:'aggravated-assault',
            year:2017,
            year_range:'current_year',
            year_ranges:["current_year","past_2_years","past_5_years"],
            start_year:0,
            end_year:2017,
            years:[2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017],
            offenses:[]
        }
    }

    componentDidMount(){
        let type 
        if(this.props.selected_state == 'United States'){
            type='national'
        }else{
            type='state'
        }
        this.props.dispatch(getVictimsData(type,this.props.crime_offense_code,this.props.variable_key,this.props.crime_start_year,this.props.crime_end_year))
        this.props.dispatch(getOffenderData(type,this.props.crime_offense_code,this.props.variable_key,this.props.crime_start_year,this.props.crime_end_year))
    }


    changeOffense = (offense)=>{
        this.setState({offense_code:offense})
        this.props.dispatch(changeOffenseCode(offense))
    }

    onYearChange = (year)=>{
        this.props.dispatch(changecrimeEndYear(year))
        this.props.dispatch(changecrimeStartYear(year))
    }

    onRangeChange = (range)=>{
        if(range == 'current_year'){
            this.props.dispatch(changecrimeEndYear(2017))
            this.props.dispatch(changecrimeStartYear(2017))
            this.setState({year_range:range})
        }else if(range == 'past_2_years'){
            this.props.dispatch(changecrimeEndYear(2017))
            this.props.dispatch(changecrimeStartYear(2015))
            this.setState({year_range:range})
        }else {
            this.props.dispatch(changecrimeEndYear(2017))
            this.props.dispatch(changecrimeStartYear(2012))
            this.setState({year_range:range})
        }
    }
    render() {
        console.log("called from render NIBRS DATA")
        if(this.props.victims_loading && this.props.crime_rates_loading){
            return <PageLoader loading={this.props.victims_loading && this.props.crime_rates_loading}/>
        }else{
            let total_crimes_by_offense_code = this.props.crime_rates.filter(crime=>crime._id == this.state.offense_code)
            let offenses = this.props.crime_rates.map(offense=>offense._id)
            let total_crimes_count_by_year =  total_crimes_by_offense_code &&  total_crimes_by_offense_code.length &&  total_crimes_by_offense_code[0].values.filter(value=>value.year == this.state.end_year)
            return (
                <Fragment>
                    <h2>Incident-based (NIBRS)  glossary lookup  details reported in the {this.props.selected_state}</h2>
                    <div className="row">
                        <div className="col">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {this.props.crime_offense_code}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="offense_menu">
                                    {offenses && offenses.map((offense,index) => <Dropdown.Item onSelect={() => this.changeOffense(offense)} key={index} href="#/action-1" >{offense}</Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="col">
                            <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    {this.props.crime_start_year}
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="years_menu">
                                    {this.state.years && this.state.years.map((year,index) => <Dropdown.Item onSelect={() => this.onYearChange(year)} key={index} href="#/action-1" >{year}</Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <br/>
                    <hr/>
                    <br/>
                    <p>In {this.state.end_year_main}, there were {total_crimes_count_by_year && total_crimes_count_by_year[0].value} violent crime incidents, and 378,763 offenses reported by the{this.props.selected_state} by 7,096 law enforcement agencies that submitted incident-based (NIBRS)  glossary lookup  data.</p>
                    <PieTabs />

                    <hr/>
                    <br/>
                    <VictimDemographies/>
                    
                </Fragment>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    crime_rates: state.cdeReducer.crime_rates,
    selected_state:state.cdeReducer.selected_state,
    victims_loading:state.cdeReducer.victims_loading,
    victims_data:state.cdeReducer.victims_data,
    victims_distinct_offenses:state.cdeReducer.victims_distinct_offenses,
    crime_rates:state.cdeReducer.crime_rates,
    crime_rates_loading:state.cdeReducer.crime_rates_loading,
    crime_offense_code:state.cdeReducer.crime_offense_code,
    start_year_main:state.cdeReducer.offense_code,
    end_year_main:state.cdeReducer.end_year_main,
    crime_start_year:state.cdeReducer.crime_start_year,
    crime_end_year:state.cdeReducer.crime_end_year,
    variable_key:state.cdeReducer.variable_key,
})

export default connect(mapStateToProps, null)(NIBRSData)
