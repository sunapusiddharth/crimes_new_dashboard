import React, { Component } from 'react'
import { connect } from 'react-redux'

export class DepartmentRecentBogs extends Component {
    render() {
        let bgImg = '/assets/police_bg.jpg'
        let divStyle = {
            color: 'blue',
            // backgroundImage: 'url(' + this.props.single_crime.urlToImage?this.props.single_crime.urlToImage:'/assets/crime_news_background.jpg' + ')',
            backgroundImage: `url(${bgImg})`,
        }
        return (
            <Fragment>
            <Jumbotron style={divStyle} fluid>
                </Jumbotron>
                </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    
})



export default connect(mapStateToProps, null)(DepartmentRecentBogs)
