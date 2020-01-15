import React, { Component, Fragment, createRef } from 'react'
import { connect } from 'react-redux'
import '../../../styles/crime_individual.css'
import { fetchDepartmentWithoutDetails, getIndividualSpeech } from '../../../actions/departmentActions'
import PageLoader from '../../../common/PageLoader'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

class Speech extends Component {

    constructor(){
        super()
        this.state={
            speak:false,
        }
    }

    componentDidMount() {
        let speech_id = this.props.match.params.speech_id
        let dept_id = this.props.match.params.dept_id
        this.props.dispatch(fetchDepartmentWithoutDetails(dept_id))
        this.props.dispatch(getIndividualSpeech(speech_id))
    }

    speakText = (transcript) => {
        this.setState({speak:!this.state.speak})
        if(this.state.speak){
            console.log("hi frfom here")
            speechSynthesis.pause()
        }else{
            console.log("hi else frfom here")
            const utterance = new SpeechSynthesisUtterance(transcript)
            speechSynthesis.resume()
            utterance.pitch = 1.5
            utterance.volume = 0.5
            utterance.rate = 2
            speechSynthesis.speak(utterance)
        }
    }

    componentWillUnmount(){
        speechSynthesis.cancel()
    }
    render() {
        if (this.props.loading_speech || this.props.department_loading_without_details) {
            return <PageLoader loading={this.props.loading_speech && this.props.department_loading_without_details} />
        } else {
            let department = this.props.department_without_details
            let speech = this.props.speech
            return (
                <Fragment>
                    <div className="w3-light-grey">
                        <div className="w3-bar w3-black w3-hide-small">
                            <a href={`/department/${department._id}/forms`} className="w3-bar-item w3-button">Forms</a>
                            <a href={`/department/${department._id}/recent_posts`} className="w3-bar-item w3-button">Recent Posts</a>
                            <a href={`/department/${department._id}/press_release`} className="w3-bar-item w3-button">Press Releases</a>
                            <a href={`/department/${department._id}/vacancies`} className="w3-bar-item w3-button">Jobs</a>
                            <a href={`/department/${department._id}/speeches`} className="w3-bar-item w3-button">Speeches</a>
                            <a href={`/department/${department._id}/news`} className="w3-bar-item w3-button">News</a>
                        </div>
                        <div className="w3-content" style={{ maxWidth: "1600px" }}>
                            <header className="w3-container w3-center w3-padding-21 w3-white">
                                <h3 className="w3-xxxmeduim"><b>{department.name}</b></h3>
                                <h6>{department.agency},{department.organization}<span className="w3-tag">{department.city},{department.state}</span></h6>
                            </header>
                        </div>
                    </div>
                    <hr />
                    <br />
                    <h2 >{speech.title}</h2>
                    <p>{speech.created}</p>
                    {speech.component_name && <p>{speech.component_name}</p>}
                    {speech.location && <p><strong>Location</strong>: {speech.location.locality}, {speech.location.administrative_area}, {speech.location.country}</p>}
                    <div className="row">
                        <div className="col pull-left"> <h5>Transcript</h5></div>
                        <div className="col pull-right"><Button onClick={()=>this.speakText(speech.body)}>{this.state.speak?'Pause':'Play'}</Button></div>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: speech.body }} />
                </Fragment>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    speech: state.departmentReducer.speech,
    loading_speech: state.departmentReducer.loading_speech,
    department_loading_without_details: state.departmentReducer.department_loading_without_details,
    department_without_details: state.departmentReducer.department_without_details,
})

export default withRouter(connect(mapStateToProps, null)(Speech))
