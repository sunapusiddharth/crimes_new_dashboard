import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PageLoader from '../../../../common/PageLoader';
import PieChart from '../../../../common/PieChart';
import PieChartHighcharts from '../../../../common/PieChartHighcharts';
import randomColor from 'randomcolor';

 class CrimePie extends Component {

    constructor(){
        super()
        this.state={

        }
    }

    render() {
        if(this.props.victims_loading && this.props.offender_loading){
            return <PageLoader loading={this.props.victims_loading && this.props.offender_loading}/>
        }else{
            // if(!this.props.victims_data.length || !this.props.offender_data.length){
            //     return <div className="no_results">No results</div>
            // }else{
                let offender_data
                let victim_data =[]
                console.log("victims data ",this.props.victims_data)
                if(this.props.victims_data.length){
                    Object.keys(this.props.victims_data[0]).map(key=>{
                        if(key !== 'data_year'){
                            victim_data.push({
                                name:key,y:this.props.victims_data[0][key],color:randomColor({
                                    hue: 'blue'
                                })
                            })
                        }
                    })
                   
                }
                let victim_series = [
                    [{
                        name:"Victims",
                        data:victim_data
                    }]
                ]
               
                // if(this.props.offender_data.length){
                //     let offender = this.props.offender_data[0].data.length &&  this.props.offender_data[0].data.filter(data=>data.data_year == this.props.crime_end_year)
                //     offender_data = [
                //         {"name":"male","value":offender[0].value},
                //         { "name":"female","value":offender[1].value},
                //         { "name":"unknown","value":offender[2].value}
                //     ]
                // }
               
                return (
                    <div className="row">
                      {/* <div className="col">
                          {offender_data ?<Fragment>
                            <h3>Offender {this.props.variable_key}</h3>
                          <PieChartHighcharts data={offender_data} title=""/>
                          </Fragment>:<p>No results found</p>}
                      </div> */}
                      <div className="col">
                      <div className="col">
                          {victim_data.length ?<Fragment>
                            <h3>Victim {this.props.variable_key}</h3>
                          <PieChartHighcharts data={victim_series[0]} title=""/>
                          </Fragment>:<p>No results found</p>}
                      </div>
                      </div>
                    </div>
                )
            // }
        }
    }
}

const mapStateToProps = (state) => ({
    victims_loading:state.cdeReducer.victims_loading,
    victims_data:state.cdeReducer.victims_data,
    selected_state:state.cdeReducer.selected_state,
    offender_loading:state.cdeReducer.offender_loading,
    offender_data:state.cdeReducer.offender_data,
})


export default connect(mapStateToProps, null)(CrimePie)
