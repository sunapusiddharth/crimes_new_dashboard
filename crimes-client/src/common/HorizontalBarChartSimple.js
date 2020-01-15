import React, { Component, Fragment } from 'react'
import * as d3 from 'd3'
import '../styles/horizontal_bar_chart_simple.css'

export default class HorizontalBarChartSimple extends Component {
    drawHorizontalBarChartSimple(data, canvas, tooltip) {
        // let data = [
        //     {"area": "central ", "value": 18000},
        //     {"area": "Riverside ", "value": 17000},
        //     {"area": "Picton ", "value": 80000},
        //     {"area": "Everton ", "value": 55000},
        //     {"area": "Kensington ", "value": 100000},
        //     {"area": "Kirkdale", "value": 50000},
        //     {"area": "central ", "value": 18000},
        //     {"area": "Riverside2 ", "value": 17000},
        //     {"area": "Picton2 ", "value": 80000},
        //     {"area": "Everton2 ", "value": 55000},
        //     {"area": "Kensingtaon ", "value": 100000},
        //     {"area": "Kirkdaale", "value": 50000},
        //     {"area": "centrEWal ", "value": 18000},
        //     {"area": "RiverDAside ", "value": 17000},
        //     {"area": "PictAon ", "value": 80000},
        //     {"area": "EverSton ", "value": 55000},
        //     {"area": "KensiFngton ", "value": 100000},
        //     {"area": "KirkdWale", "value": 50000},

            
        // ]
        var svg = d3.select(canvas),
            margin = { top: 20, right: 10, bottom: 10, left: 80 },
            width = +svg.attr("width") - margin.left - margin.right,
            height = +svg.attr("height") - margin.top - margin.bottom;

        var tooltip = d3.select(tooltip).append("div").attr("class", "toolTip");

        var x = d3.scaleLinear().range([0, width]);
        var y = d3.scaleBand().range([height, 0]);

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
            data.sort(function (a, b) { return a.value - b.value; });
            x.domain([0, d3.max(data, function (d) { return d.value; })]);
            y.domain(data.map(function (d) { return d.area; })).padding(0.1);
            g.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).ticks(5).tickFormat(function (d) { return parseInt(d / 1000); }).tickSizeInner([-height]));
            g.append("g")
                .attr("class", "y axis")
                .call(d3.axisLeft(y));
            g.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", 0)
                .attr("height", y.bandwidth())
                .attr("y", function (d) { return y(d.area); })
                .attr("width", function (d) { return x(d.value); })
                .on("mousemove", function (d) {
                    tooltip
                        .style("left", d3.event.pageX - 10 + "px")
                        .style("top", d3.event.pageY - 10 + "px")
                        .style("display", "inline-block")
                        .html((d.area) + "<br>"+ (d.value));
                })
                .on("mouseout", function (d) { tooltip.style("display", "none"); });
    }

    componentDidMount(){
        this.drawHorizontalBarChartSimple(this.props.data, this.refs.canvas, this.refs.tooltip)
    }

    componentDidUpdate() {
        this.drawHorizontalBarChartSimple(this.props.data, this.refs.canvas, this.refs.tooltip)
    }

    render() {
        console.log("called from horizontal simple d3",this.props.data)
        return (
            <Fragment>
                <div className="bar_chart_d3_container">
                <svg width={this.props.width?this.props.width:760} height={this.props.height?this.props.height:600} ref="canvas"></svg>
                <div ref="tooltip"></div>
                </div>
            </Fragment>
        )
    }
}
