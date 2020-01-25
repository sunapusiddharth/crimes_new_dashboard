import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Navbar, Link, Form, FormControl, Button } from 'react-bootstrap'
import '../../styles/searchbox.css'

// /material ui 
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: "absolute",
        zIndex: 400,
        backgroundColor:"#fff",
        border:" 1px solid rgba(0,0,0,.125)",
        borderRadius: ".25rem"
    },
    inline: {
        display: 'inline',
    },
}));



const Suggestions = (props) => {
    const options = props.results.length && props.results.map(r => {
        let { city, state, agency, organization } = r._source.suggest.contexts
        return (
            <div className="row">
                {r.text} ,{agency},{organization} , City: {city}, state: {state}
            </div>
        )
    })
    return <div className="autocomplete row">{options}</div>
}

const PersonSuggestions = (props) => {
    const classes = useStyles();
    return <List className={classes.root}>
        {props.results.length ? props.results.map(person => (
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={person._source.name} src={person._source.avatar} />
                </ListItemAvatar>
                <ListItemText
                    primary={person._source.name}
                />
            </ListItem>
        )):<span className=""></span>}
        <Divider variant="inset" component="li" />
    </List>
}


class DepartmentSearchBox extends Component {

    state = {
        query: '',
        results: [],
        show_suggestion_box: true
    }

    getInfo = (query) => {
        fetch(`http://${process.env.REACT_APP_API_HOST}:8004/api/search/departments/autocomplete`, {
            method: 'post',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({
                "contexts": {
                    "agency": ["Non-Federal Agency"]
                },
                "prefix": query
            })
        }).then(res => res.json())
            .then(data => {
                let result_items = data && data.suggest && data.suggest.dept_suggestion.length && data.suggest.dept_suggestion[0] && data.suggest.dept_suggestion[0].options ? data.suggest.dept_suggestion[0].options : []
                this.setState({
                    results: result_items
                })
            })
    }

    getPersonAutocomplete = (query) => {
        //to use autoCompletePeople fn in backedn micro service.
        fetch(`http://${process.env.REACT_APP_API_HOST}:8004/api/search/autocomplete/people`, {
            method: 'post',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify({
                from: 0,
                size: 100,
                search_query: query
            })
        }).then(res => res.json())
            .then(data => {
                // debugger
                this.setState({
                    results: data && data.hits && data.hits.hits
                })
            })
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value,
            show_suggestion_box: true
        }, () => {
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    if (this.props.sidhu == 'search_people') {
                        this.getPersonAutocomplete(this.state.query)
                    } else {
                        this.getInfo(this.state.query)
                    }
                }
            } else if (!this.state.query) {
                this.setState({ show_suggestion_box: false })
            }
        })
    }
    mySearch = (e) => {
        if (e) e.preventDefault();
        let query = this.search.value ? this.search.value : ''
        this.setState({ show_suggestion_box: false })
        console.log("props fro search box=", this.props)
        this.props.changeSearchQuery(query)
        this.props.dispatch(this.props.searchAction(query))
    }

    render() {
        // console.log("init =",this.props)
        return (
            <Fragment>
                <Navbar bg="dark" variant="dark">
                    <Form inline onSubmit={this.mySearch}>
                        <div className="row">
                            <div className="col-lg-9 col-md-9">
                                <FormControl class="search_input" type="text" name="" placeholder="Search..."
                                    ref={input => this.search = input}
                                    onChange={this.handleInputChange} />
                            </div>
                            <div className="col-lg-3 col-md-3"> <Button variant="outline-info" type="submit" onClick={this.mySearch}>Search</Button>   </div>
                        </div>
                    </Form>
                </Navbar>
                    {this.state.query? this.state.show_suggestion_box && this.props.sidhu == 'search_person'? <Suggestions results={this.state.results} /> : <PersonSuggestions results={this.state.results} />:''}
            </Fragment>
        )
    }



}

const mapStateToProps = (state) => ({

})
export default connect(mapStateToProps, null)(DepartmentSearchBox)