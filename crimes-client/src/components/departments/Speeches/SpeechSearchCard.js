import React from 'react'
import {Media} from 'react-bootstrap'
import { substrWords } from '../../../helpers/text_helper';

export default function SpeechSearchCard(props) {
    let {result} = props
    let record = result && result._source
    let highlight = result && result.highlight
    let trimmed_body = highlight && highlight.body ? substrWords(highlight.body[0],50):  record && record.body && substrWords(record.body,50)
    return (
        <Media>
            <Media.Body>
                <h5>{highlight && highlight.title?highlight.title: record && record.title}</h5>
                <p dangerouslySetInnerHTML={{ __html:trimmed_body}}></p>
            </Media.Body>
        </Media>
    )
}
