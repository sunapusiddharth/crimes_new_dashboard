import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Form, Col } from 'react-bootstrap'
import { addMail } from '../../actions/mailActions'

const NewMail = (props) => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else{
            setValidated(true);
        event.stopPropagation();
        //function to send data 
        let mail={
            to:form.elements[0].value,
            from:form.elements[1].value,
            subject:form.elements[2].value,
            body:form.elements[3].value,
            label:'',
            folder:[],
            parent:'',
            child:'',
            type:'inbox'
        }
        props.dispatch(addMail(mail))
        props.onHide()
        }
    };

    return (
        <Modal  {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>To</Form.Label>
                            <Form.Control type="email" placeholder="to" required />
                            <Form.Control.Feedback type="invalid">
                                Please enter whom you want to send the mail
          </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>

                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>From</Form.Label>
                            <Form.Control type="email" placeholder="from" required defaultValue="Mark@gmail.com" />
                            <Form.Control.Feedback type="invalid">
                                Please enter your mail
          </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control type="text" placeholder="Subject" required />
                            <Form.Control.Feedback type="invalid">
                                Please enter the subject
          </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="validationCustom03">
                            <Form.Control type="text" placeholder="What's on your mind ...." required />
                            <Form.Control.Feedback type="invalid">
                                Body can't be blank
          </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="danger" onClick={props.onHide}>Cancel<i class="fa fa-remove"></i></Button>
                    <Button variant="light" type="submit" >Send<i class="fa fa-paper-plane"></i></Button>
                </Form>
            </Modal.Body>
        </Modal>
    );


}
const mapStateToProps = (state) => ({

})



export default connect(mapStateToProps, null)(NewMail)
