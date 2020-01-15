import React from 'react'
import { connect } from 'react-redux'
import PageLoader from '../../../../common/PageLoader'

// will be used to display all the pics and videos thumbnails .
function IncidentCrimeScene() {
    let {files,external_link,audios,videos,photos} = props.incident_data[0]
    return (
        <div>
            
        </div>
    )
}

const mapStateToProps = state => ({
    incident_data: state.dashboardReducer.incident_data.incident_data,
    incident_data_loading: state.dashboardReducer.incident_data_loading
})
export default connect(mapStateToProps, null)(IncidentCrimeScene)