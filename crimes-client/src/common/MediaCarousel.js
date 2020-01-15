
import React, { Component } from 'react'
import { Carousel } from 'react-bootstrap'

export default class MediaCarousel extends Component {
    constructor(props){
        super(props)
    }

    render() {
        console.log("from media carousel",this.props)
        return(
            <Carousel>
            {this.props.elements.map(element=>(
                <Carousel.Item>
                    {element.media}
                    {element.caption && <Carousel.Caption><p>{element.caption}</p></Carousel.Caption>}
            </Carousel.Item>
            ))}
        </Carousel>
        )
    }
}
