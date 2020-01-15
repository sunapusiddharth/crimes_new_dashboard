import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap'

export default function InvestigationCard(props) {
    let data = props.incident
    return (
        <Card>
            
                <Card.Title>{data.title}</Card.Title>
                <div className="row">
                    <div className="col">Status: {data.status}</div>
                    <div className="col">Date: {data.date}</div>
                </div>
                <Card.Text>
                    <h6>Summary</h6>
                    {data.summary}
                </Card.Text>
            
            <Card.Link >View More</Card.Link>
        </Card>)
}


