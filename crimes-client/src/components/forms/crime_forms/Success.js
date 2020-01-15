import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import {saveCrimeDataToServer} from '../../../actions/formActions'

// material UI ;
import Fab from '@material-ui/core/Fab';
import { Button } from 'react-bootstrap';
// import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));


function Success(props) {
  
  const Formcontinue = e => {
    e.preventDefault();
    // PROCESS FORM //
    props.nextStep();
  }

  const back = e => {
    e.preventDefault();
    props.prevStep();
  }
  const saveDataToServer = ()=>{
    props.dispatch(saveCrimeDataToServer())
  }

  const classes = useStyles();
  console.log('props',props)
  //code to convert props to key value pair :
  let renderable_object = {}
  Object.keys(props).filter(key=>key!=='dispatch').map(key => {
    if(key == 'file'){
      renderable_object[key] = props[key] && props[key].name.toString()
    }else if(key == "crime_files"  || key == "audios" || key == "videos" || key == "photos"){
      renderable_object[key] = props[key] && props[key].length ? props[key].map(file=>file && file.name && file.name.toString()).toString():""
    }else if(key == "victim" || key == "suspect" || key == "law" || key == "accussed" || key == "judge"){
      renderable_object[key] = props[key] && props[key] && props[key] && props[key].map(person=>`${person._source.name}`).toString()
    }else{
      renderable_object[key] = props[key] ?props[key]:''
    }
  })
  console.log("renderable_object=",renderable_object)
  return (
    <Paper className={classes.root}>
      <p>Review all the fields , if any data needs to be changes g back using the steppers or below naviation buttons.If everything looks correct hit <Button variant="light" size="sm" onClick={saveDataToServer}>save</Button> </p>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Property</TableCell>
            <TableCell align="right">Values</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(renderable_object).map(key => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {key}
              </TableCell>
              <TableCell component="th" scope="row" align="right">
                {renderable_object[key]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

const mapStateToProps = state=>({
  address:state.formReducer.address,
  category:state.formReducer.category,
  description:state.formReducer.description,
  district:state.formReducer.district,
  file:state.formReducer.file,
  incident_number:state.formReducer.incident_number,
  occurence_on_date:state.formReducer.occurence_on_date,
  offense_code:state.formReducer.offense_code,
  offense_code_group:state.formReducer.offense_description,
  offense_description:state.formReducer.offense_description,
  reporting_area:state.formReducer.reporting_area,
  schooting:state.formReducer.schooting,
  street:state.formReducer.street,
  title:state.formReducer.title,
  ucr_part:state.formReducer.ucr_part,
  crime_files:state.formReducer.crime_files,
  audios:state.formReducer.audios,
  videos:state.formReducer.videos,
  photos:state.formReducer.photos,
  victim:state.formReducer.victim,
  accussed:state.formReducer.accussed,
  suspect:state.formReducer.suspect,
  judge:state.formReducer.judge,
  law:state.formReducer.law
})
export default connect(mapStateToProps,null)(Success)