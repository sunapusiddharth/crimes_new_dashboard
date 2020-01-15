import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { thousand_separator } from '../../helpers/number_helper'
import { fetchRecentVictims,fetchCreateVictim } from '../../actions/dashboardActions'
import PageLoader from '../../common/PageLoader'
import {Spinner,Button} from 'react-bootstrap'

class RecentVictims extends Component {

    constructor() {
        super()
        this.state = {
            crimes_count: 0
        }
    }

    componentDidMount() {
        //listenig for second event
        let { socket } = this.props
        // console.log("cdm of estimated ", this.props)
        this.props.dispatch(fetchRecentVictims())
        if (socket) {
            console.log("socket for backedn recent victims connecteed")
            // socket.on("estimated_crimes", data => {
            //     console.log("coming from estimated crimes count data=", data)
            //     let total_count = 0
            //     Object.keys(data[0]).map(key => {
            //         if (key != 'population') total_count += parseInt(data[0][key])
            //     })
            //     console.log("total_count = ", thousand_separator(total_count))
            //     this.setState({ crimes_count: thousand_separator(total_count) })
            // });
        } else {
            //load initial data 
            // this.props.dispatch(fetchRecentVictims())
        }
    }

    createRandomVictim = () => {
        this.props.dispatch(fetchCreateVictim())
    }

    render() {
        if (this.props.recent_victims_loading) {
            return <PageLoader loading={this.props.recent_victims_loading} />
        } else {
            return (
                <Fragment>
                    {this.props.create_victim_loading?<Spinner animation="grow" />:this.props.create_victims == ''?
                    <Button variant="dark" onClick={this.createRandomVictim}>Create new random Victim (FUTURE)</Button>:
                    this.props.create_victims == 'success'?<Button variant="success" onClick={this.createRandomVictim}>Create new random Victim</Button>:
                    <Button variant="danger" onClick={this.createRandomVictim}>Create new random Victim</Button>}
                      <div class="w3-container">
                    <h5>Recent Victims</h5>
                    <p>Currently a placeholder , can be hooked up to show live data using mongoDB change streams.(FUTURE)</p>
                    <ul class="w3-ul w3-card-4 w3-white">
                        {this.props.recent_victims.map(victim => <li class="w3-padding-16">
                            <img src={victim.avatar} class="w3-left w3-circle w3-margin-right" style={{ width: "35px" }} />
                            <span class="w3-xlarge">{victim.name[0]}</span><br />
                        </li>)}
                    </ul>
                </div>
           
                </Fragment>
               )
        }

    }
}

const mapStateToProps = (state) => ({
    recent_victims: state.dashboardReducer.recent_victims,
    recent_victims_loading: state.dashboardReducer.recent_victims_loading,
    create_victims:state.dashboardReducer.create_victims,
    create_victim_loading:state.dashboardReducer.create_victim_loading,
})



export default connect(mapStateToProps, null)(RecentVictims)
