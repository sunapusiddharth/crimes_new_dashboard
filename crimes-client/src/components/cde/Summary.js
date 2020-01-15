import React, { Fragment,useState } from 'react'
import { Button, Collapse } from 'react-bootstrap'

export default function Summaary() {
    const [open, setOpen] = useState(true);

    return (
        <Fragment>

       
        <div className="row">
            <h2 className="text-center">Improving access to crime data</h2> 
        <span className="show_less" onClick={() => setOpen(!open)}><i class="fa fa-caret-down" aria-hidden="true"></i></span> 
        </div>
<hr/>
        <Collapse in={open}>
            <div id="example-collapse-text">
                The Crime Data Explorer (CDE) represents a profound transformation in how data from the FBI’s Uniform Crime Reporting (UCR) Program is presented.
      
      Crime data is dynamic. Offenses occur, arrests are made, and property is recovered every day. The CDE is an attempt to somewhat reflect that fluidity in crime. The data presented here will be updated regularly in a way that UCR publications previously could not.
      
      As the data is dynamic, so is this gateway to the data. The CDE’s content and features are updated and expanded continually. So, look for a time stamp that reflects the refresh date of content or statistics. This is especially important to reconcile any differences that may exist between the data that is available on the CDE pages and the data that resides in the datasets for downloading.
      
      The Uniform Crime Reporting (UCR) Program provided updated data for 2017 on September 24, 2018.
          </div>
        </Collapse>
        </Fragment>
    );
}