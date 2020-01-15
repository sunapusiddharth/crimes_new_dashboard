import React, { Component } from 'react'
import { Card, Accordion, CardColumns, Media, Button } from 'react-bootstrap'
import RootCloseWrapperCrimeCard from './RootWrapperCrimeCard'

export default class SearchResultCrimeCard extends Component {

    constructor(){
        super()
        this.state={
            show:false
        }
    }

    onShowMore = () => {
        console.log("hi here ")
        this.setState({show:true})
    }
    onShowLess = () =>{
        console.log("hi here else")
        this.setState({show:false})
    }

    render() {
          let highlight = typeof this.props.result.highlight !=='undefined'? this.props.result.highlight:''
          let inner_hits = typeof this.props.result.inner_hits !=='undefined'? this.props.result.inner_hits:''
        let { incident_number, offense_code, offense_code_group, offense_description } = this.props.result._source
        return (
            <Media className="crime_card">
                <Media.Body>
                    <h7>{offense_description.substr(0, 30)}...</h7>
                    <div className="row">
                        <div className="col">Incident number: {incident_number}</div>
                        <div className="col">Offesnse Code: {offense_code}</div>
                        <div className="col">Offesnse Code Group: {offense_code_group}</div>
                    </div>
                    <p className="card_desc">{offense_description.substr(0, 200)}</p>
                    <div className="row">
                        <div className="col">
                        {this.state.show? <Button  onClick={this.onShowLess}>
                                <Card.Link href="#">show less</Card.Link>
                            </Button>:<Button  onClick={this.onShowMore}>
                                <Card.Link href="#">show more</Card.Link>
                            </Button>}   
                        </div>
                        <div className="col">
                           
                        </div>
                        {this.state.show && <RootCloseWrapperCrimeCard crime_id={this.props.id} />}
                    </div>
                </Media.Body>
            </Media>
        )
    }
}


 