import React, { Fragment } from 'react'
import faker from 'faker'
import { Card } from 'react-bootstrap'

function CriminalBio (){
    let fake_ = faker.lorem.sentences(130)
    return(
        <Fragment>
            <Card className="crime_bio_card">
                <Card.Title>Summary/Bio</Card.Title>
                <Card.Body>{fake_}</Card.Body>
            </Card>
        </Fragment>
    )
}

export default CriminalBio