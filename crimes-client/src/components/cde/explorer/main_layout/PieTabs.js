import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Tab,Tabs} from 'react-bootstrap'
import CrimePie  from './CrimePie';
import {changeVariableKey} from '../../../../actions/cdeActions'

class PieTabs extends Component {
  constructor(){
      super()
      this.state={
          key:'sex'
      }  
  } 

  changeVariable=(key)=>{
   this.setState({key})
   this.props.dispatch(changeVariableKey(key))
  }

  render(){
    console.log("called from render crime pie tabs ")
    return (
        <Tabs id="controlled-tab-example" activeKey={this.state.key} onSelect={k => this.changeVariable(k)}>
          <Tab eventKey="sex" title="Sex" >
              {this.state.key == 'sex' && <CrimePie variable_key={"sex"}/>}
          </Tab>
          <Tab eventKey="race" title="Race">
          {this.state.key == 'race' && <CrimePie variable_key={"race"}/>}
          </Tab>
          <Tab eventKey="ethnicity" title="Ethnicity" >
          {this.state.key == 'ethnicity' && <CrimePie variable_key={"ethnicity"}/>}
          </Tab>
          <Tab eventKey="age" title="Age" >
          {this.state.key == 'age' && <CrimePie variable_key={"age"}/>}
          </Tab>
        </Tabs>
      );
  }

  }

 


export default connect(null, null)(PieTabs)
  
  