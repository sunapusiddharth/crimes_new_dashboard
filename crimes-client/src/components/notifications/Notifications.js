import React, { Component } from 'react'
import { connect } from 'react-redux'
import socketIOClient from "socket.io-client";

 class Notifications extends Component {
    constructor() {
        super();
        this.state = {
            response: 0,
            endpoint: `http://${process.env.REACT_APP_API_HOST}:8007`
        };
    }

    componentDidMount() {
        const {endpoint} = this.state;
        //Very simply connect to the socket
        const socket = socketIOClient(endpoint);
        //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
        // socket.on("crimes_count", data =>{
        //     console.log("data=",data)
        //     // this.setState({response: data})
        // } );
        //listenig for second event
        socket.on("estimated_crimes", data =>{
            console.log("data=",data)
            // this.setState({response: data})
        } );
    }


    render() {
        return (
            <div>
                <p>Resonse from socket io{this.state.response}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})



export default connect(mapStateToProps, null)(Notifications)
