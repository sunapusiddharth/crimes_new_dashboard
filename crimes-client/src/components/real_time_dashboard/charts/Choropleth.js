"use strict";
import * as topojson from 'topojson-client';
var React = require('react');

// var topojson = require('topojson');
var MapChoropleth = require('react-d3-map-choropleth').MapChoropleth;

var css= require('./css/choropleth.css');

// Example
// http://bl.ocks.org/mbostock/4060606
export default function Choropleth() {
  var width = 960,
  height = 600;
  Promise.all([
    d3.json('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json'),
    d3.json('https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json')
    ]).then( ([map, data]) => {
        
    })
  var topodata = require('json!../data/us.json');
  var unemploy = require('dsv?delimiter=\t!../data/unemployment.tsv')

  // data should be a MultiLineString
  var dataStates = topojson.mesh(topodata, topodata.objects.states, function(a, b) { return a !== b; });
  /// data should be polygon
  var dataCounties = topojson.feature(topodata, topodata.objects.counties).features;

  // domain
  var domain = {
    scale: 'quantize',
    domain: [0, .15],
    range: d3.range(9).map(function(i) { return "q" + i + "-9"; })
  };
  var domainValue = function(d) { return +d.rate; };
  var domainKey = function(d) {return +d.id};
  var mapKey = function(d) {return +d.id};

  var scale = 1280;
  var translate = [width / 2, height / 2];
  var projection = 'albersUsa';
return(
    <MapChoropleth
      width= {width}
      height= {height}
      dataPolygon= {dataCounties}
      dataMesh= {dataStates}
      scale= {scale}
      domain= {domain}
      domainData= {unemploy}
      domainValue= {domainValue}
      domainKey= {domainKey}
      mapKey = {mapKey}
      translate= {translate}
      projection= {projection}
      showGraticule= {true}
    />
) 
}