import React, { Component } from 'react'
import $ from 'jquery'

export default class AudioPlayer extends Component {


    constructor(){
        super()
        this.state={
            player: false
        }
    }

    componentDidMount() {
        
        var $player = $("#my_audio_player");
        
        /**
          * Have to add media event listeners here.
          *
        */
        $player.on('play', (e) => {
            e.preventDefault();
            this.playLocation();
        });

        $player.on('pause', (e) => {
            e.preventDefault();
            this.pause();
        });

        $player.on('ended', (e) => {
            e.preventDefault();
            this.ended();
        });

        $player.on('load',(e)=>{
            e.preventDefault();
            this.load()
            
           });

        $(document).on('keydown', (e) => {
            // Move currentTime forward and backward via arrow keys and play/pause via spacebar.
            if (e.keyCode == 39) {
                this.state.player.currentTime += 1;
            } else if (e.keyCode == 37) {
                this.state.player.currentTime -= 1;
            } else if (e.keyCode == 32 && this.state.player.paused == true) {
                e.preventDefault();
                this.state.player.play();
            } else if (e.keyCode == 32 && this.state.player.paused == false) {
                e.preventDefault();
                this.state.player.pause()
            }
        });

        $player.on('wheel', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (e.originalEvent.wheelDelta > 0) {
                this.state.player.currentTime += 1;
            } else {
                this.state.player.currentTime -= 1;
            }
        });
    }


    componentWillUnmount() {
        var $player = $("#my_audio_player");
        $player.off('play');
        $player.off('pause');
        $(document).off('keydown')
        $player.off('wheel')
    }

    getPlaybackTime = (time) => {
        var hours = Math.floor(time / 3600);
        var minutes = Math.floor(time / 60);
        if (minutes > 59) {
            minutes = Math.floor(time / 60) - 60;
        }

        var seconds = Math.round(time - minutes * 60);
        if (seconds > 3599) {
            seconds = Math.round(time - minutes * 60) - 3600;
        }

        return time;
    }


    playLocation = () => {
        this.setState({ player: $("#my_audio_player")[0] }, function () {
            var playbackTime = this.getPlaybackTime(this.state.player.currentTime);
            var playbackTime = localStorage.getItem('codepenReactPlayer');

            if (playbackTime !== null) {
                // this.state.player.currentTime = playbackTime;
            }
            this.state.player.play();
        })
    }

    play = () => {
        this.setState({ player: $("#my_audio_player")[0] }, function () {
            this.state.player.play();
        })
    }

    load = () => {
        this.setState({ player: $("#my_audio_player")[0] }, function () {
            this.state.player.load();
        })
    }


    pause = () => {
        var playbackTime = this.getPlaybackTime(this.state.player.currentTime);

        localStorage.setItem('codepenReactPlayer', playbackTime);
    }

    ended = () => {
        let playbackTime = 0
        // Set playback_time to 0.
        localStorage.setItem('codepenReactPlayer', playbackTime);
    }

    render() {
        let { media_url, media_name } = this.props
        return (
            <audio controls className="audio_player" preload="false" ref="audio" id="my_audio_player">
                {/* <source src={media_url ? media_url : "http://www.nihilus.net/soundtracks/Static%20Memories.mp3"} /> */}
                <source src={this.props.media_url?this.props.media_url:"http://www.nihilus.net/soundtracks/Static%20Memories.mp3"} />
            </audio>
        )
    }
}
