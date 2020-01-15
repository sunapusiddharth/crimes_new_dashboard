import React, { Component } from 'react'
import { connect } from 'react-redux'
import PageLoader from '../../../common/PageLoader';
import {Dropdown} from 'react-bootstrap'
import {fetchStates,changeSelectedState} from '../../../actions/cdeActions'

 class LocationFilter extends Component {
    constructor(){
        super()
        this.state={
            location:'United States '
        }
    }

    componentDidMount(){
        this.props.dispatch(fetchStates())
    }

    onItemSelect=(state_name)=>{
        this.setState({location:state_name})
        this.props.dispatch(changeSelectedState(state_name))
    }

    render() {
        if (this.props.states_loading) {
            return <PageLoader loading={this.props.states_loading}/>
        } else {
            return (
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {this.state.location}
                </Dropdown.Toggle>
                    <Dropdown.Menu  className="states_menu">
                        {this.props.states && this.props.states.map(state=><Dropdown.Item onSelect={()=>this.onItemSelect(state.state_name)} key={state.state_id}  href="#/action-1" >{state.state_name}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
            )   
        }
    }
}

const mapStateToProps = (state) => ({
    states: state.cdeReducer.states,
    states_loading: state.cdeReducer.states_loading,
    selected_state:state.cdeReducer.selected_state,
})



export default connect(mapStateToProps, null)(LocationFilter)
