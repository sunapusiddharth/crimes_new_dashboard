import React, { Component } from 'react'
import '../styles/contact_form.css'
import { connect } from 'react-redux';
import {startSaving} from '../actions/contactUsActions'
import {Alert} from 'react-bootstrap'

class ContactForm extends Component {
    constructor() {
        super()
        this.state = {
            validated: false,
            values:{
                fname: '',
                lname: '',
                email: '',
                comment: ''
            },
            errors: {
                fname: '',
                lname: '',
                email: '',
                comment: ''
            },
            not_valid:false
        }
    }

    validateForm = (fieldName, value) => {
        // debugger
        var old_state = this.state.errors
        var newErrors = { ...old_state }
        // debugger
        if (!value) {
            newErrors[fieldName] = 'Field cannot be empty'
            this.setState({ errors: newErrors })
            return
        }
        let regexValid
        switch (fieldName) {
            case 'fname':
                // debugger
                regexValid = value.match(/^[a-zA-Z0-9\s]+$/);
                if (!regexValid) {
                    newErrors[fieldName] = "Only alphanumeric values allowed"
                    this.setState({ errors: newErrors })
                    break
                }
                var size = value.trim().length;
                if (size < 4) {
                    newErrors[fieldName] = 'name Must be at least 4 characters';
                    this.setState({ errors: newErrors })
                    break
                }
                newErrors[fieldName] = '';
                this.setState({ errors: newErrors })
                break
            case 'lname':
                // debugger
                regexValid = value.match(/^[a-zA-Z0-9\s]+$/);
                if (!regexValid) {
                    newErrors[fieldName] = "Only alphanumeric values allowed"
                    this.setState({ errors: newErrors })
                    break
                }

                newErrors[fieldName] = ""
                this.setState({ errors: newErrors })
                break
            case 'email':
                regexValid = value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
                if (!regexValid) {
                    newErrors[fieldName] = "Enter valid email"
                    this.setState({ errors: newErrors })
                    break
                }
                newErrors[fieldName] = '';
                this.setState({ errors: newErrors })
                break
            case 'comment':
                size = value.trim().length;
                if (size < 4) {
                    newErrors[fieldName] = 'comment Must be at least 4 characters';
                    this.setState({ errors: newErrors })
                    break
                }
                if (size > 200) {
                    newErrors[fieldName] = 'Comment Must be 200 characters or less';
                    this.setState({ errors: newErrors })
                    break
                }
                newErrors[fieldName] = '';
                this.setState({ errors: newErrors })
                break
        }
    }

    handleChange = function (fieldName, event) {
        console.log(fieldName, event.target.value)
        if (event && event.target && event.target.value) {
            var old_state = this.state.values
            var newValues = { ...old_state }
            newValues[fieldName] = event.target.value
            this.setState({ values: newValues })
        }
        //first validate the form :
        this.validateForm(fieldName, event.target.value)
        this.disableSubmitButton()
    }

    disableSubmitButton = ()=>{
        Object.keys(this.state.errors).map(error_key=>{
            if(this.state.errors[error_key].length ){
                this.setState({not_valid:true})
            }
        })
    }

    handleSubmit = (event) => {
        // debugger
        //check if all errors are empty
        if(this.state.not_valid){
            console.log(this.state.values)
            this.props.dispatch(startSaving(this.state.values))
        }
        event.preventDefault()
    }

    render() {
        return (
            <div class="contact">
                <div class="row">
                    <div class="col-md-3">
                        <div class="contact-info">
                            <img src="https://image.ibb.co/kUASdV/contact-image.png" alt="image" />
                            <h2>Contact Us</h2>
                            <h4>We would love to hear from you !</h4>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div className="row">
                            {this.props.saved_success && <Alert key="alert-box" variant="success">
                            {this.props.saved_success}
                        </Alert>}
                        {this.props.saved_error_message && <Alert key="alert-box" variant="daner">
                            {this.props.saved_error_message}
                        </Alert>}
                        </div>
                        <div class="contact-form">
                            <form onSubmit={this.handleSubmit} >
                            <div class="form-group">
                                <label class="control-label pull-left" htmlFor="fname">First Name:</label>
                                <div class="">
                                    <input type="text" class="form-control" id="fname" required placeholder="Enter First Name" name="fname" onChange={this.handleChange.bind(this, "fname")} />
                                </div>
                                <div>
                                    <p className="errorMsg">{this.state.errors.fname}</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label pull-left" htmlFor="lname">Last Name:</label>
                                <div class="">
                                    <input type="text" class="form-control" id="lname" required placeholder="Enter Last Name" name="lname" onChange={this.handleChange.bind(this, "lname")} />
                                </div>
                                <div>
                                    <p className="errorMsg">{this.state.errors.lname}</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label pull-left" htmlFor="email">Email:</label>
                                <div class="">
                                    <input type="email" class="form-control" id="email" required placeholder="Enter email" name="email" onChange={this.handleChange.bind(this, "email")} />
                                </div>
                                <div>
                                    <p className="errorMsg">{this.state.errors.email}</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label pull-left" htmlFor="comment">Comment:</label>
                                <div class="">
                                    <textarea class="form-control" rows="5" id="comment" required onChange={this.handleChange.bind(this, "comment")}></textarea>
                                </div>
                                <div>
                                    <p className="errorMsg">{this.state.errors.comment}</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-offset-2 ">
                                    <button type="submit" className={`btn btn-default ${this.state.not_valid?'none':'disabled'}`} onClick={this.handleSubmit}>Submit</button>
                                </div>
                            </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    saved_success: state.contactUsReducer.saved_success,
    saved_error_message: state.contactUsReducer.saved_error_message,
    saving_start: state.contactUsReducer.saving_start
})
export default connect(mapStateToProps, null)(ContactForm)
