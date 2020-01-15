import React from 'react'
import {Media,Badge} from 'react-bootstrap'
import {Link} from 'react-router-dom'


export default function JobVacanciesSearchCard(props) {
    let {result} = props
    let record = result && result._source
    let highlight = result && result.highlight
    return (
        <Media>
            <Media.Body>
               <h4>{record.title}</h4>
               <strong>{record.position}</strong> at {record.location_thoroughfare}, {record.location_locality},{record.location_administrative_area}
               Salary - {record.salary && record.salary}
               <small className="text-muted pull-left">{record.practice_area},{record.created}</small>
                                    <Badge variant="dark">
                                        {/* <Link to={`/department/${department_id}/posts/${result._id}`} className="pull_right">show more</Link> */}
                                    </Badge>
            </Media.Body>
        </Media>
    )
}
