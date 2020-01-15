import React, { Component } from 'react'
import { connect } from 'react-redux'
import {thousand_separator} from '../../helpers/number_helper'

export class EstimatedCrimesCount extends Component {

    constructor(){
        super()
        this.state={
            crimes_count:0
        }
    }

    componentDidMount() {
        //listenig for second event
        let {socket} = this.props
        console.log("cdm of estimated ",this.props)
        if(socket){
            socket.on("estimated_crimes", data =>{
                console.log("coming from estimated crimes count data=",data)
                let total_count = 0 
                 Object.keys(data[0]).map(key=>{
                    if(key != 'population') total_count +=parseInt(data[0][key])
                })
                console.log("total_count = ",thousand_separator(total_count))
                this.setState({crimes_count: thousand_separator(total_count)})
            } );
        }
    }

    render() {
        return (

            <div class="w3-container w3-red w3-padding-16">
                <div class="w3-left"><i class="fa fa-comment w3-xxxlarge"></i></div>
                <div class="w3-right">
                    <h3>{this.state.crimes_count}</h3>
                </div>
                <div class="w3-clear"></div>
                <h4>Total Crimes</h4>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(EstimatedCrimesCount)
