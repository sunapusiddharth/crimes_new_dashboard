import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { EstimatedCrimesCount } from '../components/dashboard/EstimatedCrimesCount';
import { TotalArrests } from '../components/dashboard/TotalArrests';
import { TotalVictims } from '../components/dashboard/TotalVictims';
import socketIOClient from "socket.io-client";
import { CrimeRatesChart } from '../components/dashboard/CrimeRatesChart';
import VictimsChart from '../components/dashboard/VictimsChart';
import RecentVictims from '../components/dashboard/RecentVictims';

export class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            response: 0,
            cde_endpoint: `http://${process.env.REACT_APP_API_HOST}:8007`,
            cde_socket:null,
            backend_endpoint: `http://${process.env.REACT_APP_API_HOST}:8004`,
            backend_socket:null
        };
    }


    componentDidMount(){
        const {cde_endpoint,backend_endpoint} = this.state;
        const cde_socket = socketIOClient(cde_endpoint);
        const backend_socket = socketIOClient(backend_endpoint);
        this.setState({cde_socket,backend_socket})
    }

    render() {
        return (
            <Fragment>
{/* // <!-- Sidebar/menu --> */}
{/* <nav class="w3-sidebar w3-collapse w3-white w3-animate-left" style={{zIndex:3,width:"300px"}} id="mySidebar"><br/>
  <div class="w3-container w3-row">
    <div class="w3-col s4">
      <img src="/w3images/avatar2.png" class="w3-circle w3-margin-right" style={{width:"46px"}}/>
    </div>
    <div class="w3-col s8 w3-bar">
      <span>Welcome, <strong>Mike</strong></span><br/>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-envelope"></i></a>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-user"></i></a>
      <a href="#" class="w3-bar-item w3-button"><i class="fa fa-cog"></i></a>
    </div>
  </div>
  <hr/>
  <div class="w3-container">
    <h5>Dashboard</h5>
  </div>
  <div class="w3-bar-block">
    <a href="#" class="w3-bar-item w3-button w3-padding-16 w3-hide-large w3-dark-grey w3-hover-black" onclick="w3_close()" title="close menu"><i class="fa fa-remove fa-fw"></i>  Close Menu</a>
    <a href="#" class="w3-bar-item w3-button w3-padding w3-blue"><i class="fa fa-users fa-fw"></i>  Overview</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-eye fa-fw"></i>  Views</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-users fa-fw"></i>  Traffic</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-bullseye fa-fw"></i>  Geo</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-diamond fa-fw"></i>  Orders</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-bell fa-fw"></i>  News</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-bank fa-fw"></i>  General</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-history fa-fw"></i>  History</a>
    <a href="#" class="w3-bar-item w3-button w3-padding"><i class="fa fa-cog fa-fw"></i>  Settings</a><br/><br/>
  </div>
</nav> */}


{/* <!-- Overlay effect when opening sidebar on small screens --> */}
<div class="w3-overlay w3-hide-large w3-animate-opacity" onclick="w3_close()" style={{cursor:"pointer"}} title="close side menu" id="myOverlay"></div>

{/* <!-- !PAGE CONTENT! --> */}
<div class="w3-main" style={{marginTop:"43px"}}>
  {/* <!-- Header --> */}
  <header class="w3-container" style={{paddingTop:"22px"}}>
    <h5><b><i class="fa fa-dashboard"></i> Crimes Dashboard</b></h5>
    <p>This dashboard is built using node js and socket io .This page uses mongodb changeStreams(whenever any modification is done to a table change stream fires event which reflects in the UI).To show the 
      changing data , currently data is updated ( total crimes, total arrests..).Frontend is created using react and highcharts, where only parts of applications for which data is changing will be reflected.TO do: UX improvements.Note the charts show regularly updated data <span style={{color:'red'}}>Live Charts !!!</span>
    </p>
  </header>
  <div class="w3-row-padding w3-margin-bottom">
    <div class="w3-quarter">
      {/* Load total estimated crimes count */}
      {this.state.cde_socket && <EstimatedCrimesCount socket={this.state.cde_socket}/>}
    </div>
    <div class="w3-quarter">
      {/* Total Arrests */}
      {this.state.cde_socket && <TotalArrests socket={this.state.cde_socket}/>}
    </div>
    <div class="w3-quarter">
     {/* Total Victims */}
     {this.state.cde_socket && <TotalVictims socket={this.state.cde_socket}/>}
     
    </div>
    <div class="w3-quarter">
      <div class="w3-container w3-orange w3-text-white w3-padding-16">
        <div class="w3-left"><i class="fa fa-users w3-xxxlarge"></i></div>
        <div class="w3-right">
          <h3>50</h3>
        </div>
        <div class="w3-clear"></div>
        <h4>Total Population</h4>
      </div>
    </div>
  </div>

  <div class="w3-panel">
    <div class="w3-row-padding" style={{margin:"0 -16px"}}>
      <div class="">
        <h5>Crimes</h5>
        <p>Shows live chart for crimes commited in United States in percentage.Created using highcharts.</p>
        {this.state.cde_socket &&  <CrimeRatesChart socket={this.state.cde_socket}/>}
      </div>
     </div>
  </div>
  <hr/>
  <div class="w3-panel">
    <div class="w3-row-padding" style={{margin:"0 -16px"}}>
      <div class="">
        <h5>Victims</h5>
        <p>Shows live chart for victims in United States.Created using highcharts.</p>
        {this.state.cde_socket &&  <VictimsChart socket={this.state.cde_socket}/>}
      </div>
     </div>
  </div>
  <div class="w3-container">
    <h5>General Stats</h5>
    <p>Net increase in crimes over the last 2 years</p>
    <div class="w3-grey">
      <div class="w3-container w3-center w3-padding w3-green" style={{width:"25%"}}>+25%</div>
    </div>

    <p>Net increase in arrests over the last 2 years</p>    
    <div class="w3-grey">
      <div class="w3-container w3-center w3-padding w3-orange" style={{width:"50%"}}>50%</div>
    </div>

    <p>Net property stolen over the last 2 years</p>
    <div class="w3-grey">
      <div class="w3-container w3-center w3-padding w3-red" style={{width:"75%"}}>75%</div>
    </div>
  </div>
  <hr/>

{/* React table showing estimated crime rates  */}

   <hr/>
   <RecentVictims socket={this.state.backend_socket}/>
   <hr/>

  <div class="w3-container">
    <h5>Recent Incidents</h5>
    <p>Currently a placeholder , can be hooked up to show live data using mongoDB change streams.(FUTURE)</p>
    <div class="w3-row">
      <div class="w3-col m2 text-center">
        <img class="w3-circle" src="/w3images/avatar3.png" style={{width:"96px",height:"96px"}}/>
      </div>
      <div class="w3-col m10 w3-container">
        <h4>John <span class="w3-opacity w3-medium">Sep 29, 2014, 9:12 PM</span></h4>
        <p>Keep up the GREAT work! I am cheering for you!! Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><br/>
      </div>
    </div>

    <div class="w3-row">
      <div class="w3-col m2 text-center">
        <img class="w3-circle" src="/w3images/avatar1.png" style={{width:"96px",height:"96px"}}/>
      </div>
      <div class="w3-col m10 w3-container">
        <h4>Bo <span class="w3-opacity w3-medium">Sep 28, 2014, 10:15 PM</span></h4>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><br/>
      </div>
    </div>
  </div>
  <br/>
  {/* <!-- Footer --> */}
 

  {/* <!-- End page content --> */}
</div>
</Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    
}) 

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
