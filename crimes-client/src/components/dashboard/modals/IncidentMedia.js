import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import faker from 'faker'
import { Carousel } from 'react-responsive-carousel';
import AudioPlayerCard from '../../../common/AudioPlayerCard'
import VideoPlayerCard from '../../../common/VideoPlayerCard';
var data = {
    external_link: [
        'https://newsapi.org/s/google-news-api',
        'https://newsapi.org/s/google-news-api',
        'https://newsapi.org/s/google-news-api',
        'https://newsapi.org/s/google-news-api',
        'https://newsapi.org/s/google-news-api',
        'https://newsapi.org/s/google-news-api',
        'https://newsapi.org/s/google-news-api',
        'https://newsapi.org/s/google-news-api',
        'https://newsapi.org/s/google-news-api',
        'https://newsapi.org/s/google-news-api'
      ],
      files: [
        {
          media_id: 'I130204032-00_media_1',
          media_url: 's3://crimeportal/murder.mp4_1',
          media_name: 'photo_est deserunt',
          _id: '5d43361408b0be57c010f039'
        },
        {
          media_id: 'I130204032-00_media_2',
          media_url: 's3://crimeportal/murder.mp4_2',
          media_name: 'photo_deserunt ad',
          _id: '5d43361408b0be57c010f038'
        },
        {
          media_id: 'I130204032-00_media_3',
          media_url: 's3://crimeportal/murder.mp4_3',
          media_name: 'photo_pariatur enim',
          _id: '5d43361408b0be57c010f037'
        },
        {
          media_id: 'I130204032-00_media_4',
          media_url: 's3://crimeportal/murder.mp4_4',
          media_name: 'photo_exercitation labore',
          _id: '5d43361408b0be57c010f036'
        },
        {
          media_id: 'I130204032-00_media_5',
          media_url: 's3://crimeportal/murder.mp4_5',
          media_name: 'photo_ad sint',
          _id: '5d43361408b0be57c010f035'
        },
        {
          media_id: 'I130204032-00_media_6',
          media_url: 's3://crimeportal/murder.mp4_6',
          media_name: 'photo_eiusmod sunt',
          _id: '5d43361408b0be57c010f034'
        },
        {
          media_id: 'I130204032-00_media_7',
          media_url: 's3://crimeportal/murder.mp4_7',
          media_name: 'photo_sunt aute',
          _id: '5d43361408b0be57c010f033'
        },
        {
          media_id: 'I130204032-00_media_8',
          media_url: 's3://crimeportal/murder.mp4_8',
          media_name: 'photo_enim laboris',
          _id: '5d43361408b0be57c010f032'
        },
        {
          media_id: 'I130204032-00_media_9',
          media_url: 's3://crimeportal/murder.mp4_9',
          media_name: 'photo_id proident',
          _id: '5d43361408b0be57c010f031'
        },
        {
          media_id: 'I130204032-00_media_10',
          media_url: 's3://crimeportal/murder.mp4_10',
          media_name: 'photo_labore ut',
          _id: '5d43361408b0be57c010f030'
        }
      ],
      audios: [
        {
          media_id: 'I130204032-00_media_1',
          media_url: 's3://crimeportal/murder.mp4_1',
          media_name: 'photo_est deserunt',
          _id: '5d43361408b0be57c010f043'
        },
        {
          media_id: 'I130204032-00_media_2',
          media_url: 's3://crimeportal/murder.mp4_2',
          media_name: 'photo_deserunt ad',
          _id: '5d43361408b0be57c010f042'
        },
        {
          media_id: 'I130204032-00_media_3',
          media_url: 's3://crimeportal/murder.mp4_3',
          media_name: 'photo_pariatur enim',
          _id: '5d43361408b0be57c010f041'
        },
        {
          media_id: 'I130204032-00_media_4',
          media_url: 's3://crimeportal/murder.mp4_4',
          media_name: 'photo_exercitation labore',
          _id: '5d43361408b0be57c010f040'
        },
        {
          media_id: 'I130204032-00_media_5',
          media_url: 's3://crimeportal/murder.mp4_5',
          media_name: 'photo_ad sint',
          _id: '5d43361408b0be57c010f03f'
        },
        {
          media_id: 'I130204032-00_media_6',
          media_url: 's3://crimeportal/murder.mp4_6',
          media_name: 'photo_eiusmod sunt',
          _id: '5d43361408b0be57c010f03e'
        },
        {
          media_id: 'I130204032-00_media_7',
          media_url: 's3://crimeportal/murder.mp4_7',
          media_name: 'photo_sunt aute',
          _id: '5d43361408b0be57c010f03d'
        },
        {
          media_id: 'I130204032-00_media_8',
          media_url: 's3://crimeportal/murder.mp4_8',
          media_name: 'photo_enim laboris',
          _id: '5d43361408b0be57c010f03c'
        },
        {
          media_id: 'I130204032-00_media_9',
          media_url: 's3://crimeportal/murder.mp4_9',
          media_name: 'photo_id proident',
          _id: '5d43361408b0be57c010f03b'
        },
        {
          media_id: 'I130204032-00_media_10',
          media_url: 's3://crimeportal/murder.mp4_10',
          media_name: 'photo_labore ut',
          _id: '5d43361408b0be57c010f03a'
        }
      ],
      videos: [
        {
          media_id: 'I130204032-00_media_1',
          media_url: 's3://crimeportal/murder.mp4_1',
          media_name: 'photo_est deserunt',
          _id: '5d43361408b0be57c010f04d'
        },
        {
          media_id: 'I130204032-00_media_2',
          media_url: 's3://crimeportal/murder.mp4_2',
          media_name: 'photo_deserunt ad',
          _id: '5d43361408b0be57c010f04c'
        },
        {
          media_id: 'I130204032-00_media_3',
          media_url: 's3://crimeportal/murder.mp4_3',
          media_name: 'photo_pariatur enim',
          _id: '5d43361408b0be57c010f04b'
        },
        {
          media_id: 'I130204032-00_media_4',
          media_url: 's3://crimeportal/murder.mp4_4',
          media_name: 'photo_exercitation labore',
          _id: '5d43361408b0be57c010f04a'
        },
        {
          media_id: 'I130204032-00_media_5',
          media_url: 's3://crimeportal/murder.mp4_5',
          media_name: 'photo_ad sint',
          _id: '5d43361408b0be57c010f049'
        },
        {
          media_id: 'I130204032-00_media_6',
          media_url: 's3://crimeportal/murder.mp4_6',
          media_name: 'photo_eiusmod sunt',
          _id: '5d43361408b0be57c010f048'
        },
        {
          media_id: 'I130204032-00_media_7',
          media_url: 's3://crimeportal/murder.mp4_7',
          media_name: 'photo_sunt aute',
          _id: '5d43361408b0be57c010f047'
        },
        {
          media_id: 'I130204032-00_media_8',
          media_url: 's3://crimeportal/murder.mp4_8',
          media_name: 'photo_enim laboris',
          _id: '5d43361408b0be57c010f046'
        },
        {
          media_id: 'I130204032-00_media_9',
          media_url: 's3://crimeportal/murder.mp4_9',
          media_name: 'photo_id proident',
          _id: '5d43361408b0be57c010f045'
        },
        {
          media_id: 'I130204032-00_media_10',
          media_url: 's3://crimeportal/murder.mp4_10',
          media_name: 'photo_labore ut',
          _id: '5d43361408b0be57c010f044'
        }
      ],
      photos: [
        {
          media_id: 'I130204032-00_media_1',
          media_url: 's3://crimeportal/Capture.PNG_1',
          media_name: 'photo_est deserunt',
          _id: '5d43361408b0be57c010f057'
        },
        {
          media_id: 'I130204032-00_media_2',
          media_url: 's3://crimeportal/Capture.PNG_2',
          media_name: 'photo_deserunt ad',
          _id: '5d43361408b0be57c010f056'
        },
        {
          media_id: 'I130204032-00_media_3',
          media_url: 's3://crimeportal/Capture.PNG_3',
          media_name: 'photo_pariatur enim',
          _id: '5d43361408b0be57c010f055'
        },
        {
          media_id: 'I130204032-00_media_4',
          media_url: 's3://crimeportal/Capture.PNG_4',
          media_name: 'photo_exercitation labore',
          _id: '5d43361408b0be57c010f054'
        },
        {
          media_id: 'I130204032-00_media_5',
          media_url: 's3://crimeportal/Capture.PNG_5',
          media_name: 'photo_ad sint',
          _id: '5d43361408b0be57c010f053'
        },
        {
          media_id: 'I130204032-00_media_6',
          media_url: 's3://crimeportal/Capture.PNG_6',
          media_name: 'photo_eiusmod sunt',
          _id: '5d43361408b0be57c010f052'
        },
        {
          media_id: 'I130204032-00_media_7',
          media_url: 's3://crimeportal/Capture.PNG_7',
          media_name: 'photo_sunt aute',
          _id: '5d43361408b0be57c010f051'
        },
        {
          media_id: 'I130204032-00_media_8',
          media_url: 's3://crimeportal/Capture.PNG_8',
          media_name: 'photo_enim laboris',
          _id: '5d43361408b0be57c010f050'
        },
        {
          media_id: 'I130204032-00_media_9',
          media_url: 's3://crimeportal/Capture.PNG_9',
          media_name: 'photo_id proident',
          _id: '5d43361408b0be57c010f04f'
        },
        {
          media_id: 'I130204032-00_media_10',
          media_url: 's3://crimeportal/Capture.PNG_10',
          media_name: 'photo_labore ut',
          _id: '5d43361408b0be57c010f04e'
        }, {
            media_id: 'I130204032-00_media_1',
            media_url: 's3://crimeportal/Capture.PNG_1',
            media_name: 'photo_est deserunt',
            _id: '5d43361408b0be57c010f057'
          },
          {
            media_id: 'I130204032-00_media_2',
            media_url: 's3://crimeportal/Capture.PNG_2',
            media_name: 'photo_deserunt ad',
            _id: '5d43361408b0be57c010f056'
          },
          {
            media_id: 'I130204032-00_media_3',
            media_url: 's3://crimeportal/Capture.PNG_3',
            media_name: 'photo_pariatur enim',
            _id: '5d43361408b0be57c010f055'
          },
          {
            media_id: 'I130204032-00_media_4',
            media_url: 's3://crimeportal/Capture.PNG_4',
            media_name: 'photo_exercitation labore',
            _id: '5d43361408b0be57c010f054'
          },
          {
            media_id: 'I130204032-00_media_5',
            media_url: 's3://crimeportal/Capture.PNG_5',
            media_name: 'photo_ad sint',
            _id: '5d43361408b0be57c010f053'
          },
          {
            media_id: 'I130204032-00_media_6',
            media_url: 's3://crimeportal/Capture.PNG_6',
            media_name: 'photo_eiusmod sunt',
            _id: '5d43361408b0be57c010f052'
          },
          {
            media_id: 'I130204032-00_media_7',
            media_url: 's3://crimeportal/Capture.PNG_7',
            media_name: 'photo_sunt aute',
            _id: '5d43361408b0be57c010f051'
          },
          {
            media_id: 'I130204032-00_media_8',
            media_url: 's3://crimeportal/Capture.PNG_8',
            media_name: 'photo_enim laboris',
            _id: '5d43361408b0be57c010f050'
          },
          {
            media_id: 'I130204032-00_media_9',
            media_url: 's3://crimeportal/Capture.PNG_9',
            media_name: 'photo_id proident',
            _id: '5d43361408b0be57c010f04f'
          },
          {
            media_id: 'I130204032-00_media_10',
            media_url: 's3://crimeportal/Capture.PNG_10',
            media_name: 'photo_labore ut',
            _id: '5d43361408b0be57c010f04e'
          }, {
            media_id: 'I130204032-00_media_1',
            media_url: 's3://crimeportal/Capture.PNG_1',
            media_name: 'photo_est deserunt',
            _id: '5d43361408b0be57c010f057'
          },
          {
            media_id: 'I130204032-00_media_2',
            media_url: 's3://crimeportal/Capture.PNG_2',
            media_name: 'photo_deserunt ad',
            _id: '5d43361408b0be57c010f056'
          },
          {
            media_id: 'I130204032-00_media_3',
            media_url: 's3://crimeportal/Capture.PNG_3',
            media_name: 'photo_pariatur enim',
            _id: '5d43361408b0be57c010f055'
          },
          {
            media_id: 'I130204032-00_media_4',
            media_url: 's3://crimeportal/Capture.PNG_4',
            media_name: 'photo_exercitation labore',
            _id: '5d43361408b0be57c010f054'
          },
          {
            media_id: 'I130204032-00_media_5',
            media_url: 's3://crimeportal/Capture.PNG_5',
            media_name: 'photo_ad sint',
            _id: '5d43361408b0be57c010f053'
          },
          {
            media_id: 'I130204032-00_media_6',
            media_url: 's3://crimeportal/Capture.PNG_6',
            media_name: 'photo_eiusmod sunt',
            _id: '5d43361408b0be57c010f052'
          },
          {
            media_id: 'I130204032-00_media_7',
            media_url: 's3://crimeportal/Capture.PNG_7',
            media_name: 'photo_sunt aute',
            _id: '5d43361408b0be57c010f051'
          },
          {
            media_id: 'I130204032-00_media_8',
            media_url: 's3://crimeportal/Capture.PNG_8',
            media_name: 'photo_enim laboris',
            _id: '5d43361408b0be57c010f050'
          },
          {
            media_id: 'I130204032-00_media_9',
            media_url: 's3://crimeportal/Capture.PNG_9',
            media_name: 'photo_id proident',
            _id: '5d43361408b0be57c010f04f'
          },
          {
            media_id: 'I130204032-00_media_10',
            media_url: 's3://crimeportal/Capture.PNG_10',
            media_name: 'photo_labore ut',
            _id: '5d43361408b0be57c010f04e'
          }, {
            media_id: 'I130204032-00_media_1',
            media_url: 's3://crimeportal/Capture.PNG_1',
            media_name: 'photo_est deserunt',
            _id: '5d43361408b0be57c010f057'
          },
          {
            media_id: 'I130204032-00_media_2',
            media_url: 's3://crimeportal/Capture.PNG_2',
            media_name: 'photo_deserunt ad',
            _id: '5d43361408b0be57c010f056'
          },
          {
            media_id: 'I130204032-00_media_3',
            media_url: 's3://crimeportal/Capture.PNG_3',
            media_name: 'photo_pariatur enim',
            _id: '5d43361408b0be57c010f055'
          },
          {
            media_id: 'I130204032-00_media_4',
            media_url: 's3://crimeportal/Capture.PNG_4',
            media_name: 'photo_exercitation labore',
            _id: '5d43361408b0be57c010f054'
          },
          {
            media_id: 'I130204032-00_media_5',
            media_url: 's3://crimeportal/Capture.PNG_5',
            media_name: 'photo_ad sint',
            _id: '5d43361408b0be57c010f053'
          },
          {
            media_id: 'I130204032-00_media_6',
            media_url: 's3://crimeportal/Capture.PNG_6',
            media_name: 'photo_eiusmod sunt',
            _id: '5d43361408b0be57c010f052'
          },
          {
            media_id: 'I130204032-00_media_7',
            media_url: 's3://crimeportal/Capture.PNG_7',
            media_name: 'photo_sunt aute',
            _id: '5d43361408b0be57c010f051'
          },
          {
            media_id: 'I130204032-00_media_8',
            media_url: 's3://crimeportal/Capture.PNG_8',
            media_name: 'photo_enim laboris',
            _id: '5d43361408b0be57c010f050'
          },
          {
            media_id: 'I130204032-00_media_9',
            media_url: 's3://crimeportal/Capture.PNG_9',
            media_name: 'photo_id proident',
            _id: '5d43361408b0be57c010f04f'
          },
          {
            media_id: 'I130204032-00_media_10',
            media_url: 's3://crimeportal/Capture.PNG_10',
            media_name: 'photo_labore ut',
            _id: '5d43361408b0be57c010f04e'
          }
      ]
}
export class IncidentMedia extends Component {
   
