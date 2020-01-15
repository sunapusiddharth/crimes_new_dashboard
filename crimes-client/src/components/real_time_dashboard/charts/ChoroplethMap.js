import React, {Component, Fragment} from 'react';
import * as d3 from "d3";
import * as topojson from 'topojson-client';
import '../../../styles/d3charts.css'   



class ChoroplethMap extends Component {
    componentDidMount() {
        console.log("hi here ")
        const data = [ 2, 4, 2, 6, 8 ]
        this.drawBarChart(data)
    }
    drawBarChart(data)  {
        const colors = ['#ece7f2','#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#045a8d','#023858'],
        margin = {top: 100, right: 0, bottom: 0, left: 0},
        width = 1000,
        height = 600;
      
      const tooltip = d3.select(this.refs.canvas).append('div').attr('id', 'tooltip');
      var containerw =100
      var containerh = 600
      const choropleth = d3.select(this.refs.canvas).append('svg').attr('id','choropleth')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);
        

      
      const path = d3.geoPath();
      
      choropleth.append('text')             
        .attr('transform', `translate(${width/2},${margin.top - 140})`)
        .attr('id', 'title')
        .text('United States Educational Attainment');
      
      choropleth.append('text')             
        .attr('transform', `translate(${width/2},${margin.top - 105})`)
        .attr('id', 'sub-title')
        .text('Percentage of Adults aged 25 and older with a bachelor\'s degree or higher 2010-2014');
        
        Promise.all([
            d3.json('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json'),
            d3.json('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json')
            ]).then( ([map, data]) => {
        
        const idLookup = map.objects.counties.geometries.reduce((result, county) => {
          const copy = Object.assign({}, data.find((searchedCounty) => county.id === searchedCounty.fips));
          result[copy.fips] = copy;
          return result;
        }, {});
        
        const colorScale = d3.scaleQuantize()
          .domain([10, 70])
          .range(colors);
           
        choropleth.append('g')
          .selectAll('path')
          .data(topojson.feature(map, map.objects.counties).features)
          .enter().append('path')
          .attr('fill', (d) => colorScale(idLookup[d.id].bachelorsOrHigher))
          .attr('d', d3.geoPath())
          .on('mousemove', (d) => {
            tooltip.transition()
              .duration(100)		
              .style('opacity', .9);
            tooltip.text(`${idLookup[d.id].area_name}, ${idLookup[d.id].state}: ${idLookup[d.id].bachelorsOrHigher}%`)
              .style('left', `${d3.event.pageX + 15}px`)	
              .style('top', `${d3.event.pageY - 10}px`);
            })
            .on('mouseout', () => {		
              tooltip.transition()		
              .duration(400)		
              .style('opacity', 0);	
            });
            
            

           
        
        choropleth.append('g')
          .append('path')
          .attr('d', path(topojson.feature(map, map.objects.states)))
          .attr('fill','none')
          .attr('stroke', 'white');
      }).catch(err => console.log('Error loading or parsing data.'))
      
      const gradientScale = d3.scaleLinear()
        .range(colors);
      
      const linearGradient = choropleth.append('linearGradient')
        .attr('id', 'linear-gradient');  
      
      linearGradient.selectAll('stop') 
        .data(gradientScale.range())                  
        .enter().append('stop')
        .attr('offset', (d,i) => i/(gradientScale.range().length - 1))
        .attr('stop-color', (d) => d);
      
      choropleth.append('rect')
        .attr('width', 300)
        .attr('height', 20)
        .style('fill', 'url(#linear-gradient)')
        .attr('transform', 'translate(900,550) rotate(-90)');
      
      choropleth.append('g')
        .selectAll('text')
        .data([1, 2, 3, 4, 5, 6])
        .enter().append('text')
        .attr('x', '925')
        .attr('y', (d) => `${162 + (Math.ceil(300 / 6) + (d * 55))}`)
        .text((d, i) => `${Math.abs(i - 6) * 10}%`);
    
    }

    
    render() { return <Fragment>
        <div ref="canvas"></div>
        <div ref="tooltip"></div>

    </Fragment> }

}



export default ChoroplethMap;
//for resizing the map - https://bl.ocks.org/jadiehm/8f5adc05465a94e77e30
//react version codepen https://codepen.io/paulmichaelxd/pen/JqXxzq
// Heat map https://codepen.io/trey-davis/pen/pwgBYo
//pack layout https://codepen.io/fabiobiondi/pen/NqyQaM
//line chat along with bar chart https://codepen.io/bimalgrg519/pen/jLbmyp
//voronoi and steam graph https://codepen.io/danieljoonlee/pen/jrPoPE
//bubble chart https://codepen.io/Jackfiallos/pen/jLWrjb