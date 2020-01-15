import React, { Fragment, useState } from 'react'
import '../../styles/search_all.css'
import { Media, Badge, Modal, Button, ButtonToolbar } from 'react-bootstrap'
import { substrWords } from '../../helpers/text_helper'
import { Link } from '@material-ui/core';

export default function SearchResultFormCard(props) {
  const [lgShow, setLgShow] = useState(false)
  let { form_url, attachment, department_id, department_name, department_organization, department_description} = props.result._source
  let highlight = typeof props.result.highlight !== 'undefined' ? props.result.highlight : ''
  return (
    <Fragment>
      <Media className="form_card_wrapper" as="li">
        <Media.Body>
          <h5><b>{attachment.title ? attachment.title : 'Form Name'}</b>-{department_name}<Button size="sm" className="more_button_search_result_card" variant="dark" onClick={() => setLgShow(true)} variant="dark">more</Button></h5>
          {highlight ? <p className="summary" dangerouslySetInnerHTML={{ __html: highlight["attachment.content"] }}></p> : <p className="summary">{substrWords(attachment.content, 30)}</p>}
          {attachment.author && <p className="small">{attachment.author}</p>}
          <Badge variant="dark">{department_organization}</Badge>
        </Media.Body>
      </Media>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby={`department-modal-${department_id}`}
      >
        <Modal.Header closeButton>
          <Modal.Title id={`department-modal-${department_id}`}>
            {department_name ? department_name : 'MOdal title'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Badge variant="dark">Department: {department_organization}</Badge>
          <p>{substrWords(department_description,100)}</p>
          </Modal.Body>
      </Modal>
    </Fragment>
  )
}