import React, { Component, Fragment } from 'react'
import { Card, CardDeck ,Button,Badge} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom';
import VideoPlayer from '../../common/VideoPlayer'


 class CrimeMediaVideoCarousel extends Component {
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
                                return <Card key={image._id}>
                                    <VideoPlayer/>
                                    <Card.Body>
                                        <Card.Text>{image.media_name}</Card.Text>
                                    </Card.Body>
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

export default withRouter(CrimeMediaVideoCarousel)