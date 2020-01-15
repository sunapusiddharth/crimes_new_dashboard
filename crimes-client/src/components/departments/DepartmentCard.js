import React from 'react'
import {Card,Button} from 'react-bootstrap'

export default function DepartmentCard() {
    return (
        <Card >
            <div className="row">

            
                <div className="col" style={{maxWidth:"100px"}}>
                <Card.Img variant="top" src="holder.js/100px180" />
                </div>
                <div className="col">
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
    </Card.Text>
                <Button variant="primary">Go somewhere</Button>
                </div>
                </div>
        </Card>
    )
}
