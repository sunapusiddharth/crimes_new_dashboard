// for showing grouped bar chart with drill down 
//eg - first screen - number on y offense_code grouped by male and female agencies population 

import Highcharts from 'highcharts';
import React, { Component, Fragment } from 'react'
import drilldown from "highcharts/modules/drilldown.js";
drilldown(Highcharts);


export default class GroupedDrillChartArrestsJuvenile extends Component {
    constructor(props) {
        super(props)
    }


    highChartsRender(chart_data) {
        Highcharts.chart({
            chart: {
                type: 'column',
                renderTo: 'container'
            },
            title: {
                text: chart_data.title
            },
            subtitle: {
              text: 'Click the columns to view details.'
            },
            xAxis: {
                type: 'category',
                // categories:chart_data.categories
            },
    
            legend: {
                enabled: true
            },
    
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                    }
                }
            },
            tooltip: {
              headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            //   pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },
            drilldown: {
              series: chart_data.drilldown_series  },
            series: [
                      {
                        "name": "total male",
                        "data":chart_data.total_male_series_data
                      },
                      {
                        "name": "total female",
                        "data":chart_data.total_female_series_data
                      },
                      {
                        "name": "total agencies",
                        "data":chart_data.total_agencies_data
                      },
                      
                      
                    ]
        });
    }
    componentDidMount() {
        console.log("called from CDM")
        this.highChartsRender(this.props.chart_data);
      }
      componentDidUpdate() {
          console.log("called from CDU")
        this.highChartsRender(this.props.chart_data);
      }

    render() {
        console.log(this.props.chart_data)
        return (
            <Fragment>
            <div id="container" style={{minWidth: "890px", height: "800px", margin: "0 auto"}}>
            </div>
            </Fragment>
            
        );
      }
}


