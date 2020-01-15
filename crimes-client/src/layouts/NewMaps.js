import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchEstimatedCrimesHeatMap} from '../actions/cdeActions'
import HeatMapD3 from '../common/HeatmapD3';
import PageLoader from '../common/PageLoader';

 class NewMaps extends Component {

    constructor(){
        super()
        
    }

    componentDidMount(){
        this.props.dispatch(fetchEstimatedCrimesHeatMap())
    }

    render() {
        if(this.props.estimated_crimes_heat_map_data_loading){
            return <PageLoader loading={this.props.estimated_crimes_heat_map_data_loading}/>
        }else{
            return (
                <div>
                    <h4 className="w3-left-align">Estimated Crimes Heat Map</h4>
                    <p className="w3-left-align">This heat map shows the year in which most crimes were commited. Click on the bar to filter results based on crimes committed</p>
                    {this.props.estimated_crimes_heat_map_data.length ?<HeatMapD3 data={this.props.estimated_crimes_heat_map_data}/>:<div className="no_data">No Data</div>}
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    estimated_crimes_heat_map_data_loading:state.cdeReducer.estimated_crimes_heat_map_data_loading,
    estimated_crimes_heat_map_data: state.cdeReducer.estimated_crimes_heat_map_data,
})



export default connect(mapStateToProps, null)(NewMaps)
