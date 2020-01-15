import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux'
// import IncidentCrimeScene from './IncidentCrimeScene';
import PageLoader from '../../../../common/PageLoader'
import { Collapse } from 'react-bootstrap'
import IncidentPeople from './IncidentPeople';
import faker from 'faker'

function IncidentOverview(props) {
    const [collapse, setCollapse] = useState(0);
    if (props.incident_data_loading) {
        return <PageLoader />
    } else {
        let { summary } = props.incident_data
        let { offense_description, year, month, day_of_week, hour, street } = props.crime_data[0]
        let judge = props.incident_people_data[0], law = props.incident_people_data[1], accussed = props.incident_people_data[2], suspects = props.incident_people_data[3], victims = props.incident_people_data[4];
        //bring full date to get all details using new Date() getMonth() ....
        // debugger;
        if (typeof props.incident_data[0] == 'undefined') {
            console.log(props.incident_people_data)
            return <Fragment>
                <h5>Incient Title</h5>
                <div>Sorry there is no data related to this incident</div>
                <p>Some random text : {faker.lorem.sentences(80)}</p>
            </Fragment>
        }
        return (
            <div>
                <h3>{offense_description}</h3>
                <div className="status_and_date row">
                    <div className="col left-allign">Status: No data</div>
                    <div className="col right-allign">Took place on : </div>
                </div>
                <h3>Status: No data</h3>
                <h3>Summary</h3>
                <p>{summary.substr(0, 100)}</p>
                <Collapse in={collapse}>
                    <span>
                        {summary.substr(100, summary.length)}
                    </span>
                </Collapse>
                {collapse ? <span onClick={() => setCollapse(!collapse)}>See less</span> : <span onClick={() => setCollapse(!collapse)}>See more</span>}
                <IncidentPeople people={judge} display_name={"judge"}size={5} is_loading={props.incident_people_data_loading}/>
                <IncidentPeople people={law} display_name={"Law"}size={5} is_loading={props.incident_people_data_loading}/>
                <IncidentPeople people={accussed} display_name={"Accussed"}size={5} is_loading={props.incident_people_data_loading}/>
                <IncidentPeople people={suspects} display_name={"Suspects"}size={5} is_loading={props.incident_people_data_loading}/>
                <IncidentPeople people={victims} display_name={"Victims"}size={5} is_loading={props.incident_people_data_loading}/>
                {/* <IncidentCrimeScene/> */}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    incident_data: state.dashboardReducer.incident_data.incident_data,
    incident_data_loading: state.dashboardReducer.incident_data_loading,
    crime_data: state.dashboardReducer.incident_data.crime_data,
    incident_people_data: state.dashboardReducer.incident_people_data,
    incident_people_data_loading: state.dashboardReducer.incident_people_data_loading
})
export default connect(mapStateToProps, null)(IncidentOverview)