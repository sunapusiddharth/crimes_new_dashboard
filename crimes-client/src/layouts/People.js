import React, { Component, Fragment } from 'react'
import SearchPeople from '../components/people/SearchPeople'
import { CardDeck } from 'react-bootstrap';
import PersonCard from '../common/PersonCard';
const person = {
    _id: '5d42dd12d66d7e04a0c53a68',
    is_accussed: true,
    is_law: false,
    is_suspect: false,
    country: 'South Georgia and the South Sandwich Islands',
    is_witness: true,
    __v: 0,
    cases: [
        '5d40f1f09732ba24181e7c7b',
        '5d40f1789732ba24181d4a3b',
        '5d40f0259732ba241819db8c'
    ],
    departments: [],
    prisons: [
        {
            name: 'Representative Cape Verde Escudo matrix',
            from: '2019-01-11T18:08:22.613Z',
            to: '2019-05-17T04:02:20.519Z',
            duration: 4,
            cell_holding: 'multi-byte Personal Loan Account Refined Rustic Cotton',
            _id: '5d42dd12d66d7e04a0c53a69',
            supervisor: [
                {
                    name: 'Baby Yundt',
                    external_url: 'https://blaise.name',
                    contact_authority: 'Libyan Dinar composite Mouse Gorgeous',
                    _id: '5d42dd12d66d7e04a0c53a6a'
                }
            ]
        }
    ],
    social_link: [
        'http://facebook.com',
        'https //instagram.com'
    ],
    photos: [
        's3://crimeportal/Capture.PNG'
    ],
    employment: [
        {
            employment_type: 'Consultant',
            title: 'Chief Directives Consultant',
            active: true,
            from: '2019-06-30T11:55:05.162Z',
            to: '2019-05-01T04:28:37.529Z',
            duration: 7,
            address: 'Infrastructure',
            company_name: 'LLC Bergnaum, Harvey and Lehner',
            _id: '5d42dd12d66d7e04a0c53a6c'
        },
        {
            employment_type: 'Analyst',
            title: 'Senior Division Director',
            active: true,
            from: '2019-07-17T06:34:33.064Z',
            to: '2018-11-26T11:05:55.001Z',
            duration: 1,
            address: 'Data',
            company_name: 'Group Muller - Muller',
            _id: '5d42dd12d66d7e04a0c53a6b'
        }
    ],
    education: [],
    email: [
        'Isabel.Funk@yahoo.com'
    ],
    phone: [
        '(433) 186-1450 x259'
    ],
    address: [
        'Summer Curve,702 Gilda Cove,Jacobimouth,Mississippi'
    ],
    name: [
        'Minnie Okuneva'
    ]
}
export default class People extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recently_viewed: [person, person, person, person, person, person,person, person, person, person, person, person],
            people_related_to_active_or_past_investiagation: {
                 victims: [person, person] , accused: [person, person] ,suspects: [person, person], relatives_neighbours: [person, person, person] 
            }
        }
    }
    render() {
        let {victims,accused,suspects,relatives_neighbours} = this.state.people_related_to_active_or_past_investiagation
        return (
            <Fragment>
                <div className="recently_viewed">
                    <h5>Recently Viewed</h5>
                    // card of people goes here with horizontal  scroller
                    <div class="container-fluid">
                        <div class="row flex-row flex-nowrap">
                            {this.state.recently_viewed.map(person => (
                                <div className="col-3">
                                <PersonCard person={person}/>
                             </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="search_people">
                    <h5>Sarch People</h5>
                    <SearchPeople />
                </div>
                <div className="people_related_investigation">
                    <h5>People related to active/past investigation </h5>
                // card of people goes here with horizontal  scroller
                {victims?(
                    <div class="container-fluid">
                        <h5>Victims</h5>
                    <div class="row flex-row flex-nowrap">
                        {victims.map(person => (
                            <div className="col-3">
                            <PersonCard person={person}/>
                         </div>
                        ))}
                    </div>
                </div>
                ):(<div className="no_results">No results found</div>)}

{suspects?(
                    <div class="container-fluid">
                        <h5>Suspects</h5>
                    <div class="row flex-row flex-nowrap">
                        {suspects.map(person => (
                            <div className="col-3">
                            <PersonCard person={person}/>
                         </div>
                        ))}
                    </div>
                </div>
                ):(<div className="no_results">No results found</div>)}

{accused?(
                    <div class="container-fluid">
                        <h5>Accused</h5>
                    <div class="row flex-row flex-nowrap">
                        {accused.map(person => (
                            <div className="col-3">
                            <PersonCard person={person}/>
                         </div>
                        ))}
                    </div>
                </div>
                ):(<div className="no_results">No results found</div>)}

{relatives_neighbours?(
                    <div class="container-fluid">
                        <h5>Relatives or Neighbours</h5>
                    <div class="row flex-row flex-nowrap">
                        {relatives_neighbours.map(person => (
                            <div className="col-3">
                            <PersonCard person={person}/>
                         </div>
                        ))}
                    </div>
                </div>
                ):(<div className="no_results">No results found</div>)}
                </div>
            </Fragment>
        )
    }
}
