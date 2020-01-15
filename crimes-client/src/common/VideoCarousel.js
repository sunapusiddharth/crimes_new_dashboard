import React, { Component } from 'react'
import VideoPlayer from './VideoPlayer'
import { Carousel } from 'react-bootstrap'
import AudioPlayer from './AudioPlayer';

export default class VideoCarousel extends Component {
    constructor(){
        super()
        this.state={
            videos:[{url:'abc'},{url:'abcd'},{url:'def'}]
        }
    }
    render() {
        let videosArray = this.state.videos
        return (
            <div>
                 <Carousel slide={false} indicators={false} keyboard={false}>
                 {videosArray.map(video=>(
                <Carousel.Item>
                   {/* <VideoPlayer/> */}
                   <AudioPlayer/>
                <Carousel.Caption>
                    balh balh 
                    {/* <p>{element.caption}</p> */}
                </Carousel.Caption>
            </Carousel.Item>
            ))}
        </Carousel>
            </div>
        )
    }
}
