import React, { Fragment, useState } from 'react'
import { Carousel } from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function News(props) {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        setDirection(e.direction);
    };
    
    if (props.data && props.data.articles && props.data.articles.length) {
        let posts = props.data.articles 
        let department_id = props.department_id
        return (
            <Fragment>
                <h4>News</h4>
                <ul class="w3-ul w3-hoverable w3-white">
                    {posts.slice(0,5).map((post,index) => {
                        let { author, content, description, publishedAt, source, title, url ,urlToImage} = post
                        // var d = new Date(publishedAt)
                        // let dateString = `${d.getMonth()} ${d.getDay()},${d.getFullYear()}`
                        return (
                            <li class="w3-padding-16">
                                <img src={urlToImage} alt="Image" className="w3-left w3-margin-right" style={{width:"100px"}}/>
                                <span className="w3-medium">{title}</span>
                                <br/>
                                <span className="w3-small">{description}</span>
                            </li>
                        )})}
                        <p className="w3-button w3-black w3-center"><Link to={`/department/${department_id}/news`} style={{color:"white"}}>Show More</Link></p>
                </ul>
            </Fragment>
        )

    } else {
        console.log("from news=",props)
        return <div className="no_results">No Results</div>
    }
}