    constructor(props){
        super(props)
        this.state={
            images:[],
            images_loaded:10,
            max_images_reached:false,
        }
    }
    showMore = ()=>{
        if(this.state.images_loaded >= data.photos.length){
            this.setState({max_images_reached:true})
            return
        }
        let images = this.state.images
        let new_images = data.photos.slice(this.state.images_loaded,this.state.images_loaded+10)
        images = images.concat(new_images)
        let images_loaded = this.state.images_loaded
        images_loaded +=10
        this.setState({images,images_loaded})
    }

    showLess = ()=>{
        let images = this.state.images
        let new_images = images.slice(0,10)
        let images_loaded = 10
        this.setState({images:new_images,images_loaded,max_images_reached:false})
    }

    componentDidMount(){
        this.setState({images:data.photos.slice(0,10)})
    }

    render() {
        let photos = this.state.images
        return (
            <Fragment>
                <h3> Photos</h3>
                <div className="image-grid">
                    {photos.map(photo=>(
                        <div className="image-item">
                            <img src="/assets/poster.png"/>
                        </div>
                    ))}
                </div>
                {this.state.max_images_reached ?<button onClick={this.showLess}>Show Less</button>:<button onClick={this.showMore}>Show More</button>}

                <h3>Videos</h3>
                <div className="video_carousel">
                <Carousel showThumbs={false} >
                  {data.videos.map(video=><VideoPlayerCard/>)}
                </Carousel>
                </div>

                <h3>Audio Clips</h3>
                <div className="audio_carousel">
                <Carousel showThumbs={false} >
                  {data.audios.map(audio=><AudioPlayerCard/>)}
                </Carousel>
                </div>
            </Fragment>
        )
    }
}





export default connect(null, null)(IncidentMedia)
