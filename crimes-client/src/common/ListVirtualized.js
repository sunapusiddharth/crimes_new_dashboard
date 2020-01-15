import React, { Component } from 'react';
import '../styles/infine_scroll_virtualized.css'

import faker from 'faker'

import { List, AutoSizer, ScrollSync,InfiniteLoader } from "react-virtualized";
import PageLayout from '../components/departments/PageLayout';
import PageLoader from './PageLoader';

const rowCount = 1000;
const rowHeight = 150;

// This example assumes you have a way to know/load this information
const remoteRowCount=1000

const list = [];


class ListVirtualized extends Component {
  constructor() {
    super();
    this.renderRow = this.renderRow.bind(this);
    this.renderColumn = this.renderColumn.bind(this);
    this.state={
        list:[]
    }
  }

  componentDidMount(){
    fetch(`http://localhost:8004/api/forms/faker_data`).then(res=>res.json()).then(data=>{
        this.setState({...list,list:this.state.list.concat(data)})
    }).catch(error=>console.log(error))
  }

    isRowLoaded = ({ index })=> {
    return !!this.state.list[index];
  }

    loadMoreRows =({ startIndex, stopIndex }) =>{
        fetch(`http://localhost:8004/api/forms/faker_data`).then(res=>res.json()).then(data=>{
            this.setState({...list,list:this.state.list.concat(data)})
        }).catch(error=>console.log(error))
  }
  
  renderColumn({ index, key, style }) {
    return (
          <div key={key} style={style} className="row">
            <div className="content">
              <div>{this.state.list[index].id}</div>
            </div>
          </div>
    );
  }
  
  renderRow({ index, key, style }) {
    return (
      <div key={key} style={style} className="row">
        <div className="image">
          <img src={this.state.list[index].image} alt="" />
        </div>
        <div className="content">
          <div>{this.state.list[index].name}</div>
          <div>{this.state.list[index].text}</div>
        </div>
      </div>
    );
  }
  
  render() {
      if (!this.state.list.length) {
          return <PageLoader loading={!this.state.list.length}/>
      } else {
          console.log('ISTING',this.state.list)
        return (
            <div className="App">
             
                <ScrollSync>
                  {({ onScroll, scrollTop, scrollLeft }) => (
                    <div className="list">
                      <span>{scrollTop} - {scrollLeft}</span>
                      <AutoSizer disableWidth>
                      {
                        ({ height }) => {
                          return (
                            <div>
                              <div 
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                }}>
                                  <List
                                    className="leftSide"
                                    width={50}
                                    height={height}
                                    rowHeight={rowHeight}
                                    scrollTop={scrollTop}
                                    rowRenderer={this.renderColumn}
                                    rowCount={this.state.list.length}
                                    overscanRowCount={3} />
                              </div>
                              <div
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 50,
                                }}>
                                  <List
                                    width={800}
                                    height={height}
                                    rowHeight={rowHeight}
                                    onScroll={onScroll}
                                    rowRenderer={this.renderRow}
                                    rowCount={this.state.list.length}
                                    overscanRowCount={3} />
                              </div>
                            </div>
                          )
                        }
                      }
                      </AutoSizer>
                    </div>
                  )
                }
                </ScrollSync>
            </div>
          ); 
      }
   
  }
}

export default ListVirtualized;