import React from 'react';
import {Col,Row} from 'react-bootstrap';
// import clas from '../../Component/Project/Project.module.css';
import {Form} from'react-bootstrap';

const Forms = (props) =>{

	return(
			<Form.Group controlId={props.id}>
                <Form.Control type={props.type} 
                // className={clas.frm}
                onChange={(e)=>props.handleChange(e.target.value,props.state_name)}
                 placeholder={props.place} required />
				 <Form.Control.Feedback type="invalid">
                   {props.invalidName}
               </Form.Control.Feedback>
			</Form.Group>
		)
}

export default Forms;