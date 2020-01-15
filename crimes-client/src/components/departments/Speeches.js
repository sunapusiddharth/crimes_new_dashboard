import React, { Fragment, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import {strip} from '../../helpers/text_helper'
import {Link} from 'react-router-dom'

export default function Speeches(props) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setDirection(e.direction);
    };
    let posts = props.data
    let department_id = props.department_id
    if (posts.length) {
        return (
            <Fragment>
                <h4>Speeches  <p className="w3-button w3-black w3-right w3-small"><Link to={`/department/${department_id}/speeches`} style={{color:"white"}}>Show All</Link></p></h4>
                <Carousel activeIndex={index} direction={direction} onSelect={handleSelect}>
                    {posts.map(post => {
                        let { attachment, body, changed, image, component, teaser, title, uuid ,location} = post
                        var d = new Date(changed * 1000);
                        let dateString = `${d.getMonth()} ${d.getDay()},${d.getFullYear()}`
                        body = strip(body)
                        let summary = teaser && teaser.length ? teaser : body.slice(0, 400)
                        return (
                            <Carousel.Item key={uuid}>
                                <div className="w3-center">
                                    <h5>{component[0].name}</h5>
                                    <h6>{title}, <span className="w3-opacity">{dateString}</span></h6>
                                </div>

                                <div className="w3-justify">
                                    <img src="/assets/blog_image.jpg" alt="Girl Hat" style={{ width: "100%" }} className="w3-padding-16" />
                                    <p><strong>{location.locality},{location.administrative_area},{location.country}</strong></p>
                                    <p>{summary}</p>
                                    <p className="w3-center"><button className="w3-button w3-black" onClick="myFunction('demo1')" id="myBtn">View More</button></p>
                                </div>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </Fragment>
        )

    } else {
        return <div className="no_results">No Results</div>
    }
}