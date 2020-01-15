
import React, { Component, Fragment } from "react";
import * as d3 from 'd3'
// note data has to be of form


var width = 700;
var height = 500;
var margin = 50;
var duration = 250;

var lineOpacity = "0.25";
var lineOpacityHover = "0.85";
var otherLinesOpacityHover = "0.1";
var lineStroke = "1.5px";
var lineStrokeHover = "2.5px";

var circleOpacity = '0.85';
var circleOpacityOnLineHover = "0.25"
var circleRadius = 3;
var circleRadiusHover = 6;





export default class LineGraphD3 extends Component {

  drawBarChart(data) {
    /* Format Data */
    var parseDate = d3.timeParse("%Y");
    data.map(d=> { 
      d.values.map( d=> {
        d.x = parseDate(d.x) 
        d.y = d.y;
      });
    })

    /* Scale */
var xScale = d3.scaleTime()
.domain(d3.extent(data[0].values, d => d.x))
.range([0, width-margin]);

var yScale = d3.scaleLinear()
.domain([d3.min(data[0].values, d => d.y)-50, d3.max(data[0].values, d => d.y)])
.range([height-margin, 0]);

var color = d3.scaleOrdinal(d3.schemeCategory10);

/* Add SVG */

var svg = d3.select(this.refs.canvas).append("svg")
.attr("width", (width+margin)+"px")
.attr("id","svg_id")
.attr("height", (height+margin)+"px")
.append('g')
.attr("transform", `translate(${margin}, ${margin})`);


/* Add line into SVG */
var line = d3.line()
.x(d => xScale(d.x))
.y(d => yScale(d.y));

let lines = svg.append('g')
.attr('class', 'lines');

lines.selectAll('.line-group')
.data(data).enter()
.append('g')
.attr('class', 'line-group')  
.on("mouseover", function(d, i) {
    svg.append("text")
      .attr("class", "title-text")
      .style("fill", color(i))        
      .text(d.name)
      .attr("text-anchor", "middle")
      .attr("x", (width-margin)/2)
      .attr("y", 5);
  })
.on("mouseout", function(d) {
    svg.select(".title-text").remove();
  })
.append('path')
.attr('class', 'line')  
.attr('d', d => line(d.values))
.style('stroke', (d, i) => color(i))
.style('opacity', lineOpacity)
.on("mouseover", function(d) {
    d3.selectAll('.line')
        .style('opacity', otherLinesOpacityHover);
    d3.selectAll('.circle')
        .style('opacity', circleOpacityOnLineHover);
    d3.select(this)
      .style('opacity', lineOpacityHover)
      .style("stroke-width", lineStrokeHover)
      .style("cursor", "pointer");
  })
.on("mouseout", function(d) {
    d3.selectAll(".line")
        .style('opacity', lineOpacity);
    d3.selectAll('.circle')
        .style('opacity', circleOpacity);
    d3.select(this)
      .style("stroke-width", lineStroke)
      .style("cursor", "none");
  });


/* Add circles in the line */
lines.selectAll("circle-group")
.data(data).enter()
.append("g")
.style("fill", (d, i) => color(i))
.selectAll("circle")
.data(d => d.values).enter()
.append("g")
.attr("class", "circle")  
.on("mouseover", function(d) {
    d3.select(this)     
      .style("cursor", "pointer")
      .append("text")
      .attr("class", "text")
      .text(`${d.y}`)
      .attr("x", d => xScale(d.x) + 5)
      .attr("y", d => yScale(d.y) - 10);
  })
.on("mouseout", function(d) {
    d3.select(this)
      .style("cursor", "none")  
      .transition()
      .duration(duration)
      .selectAll(".text").remove();
  })
.append("circle")
.attr("cx", d => xScale(d.x))
.attr("cy", d => yScale(d.y))
.attr("r", circleRadius)
.style('opacity', circleOpacity)
.on("mouseover", function(d) {
      d3.select(this)
        .transition()
        .duration(duration)
        .attr("r", circleRadiusHover);
    })
  .on("mouseout", function(d) {
      d3.select(this) 
        .transition()
        .duration(duration)
        .attr("r", circleRadius);  
    });


/* Add Axis into SVG */
var xAxis = d3.axisBottom(xScale).ticks(5);
var yAxis = d3.axisLeft(yScale).ticks(5);

svg.append("g")
.attr("class", "x axis")
.attr("transform", `translate(0, ${height-margin})`)
.call(xAxis);

svg.append("g")
.attr("class", "y axis")
.call(yAxis)
.append('text')
.attr("y", 15)
.attr("transform", "rotate(-90)")
.attr("fill", "#000")
.text("Total values");
  }
  componentDidMount() {
    console.log("hi here ")
    
    this.drawBarChart(this.props.data)
  }

  componentDidUpdate() {
    console.log("hi here CDU ")
    d3.select("#svg_id").remove();
    
    this.drawBarChart(this.props.data)
  }
  render() {
    // console.log("hi here render ")
    return (
      <Fragment>
        <svg width={this.props.width?this.props.width:760} height={this.props.height?this.props.height:600} ref="canvas"></svg>
        <div ref="tooltip"></div>

      </Fragment>
    )
  }
}