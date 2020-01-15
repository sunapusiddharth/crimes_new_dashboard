import React, { useState, Fragment } from 'react'
import { Media, Badge, Modal, Button, ButtonToolbar } from 'react-bootstrap'
import { substrWords } from '../../../helpers/text_helper'
import {Link} from 'react-router-dom'



export default function VacancyCard(props) {
    const [showSummary, setShowSummary] = useState(false);
    // debugger
    let highlight = typeof props.data.highlight !== 'undefined' ? props.data.highlight : ''
    let { title, created, hiring_org_name, location_thoroughfare, location_locality, location_administrative_area, num_positions, qualifications, relocation_expenses, salary, travel,
        body, deadline, hiring_office, application_process, about_office } = props.data._source
    let date = new Date(created)
    let date_string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    let deadline_date = new Date(deadline)
    let deadline_date_string = `${deadline_date.getFullYear()}-${deadline_date.getMonth()}-${deadline_date.getDate()}`
    return (
        <Fragment>
            <Media as="li" className="vacancy_card">
                <Media.Body>
                    <p>
                        <span className="pull-left col">
                       <strong> <span className="title" dangerouslySetInnerHTML={{ __html: highlight && highlight.title ? highlight.title[0] : title }}></span></strong>
                        </span>
                        <span className="pull-right">
                        <Button size="sm" variant="warning" onClick={() => setShowSummary(true)}>summary</Button>
                        &nbsp;
                        <Link to={`/department/1234/vacancies/${props.data._id}`}><Button size="sm" variant="dark">details</Button></Link>
                        </span>
                    </p>
                   
                    <div className="row">
                        <span className="full_content" dangerouslySetInnerHTML={{ __html: highlight && highlight.body ? substrWords(highlight.body[0], 20) : substrWords(body, 20) }}></span>
                    </div>
                    <div className="row">
                            Deadline :&nbsp; <strong>{deadline_date_string}</strong>
                    </div>
                    <div className="row">
                    Posted on : &nbsp; <strong>{date_string}</strong>
                    </div>
                    <div className="row">
                        Positions:&nbsp; <strong>{num_positions ? num_positions : 'N/A'}</strong>
                    </div>
                    <div className="row">
                        Hiring Organisation Name :&nbsp; <strong>{hiring_org_name}</strong>
                    </div>
                    <div className="row">
                        Address :&nbsp;<strong>{location_thoroughfare},{location_locality},{location_administrative_area}</strong>
                    </div>
                </Media.Body>
            </Media>
            <Modal
                size="lg"
                show={showSummary}
                onHide={() => setShowSummary(false)}
                aria-labelledby={`search_all_crime_card-${props.data._id}`}
                className="search_all_modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title id={`search_all_crime_card-${props.data._id}`}>
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <span className="pull-left">
                            Posted on <Badge variant="dark">{date_string}</Badge>
                        </span>
                        <span className="pull-right">
                            Deadline  <Badge variant="dark">{deadline_date_string}</Badge>
                        </span>
                    </p>
                    <br />

                    <p>
                        <span className="full_content" dangerouslySetInnerHTML={{ __html: body }}></span>
                        Positions <Badge variant="dark">{num_positions ? num_positions : 'N/A'}</Badge>
                    </p>
                    <hr />
                    <p>Hiring Organisation Name  <Badge variant="dark">{hiring_org_name}</Badge></p>
                    <p> Address <Badge variant="dark">{location_thoroughfare},{location_locality},{location_administrative_area}</Badge></p>
                    <hr />
                    <p>
                        <h5><strong>Application Process</strong></h5>
                        <span className="application_process" dangerouslySetInnerHTML={{ __html: application_process }}></span>
                    </p>
                    <hr />
                    <p>
                        <h5><strong>Salary</strong></h5>
                        <span className="salary" dangerouslySetInnerHTML={{ __html: salary }}></span>
                    </p>
                    <hr />
                    <p>
                        <h5><strong>Qualifications</strong></h5>
                        <span className="qualifications" dangerouslySetInnerHTML={{ __html: qualifications }}></span>
                    </p>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}
