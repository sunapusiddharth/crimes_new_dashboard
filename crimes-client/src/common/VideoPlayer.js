import React, { Component } from 'react';
import { Player, ControlBar, LoadingSpinner, PlaybackRateMenuButton, BigPlayButton } from 'video-react';

export default class VideoPlayer extends Component {
    componentDidMount() {
        this.player.playbackRate = 2;
        this.forceUpdate();
    }

    render() {
        console.log("from videoPlayer", this.props)
        let { poster, video_url } = this.props
        return (
            <div className="video_player">
                <Player
                    ref={c => {
                        this.player = c;
                    }}
                    playsInline
                    
                    poster={poster ? poster : '/assets/poster.png'}
                >
                    <BigPlayButton position="center" />
                    <source
                        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                        type="video/mp4"
                    />
                    <LoadingSpinner />
                    <ControlBar
                        autoHide={false}
                        className="my-class">
                        <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} />
                    </ControlBar>
                </Player>
            </div>
        )
    }
};