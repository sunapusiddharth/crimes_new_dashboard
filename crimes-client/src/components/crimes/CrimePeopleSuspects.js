import React, { Component, Fragment } from 'react'
import { Card, CardDeck ,Button,Badge} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom';
import { faFacebook,faTwitter,faInstagram } from "@fortawesome/free-brands-svg-icons"

 class CrimePeopleSuspects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images:props.data && props.data.slice(0,5),
            index: 0,
            limit: 3
        }
    }

    navigator = (direction) => {
        
        let index = this.state.index
        console.log("index=",index)
        if (direction == 'prev') {
            index -= 1
        } else {
            index += 1
        }
        this.setState({ index })
    }
    render() {
        if(!this.props.data || !this.props.data.length){
            return <div className="sa">NO data</div>
        }else{
            return (
                <div className={this.props.className}>
                    <div className="row row_header">
                        <div className="col-lg-10 col-md-10">
                            <h3 className="pull-left">{this.props.title?this.props.title:'Title goes here '}</h3>
                        </div>
                        <div className="col-lg-2 col-md-2 allign-right">
                            {this.state.index ? <Button variant="dark"  onClick={() => this.navigator("prev")}><FontAwesomeIcon icon={faArrowLeft} /></Button>:<Button variant="dark" disabled><FontAwesomeIcon icon={faArrowLeft} /></Button>}
                            {this.state.index+this.state.limit < this.state.images.length ? <Button variant="dark"  onClick={() => this.navigator("next")}><FontAwesomeIcon icon={faArrowRight} /></Button> :<Button variant="dark" disabled><FontAwesomeIcon icon={faArrowRight} /></Button>}
                        </div>
                    </div>
                    <hr size="30"/>
                    <CardDeck>
                        {this.state.images.map((image, index) => {
                            if (index >= this.state.index && index < (this.state.limit+this.state.index)) {
                                return <Card>
                                    <Card.Img variant="top" src={image.avatar} />
                                    <Card.Body>
                                    {/* <Link exact={true} to={`/news/single/${image._id}`}> */}
                                        <Card.Title> {image.name}</Card.Title>
                                        <Card.Text>
                                            <br/>
                                        {`Was arrested on date, Has served time in ${image.prisons.length} prisons for ${image.cases.length} cases. Was arrested back in ${new Date(image.prisons[0].from).getFullYear()} and placed in ${image.prisons[0].cell_holding} under supervisor ${image.prisons[0].supervisor[0].name} Last known address is ${image.address} Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`}
                                        </Card.Text>
                                        {/* </Link> */}
                                    </Card.Body>
                                    <Card.Footer>
                                        Contact:<Badge type="dark">{image.phone} or ${image.email}</Badge>
                                        Social Links:<Link to={image.social_link[0]}><FontAwesomeIcon icon={faFacebook} /></Link> <Link to={image.social_link[0]}><FontAwesomeIcon icon={faTwitter} /></Link>
                                    </Card.Footer>
                                </Card>
                            }
                        }
                        )}
                    </CardDeck>
                </div>
            )
        }
    }
}

export default withRouter(CrimePeopleSuspects)