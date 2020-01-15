import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons'
import NewsTimeLine from './NewsTimeLine';

export default function Footer(props) {
    return (
        <div className="news_footer row">
            <div className="col">
                <h5>About</h5>
                <p>This page provides news aggregated over a period of time from newsApi.Different categories of new are present all related to crimes.Click on the tags to check news related to that category</p>
                <br/>
                <FontAwesomeIcon icon={faFacebook} />
            </div>
            <div className="col">
            <h5>Category</h5>
                <br/>
                <ul>
                    <li><FontAwesomeIcon icon={faArrowsAltH} />Category 1</li>
                    <li>Category 1</li>
                    <li>Category 1</li>
                    <li>Category 1</li>
                    <li>Category 1</li>
                    <li>Category 1</li>
                    <li>Category 1</li>
                    <li>Category 1</li>
                    <li>Category 1</li>
                    <li>Category 1</li>
                    <li>Category 1</li>
                </ul>
            </div>
            <div className="col">
                <NewsTimeLine/>
            </div>
            <div className="col"></div>
            
        </div>
    )
}
