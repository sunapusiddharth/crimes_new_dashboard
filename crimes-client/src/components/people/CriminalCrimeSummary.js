import React, { Fragment } from 'react'
import faker from 'faker'
import { Jumbotron } from 'react-bootstrap';

function CriminalCrimeSummary(props) {
    // let bgImg = this.props.crime.imageUrl ? this.props.crime.imageUrl : '/assets/crime_bg2.jpg'
    let divStyle = {
        color: 'blue',
        backgroundImage: `url("/assets/crime_news_background.jpg")`,
    }
    let fake_ = faker.lorem.sentences(30)
    return (
        <Fragment>
            <Jumbotron style={divStyle} fluid></Jumbotron>
            <hr />
            <h4>Crime Title Goes here  {props.data} </h4>
            <div className="row">
                <div className="col pull-left">
                    <p>Date gores here</p>
                </div>
                <div className="col pull-right">
                    <p>Address goes here </p>
                </div>
            </div>
            <p>{faker.lorem.sentences(30)}</p>
            <h5>Images</h5>
            expansion layout here using bootstrap or material ui .
            <h5>Summary Report</h5>
            <p>Files will be listed here for download</p>
        </Fragment>
    )
}

export default CriminalCrimeSummary