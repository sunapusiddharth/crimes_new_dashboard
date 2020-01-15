import React, { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { connect } from 'react-redux';
import {changeEndYearMain,changeStartYearMain} from '../../../actions/cdeActions'

const years = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010]
function StartYear(props) {
    const [startYear, setStartYear] = useState(props.start_year);
    return (

        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {startYear}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {years.map(year => <Dropdown.Item href="#/action-1" onSelect={() => {
                    setStartYear(year)
                    props.dispatch(changeStartYearMain(year))
                    }}>{year}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    )
}

function EndYear(props) {
    const [endYear, setEndYear] = useState(props.end_year);
    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {endYear}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {years.slice(1,years.length).map(year => <Dropdown.Item href="#/action-1" onSelect={() => {
                    setEndYear(year)
                    props.dispatch(changeEndYearMain(year))
                }}>{year}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    )
}


function TimePeriodFilter(props) {
    return (
        <div className="row">
            <div className="col">
                <StartYear start_year={props.start_year_main} dispatch={props.dispatch}/>
            </div>
            <div className="col">
                <EndYear end_year={props.end_year_main} dispatch={props.dispatch}/>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    start_year_main:state.cdeReducer.start_year_main,
    end_year_main:state.cdeReducer.end_year_main,
})


export default connect(mapStateToProps,null)(TimePeriodFilter)
