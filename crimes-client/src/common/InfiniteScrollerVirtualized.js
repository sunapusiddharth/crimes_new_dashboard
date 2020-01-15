import React from 'react'
import faker from 'faker'

import { Table, Column, AutoSizer, InfiniteLoader,List } from 'react-virtualized'
const generateRandomItem = (idx) => ({
   id: idx,
   name: faker.name.findName(),
   email: faker.internet.email()
})

export default class InfinteScrollerVirtualized extends React.Component {
   constructor () {
      super()
      this.loadMore = this.loadMore.bind(this)
      // fake data
      let items = []
      for (let i = 0, l = 100; i < l; i++) {
         items.push(generateRandomItem(i))
      }
      this.state = {
         items: items
      }
   }
   
   loadMore () {
      // simulate a request
      setTimeout(() => {this.actuallyLoadMore()}, 500)
      // we need to return a promise
      return new Promise((resolve, reject) => {
         this.promiseResolve = resolve;
      })
   }
   
   actuallyLoadMore () {
      // fake new data
      let newItems = []
      let s = this.state.items.length + 1
      for (let i = 0, l = 100; i < l; i++) {
         newItems.push(generateRandomItem(s + i))
      }
      this.setState({ items: this.state.items.concat(newItems)})
      // resolve the promise after data where fetched
      this.promiseResolve();
   }

   rowRenderer = ({ index, key, style })=> {
    return (
      <div key={key} style={style} className="row">
        
          <div>{this.state.items[index].name}</div>
         
      </div>
    );
  }
   
   render () {      
      return (
         <div className="container">
            <h1>Infinite scrolling autosize table example </h1>
            <InfiniteLoader
               isRowLoaded={({ index}) => !!this.state.items[index]}
               loadMoreRows={this.loadMore}
               rowCount={1000000}
            >
               {({onRowsRendered, registerChild}) => (
                  <AutoSizer>
                     {({ width}) => (
                         <List
                         ref={registerChild}
                         onRowsRendered={onRowsRendered}
                         rowCount={this.state.items.length}
                         className="leftSide"
                         width={50}
                         height={200}
                         rowHeight={20}
                         rowRenderer={this.rowRenderer}
                         rowCount={this.state.items.length}
                         overscanRowCount={3} />
                        )}
                  </AutoSizer>
               )}
            </InfiniteLoader>
      </div>
    )
  }
}