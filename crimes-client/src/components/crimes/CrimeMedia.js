import React, { Component } from 'react'
import { connect } from 'react-redux'
import CrimeMediaPhotosNavigator from './CrimeMediaPhotosNavigator';
import CrimeMediaVideoCarousel from './CrimeMediaVideoCarousel';
import { CrimeAudioLayout } from './CrimeAudioLayout';

class CrimeMedia extends Component {
    render() {
        return (
            <div>
                <p>Shows different media files related to the crime. Click on video or audio clips to watch the content. <b>Note</b>This data is randomly created and may/may not be specific or related to the crime since it is a dummy site.</p>
                <hr/>
                <br/>
                <h3>Photos</h3>
                {!this.props.crime_loading && this.props.crime_incident_data && Object.keys(this.props.crime_incident_data).length && this.props.crime_incident_data.photos ?
                <CrimeMediaPhotosNavigator data={this.props.crime_incident_data && Object.keys(this.props.crime_incident_data).length && this.props.crime_incident_data.photos}/>:
                <div>No Photos are available</div>}
                
                <br/>
                <hr/>
                <br/>
                <h3>Videos</h3>
                {!this.props.crime_loading && this.props.crime_incident_data && Object.keys(this.props.crime_incident_data).length && this.props.crime_incident_data.videos ?
                <CrimeMediaVideoCarousel data={this.props.crime_incident_data && Object.keys(this.props.crime_incident_data).length && this.props.crime_incident_data.videos}/>:
                <div>No Photos are available</div>}
                <br/>
                <hr/>
                <br/>
                <h3>Audio Clips</h3>
                {!this.props.crime_loading && this.props.crime_incident_data && Object.keys(this.props.crime_incident_data).length && this.props.crime_incident_data.audios ?
                <CrimeAudioLayout data={this.props.crime_incident_data && Object.keys(this.props.crime_incident_data).length && this.props.crime_incident_data.audios}/>:
                <div>No Photos are available</div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    crime: state.crimeReducer.crime,
    crime_loading: state.crimeReducer.crime_loading,
    crime_incident_data:state.crimeReducer.crime_incident_data && state.crimeReducer.crime_incident_data.length && state.crimeReducer.crime_incident_data[0],
})


export default connect(mapStateToProps, null)(CrimeMedia)
