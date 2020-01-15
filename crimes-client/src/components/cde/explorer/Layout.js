import React,{Component,useState} from 'react'
import { Filters } from './Filters';
import {default as CrimeMainPage} from './main_layout/MainPage';
import {default as ExpandedPropertyCrimeMainPage} from './PropertyCrime/MainPage';
import {default as ArrestsMainPage} from './Arrests/MainPage';
import {default as PEMainPage} from './PoliceEmployment/MainPage';

export default function Layout(props) {
    // const [data_collection, setDataCollection] = useState('');
    
    let {state,data_collection} = props.match.params
    console.log("inside here",data_collection)
    // debugger;
    return (
        <div className="row">
            <div className="col-lg-3 col-md-12">
            <Filters />
            </div>
            <div className="col-lg-9 col-md-12">
                {/* <ExpandedPropertyCrimeMainPage/> */}
                {data_collection == 'expanded_property_crime_data'?<ExpandedPropertyCrimeMainPage/>:data_collection == 'arrest'?<ArrestsMainPage/>:data_collection == 'police_employment'?<PEMainPage/>:<CrimeMainPage/>}
            </div>
            
        </div>
    )
}
