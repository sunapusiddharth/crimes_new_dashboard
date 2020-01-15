import React, { Component, Fragment } from 'react';
import * as d3 from "d3";
import * as topojson from 'topojson-client';
import '../../../styles/d3charts.css'



class RealTimeLiveMap extends Component {
    componentDidMount() {
        console.log("hi here ")
        const data = [2, 4, 2, 6, 8]
        this.drawBarChart(data)
    }
    drawBarChart(data) {
        let width = 960,
            height = 500;

        let projection = d3.geoPath.albersUsa()
            .scale(1000)
            .translate([width / 2, height / 2]);

        let path = d3.geoPath()
            .projection(projection);

        d3_draw(d3.select(this.refs.canvas));

        d3.json('zipcodes.json', function (zips) {
            let zipObjs = Object.keys(zips).map(x => Object({ lat: zips[x].lat, lon: zips[x].lon }));

            var filteredZips = zipObjs.filter(zip => zip.lat >= 18);

            setInterval(() => {
                // insert data received via ajax/fetch request
                let sampleFilteredZips = getSampleZips(filteredZips, 0.0001);

                d3_ping(d3.select(this.refs.canvas), sampleFilteredZips)
            }, 1000);
        });

    }


    render() {
        return <Fragment>
            <div ref="canvas"></div>
            <div ref="tooltip"></div>

        </Fragment>
    }

}



export default RealTimeLiveMap;
//for resizing the map - https://bl.ocks.org/jadiehm/8f5adc05465a94e77e30
//react version codepen https://codepen.io/paulmichaelxd/pen/JqXxzq
// Heat map https://codepen.io/trey-davis/pen/pwgBYo
//pack layout https://codepen.io/fabiobiondi/pen/NqyQaM
//line chat along with bar chart https://codepen.io/bimalgrg519/pen/jLbmyp
//voronoi and steam graph https://codepen.io/danieljoonlee/pen/jrPoPE
//bubble chart https://codepen.io/Jackfiallos/pen/jLWrjb