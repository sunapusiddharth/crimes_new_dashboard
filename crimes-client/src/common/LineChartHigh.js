import React,{Component} from 'react'
import Highcharts from 'highcharts';

export default class LineChartHigh extends Component {
  

    highChartsRender(series,subtitle,ytitle,title,pointStart,chart_id) {
        // Create the chart
        Highcharts.chart(chart_id?chart_id:'container_line_chart_pe', {

            title: {
                text: title
            },
        
            subtitle: {
                text: subtitle
            },
        
            yAxis: {
                title: {
                    text: ytitle
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
        
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: pointStart
                }
            },
        
            // series: [{
            //     name: 'Installation',
            //     data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
            // }, {
            //     name: 'Manufacturing',
            //     data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
            // }, {
            //     name: 'Sales & Distribution',
            //     data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
            // }, {
            //     name: 'Project Development',
            //     data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
            // }, {
            //     name: 'Other',
            //     data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
            // }],
            series:series,
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }
        
        });
    }
    componentDidMount() {
        let {series,subtitle,ytitle,title,pointStart,chart_id} = this.props
        this.highChartsRender(series,subtitle,ytitle,title,pointStart,chart_id);
      }

      componentDidUpdate() {
        let {series,subtitle,ytitle,title,pointStart,chart_id} = this.props
        this.highChartsRender(series,subtitle,ytitle,title,pointStart,chart_id);
      }

    render() {
        return (
            <div id={this.props.chart_id?this.props.chart_id:"container_line_chart_pe"}>
            </div>
        );
      }
}



