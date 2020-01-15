import React from 'react'
import {Card,ListGroup,ListGroupItem} from 'react-bootstrap'

export default function PersonCard(props) {
        let data = props.person
    return (
        <Card>
        <Card.Img variant="top" src="https://crimeportal.s3-ap-southeast-1.amazonaws.com/Capture1.PNG" />
        <Card.Body>
            <Card.Title>{data.name[0]}</Card.Title>
            <Card.Text>
               Lives in {data.address[0]} , {data.country[0]}
</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
            <ListGroupItem>Phone: {data.phone[0]}</ListGroupItem>
            <ListGroupItem>Email: {data.email[0]}</ListGroupItem>
            <ListGroupItem></ListGroupItem>
        </ListGroup>
        <Card.Body>
            <Card.Link >View User Details</Card.Link>
        </Card.Body>
    </Card>)
}
