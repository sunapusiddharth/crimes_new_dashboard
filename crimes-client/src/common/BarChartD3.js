import React,{ Component,Fragment } from "react";
import * as d3 from 'd3'
import '../styles/bar_chart.sass'

class BarChartD3 extends Component{

     data = [
        { letter: 'A', frequency: 0.08167 },
        { letter: 'B', frequency: 0.01492 },
        { letter: 'C', frequency: 0.02782 },
        { letter: 'D', frequency: 0.04253 },
        { letter: 'E', frequency: 0.12702 },
        { letter: 'F', frequency: 0.02288 },
        { letter: 'G', frequency: 0.02015 },
        { letter: 'H', frequency: 0.06094 },
        { letter: 'I', frequency: 0.06966 },
        { letter: 'J', frequency: 0.00153 },
        { letter: 'K', frequency: 0.00772 },
        { letter: 'L', frequency: 0.04025 },
        { letter: 'M', frequency: 0.02406 },
        { letter: 'N', frequency: 0.06749 },
        { letter: 'O', frequency: 0.07507 },
        { letter: 'P', frequency: 0.01929 },
        { letter: 'Q', frequency: 0.00095 },
        { letter: 'R', frequency: 0.05987 },
        { letter: 'S', frequency: 0.06327 },
        { letter: 'T', frequency: 0.09056 },
        { letter: 'U', frequency: 0.02758 },
        { letter: 'V', frequency: 0.00978 },
        { letter: 'W', frequency: 0.02360 },
        { letter: 'X', frequency: 0.00150 },
        { letter: 'Y', frequency: 0.01974 },
        { letter: 'Z', frequency: 0.00074 },
      ];
      
    drawBarChart = (data,canvas,tooltip)=>{
      
          var margin = { top: 20, right: 20, bottom: 100, left: 80 };
          var width = 860 - margin.left - margin.right;
          var height = 700 - margin.top - margin.bottom;
          
          var xScale = d3.scaleBand()
            .range([0, width])
            .round(true)
            .paddingInner(0.1); // space between bars (it's a ratio)
          
          var yScale = d3.scaleLinear()
            .range([height, 0]);
          
          var xAxis = d3.axisBottom()
            .scale(xScale);
          
          var yAxis = d3.axisLeft()
            .scale(yScale);
            // .ticks(10, '%');
          
          var svg = d3.select(canvas)
            .append('svg')
            .attr("id","svg_id")
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.right})`);
          
          var tooltip = d3.select(tooltip).append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);
          
          xScale
            .domain(data.map(d => d.letter));
          yScale
            .domain([0, d3.max(data, d => d.frequency)]);
          
            svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");
          
          svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 6)
            .attr('dy', '.71em')
            .style('text-anchor', 'end')
            .text('Count per thousands');
          
          svg.selectAll('.bar').data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', d => xScale(d.letter))
            .attr('width', xScale.bandwidth())
            .attr('y', d => yScale(d.frequency))
            .attr('height', d => height - yScale(d.frequency))
            .on('mouseover', (d) => {
              tooltip.transition().duration(200).style('opacity', 0.9);
              tooltip.html(`Frequency: <span>${d.frequency}</span>`)
                .style('left', `${d3.event.layerX}px`)
                .style('top', `${(d3.event.layerY - 28)}px`);
            })
            .on('mouseout', () => tooltip.transition().duration(500).style('opacity', 0));
          
    }
    componentDidMount(){
      let data = this.props.data ? this.props.data : this.data
      console.log("from bar chart d3 CDM",data)
        this.drawBarChart(data,this.refs.canvas_bar_chart,this.refs.tooltip)
    }

    componentDidUpdate(){
      d3.select("#canvas_bar_chart_id").selectAll("svg").remove()
      let data = this.props.data ? this.props.data : this.data
      console.log("from bar chart d3 CDU",data)
        this.drawBarChart(data,this.refs.canvas_bar_chart,this.refs.tooltip)
    }


    render() {
        return (
            <Fragment>
                <div ref="canvas_bar_chart" id="canvas_bar_chart_id"></div>
                <div ref="tooltip"></div>
               
            </Fragment>
        )
    }
}

export default BarChartD3