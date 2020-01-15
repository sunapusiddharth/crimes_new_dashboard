import React from 'react';
import { Formik, Form,  } from 'formik';
import { Button } from 'react-bootstrap';
import CrimePeopleMOdal from './CrimePeopleModal';
import { connect } from 'react-redux'
// for chips materialize UI :
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { deleteCrimePople } from '../../../actions/formActions';


class IncidentRelatedForm extends React.Component {
    // form will have autocomplete search : with people card small : image , name , highlighted search category eg: education match then 
    //show education : highlighted term.
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    };

   handleDelete = (person_type,person)=>{
    //    debugger;
       this.props.dispatch(deleteCrimePople(person_type,person))
   }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    };

    addValuesToState = (event) => {
        // debugger;
    }

    render() {
        const { values, handleChange } = this.props;
        return (
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                onSubmit={fields => {
                    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(fields, null, 4))
                    //add data to redux , if user has to be created newly then give a form to create user . 
                    // else add the object id in the redux store .
                }}
                render={({ errors, status, touched }) => (
                    <Form>
                        <p>Add people related to this crime .Either select a person or filter using search . Search uses elasticsearch to find through names of different people, for simplicity edge
                            n-gram field name is only used in this query.However in people search page , person can be found using many fiields like name,
                            email,address , past employment , past education, by prisons , by departments etc..
                        </p>
                        <h4>Victims</h4>
                        <p>Add victims related to this case , if you don't find the person in the list create a new one .
                            You can add multiple.If there are many victims provide a excel sheet, will add those existing in database , for rest interface will be provided <Button variant="info" size="sm">Coming Soon</Button> to add those people details  <Button variant="dark" size="sm">New Person</Button></p>
                        <CrimePeopleMOdal text="Add Victims" title=" Victims" person_type="victim" />
                        <RenderPeople people={this.props.victim} handleDelete={this.handleDelete} person_type="victim"/> 
                        <hr />
                        <h4>Accussed</h4>
                        <p>Add people who have been accused to this case , if you don't find the person in the list create a new one .
                            You can add multiple.If there are many victims provide a excel sheet, will add those existing in database , for rest interface will be provided <Button variant="info" size="sm">Coming Soon</Button> to add those people details  <Button variant="dark" size="sm">New Person</Button></p>
                        <CrimePeopleMOdal text="Add Accussed" title="Add Accussed" person_type="accussed" />
                        <RenderPeople people={this.props.accussed} handleDelete={this.handleDelete} person_type="accussed"/> 
                        <hr />
                        <h4>Suspects</h4>
                        <p>Add people who have been identified as supects to this case , if you don't find the person in the list create a new one .
                            You can add multiple.If there are many victims provide a excel sheet, will add those existing in database , for rest interface will be provided <Button variant="info" size="sm">Coming Soon</Button> to add those people details  <Button variant="dark" size="sm">New Person</Button></p>
                        <CrimePeopleMOdal text="Add Suspects" title="Suspects" person_type="suspect" />
                        <RenderPeople people={this.props.suspect} handleDelete={this.handleDelete} person_type="suspect"/> 

                        <hr />
                        <h4>Law</h4>
                        <p>Add people who are in law department and  have been linked to this case , if you don't find the person in the list create a new one .
                            You can add multiple.If there are many victims provide a excel sheet, will add those existing in database , for rest interface will be provided <Button variant="info" size="sm">Coming Soon</Button> to add those people details  <Button variant="dark" size="sm">New Person</Button></p>
                        <CrimePeopleMOdal text="Add Law" title="Law" person_type="law" />
                        <RenderPeople people={this.props.law} handleDelete={this.handleDelete} person_type="law"/> 
                        <hr />
                        <h4>Judge</h4>
                        <p>Add judges who have are linked to this case , if you don't find the person in the list create a new one .
                            You can add multiple.If there are many victims provide a excel sheet, will add those existing in database , for rest interface will be provided <Button variant="info" size="sm">Coming Soon</Button> to add those people details  <Button variant="dark" size="sm">New Person</Button></p>
                        <CrimePeopleMOdal text="Add Judge" title="Add Judge" person_type="judge" />
                        <RenderPeople people={this.props.judge} handleDelete={this.handleDelete} person_type="judge"/> 
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary mr-2" onClick={this.continue}>Next</button>
                            <button type="submit" className="btn btn-primary mr-2" onClick={this.back}>Previous</button>
                        </div>
                    </Form>
                )}
            />
        )
    }
}
const mapStateToProps = (state) => ({
    victim: state.formReducer.victim,
    accussed: state.formReducer.accussed,
    suspect: state.formReducer.suspect,
    law: state.formReducer.law,
    judge: state.formReducer.judge
})

export default connect(mapStateToProps,null)(IncidentRelatedForm)

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


function RenderPeople(props) {
    const classes = useStyles();
    function myClick(){
        alert("clicked")
    }
    function myDelete(person_type,person){
        props.handleDelete(person_type,person)
    }
    return (
        <div className="row">
            {props.people && props.people.length && props.people.map(person => <Chip
                avatar={<Avatar alt="Natacha"
                // src={person.avatar}
                />}
                label={person._source.name}
                onClick={myClick}
                // onDelete={props.handleDelete(props.person_type,person)}
                onDelete={()=>myDelete(props.person_type,person)}
                className={classes.chip}
            />)}
        </div>
    )
}