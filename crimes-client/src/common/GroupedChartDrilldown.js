// for showing grouped bar chart with drill down 
//eg - first screen - number on y offense_code grouped by male and female agencies population 

import Highcharts from 'highcharts';
import React, { Component } from 'react'
import drilldown from "highcharts/modules/drilldown.js";
drilldown(Highcharts);


export default class GroupedChartDrilldown extends Component {
    constructor(props) {
        super(props)
    }


    highChartsRender() {
        Highcharts.chart({
            chart: {
                type: 'column',
                renderTo: 'container'
            },
            title: {
                text: 'Basic drilldown'
            },
            xAxis: {
                type: 'category',
                categories: [
                              "2011-12",
                              "2012-13",
                              "2013-14",
                              "2014-15",
                              "2015-16"
                            ]
                
            },
    
            legend: {
                enabled: false
            },
    
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                    }
                }
            },
                    drilldown : {
                        series: [
                          {
                    name: 'Test Drilldown male_stolen_property',
                    id: 'male_stolen_property',
                    data: [
                        [ 'data A', 24.13 ],
                        [ 'data B', 17.2 ],
                        [ 'data C', 8.11 ],
                        [ 'data D', 5.33 ]
                    ]
                },
                {
                    name: 'Test Drilldown',
                    id: 'test2',
                    data: [
                        [ 'data S', 224.13 ],
                        [ 'data F', 117.2 ],
                        [ 'data G', 68.11 ],
                        [ 'data H', 55.33 ]
                    ]
                }]
            },
            series: [
                      {
                        "name": "First",
                        "data": [
                          { y: 40351.62, drilldown: 'male_stolen_property' },
                          51506.83,
                          68566.23,
                          80596.9228,
                          94329.31
                        ]
                      },
                      {
                        "name": "Second",
                        "data": [
                          {y:40750.4963,drilldown: 'test2'},
                          56205.181,
                          63776.2866,
                          74912.5923,
                          83801.83617
                        ]
                      },
                      {
                        "name": "Third",
                        "data": [
                          28589.0331305,
                          40716.9008376,
                          42050.10774,
                          54934.329763,
                          1811.2277
                        ]
                      },
                      {
                        "name": "Forth",
                        "data": [
                          38022.7637359,
                          52503.122283245,
                          59760.3037668,
                          71143.7222503,
                          27.60156
                        ]
                      }
                    ]
        });
    }
    componentDidMount() {
        this.highChartsRender();
      }

    render() {
        return (
            <div id="container">
            </div>
        );
      }
}


