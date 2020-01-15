import React, { Component,Fragment } from 'react'
import { connect } from 'react-redux'
import '../../styles/crime_audio.scss'
import AudioPlayer from '../../common/AudioPlayer'
import { Badge } from 'react-bootstrap';
import $ from 'jquery'

// NOTE: for real conversion of video to mp3 : https://github.com/fluent-ffmpeg/node-fluent-ffmpeg
//  https://stackoverflow.com/questions/18168432/node-js-how-to-pipe-youtube-to-mp4-to-mp3

export class CrimeAudioLayout extends Component {
    constructor(){
        super()
        this.state={
            sample_audio_files:[
                {
                    media_name:'Call of Maria Rossi - The Devil Inside',
                    media_url:"/assets/audio/911 Call of Maria Rossi - The Devil Inside.mp3",
                    category:'911 call'
                },
                {
                    media_name:'kevin cosgrove call',
                    media_url:"/assets/audio/911_kevin_cosgrove.mp3",
                    category:'911 call'
                },
                {
                    media_name:'Province Accidental Confession ',
                    media_url:"/assets/audio/Caught in Providence Accidental Confession.mp3",
                    category:'confession'
                },
                {
                    media_name:'Court Hearing ordinance petitions',
                    media_url:"/assets/audio/Court hearing on non-discrimination ordinance petitions.mp3",
                    category:'court hearing'
                },
                {
                    media_name:'Dylan Roof Confession',
                    media_url:"/assets/audio/Dylann Roofs confession tape.mp3",
                    category:'confession'
                },
                {
                    media_name:'Fire Fighters kill Boa Constrictor',
                    media_url:"/assets/audio/Firefighterskillpetboaconstrictor.mp3",
                    category:'news'
                },
                {
                    media_name:'Interrogation of suspect',
                    media_url:"/assets/audio/interview.mp3",
                    category:'interrogation'
                },
                {
                    media_name:'Jim Jones Death Tape',
                    media_url:"/assets/audio/Jim Jones Death Tape.mp3",
                    category:'report'
                },
                {
                    media_name:'Mom Calls 911 After Leaving Baby in Car',
                    media_url:"/assets/audio/Mom Calls 911 After Leaving Baby in Car.mp3",
                    category:'911 call'
                },
                {
                    media_name:'911 call from neighbours',
                    media_url:"/assets/audio/patsy-ramsey-911-call.mp3",
                    category:'911 call'
                },
                {
                    media_name:'Ruth Bader Ginsburg on Cameras in the Court',
                    media_url:"/assets/audio/Ruth Bader Ginsburg on Cameras in the Court.mp3",
                    category:'court hearing'
                },
                {
                    media_name:'Report',
                    media_url:"/assets/audio/sorryoldchapihavemurderedmywif.mp3",
                    category:'report'
                },
                {
                    media_name:'Senator hearing',
                    media_url:"/assets/audio/Sotomayor Faces Day 2 of Court Hearings.mp3",
                    category:'court hearing'
                },
            ],
            selected_media:''
        }
    }

    componentDidMount(){
        this.setState({selected_media:this.state.sample_audio_files[0].media_url})
    }

    onMediaChange = (item,index)=>{
        this.setState({selected_media:item.media_url})
        $("#my_audio_player")[0].pause()
        $("#my_audio_player")[0].load()
        $("#my_audio_player")[0].play()
    }
    
    render() {
        return (
            <Fragment>
                <div className="body_crime">
                <div className="audio_background"></div>
                <section>
                    <div className="album-info">
                        {/* <div className="album-art"><img src="https://target.scene7.com/is/image/Target/51223401?wid=520&amp;hei=520&amp;fmt=pjpeg" />
                            <div className="actions">
                                <div className="play">Play</div>
                                <div className="bookmark">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#faa800" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></path>
                                        <path d="M0 0h24v24H0z" fill="none"></path>
                                    </svg>
                                </div>
                            </div>
                        </div> */}
                        <div className="album-details">
                            {/* <h2> <img src="https://68.media.tumblr.com/avatar_edbd71e8c8ac_128.png" />Skillet</h2> */}
                            <h1>Crime Audio Clips</h1><span>
                                 {/* <span>Hard Rock </span> */}
                            {/* <span>&copy; 2016 Atlantic Recording Corporation</span> */}
                            </span>
                            <p>Listen to different audio clips collected during the investigation. Includes hearings, crime scene audio clips,interrogation clips, full audio transcripts and more.</p>
                        </div>
                    </div>
                    <AudioPlayer media_url={this.state.selected_media}/>
                    <div className="album-tracks">
                        <ol>
                            { this.state.sample_audio_files && this.state.sample_audio_files.map((item,index)=><li onClick={()=>this.onMediaChange(item,index)}> <span>{item.media_name}</span><span><Badge>{item.category}</Badge></span></li>)}
                        </ol>
                    </div>
                </section>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({

})



export default connect(mapStateToProps, null)(CrimeAudioLayout)
