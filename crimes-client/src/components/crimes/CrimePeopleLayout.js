import React, { Component } from 'react'
import { connect } from 'react-redux'
import CrimePeopleVictims from './CrimePeopleVictims';
import CrimePeopleLaw from './CrimePeopleLaw';
import CrimePeopleSuspects from './CrimePeopleSuspects';
import CrimePeopleAccussed from './CrimePeopleSuspects';

class CrimePeopleLayout extends Component {
    render() {
        return (
            <div>
                <p>Shows different people related to this crime.Click on each person to view more.</p>
                <hr/>
                <br/>
                {!this.props.crime_loading && this.props.crime_incident_law_data && this.props.crime_incident_law_data.length && this.props.crime_incident_law_data ?
                <CrimePeopleVictims title="Victims" data={this.props.crime_incident_law_data && this.props.crime_incident_law_data.length && this.props.crime_incident_law_data}/>:
                <div>No data about victims is available at present...</div>}
                
                <br/>
                <hr/>
                <br/>
                {!this.props.crime_loading && this.props.crime_incident_accussed_data && this.props.crime_incident_accussed_data.length && this.props.crime_incident_accussed_data ?
                <CrimePeopleAccussed title="Accussed" data={this.props.crime_incident_accussed_data && this.props.crime_incident_accussed_data.length && this.props.crime_incident_accussed_data}/>:
                <div>No data about accussed is available at present...</div>}
                <br/>
                <hr/>
                <br/>
                {!this.props.crime_loading && this.props.crime_incident_suspects_data && this.props.crime_incident_suspects_data.length && this.props.crime_incident_suspects_data ?
                <CrimePeopleSuspects title="Suspects"data={this.props.crime_incident_suspects_data && this.props.crime_incident_suspects_data.length && this.props.crime_incident_suspects_data}/>:
                <div>No data about suspects is available at present...</div>}
                <br/>
                <hr/>
                <br/>
                {!this.props.crime_loading && this.props.crime_incident_law_data && this.props.crime_incident_law_data.length && this.props.crime_incident_law_data ?
                <CrimePeopleLaw title="Law members associated" data={this.props.crime_incident_law_data && this.props.crime_incident_law_data.length && this.props.crime_incident_law_data}/>:
                <div>No data about law members related to this case is available at present...</div>}
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    crime: state.crimeReducer.crime,
    crime_loading: state.crimeReducer.crime_loading,
    crime_incident_data:state.crimeReducer.crime_incident_data && state.crimeReducer.crime_incident_data.length && state.crimeReducer.crime_incident_data[0],
    crime_incident_law_data: state.crimeReducer.crime_incident_data && state.crimeReducer.crime_incident_data.length && state.crimeReducer.crime_incident_law_data,
    crime_incident_judge_data: state.crimeReducer.crime_incident_data && state.crimeReducer.crime_incident_data.length && state.crimeReducer.crime_incident_judge_data,
    crime_incident_suspects_data: state.crimeReducer.crime_incident_data && state.crimeReducer.crime_incident_data.length && state.crimeReducer.crime_incident_suspects_data,
    crime_incident_victims_data: state.crimeReducer.crime_incident_data && state.crimeReducer.crime_incident_data.length && state.crimeReducer.crime_incident_victims_data,
    crime_incident_accussed_data:state.crimeReducer.crime_incident_data && state.crimeReducer.crime_incident_data.length && state.crimeReducer.crime_incident_accussed_data,
})


export default connect(mapStateToProps, null)(CrimePeopleLayout)
