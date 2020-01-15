import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import AudioPlayerCard from './AudioPlayerCard';

 
export default class AudioPlayerCarousel extends Component {
    render() {
        return (
            <Carousel showThumbs={false}>
                <div>
                    <AudioPlayerCard/>
                </div>
                <div>
                <AudioPlayerCard/>
                </div>
                <div>
                <AudioPlayerCard/>
                </div>
            </Carousel>
        );
    }
}