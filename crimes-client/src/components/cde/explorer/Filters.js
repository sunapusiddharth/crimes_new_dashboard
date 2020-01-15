import React, { Component } from 'react'
import { connect } from 'react-redux'
import LocationFilter  from './LocationFilter';
import TimePeriodFilter from './TimePeriodFilter';
import {Link} from 'react-router-dom'
const crimeDataCollections = ["Crime","Expanded Property Crime Data","Arrest"]
const lawEnforcementollections = ['Police Employment']
export function Filters(props) {
        return (
            <div>
                <h3>Location</h3>
                <LocationFilter/>
                <h3>Time Perios</h3>
                {/* <TimePeriodFilter/> */}
                <h2>Data Collections</h2>
                <h5>Crime Data Collections</h5>
                <ul className="data_collection">
                    {crimeDataCollections.map((collection,index)=><li className="data_collection_item"><Link key={index}  to={`/cde/explorer/state/${collection.toLowerCase().split(" ").join("_")}`}>{collection}</Link></li>)}
                </ul>
                <h5>law Enforcement Collections</h5>
                <ul className="data_collection">
                    {lawEnforcementollections.map((collection,index)=><li className="data_collection_item"><Link key={index}  to={`/cde/explorer/state/${collection.toLowerCase().split(" ").join("_")}`}>{collection}</Link></li>)}
                </ul>
            </div>
        )
}