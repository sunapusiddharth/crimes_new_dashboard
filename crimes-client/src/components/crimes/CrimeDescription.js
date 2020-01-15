import React, { Component, Fragment, createRef } from 'react'
import { connect } from 'react-redux'
import { Badge } from 'react-bootstrap'
// import '../../styles/news.css'
import { fetchCrime } from '../../actions/crimeActions';
import PageLoader from '../../common/PageLoader';
import Fade from 'react-reveal/Fade';
import { withRouter } from 'react-router-dom';
import faker from 'faker'
import CrimeTimeline from './CrimeTimeline';
import NearbyCommitedCrimes from './NearbyCommitedCrimes';


// Layout for incident data :
// create a tab system : media , people , graphs , timeline , 
class CrimeDescription extends Component {


    componentDidUpdate(prevProps) {
        let news_id = this.props.match.params.id
        if (prevProps.match.params.id != this.props.match.params.id) {
            console.log("called from CDU !!!!!")
            this.props.dispatch(fetchCrime(news_id))
        }
    }



    render() {
        if (this.props.crime_loading || this.props.crime_loading) {
            return <PageLoader loading={this.props.crime_loading && this.props.crimes_aggregated_loading} />
        } else {

            let { crime } = this.props
            return (
                <Fragment>
                    <div className="row" style={{marginLeft:"8px",marginRight:"8px"}}>
                        <div className=" ind_crime_description">
                        <h5>{crime.title}</h5>
                        <hr />
                        <p><b>Reported on</b>:{crime.occurence_on_date} at {crime.address}<Badge type="dark">{crime.category}</Badge></p>
                        <Fade effect="fadeInUp">
                            <p>{crime.description}</p>
                            <p>{faker.lorem.sentences(100)}</p>
                        </Fade>
                        </div>
                        <hr/>
                            <h3 style={{marginLeft:"16px"}}>Nearby Crimes</h3>
                            <p>This section provides crimes that were commited nearby.Uses elasticsearch geo-queries to find crimes by location.These have been categorised by 100 , 100-300 and farther than 300 km range.</p>
                            <hr/>
                            {/* <NearbyCommitedCrimes crime={crime}/> */}
                    </div>
                </Fragment>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    crime: state.crimeReducer.crime,
    crime_loading: state.crimeReducer.crime_loading,
    nearby_crimes_loading:state.crimeReducer.nearby_crimes_loading,
    nearby_crimes:state.crimeReducer.nearby_crimes,
    nearby_crimes_total:state.crimeReducer.nearby_crimes_total,
})

export default withRouter(connect(mapStateToProps, null)(CrimeDescription))
