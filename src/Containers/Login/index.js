import React, { Component } from "react";
import Services from '../../Services/index';
import { Col, Row, Form, FormGroup, FormControl } from 'react-bootstrap';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
  }

  onChange(e) {
    switch (e.target.name) {
      case 'input_userId':
        this.setState({ userId: e.target.value })
        break;
      case 'input_password':
        this.setState({ password: e.target.value })
        break;
      default:
    }
  }

  login(e) {
    e.preventDefault();
    const { userId, password } = this.state;
    const response = Services.loginAdmin(userId, password);
    this.setState({ response })
  }

  render() {
    const { response } = this.state;
    return(
      <Form className="col-md-4 col-md-offset-4 login-form" onSubmit={this.login}>
        <FormGroup>
          <FormControl
            type="text"
            name="input_userId"
            placeholder="Enter User ID"
            onChange={this.onChange}
            />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="password"
            name="input_password"
            placeholder="Enter Password"
            onChange={this.onChange}
            />
        {
          response ?
          <div>
            {
              !response.success ?
              <span className="errorMsg text-center">Wrong UserID/Password Entered</span>
              : null
            }
          </div>

          : null
        }

        </FormGroup>
        <button type="submit" className="btn login-btn">Login</button>
      </Form>
    )
  }
}

export default Login;
