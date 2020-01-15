import React, { Component } from "react"
// import request from "axios"
import { feature } from "topojson-client"
import { geoCentroid } from "d3-geo"
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
} from "react-simple-maps"

class Maps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      geographies: null,
      markers: [],
      center: [0,0],
      zoom: 1,
    }
  }
  componentDidMount() {
    fetch("/static/world-110m.json")
      .then(response => {
        const world = response.data
        const features = feature(world, world.objects[Object.keys(world.objects)[0]]).features
        this.setState({
          geographies: features,
          markers: features.map(feat => {
            return {
              coordinates: geoCentroid(feat),
              iso3: feat.properties.ISO_A3,
              name: feat.properties.NAME,
            }
          })
        })
      })
  }
  handleMarkerClick = marker => () => {
    this.setState({
      center: marker.coordinates,
      zoom: 4,
    })
  }
  render() {

    const {
      zoom,
      center,
      markers,
      geographies,
    } = this.state

    return (
      <div>
        <ComposableMap showCenter>
          <ZoomableGroup zoom={zoom} center={center}>
            <Geographies geography={geographies} disableOptimization>
              {(geos, proj) =>
                geos.map((geo, i) =>
                  <Geography
                    key={geo.properties.ISO_A3 + i}
                    cacheId={geo.properties.ISO_A3 + i}
                    geography={geo}
                    projection={proj}
                    style={{
                      default: {
                        fill: "#DDD",
                        stroke: "#FFF",
                        strokeWidth: 0.5,
                      },
                    }}
                  />
              )}
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
        {
          markers.map((marker, i) =>
            <button
              key={marker.iso3 + i}
              onClick={this.handleMarkerClick(marker)}
              >
              { marker.name }
            </button>
          )
        }
      </div>
    )
  }
}

export default Maps