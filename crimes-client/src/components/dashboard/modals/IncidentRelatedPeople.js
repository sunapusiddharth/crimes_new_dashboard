import React,{Fragment} from 'react'
import { CardGroup } from 'react-bootstrap'
import { connect } from 'react-redux'
import PersonCard from '../../../common/PersonCard';


function IncidentRelatedPeople(props) {
    let judge = props.incident_people_data[0], law = props.incident_people_data[1], accussed = props.incident_people_data[2], suspects = props.incident_people_data[3], victims = props.incident_people_data[4];
    // debugger
    return (
        <Fragment>
            <h3>People related to this incident</h3>
            {judge && (
                <Fragment>
                    <h3>Judge</h3>
                    <CardGroup>
                        {Object.values(judge).map(judge => <PersonCard key={judge._id} person={judge} />)}
                    </CardGroup>
                </Fragment>
            )}

{law && (
                <Fragment>
                    <h3>law</h3>
                    <CardGroup>
                        {Object.values(law).map(law =>{
                            console.log("law",law)
                            return <PersonCard key={law._id} person={law} />
                        })}
                    </CardGroup>
                </Fragment>
            )}

{accussed && (
                <Fragment>
                    <h3>accussed</h3>
                    <CardGroup>
                        {Object.values(accussed).map(accussed => <PersonCard key={accussed._id} person={accussed} />)}
                    </CardGroup>
                </Fragment>
            )}

{victims && (
                <Fragment>
                    <h3>victims</h3>
                    <CardGroup>
                        {Object.values(victims).map(victims => <PersonCard key={victims._id} person={victims} />)}
                    </CardGroup>
                </Fragment>
            )}

{suspects && (
                <Fragment>
                    <h3>suspects</h3>
                    <CardGroup>
                        {suspects.map(suspects => <PersonCard key={suspects._id} person={suspects} />)}
                    </CardGroup>
                </Fragment>
            )}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    incident_people_data: state.dashboardReducer.incident_people_data,
})
export default connect(mapStateToProps, null)(IncidentRelatedPeople)