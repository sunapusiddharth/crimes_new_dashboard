import React, { Component, Fragment, createRef } from 'react'
import { connect } from 'react-redux'
import { Tabs,Tab, Jumbotron, Container, Badge } from 'react-bootstrap'
import '../../styles/crime_individual.css'
import { fetchCrime } from '../../actions/crimeActions';
import PageLoader from '../../common/PageLoader';
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade';
import { withRouter } from 'react-router-dom';
import CrimeDescription from './CrimeDescription';
import CrimeMedia from './CrimeMedia';
import CrimeTimeline  from './CrimeTimeline';
import CrimePeopleLayout from './CrimePeopleLayout';


// Layout for incident data :
// create a tab system : media , people , graphs , timeline , 
class IndividualCrimesLayout extends Component {
    constructor() {
        super()
        this.state = {
            key: 'summary'
        }
    }

    componentDidMount() {
        console.log("CDM", this.props)
        let crime_id = this.props.match.params.id
        // debugger
        this.props.dispatch(fetchCrime(crime_id))
    }

    componentDidUpdate(prevProps) {
        let news_id = this.props.match.params.id
        if (prevProps.match.params.id != this.props.match.params.id) {
            this.props.dispatch(fetchCrime(news_id))
        }
    }

    changeVariable = (key) => {
        this.setState({ key })
    }

    render() {
        console.log("render called again")
        if (this.props.crime_loading || this.props.crime_loading) {
            return <PageLoader loading={this.props.crime_loading && this.props.crimes_aggregated_loading} />
        } else {
            if(!Object.keys(this.props.crime).length) return <div className="">No Data</div>
            let bgImg = this.props.crime.imageUrl ? this.props.crime.imageUrl : '/assets/crime_bg2.jpg'
            let divStyle = {
                color: 'blue',
                // backgroundImage: 'url(' + this.props.crime.urlToImage?this.props.crime.urlToImage:'/assets/crime_news_background.jpg' + ')',
                backgroundImage: `url(${bgImg})`,
            }
            let { crime } = this.props
            return (
                <Fragment>
                    <Jumbotron style={divStyle} fluid>
                        <Container>
                            <h1></h1>
                            {/* <p>Posted on : {new Date(this.props.crime.publishedAt).getDate()+'-'+new Date(this.props.crime.publishedAt).getMonth()+'-'+new Date(this.props.crime.publishedAt).getFullYear()}</p> */}
                        </Container>
                    </Jumbotron>
                    <Tabs className="single_crime_tabs" id="controlled-tab-crimes" activeKey={this.state.key} onSelect={k => this.changeVariable(k)}>
                        <Tab eventKey="summary" title="Crime Description" >
                            {this.state.key == 'summary' && <CrimeDescription variable_key={"summary"} />}
                        </Tab>
                        <Tab eventKey="media" title="Media">
                            {this.state.key == 'media' && <CrimeMedia variable_key={"media"} />}
                        </Tab>
                        <Tab eventKey="people" title="People" >
                            {this.state.key == 'people' && <CrimePeopleLayout variable_key={"people"} />}
                        </Tab>
                        <Tab eventKey="timeline" title="timeline" >
                            {this.state.key == 'timeline' && <CrimeTimeline variable_key={"timeline"} />}
                        </Tab>
                    </Tabs>
                </Fragment>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    crime: state.crimeReducer.crime,
    crime_loading: state.crimeReducer.crime_loading
})

export default withRouter(connect(mapStateToProps, null)(IndividualCrimesLayout))
