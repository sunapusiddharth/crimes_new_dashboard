import React, { Component } from 'react';
import {connect} from 'react-redux'
import randomColor from 'randomcolor';
import TagCloud from 'react-tag-cloud';
import '../../styles/word_cloud.css'
import {fetchWordCloud} from '../../actions/searchActions'
import PageLoader from '../../common/PageLoader';

const styles = {
  large: {
    fontSize: 60,
    fontWeight: 'bold'
  },
  small: {
    opacity: 0.7,
    fontSize: 16
  }
};

const fontFamily = ['sans-serif','serif','courier']
const fontWeight = ['bold',200,300,100,400]
const fontStyle = ['italic','']

class WordCloud extends Component {
  componentDidMount() {
    this.props.dispatch(fetchWordCloud())
    setInterval(() => {
      this.forceUpdate();
    }, 3000);
  }

  render() {
    if (this.props.word_cloud_loading) {
      return <PageLoader loading={this.props.word_cloud_loading}/>
    } else {
      if( !Object.keys(this.props.word_cloud).length){
        return <div className="no_results page_layout">No data found</div>
    }else{
      var buckets_arr = this.props.word_cloud.aggregations["top_5_offense_code_groups"].buckets
      let three_max_bucket = buckets_arr.splice(0,3)
      return (
        <div className='app-outer'>
          <div className='app-inner'>
            <h1>react-tag-cloud demo</h1>
            <TagCloud 
              className='tag-cloud'
              style={{
                fontFamily: 'sans-serif',
                //fontSize: () => Math.round(Math.random() * 50) + 16,
                fontSize: 30,
                color: () => randomColor({
                  hue: 'blue'
                }),
                padding: 5,
              }}>
              {three_max_bucket.map((bucket,index)=>{
                 return <CloudItemLarge key={`word-cloud-${index}`} text={bucket.key} count={bucket.doc_count}/>
              })}
              {buckets_arr.map((bucket,index)=>{
                let random_number = Math.round(Math.random() * buckets_arr.length)
                if(random_number< buckets_arr.length/2){
                  return <CloudItemMedium text={bucket.key} key={`word-cloud-${index}`} count={bucket.doc_count}/>
                }else{
                  return <CloudItemSmall text={bucket.key} key={`word-cloud-${index}`} count={bucket.doc_count}/>
                }
              })}
            </TagCloud>
          </div>
        </div>
      );
    }
    }
   
  }
}


const CloudItemSmall = (props) => (
  <div { ...props } className="tag-item-wrapper">
      <div  style={{
        opacity: 0.7,
        fontSize: 16,
        color: randomColor()
      }}>
          { props.text }
      </div>
      <div className="tag-item-tooltip">
          Appeared {props.count} times
      </div>
  </div>
);

const CloudItemLarge = (props) => (
  <div { ...props } className="tag-item-wrapper">
      <div  style={{
        fontSize: 60,
        fontWeight: 'bold',
        color: randomColor()
      }}>
          { props.text }
      </div>
      <div className="tag-item-tooltip">
        Appeared {props.count} times
      </div>
  </div>
);

const CloudItemMedium = (props) => (
  <div { ...props } className="tag-item-wrapper">
      <div  style={{
        fontSize:30,
        fontWeight: 'bold',
        color: randomColor()
      }}>
          { props.text }
      </div>
      <div className="tag-item-tooltip">
        Appeared {props.count} times
      </div>
  </div>
);

const mapStateToProps = state=>({
  word_cloud:state.searchReducer.word_cloud,
  word_cloud_loading:state.searchReducer.word_cloud_loading
})
export default connect(mapStateToProps,null)(WordCloud)
