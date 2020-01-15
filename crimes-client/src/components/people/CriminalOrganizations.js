import React, { Fragment } from 'react'
import faker from 'faker'
import RelativeNavigator from './RelativeNavigator'
import { Badge } from '@material-ui/core';
import {Media} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function CriminalOrganizations(props) {
    //family members (relatives) , friends : card navigator of people with some details like email , phone , address & relation
    let fake_ = faker.lorem.sentences(30)
    let data1 = [0, 1, 2, 3, 4]
    return (
        <Fragment>
            {data1.map(org => <Media>
                <img
                    width={64}
                    height={64}
                    className="criminal_org_image"
                    src="holder.js/64x64"
                    alt="Generic placeholder"
                />
                <Media.Body>
                    <h5>Organiation name</h5>
                    <p>
                        [From date] to [to date] . Was in some_some organizatio for [duration]Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque
                        ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at,
                        tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
                        fringilla. Donec lacinia congue felis in faucibus.
                    </p>
                    <Link to={`/organization/org_id`}><Badge>Show More</Badge></Link>
                </Media.Body>
            </Media>)}
        </Fragment>
    )
}

export default CriminalOrganizations