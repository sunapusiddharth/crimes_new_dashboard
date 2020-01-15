// for showing grouped bar chart with drill down 
//eg - first screen - number on y offense_code grouped by male and female agencies population 

import Highcharts from 'highcharts';
import React, { Component } from 'react'
import HC_exporting from 'highcharts/modules/exporting'
// import HighchartsReact from 'highcharts-react-official'

HC_exporting(Highcharts)


export default class PieChartHighcharts extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     series: [{
        //           name: 'Gases',
        //           data: [
        //             {
        //               name: 'Argon',
        //               y: 0.9,
        //               color: '#3498db'
        //             },
        //             {
        //               name: 'Nitrogen',
        //               y: 78.1,
        //               color: '#9b59b6'
        //             },
        //             {
        //               name: 'Oxygen',
        //               y: 20.9,
        //               color: '#2ecc71'
        //             },
        //             {
        //               name: 'Trace Gases',
        //               y: 0.1,
        //               color: '#f1c40f'
        //             }
        //           ]
        //         }]
        // }
    //     this.state = { seconds: 0 };
    // this.chart;
    // this.exportChart = () => {
    //   this.chart.exportChart();
    // };
    }


    highChartsRender(data,title) {
        Highcharts.chart({
            chart: {
              type: 'pie',
              // renderTo: this.props.chart_id?this.props.chart_id:"atmospheric-composition"
              renderTo: "atmospheric-composition"

            },
            title: {
              verticalAlign: 'middle',
              floating: true,
              text: title,
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
            series: data
          });
    }
    componentDidMount() {
        this.highChartsRender(this.props.data,this.props.title);
      }

      componentDidUpdate() {
        this.highChartsRender(this.props.data);
      }

    render() {
      console.log("inisde piehhigh",this.props.data)
        return (
            // <div id={this.props.chart_id?this.props.chart_id:"atmospheric-composition"}>
               <div id="atmospheric-composition">
            </div>
        );
      }
}


