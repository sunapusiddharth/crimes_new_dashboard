import React from 'react'
import PageLoader from '../../../../common/PageLoader'
import PersonCard from '../../../../common/PersonCard';

export default function IncidentPeople(props) {
    return (
        <div className="incident_people">
           <h4>{props.display_name}</h4>
                {props.is_loading ? <PageLoader /> : (
                    typeof(props.people) == 'undefined'? <div className="no_data"></div>:
                    <div className="flex-container">
                        {props.people.map(person => <PersonCard person={person}/>)}
                    </div>
                )}
        </div>
    )
}
