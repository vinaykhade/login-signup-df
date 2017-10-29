import React, { Component } from "react";
import { Col, Row, HelpBlock, Form, FormGroup, FormControl } from 'react-bootstrap';
import _ from 'underscore';
import Services from '../../Services/index';

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultPassword: 'qwertyuiop',
      newPassword: '',
      newFirstName: '',
      newLastName: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.submitUserDetails = this.submitUserDetails.bind(this);
  }

  componentWillMount() {
    const currentUser = JSON.parse(sessionStorage.getItem('current_loggedin_user'));
    const userDetails = Services.getUserDetails(currentUser.userDetails.userId);
    this.setState({ userDetails });
  }

  handleInputChange(e) {
    this.setState({ updateSuccessfull: '' });
    switch (e.target.name) {
      case 'input_first_name':
        this.setState({ newFirstName: e.target.value })
        break;
      case 'input_last_name':
        this.setState({ newLastName: e.target.value })
        break;
      default:
    }
  }

  handlePassword(e) {
    const password = e.target.value;
    const regEx = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{1,20}$/;
    let updatedError = '';
    this.setState({ updateSuccessfull: '' });
    if(!regEx.test(password)) {
      updatedError = 'Password must contain a uppercase letter, number & a symbol';
    }
    this.setState({
      regExPwdError: updatedError,
    });
    if (updatedError) {
      return;
    } else {
      this.setState({
        newPassword: password,
      });
    }
  }

  submitUserDetails(e) {
    e.preventDefault();
    const currentUser = JSON.parse(sessionStorage.getItem('current_loggedin_user'));
    let { userDetails , newFirstName, newLastName, newPassword } = this.state;
    let newDetails = userDetails;
    if(newFirstName) {
      newDetails.first_name = newFirstName;
    }
    if(newLastName) {
      newDetails.last_name = newLastName;
    }
    if(newPassword) {
      newDetails.password = newPassword
    }
    if(currentUser.userDetails.userId === newDetails.userId) {
      const response = Services.updateUser(newDetails);
      if(response.success) {
        this.setState({
          userDetails: response.userDetails,
          updateSuccessfull: 'Profile Updated Successfully'
        });
      }
    }

  }

  render() {
    const { userDetails, defaultPassword, updateSuccessfull } = this.state;
    return (
      <Col md={8} mdOffset={2} className="my-profile-container">
        <h3>My Profile</h3>
        {
          userDetails ?
          <Form className="col-md-6 col-md-offset-3" onSubmit={this.submitUserDetails}>
            <FormGroup>
              <label>First Name</label>
              <FormControl
                type="text"
                className="form-control"
                name="input_first_name"
                placeholder="Add First Name"
                onChange={this.handleInputChange}
                defaultValue={userDetails.first_name}
                />
            </FormGroup>
            <FormGroup>
              <label>Last Name</label>
              <FormControl
                type="text"
                className="form-control"
                name="input_last_name"
                placeholder="Add Last Name"
                onChange={this.handleInputChange}
                defaultValue={userDetails.last_name}
                />
            </FormGroup>
            <FormGroup>
              <label>User ID</label>
              <FormControl
                type="text"
                className="form-control"
                name="input_last_name"
                defaultValue={userDetails.userId}
                disabled
                />
            </FormGroup>
            <FormGroup>
              <label>Password</label>
              <FormControl
                type="password"
                className="form-control"
                name="input_user_pwd"
                placeholder="Create Password"
                onChange={this.handlePassword}
                defaultValue={userDetails.password}
                />
              <span className="errorMsg">{this.state.regExPwdError}</span>
            </FormGroup>
            <button type="submit" className="btn edit-btn">Edit Profile</button>
            <h4 className="update-success">{updateSuccessfull}</h4>
          </Form> : null
        }

      </Col>
    )
  }
}

export default MyProfile;
