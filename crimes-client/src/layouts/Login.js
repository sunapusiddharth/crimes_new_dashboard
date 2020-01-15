import React, { Component, Fragment } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "../styles/login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email_analyst: "",
      password_analyst: "",
      email_admin: "",
      password_admin: ""
    };
  }

  validateFormAnalyst() {
    return this.state.email_analyst.length > 0 && this.state.password_analyst.length > 0;
  }

  validateFormAdmin() {
    return this.state.email_admin.length > 0 && this.state.password_admin.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  render() {
    return (
      <Fragment>


        <div class="row">
          <div class="col-md-6 login-form-1">
            <h3>Login as Admin</h3>
            <form onSubmit={this.handleSubmit}>
              <FormGroup controlId="email" bsSize="large">
                <FormLabel>Email</FormLabel>
                <FormControl
                  autoFocus
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup controlId="password" bsSize="large">
                <FormLabel>Password</FormLabel>
                <FormControl
                  value={this.state.password}
                  onChange={this.handleChange}
                  type="password"
                />
              </FormGroup>
              <FormGroup>
            <Button
              block
              bsSize="large"
              disabled={!this.validateFormAdmin()}
              type="submit"
              className="btnSubmit"
            >
              Login
          </Button>
            </FormGroup>
            <FormGroup>
            <a href="#" className="btnForgetPwd">Forget Password?</a>
            </FormGroup>
            </form>

          </div>
        
        <div class="col-md-6 login-form-2">
          <div class="login-logo">
            <img src="/assets/logo_white.png" alt="" />
          </div>
          <h3>Login as Analyst</h3>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <FormLabel>Email</FormLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <FormLabel>Password</FormLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <FormGroup>
            <Button
              block
              bsSize="large"
              disabled={!this.validateFormAnalyst()}
              type="submit"
              className="btnSubmit"
            >
              Login
          </Button>
            </FormGroup>
            <FormGroup>
            <a href="#" className="btnForgetPwd">Forget Password?</a>
            </FormGroup>
          </form>

        </div>
        </div>
      </Fragment>
    );
  }
}
