import React, { Component } from 'react'
import { connect } from 'react-redux'
import {thousand_separator} from '../../helpers/number_helper'

export class TotalVictims extends Component {

    constructor(){
        super()
        this.state={
            victims_count:0
        }
    }

    componentDidMount() {
        //listenig for second event
        let {socket} = this.props
        console.log("cdm of victims ",this.props)
        if(socket){
            socket.on("victims_count", data =>{
                console.log("coming from victims crimes count data=",data)
                let total_count = 0 
                 data.map(inner_obj=>{
                    total_count +=inner_obj.count
                })
                console.log("total_count = ",thousand_separator(total_count))
                this.setState({victims_count: thousand_separator(total_count)})
            } );
        }
    }

    render() {
        return (

            <div class="w3-container w3-red w3-padding-16">
                <div class="w3-left"><i class="fa fa-comment w3-xxxlarge"></i></div>
                <div class="w3-right">
                    <h3>{this.state.victims_count}</h3>
                </div>
                <div class="w3-clear"></div>
                <h4>Total victims</h4>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TotalVictims)
