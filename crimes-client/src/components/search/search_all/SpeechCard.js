import React, {  Fragment } from 'react'
import { Media, Badge} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'


export default function SpeechCard(props) {
    let highlight = typeof props.data.highlight !== 'undefined' ? props.data.highlight : ''
    let {changed,body,country,locality,title} = props.data._source
    let date = new Date(changed)
    let date_string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    return (
        <Fragment>
            <Media as="li" className="speech_card">
                <Media.Body>
                <div className="row">
                        <span className="pull-left">
                        <h5><span className="title" dangerouslySetInnerHTML={{ __html: highlight && highlight.title ? highlight.title[0] : title }}></span></h5>
                        </span>
                        <span className="pull-right">
                           given on :<Badge variant="dark">{date_string}</Badge>
                        </span>
                        </div>
                        <p className="title" dangerouslySetInnerHTML={{ __html: highlight && highlight.title ? highlight.title[0] : title }}/>
                    <div className="row">
                        <span className="pull-right">
                            Location :<Badge variant="dark">{locality},{country}</Badge>
                        </span>
                        <Link to={`/department/1234/speeches/${props.data._id}`}><Button size="sm" variant="dark">details</Button></Link>
                        </div>
                </Media.Body>
            </Media>
           </Fragment>
    )
}
