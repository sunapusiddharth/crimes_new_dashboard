import React,{useState,useRef } from 'react';
import {Col,Row,Button} from 'react-bootstrap';
// import clas from '../../Component/Project/Project.module.css';
// import Content from '../../Component/Contact/Content.js';
import {Form} from'react-bootstrap';
import Forms from'./Forms.js';
// import Text from '../../Component/Contact/Textarea';

const Contact = (props) => {
const [name, setName] = useState("");
const [mail, setEmail] = useState("");
const [subject, setSubject] = useState("");


const [validated,setValidate] = useState(false);

const handleSubmit = (event) =>{
    console.log("Nmae:",name);
  const from =event.currentTarget;
  if(from.checkValidity() === false){
    event.preventDefault();
    event.stopPropagation();
  }  else
  {
    event.preventDefault();
      alert(`Submitting Name ${name}`)
  }
  setValidate(true);
};


const handleChange = (value,state_name)=>{
    switch (state_name) {
        case 'name':
            setName(value)
            break;
            case 'email':
            setEmail(value)
            break;
            case 'subject':
            setSubject(value)
            break;
    
        default:
            break;
    }
}


  return (
   
         <Row 
        //  className={clas.project_head}
          id={props.id}>
         <Col sm={12} lg={12} md={12}>
         <h4 
        //  className={clas.projecth4}
         > CONTACT </h4>
         </Col>
         {/* <Col sm={12} md={3} lg={3}>
         <Content title="Bengaluru, India" name="CV Raman Nagar" icon="fas fa-home"/>
         <Content title="7406077690" name="" icon="fas fa-phone-alt"/>
         <Content title="praveena.ps7@gmail.com" name="Send us your query anytime!" icon="far fa-envelope"/>
         </Col> */}
         <Col sm={12} md={9} lg={9}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
         <Row>
         <Col sm={12} md={6} lg={6}>
          <Forms id="Nameid" type="text" place="Enter Company Name" value={name} invalidName="Please Enter Name" handleChange={handleChange} state_name={'name'}/>
          <Forms id="EmailId" type="email" place="Enter Email Address" invalidName="Please Enter Email" handleChange={handleChange} state_name={'email'}/>
          <Forms id="Enter Subject" type="text" place="Enter Subject Name" invalidName="Please Enter Subject" handleChange={handleChange} state_name={'subject'}/>
         </Col>
          <Col sm={12} md={6} lg={6}>
          <Form.Text idd="textid" holder="Enter Message" invalidName="Please Enter Message"/>
         </Col>
         <Col sm={12} md={12} lg={12} className="text-right">
         <Button type="submit" value="submit"
        //   className={"btn"+' '+clas.submit_btn}
          >Send Message</Button>
         </Col>
         </Row>
          </Form>
         </Col>

         </Row>
    )
}

export default Contact;