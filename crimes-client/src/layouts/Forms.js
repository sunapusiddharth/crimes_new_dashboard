import React, { Component, Fragment } from 'react'
import SearchPeople from '../components/people/SearchPeople'
import faker from 'faker'
import InvestigationCard from '../components/investigation/InvestigationCard';



export default class Investigation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recent_forms: [{name:'form1',url:''},{name:'form2',url:''}],
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
                <div className="recent_investigations">
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
