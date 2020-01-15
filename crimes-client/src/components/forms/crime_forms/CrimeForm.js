import React, { Component, Fragment } from 'react';
// import CrimeSummaryForm from './CrimeSummaryForm'
import IncidentForm from './IncidentForm'
import IncidentRelatedPeopleForm from './IncidentRelatedPeopleForm'
import FormPersonalDetails from './IncidentRelatedPeopleForm'
import Confirm from './Confirm'
import Success from './Success'
import CrimeSingleBootstrapForm from './CrimeSingleBootstrapForm';
import '../../../styles/stepper.css'


export class CrimeForm extends Component {
  state = {
    incident_number: 1,
    address: '',
    offense_code: '',
    offense_code_group: '',
    offense_description: '',
    district: '',
    reporting_area: '',
    schooting: 0,
    occurence_on_date: new Date(),
    ucr_part: '',
    street: '',
    title: '',
    description: '',
    imageUrl: '', //s3 image upload 
    category: '', //select
    // Incident data form fields
    external_link: '', //array of s3 urls 
    files: '',
    audios: '',
    videos: '',
    photos: '',

    // Incident People fields
    judge: '',
    law: '',
    suspects: '',
    accussed: '',
    victims: '',

    // common

    step: 1
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  changeStep = (step)=>{
    this.setState({step})
  }

  render() {
    const { step } = this.state;
    const { incident_number, address, offense_code, offense_code_group, offense_description,
      district, reporting_area, schooting, occurence_on_date, ucr_part, street, title, description,
      imageUrl, category, external_link, files, audios, videos, photos, judge, law, suspects, accussed, victims
    } = this.state

    const values = {
      incident_number: "", address: "", offense_code: "", offense_code_group: "", offense_description: "",
      district: "", reporting_area: "", schooting: "", occurence_on_date: "", ucr_part: "", street: "", title: "", description: "",
      imageUrl: "", category: "", external_link: "", files: "", audios: "", videos: "", photos: "", judge: "", law: "", suspects: "", accussed: "", victims: ""
    };
    return (
      <Fragment>
        <div class="md-stepper-horizontal orange">
          <div class={`md-step ${step==1 && 'active'} done`} onClick={()=>this.changeStep(1)}>
            <div class="md-step-circle"><span>1</span></div>
            <div class="md-step-title">Summary</div>
            <div class="md-step-bar-left"></div>
            <div class="md-step-bar-right"></div>
          </div>
          <div class={`md-step ${step==2 && 'active'} done`} onClick={()=>this.changeStep(2)}>
            <div class="md-step-circle"><span>2</span></div>
            <div class="md-step-title">Media</div>
            <div class="md-step-bar-left"></div>
            <div class="md-step-bar-right"></div>
          </div>
          <div class={`md-step ${step==3 && 'active'} done`} onClick={()=>this.changeStep(3)}>
            <div class="md-step-circle"><span>3</span></div>
            <div class="md-step-title">Personnel</div>
            <div class="md-step-bar-left"></div>
            <div class="md-step-bar-right"></div>
          </div>
          <div class={`md-step ${step==4 && 'active'} done`} onClick={()=>this.changeStep(4)}>
            <div class="md-step-circle"><span>4</span></div>
            <div class="md-step-title">Review</div>
            <div class="md-step-bar-left"></div>
            <div class="md-step-bar-right"></div>
          </div>
        </div>
        {step == 1 ? <CrimeSingleBootstrapForm
          nextStep={this.nextStep}
          formHandleChange={this.handleChange}
          values={values}
        /> : step == 2 ? <IncidentForm
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          handleChange={this.handleChange}
          values={values}
        /> : step == 3 ? <IncidentRelatedPeopleForm
          nextStep={this.nextStep}
          prevStep={this.prevStep}
          values={values}
        /> : <Success />}
      </Fragment>
    )
  }
}

export default CrimeForm;