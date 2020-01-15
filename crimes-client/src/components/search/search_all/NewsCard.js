import React, { useState, Fragment } from 'react'
import { Media, Badge, Modal, Button, ButtonToolbar, Card } from 'react-bootstrap'
import { substrWords } from '../../../helpers/text_helper'
import {Link} from 'react-router-dom'



export default function NewsCard(props) {
    const [showSummary, setShowSummary] = useState(false);
    // debugger
    let highlight = typeof props.data.highlight !== 'undefined' ? props.data.highlight : ''
    let { title, publishedAt, description, tags, hits, full_content, urlToImage } = props.data._source
    let date = new Date(publishedAt)
    let date_string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    return (
        <Fragment>
            <Card className="news_Card">
                <Card.Img variant="top"
                    src="/assets/b.jpg"
                    alt={title}
                />
                <Card.Body>
                    <Card.Title>
                        <span className="title" dangerouslySetInnerHTML={{ __html: highlight && highlight.title ? highlight.title[0] : title }}/>
                        </Card.Title>
                    <Card.Text>
                    <p className="row">
                    <span className="pull-left col">
                    <Badge variant="success">{date_string}</Badge> 
                    </span>
                    <span className="pull-right">
                    <Button size="sm" variant="warning" onClick={() => setShowSummary(true)}>summary</Button>
                    </span>
                    </p>
                    <p className="row">
                    <span className="full_content" dangerouslySetInnerHTML={{ __html: highlight && highlight.full_content ? substrWords(highlight.full_content[0], 20) : substrWords(full_content, 20) }}></span>
                    </p>
                        <p className="row">
                            <span className="pull-left col">
                            <Badge variant="dark">{tags}</Badge>  <Badge variant="info">Hits  - {hits}</Badge>
                            </span>
                            <span className="pull-right">
                                <Link to={`/news/single/${props.data._id}`}><Button size="sm" variant="success">details</Button></Link>
                            </span>
                        </p>
                    </Card.Text>
                </Card.Body>
            </Card>
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
                        <span className="pull-right">
                            {date_string}
                        </span>
                    </p>
                    <p>
                        <span className="pull-left">
                            {full_content}
                        </span>
                        <span className="pull-right">
                            <Badge variant="dark">{tags}</Badge> <Badge variant="info">{hits}</Badge>
                        </span>
                    </p>
                </Modal.Body>
            </Modal>
        </Fragment >
    )
}
