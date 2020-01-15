import React, { Fragment } from 'react'
import faker from 'faker'
import RelativeNavigator from './RelativeNavigator'

function CriminalRelatives(props) {
    //family members (relatives) , friends : card navigator of people with some details like email , phone , address & relation
    let fake_ = faker.lorem.sentences(30)
    let data1 = [0,1,2,3,4]
    let data2 = [0,1,2,3,4]
    return (
        <Fragment>
            <RelativeNavigator data={data1} title="Relatives"/>
            <RelativeNavigator data={data2} title="Friends"/>
        </Fragment>
    )
}

export default CriminalRelatives