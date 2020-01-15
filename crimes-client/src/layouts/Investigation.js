import React, { Component, Fragment } from 'react'
import SearchPeople from '../components/people/SearchPeople'
import faker from 'faker'
import InvestigationCard from '../components/investigation/InvestigationCard';
import '../styles/investigation.css'

const incident = {
    _id: '5d40f1fb9732ba24181e991b',
    title:faker.lorem.sentences(1),
    summary:faker.lorem.sentences(5),
    offense_description: 'B&E RESIDENCE DAY - NO PROP TAKEN',
    year: 2016,
    month: 1,
    day_of_week: 'Tuesday',
    hour: 14,
    status:'Closed',
    date:'24/07/2019',
    street: 'AMERICAN LEGION HWY'
  }

export default class Investigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active_investigations: [incident, incident],
            recent_investigations: [incident, incident, incident, incident, incident],
        }
    }
    render() {
        let {active_investigations,recent_investigations} = this.state
        return (
            <Fragment>
                <div className="search_past_investigations">
                    <h5>Sarch Past Investigations</h5>
                    <SearchPeople />
                </div>
                <div className="active_investigations">
                    <h5>Active Investigations</h5>
                    <div class="container-fluid">
                        <div class="row flex-row flex-nowrap">
                            {active_investigations.map(investigation => (
                                <div className="col-6">
                                    <InvestigationCard incident={investigation}/>s
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="active_investigations">
                    <h5>Recently Viewed Investigations</h5>
                    <div class="container-fluid">
                        <div class="row flex-row flex-nowrap">
                            {recent_investigations.map(investigation => (
                                <div className="col-6">
                                    <InvestigationCard incident={investigation}/>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}
