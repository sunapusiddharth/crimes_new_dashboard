import React from 'react'
import { Button, ButtonToolbar,OverlayTrigger,Tooltip } from 'react-bootstrap'

export default function Tags(props) {
    return (
        <div className="news_tags">
            <h3 className="pull-left">{props.title ? props.title : 'Tags'}</h3>
            <hr />
            <br />
            <hr />
            <br />
            <ButtonToolbar>
                {props.data && props.data.map((tag, index) => (
                    <OverlayTrigger
                        key={index}
                        placement="auto"
                        overlay={
                            <Tooltip id={`tooltip-${tag._id}`}>
                                Hits - <strong>{tag.count}</strong>.
                            </Tooltip>
                        }
                    >
                    <Button variant="secondary">{tag._id}</Button>
                    </OverlayTrigger>
                ))}
            </ButtonToolbar>
        </div>
    )
}
