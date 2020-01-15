import React from 'react'
import {Link} from 'react-router-dom'
import {Card,Button} from 'react-bootstrap'

export default function DepartmentSearchResultCard(props) {
        let {_id} = props.result
        let {agency,city,state,domain_name,name,organization} = props.result._source
        let url = `/department/${_id}`
        return (
            <Card className="search_card">
                <div className="row">
                    <div className="col" style={{maxWidth:"100px"}}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    </div>
                    <div className="col">
                    <Card.Title>{name} - {domain_name}</Card.Title>
                    <Card.Text>
                        <div className="row">
                            <div className="col">City : {city}</div>
                            <div className="col">State: {state}</div>
                        </div>
                        <div className="row">
                            <div className="col">Agency : {agency}</div>
                            <div className="col">Organization: {organization}</div>
                        </div>
        </Card.Text>
                    <Link to={`/department/${_id}`} to={{ pathname: `/department/${_id}`, state: { from: props.location } }}>
                    View More
                    </Link>
                    </div>
                    </div>
            </Card>
        )   
    
}   
