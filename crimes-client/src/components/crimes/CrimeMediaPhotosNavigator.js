import React, { Component, Fragment } from 'react'
import { Card, CardColumns } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom';

class CrimeMediaPhotoNavigator extends Component {
    constructor(props) {
        super(props)
        this.state = {
            images: props.data && props.data.slice(0, 5),
            index: 0,
            limit: 3
        }
    }

    showLess = () => {
        let images = this.state.images
        let new_images = images.slice(0, 10)
        let images_loaded = 10
        this.setState({ images: new_images, images_loaded, max_images_reached: false })
    }

    render() {
        if (!this.props.data || !this.props.data.length) {
            return <div className="sa">NO data</div>
        } else {
            let photos = this.state.images
            return (
                <Fragment>
                <CardColumns>
                    {photos.map(photo=> <Card key={photo._id}>
                        <Card.Img variant="top" src={photo.media_url} />
                        <Card.Body>
                            <Card.Text>{photo.media_name}</Card.Text>
                        </Card.Body>
                    </Card>)}
                   
                    </CardColumns>
                    {!(this.props.data.length <= 5) && this.state.max_images_reached ? <button onClick={this.showLess}>Show Less</button> : <button onClick={this.showMore}>Show More</button>}
                    </Fragment>
                    )
            }
        }
    }
    
export default withRouter(CrimeMediaPhotoNavigator)