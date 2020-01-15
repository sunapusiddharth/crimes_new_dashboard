import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import HoneyCombLayout from '../common/HoneyCombLayout';
import PageLoader from '../common/PageLoader';
import PeoplePaginated from '../components/people/PeoplePaginated';
import {fetchPeople} from '../actions/peopleActions'

class PeopleLayout extends Component {

    componentDidMount() {
        this.props.dispatch(fetchPeople(0, 10))
    }
    render() {
        if (this.props.people_loading) {
            return <PageLoader loading={this.props.people_loading} />
        } else {
            console.log("hi fro here")
            // let people = this.props.people
            // let honeyCombData = people.slice(0, 20).map((item) => ({
            //     "image": item.avatar, "title": item.name[0], "email": item.email[0],
            //     "address": item.address[0], "phone": item.phone[0]
            // }))
            return (
                <Fragment>
                    {/* <HoneyCombLayout data={honeyCombData} /> */}
                    <hr />
                    <PeoplePaginated />
                </Fragment>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    people: state.peopleReducer.people,
    people_loading: state.peopleReducer.people_loading,
    total_people: state.peopleReducer.total_people,
})

export default connect(mapStateToProps, null)(PeopleLayout)
