import React, { Component } from 'react'
import { connect } from 'react-redux'
import {thousand_separator} from '../../helpers/number_helper'
import Highcharts from 'highcharts';
import { func } from 'prop-types';

export class CrimeRatesChart extends Component {

    constructor(){
        super()
        this.state={
            crime_rates:0
        }
    }


    highChartsRender(socket){
        var series = {};
        series.name = 'KPI';
        series.data = [];
        Highcharts.chart({
            chart: {
              type: 'column',
              renderTo: "victims_live_chart",
              events:{
                  load:function(){
                    var series = this.series
                      console.log("series",series)
                      socket.on("victims_count",function(data){
                        data.map((victim,index)=>{
                            switch (victim._id) {
                                case 'gambling-equipment-violation':
                                    series[0].data[0].update(data[index].count)       
                                    break;
                                    case 'human-trafficking-commerical-involuntary-servitude':
                                        series[1].data[0].update(data[index].count)    
                                    break;
                                    case 'assisting-or-promoting-prostitution':
                                        series[2].data[0].update(data[index].count)    
                                    break;
                                    case 'purchasing-prostitution':
                                        series[3].data[0].update(data[index].count)    
                                    break;
                                    case 'bribery':
                                        series[4].data[0].update(data[index].count)    
                                    break;
                                    case 'human-trafficking-commerical-sex-acts':
                                        series[5].data[0].update(data[index].count)    
                                    break;
                                    case 'betting':
                                        series[6].data[0].update(data[index].count)    
                                    break;
                                    case 'animal-cruelty':
                                        series[7].data[0].update(data[index].count)    
                                        break;
                                        case 'hacking-computer-invasion':
                                            series[8].data[0].update(data[index].count)    
                                        break;
                            
                                default:
                                    break;
                            }
                        })
                      })
                  }
              }

            },
            yAxis: {
                min: 0,
                title: {
                  text: 'Victims count'
                }
              },
              tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}  {point.y:.1f}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                  '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
              },
              plotOptions: {
                column: {
                  pointPadding: 0.2,
                  borderWidth: 0
                }
              },
              series:[
                {name:"gambling-equipment-violation",data:[1234]},
                {name:"human-trafficking-commerical-involuntary-servitude",data:[1233]},
                {name:"assisting-or-promoting-prostitution",data:[567]},
                {name:"purchasing-prostitution",data:[8543]},
                {name:"bribery",data:[5678]},
                {name:"human-trafficking-commerical-sex-acts",data:[3457]},
                {name:"betting",data:[4678]},
                {name:"animal-cruelty",data:[5677]},
                {name:"hacking-computer-invasion",data:[5897]}
              ]
          });
    }


    componentDidMount() {
        let {socket} = this.props
        console.log("socket",socket)
        this.highChartsRender(socket);
      }

    render() {
        return (
            <div id="victims_live_chart"></div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CrimeRatesChart)