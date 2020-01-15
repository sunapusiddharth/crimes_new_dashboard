import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card } from 'react-bootstrap';


 class MailBody extends Component {
  
    render() {
        return (
            <Card style={{ width: '100%' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Button className="mail_buttons">Reply<i class="w3-margin-left fa fa-mail-reply x-small"></i></Button>
              <Button className="mail_buttons" >Forward<i class="w3-margin-left fa fa-arrow-right x-small"></i></Button>
            </Card.Body>
          </Card>
        )
    }
}

const mapStateToProps = (state) => ({
    
})



export default connect(mapStateToProps, null)(MailBody)
