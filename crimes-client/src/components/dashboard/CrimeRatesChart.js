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
              type: 'pie',
              // renderTo: this.props.chart_id?this.props.chart_id:"atmospheric-composition"
              renderTo: "atmospheric-composition",
              events:{
                  load:function(){
                      var series = this.series[0]
                      console.log("series",series)
                      socket.on("estimated_crimes",function(data){
                          let total_crimes = 0
                          Object.keys(data[0]).map((key,index)=>{if(key !== 'population')total_crimes+=data[0][key]})
                        Object.keys(data[0]).map((key,index)=>{
                            switch (key) {
                                case 'burglary':
                                    series.data[0].update((data[0][key]/total_crimes)*100)       
                                    break;
                                    case 'homicide':
                                    series.data[1].update((data[0][key]/total_crimes)*100)
                                    break;
                                    case 'larceny':
                                        series.data[2].update((data[0][key]/total_crimes)*100)
                                    break;
                                    case 'motor_vehicle_theft':
                                        series.data[3].update((data[0][key]/total_crimes)*100)
                                    break;
                                    case 'property_crime':
                                        series.data[4].update((data[0][key]/total_crimes)*100)
                                    break;
                                    case 'rape_revised':
                                        series.data[5].update((data[0][key]/total_crimes)*100)
                                    break;
                                    case 'robbery':
                                        series.data[6].update((data[0][key]/total_crimes)*100)
                                    break;
                                    case 'violent_crime':
                                        series.data[7].update((data[0][key]/total_crimes)*100)
                                        break;
                            
                                default:
                                    break;
                            }
                        })
                        //   let value = data[0].population
                        //   series.addPoint([new Date().getTime(),value])
                      })
                  }
              }

            },
            title: {
              verticalAlign: 'middle',
              floating: true,
              text: "title",
              style: {
                  fontSize: '10px',
              }
            },
            plotOptions: {
              pie: {
                  dataLabels: {
                      format: '{point.name}: {point.percentage:.1f} %'
                  },
                innerSize: '70%'
              }
            },
            series: [{
                name:"crimes",
                data:[
                    {
                                name:"burglary",
                                y:0
                            },
                            {
                                name:"homicide",
                                y:0
                            },
                            {
                                name:"larceny",
                                y:0
                            },
                            {
                                name:"motor_vehicle_theft",
                                y:0
                            },
                            {
                                name:"property_crime",
                                y:0
                            },
                            {
                                name:"rape_revised",
                                y:0
                            },
                            {
                                name:"robbery",
                                y:50
                            },
                            {
                                name:"violent_crime",
                                y:50
                            }
                        ]
            }]
          });
    }


    componentDidMount() {
        let {socket} = this.props
        console.log("socket",socket)
        this.highChartsRender(socket);
      }

    render() {
        return (
            <div id="atmospheric-composition"></div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(CrimeRatesChart)



// events: {
//     load: function(){

//         socket.on('response', function(arr){
//             $('#c1').html(arr[0]);
//             sales+=arr[2];
//             $('#sales').html(sales);

//             if(arr[1]=="CT")
//             {
//                 e1tcount++; 
//                 $('#e1t').html(e1tcount);
//                 e1scount+=arr[2];
//                 $('#e1s').html(e1scount);
//                 //Tried this, doesnt work 
//                 var sold=chart.series[0].data[0].y;
//                 chart.series[0].data[0].update(sold+1);
//             }
//             if(arr[1]=="AB")
//             {
//                 e2tcount++;
//                 $('#e2t').html(e2tcount);
//                 e2scount+=arr[2];
//                 $('#e2s').html(e2scount);
//             }
//         });

//     }
// }
// },