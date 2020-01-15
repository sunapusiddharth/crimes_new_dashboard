import React, { Component, useState, useEffect, Fragment } from 'react'
import '../../styles/facets.css'
import { fetchCrimeSearch, saveFacetFilters ,clearFacetFilters} from '../../actions/crimeActions';
import { connect } from 'react-redux'
import PageLoader from '../../common/PageLoader';

// Material ui 
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListSubheader from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import MomentUtils from '@date-io/moment';
// import ClearIcon from '@material-ui/icons/Clear';
// import SearchIcon from '@material-ui/icons/Search';
// import DatePicker from "material-ui-pickers/DatePicker";
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
  } from "@material-ui/pickers";
import { Button } from 'react-bootstrap';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        maxHeight: 300,
        backgroundColor: theme.palette.background.paper,
        overflow: "auto"
    },
    slider_root: {
        height: 300,
    }
}));

function CrimeSearchFacets(props) {
    const classes = useStyles();
    const [checkedState, setCheckedState] = React.useState([]);
    const [checkedCity, setCheckedCity] = React.useState([]);
    const [checkedCategory, setCheckedCategory] = React.useState([]);
    const [selectedStartDate, handleStartDateChange] = useState(new Date());
    const [selectedEndDate, handleEndDateChange] = useState(new Date());

    // CDM 
    // useEffect(() => {
    //     props.dispatch(fetchCrimeSearch("murder", 0, 10, true))
    // }, [])

    const handleStateToggle = value => () => {
        const currentIndex = checkedState.indexOf(value);
        const newChecked = [...checkedState];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedState(newChecked);
        props.dispatch(saveFacetFilters({ "selected_state": newChecked }))
    };

    const handleCityToggle = value => () => {
        const currentIndex = checkedCity.indexOf(value);
        const newChecked = [...checkedCity];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedCity(newChecked);
        props.dispatch(saveFacetFilters({ "city": newChecked }))
    };

    const handleCategoryToggle = value => () => {
        const currentIndex = checkedCategory.indexOf(value);
        const newChecked = [...checkedCategory];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedCategory(newChecked);
        props.dispatch(saveFacetFilters({ "category": newChecked }))
    };

    const sethandleStartDateChange = (date)=>{
        props.dispatch(saveFacetFilters({ "start_date": date.format('YYYY-MM-DD')}))
        handleStartDateChange(date)
    }
    const sethandleEndDateChange = (date)=>{
        props.dispatch(saveFacetFilters({ "end_date": date.format('YYYY-MM-DD')}))
        handleEndDateChange(date)
    }


    const applyFiltersAndSearch = ()=>{
        props.dispatch(fetchCrimeSearch(null, 0, 10, true))
    }

    const clearFilters = (props)=>{
        //simly fire a query with the searched term so that with new data page reloads
        setCheckedState([])
        setCheckedCity([])
        setCheckedCategory([])
        handleStartDateChange(new Date())
        handleEndDateChange(new Date())
        props.dispatch(clearFacetFilters())
        props.dispatch(fetchCrimeSearch(props.query_word, 0, 10, true))
    }
   
    if (props.crime_search_results_loading) {
        return <PageLoader loading={props.crime_search_results_loading} />
    } else {
        var crime_facets = props.crime_search_facets
        var category_facets = []

        crime_facets.category && crime_facets.category.buckets && crime_facets.category.buckets.length && crime_facets.category.buckets.map(item => {
            category_facets.push({
                "label": item.key,
                "count": item.doc_count
            })
        })

        var city_facets = []

        crime_facets.city && crime_facets.city.buckets && crime_facets.city.buckets.length && crime_facets.city.buckets.map(item => {
            city_facets.push({
                "label": item.key,
                "count": item.doc_count
            })
        })

        var state_facets = []

        crime_facets.state && crime_facets.state.buckets && crime_facets.state.buckets.length && crime_facets.state.buckets.map(item => {
            state_facets.push({
                "label": item.key,
                "count": item.doc_count
            })
        })

        var month_facets = []
        var month_names = ['Jannuary', 'February', 'March', 'April', 'May', 'June', 'July', 'Augugust', 'September',
            'October', 'November', 'December']

        crime_facets.month && crime_facets.month.buckets && crime_facets.month.buckets.length && crime_facets.month.buckets.map(item => {
            let label = `${month_names[item.key]} (${item.doc_count})`
            month_facets.push({
                "label": label,
                "count": item.doc_count,
                "value": (item.key * 20)
            })
        })

        var year_facets = []

        crime_facets.year && crime_facets.year.buckets && crime_facets.year.buckets.length && crime_facets.year.buckets.map(item => {
            year_facets.push({
                "label": item.key.toString(),
                "count": item.doc_count
            })
        })
        return (
            <Fragment>
                <div className="row">
                    <div className="col">
                        <Button onClick={applyFiltersAndSearch}>Search</Button>
                    </div>
                    <div className="col">
                    <Button onClick={()=>clearFilters(props)}>Clear</Button>
                    </div>
                </div>
                <List className={classes.root}>
                    <ListSubheader>State</ListSubheader>
                    {state_facets.map((value, index) => {
                        const labelId = `checkbox-list-label-state-${index}`;

                        return (
                            <ListItem key={index} role={undefined} dense button onClick={handleStateToggle(value.label)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checkedState.indexOf(value.label) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`${value.label} (${value.count})`} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="comments">

                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
                <List className={classes.root}>
                    <ListSubheader>City</ListSubheader>
                    {city_facets.map((value, index) => {
                        const labelId = `checkbox-list-label-state-${index}`;

                        return (
                            <ListItem key={index} role={undefined} dense button onClick={handleCityToggle(value.label)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checkedCity.indexOf(value.label) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`${value.label} (${value.count})`} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="comments">

                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
                <List className={classes.root}>
                    <ListSubheader>Category</ListSubheader>
                    {category_facets.map((value, index) => {
                        const labelId = `checkbox-list-label-state-${index}`;

                        return (
                            <ListItem key={index} role={undefined} dense button onClick={handleCategoryToggle(value.label)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checkedCategory.indexOf(value.label) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`${value.label} (${value.count})`} />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="comments">

                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
                <br />
                {/* <div className={classes.slider_root}>
                    <h4>Year</h4>
                    <Slider
                        orientation="vertical"
                        // defaultValue={}
                        aria-labelledby="vertical-slider"
                        getAriaValueText={valuetext}
                        marks={month_facets}
                    />
                </div> */}
                <div className="picker">
                    <p>Start date</p>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker value={selectedStartDate} onChange={sethandleStartDateChange} />
                    </MuiPickersUtilsProvider>
                </div>
                <br/>
                <div className="picker">
                    <p>End date</p>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker value={selectedEndDate} onChange={sethandleEndDateChange} />
                    </MuiPickersUtilsProvider>
                </div>

            </Fragment>
        );
    }

}





const mapStateToProps = (state) => ({
    crime_search_facets: state.crimeReducer.crime_search_facets,
    crime_search_results_loading: state.crimeReducer.crime_search_results_loading,
    query_word:state.searchReducer.query_word
})

export default connect(mapStateToProps, null)(CrimeSearchFacets)