import React,{useState} from 'react';
import AutoCompletePeople from './AutoCompletePeople';
import { Button,Modal ,ButtonToolbar} from 'react-bootstrap';



export default function CrimePeopleMOdal(props) {
    const [lgShow, setLgShow] = useState(false);
  
    return (
      <ButtonToolbar>
        <Button size="sm" onClick={() => setLgShow(true)}>{props.text?props.text:'MOdal Title'}</Button>
  
        <Modal
         size="lg"
         show={lgShow}
         onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              {props.title?props.title:'MOdal title'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <AutoCompletePeople person_type={props.person_type?props.person_type:'victim'}/>
          </Modal.Body>
        </Modal>
        </ButtonToolbar>
    );
  }