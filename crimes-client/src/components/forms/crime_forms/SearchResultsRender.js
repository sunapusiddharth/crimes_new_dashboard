import React, { Component, Fragment, createRef, useState,useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, FormControl, Media, Button, Navbar, Badge, Collapse } from 'react-bootstrap'
import { saveCrimePople } from '../../../actions/formActions';

// for chips materialize UI :
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    chip: {
        margin: theme.spacing(1),
    },
}));


const SearchResultsRender = (props) => {
    
    const [showResults,setShowResults] = useState(props.show_results)
    const classes = useStyles();
    function handleDelete() {
        alert('You clicked the delete icon.');
        debugger;
    }

    function handleClick(person) {
        let personType = props.person_type
        // debugger
        props.dispatch(saveCrimePople({[personType]:person}))
        // debugger;
    }
    useEffect(() => {
        console.log("hi_1234")
          setShowResults(props.show_results)
      });

     function myCustom(){
        debugger;
      }

      function myFocus(){
        debugger;
      }

    console.log("hi_here3",showResults)
    console.log("hi_here4",props)
    const people = props.person_type == 'victim'? props.victim : props.person_type == 'accussed'? props.accussed:
    props.person_type == 'suspect'?props.suspects : props.person_type == 'judge'?props.judge:props.law
    if (showResults) {
        return (
            props.data && props.data.length &&
            <Fragment>
                <div onBlur={myCustom}>

                
                <ul className="autocomplete_people_search_results" >
                    {props.data.map(data => {
                        let record = data && data._source
                        return <li className="row" onClick={()=>handleClick(data)}>
                            <img
                            // src={record.avatar}
                            /> <span className="person_name">{record.name}</span>
                        </li>
                    }
                    )}
                    {props.data.length >= 50 && <li className="show_more" onClick={props.searchMore}>Show More</li>}
                </ul>
                </div>
                <div className="row">
                {people && people.length && people.map(person=><Chip
                    avatar={<Avatar alt="Natacha" 
                    // src={person.avatar}
                     />}
                    label={person._source.name}
                    onDelete={handleDelete}
                    className={classes.chip}
                />)}
                </div>
            </Fragment>
        )   
    } else {
        return <div></div>
    }
   
}

const mapStateToProps = (state) => ({
    victim: state.formReducer.victim,
    accussed: state.formReducer.accussed,
    suspect: state.formReducer.suspect,
    law: state.formReducer.law,
    judge: state.formReducer.judge
})

export default connect(mapStateToProps,null)(SearchResultsRender)