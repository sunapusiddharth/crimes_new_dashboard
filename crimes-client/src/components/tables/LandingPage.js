import React, { Fragment,useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'
import DenverCrimesTable from './DenverCrimesTable';
import BostonCrimesTable from './BostonCrimesTable';
import VancouverCrimesTable from './VancouverCrimesTable';
import "../../styles/all_table.css";
import { Badge } from '@material-ui/core';

export default function LandingPage() {
    const [openBostonTable, setOpenBostonTable] = useState(false);
    const [openDenverTable, setOpenDenverTable] = useState(false);
    const [openVancouverTable, setOpenVancouverTable] = useState(false);

    return (
        <Fragment>
        <div className="container h-100" >
        <h2 className="row h-100 justify-content-center align-items-center">Boston Crimes </h2> 
        <p >(Uses mongodb aggregation for 3 Million+ records) Click to see table <span className="show_less" onClick={() => setOpenBostonTable(!openBostonTable)}><i class="fa fa-caret-down" aria-hidden="true" aria-expanded="boston_crime_table"></i></span> </p>
        
       
        <hr/>
        <Collapse in={openBostonTable}>
            <div id="boston_crime_table" style={{overflowX:"scroll"}}>
            <BostonCrimesTable/>
            </div>
        </Collapse>
        </div>
        <br/>
        <br/>
        {/* Denver crimes Table */}
        <div className="container h-100" >
        <h2 className="row h-100 justify-content-center align-items-center">Denver Crimes</h2> 
             <p >(Uses mongodb aggregation for 3 Million+ records) Click to see table <span className="show_less" onClick={() => setOpenDenverTable(!openDenverTable)}><i class="fa fa-caret-down" aria-hidden="true" aria-expanded="denver_crime_table"></i></span> </p>
        
       
        <hr/>
        <Collapse in={openDenverTable}>
           <div id="denver_crime_table" style={{overflowX:"scroll"}}>
           <DenverCrimesTable/>
           </div>
           
        </Collapse>
        </div>

         {/* Vancouver crimes Table */}
         <div className="container h-100" >
        <h2 className="row h-100 justify-content-center align-items-center">Vancouver Crimes </h2> 
         <p >(Uses mongodb aggregation for 3 Million+ records) Click to see table <Badge variant="dark">Coming Soon</Badge>  <span className="show_less" onClick={() => setOpenVancouverTable(!openVancouverTable)}><i class="fa fa-caret-down" aria-hidden="true" aria-expanded="denver_crime_table"></i></span> </p>
       
       
        <hr/>
        <Collapse in={openVancouverTable}>
           <div id="vancouver_crime_table" style={{overflowX:"scroll"}}>
           {/* <VancouverCrimesTable/> */}
           </div>
           
        </Collapse>
        </div>


        </Fragment>
    );
}