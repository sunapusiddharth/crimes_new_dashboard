import React, { Fragment, useState } from 'react'
import {Link} from 'react-router-dom'

export default function VacancyAnnouncements(props) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setDirection(e.direction);
    };
    
    
    if (props.data.length) {
        let posts = props.data 
        let department_id = props.data.department_id  
        return (
            <Fragment>
                <ul class="w3-ul w3-hoverable w3-white">
                    {posts.slice(0,5).map((post,index) => {
                        let {title,uuid,num_positions,changed,hiring_org,location} = post
                        var d = new Date(changed)
                        let dateString = `${d.getMonth()} ${d.getDay()},${d.getFullYear()}`
                        return (
                            <Link to={`/department/${department_id}/news/${uuid}`}>
                                <li class="w3-padding-16">
                                <span class="w3-medium">{title}</span>
                                <br/>
                                <span>{hiring_org.name}</span>
                                <br/>
                                <span>{location.thoroughfare},{location.locality},{location.country}</span>
                            </li>
                            <hr/>
                            </Link>
                        )})}
                        <p className="w3-button w3-black w3-center"><Link to={`/department/${department_id}/vacancies`} style={{color:"white"}}>Show More</Link></p>
                </ul>
            </Fragment>
        )

    } else {
        return <div className="no_results">No Results</div>
    }
}