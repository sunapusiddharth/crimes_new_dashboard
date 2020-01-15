import React, { useState, Fragment } from 'react'
import { Media, Badge, Modal,Button,ButtonToolbar } from 'react-bootstrap'
import faker from 'faker'
import {Link} from 'react-router-dom'



export default function CrimeCard(props) {
    const [showSummary, setShowSummary] = useState(false);
    // debugger
    let highlight = typeof props.data.highlight !== 'undefined' ? props.data.highlight : ''
    let inner_hits = typeof props.data.inner_hits !== 'undefined' ? props.data.inner_hits : ''
    let { title, description, occurence_on_date, category, address, city, state, imageUrl } = props.data._source
    let date = new Date(occurence_on_date)
    let date_string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    return (
        <Fragment>
            <Media as="li" className="crimes_card">
                <img
                    width={64}
                    height={64}
                    className="mr-3"
                    // src={imageUrl}
                    src="/assets/b.jpg"
                    alt={title}
                />
                <Media.Body>
                <p >
                    <h5 className="pull-left">
                        <span className="title" dangerouslySetInnerHTML={{ __html: highlight && highlight.title ? highlight.title[0] : title }}></span>
                    </h5>
                    <span className="pull-right">
                    <Button size="sm" variant="warning"  onClick={() => setShowSummary(true)}>summary</Button>
                            <Link to={`/crimes/single/${props.data._id}`}><Button size="sm" variant="dark">details</Button></Link>
                    </span>
                    </p>
                    <p>
                        <span className="pull-left">
                            {address},{city},{state}
                        </span>
                        <span className="pull-right">
                            {date_string}
                        </span>
                    </p>
                    <p>
                        <span className="pull-left">
                            {description}
                        </span>
                        <span className="pull-right">
                            <Badge variant="dark">{category}</Badge>
                        </span>
                    </p>
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
                        <Badge variant="dark">{address},{city},{state}</Badge>
                        </span>
                        <span className="pull-right">
                        <Badge variant="dark">{date_string}</Badge>
                        </span>
                    </p>
                    <p>
                        <span className="pull-left">
                            {description}{faker.lorem.sentences(100)}
                        </span>
                        <span className="pull-right">
                            <Badge variant="dark">{category}</Badge>
                        </span>
                    </p>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}
