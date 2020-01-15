import React, { Component, Fragment } from 'react'
import { Card, CardDeck ,Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom';

 class CardNavigator extends Component {
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
                                let date = new Date(image.publishedAt)
                                let date_string = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
                                return <Card>
                                    <Card.Img variant="top" src={image.urlToImage} />
                                    <Card.Body>
                                    <Link exact={true} to={`/news/single/${image._id}`}>
                                        <Card.Title> {image.title}</Card.Title>
                                        <Card.Text>{image.content}</Card.Text>
                                        </Link>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">{date_string}</small>
                                        <small className="text-muted"> Hits:{image.hits}</small>
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


export default withRouter(CardNavigator)