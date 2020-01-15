import React, { useState, Fragment } from 'react'
import { Media, Badge, Modal,Button,ButtonToolbar } from 'react-bootstrap'
import {substrWords} from  '../../../helpers/text_helper'
import {Link} from 'react-router-dom'



export default function PostCard(props) {
    const [showSummary, setShowSummary] = useState(false);
    let highlight = typeof props.data.highlight !== 'undefined' ? props.data.highlight : ''
    let inner_hits = typeof props.data.inner_hits !== 'undefined' ? props.data.inner_hits : ''
    let {title,body,image,changed } = props.data._source
    let date = new Date(changed)
    let date_string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    return (
        <Fragment>
            <Media as="li" className="post_card">
                <img
                    width={64}
                    height={64}
                    className="mr-3"
                    // src={image}
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
                            <Link to={`/department/1234/posts/${props.data._id}`}><Button size="sm" variant="dark">details</Button></Link>
                    </span>
                    </p>
                    <p>
                        <span className="pull-right">
                            {date_string}
                        </span>
                    </p>
                    <p>
                        <span className="pull-left" >
                        <span className="post_body" dangerouslySetInnerHTML={{ __html: highlight && highlight.body ? substrWords(highlight.body[0],20): substrWords(body,20) }}></span>
                        </span>
                    </p>
                </Media.Body>
            </Media>
            <Modal
                size="lg"
                show={showSummary}
                onHide={() => setShowSummary(false)}
                aria-labelledby={`search_all_post_card-${props.data._id}`}
                className="search_all_modal"
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id={`search_all_post_card-${props.data._id}`}>
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
                            <span className="post_body" dangerouslySetInnerHTML={{ __html:body}}></span>
                        </span>
                    </p>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}
