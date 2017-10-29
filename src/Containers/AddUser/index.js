import React, { Component } from "react";
import { Col, Row, Form, FormGroup, FormControl } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import _ from 'underscore';
import Services from '../../Services/index';

class AdminAddUser extends React.Component {
  constructor(props) {
    super(props);
    let db_user_list = JSON.parse(localStorage.getItem('db_user'));
    let user_list = _.without(db_user_list, _.findWhere(db_user_list, {
      user_type: 'admin'
    }));
    this.state = {
      collapse: false,
      userId: '',
      user_list: user_list,
    }
    this.toggleAddUserForm = this.toggleAddUserForm.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitUserDetails = this.submitUserDetails.bind(this);
  }

  componentWillMount() {
    this.checkAuthorization();
  }

  checkAuthorization() {
    const currentUser = Services.userDetails();
    if(currentUser === null || currentUser.user_type === 'user') {
      browserHistory.push('/');
    }
  }

  changeDisplayState() {
    this.setState({
      collapse: !this.state.collapse
    })
  }

  toggleAddUserForm() {
    this.changeDisplayState();
  }

  hideAddUserForm() {
    this.changeDisplayState();
    this.setState({
      first_name: '',
      last_name: '',
      password: '',
      userId: '',
      updatedError: {}
    })
  }

  generateUserId(len) {
    var rdmString = "";
    for( ; rdmString.length < len; rdmString  += Math.random().toString(36).substr(2));
    this.setState({ userId: rdmString.substr(0, len) })
  }

  handleInputChange(e) {
    switch (e.target.name) {
      case 'input_first_name':
        this.setState({ first_name: e.target.value })
        break;
      case 'input_last_name':
        this.setState({ last_name: e.target.value })
        break;
      default:
    }
  }

  handlePassword(e) {
    const password = e.target.value;
    const regEx = /^(?=.*\d)(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{1,20}$/;
    let updatedError = {};
    if(!regEx.test(password)) {
      updatedError.regExPwdError = 'Password must contain a uppercase letter, number & a symbol';
    }
    this.setState({
      updatedError
    });
    if (_.isEmpty(updatedError)) {
      this.setState({
        password: password,
      });
    } else {
      return;
    }
  }

  submitUserDetails(e) {
    e.preventDefault();
    const { first_name, last_name, userId, password, user_list } = this.state;
    let updatedError = {};
    if(!first_name) {
      updatedError.firstNameError = 'Please add First Name';
    }
    if(!last_name) {
      updatedError.lastNameError = 'Please add Last Name';
    }
    if(!userId) {
      updatedError.userIdError = 'Please add User ID';
    }

    if(!password) {
      updatedError.regExPwdError = 'Please add a Password'
    }

    this.setState({ updatedError });

    if(_.isEmpty(updatedError)) {
      if( first_name && last_name && userId && password ) {
        let values = {
          'first_name': first_name,
          'last_name': last_name,
          'userId': userId,
          'password': password,
          'user_type': 'user'
        }

        const response = Services.addNewUser(values);
        if(response.success) {
          this.setState({
            user_list: response.db_user,
            first_name: '',
            last_name: '',
            userId: '',
            password: '',
          });
          this.changeDisplayState();
          browserHistory.push({
             pathname: '/admin/view-user',
             query: {userId: values.userId}
          });
        }
      }
    } else {

    }

  }

  reRouteToViewUser(userId) {
    browserHistory.push({
       pathname: '/admin/view-user',
       query: {userId: userId}
    });
  }


  render() {
    const { collapse, userId, user_list, updatedError } = this.state;
    return(
      <Col md={8} mdOffset={2}>
        <div className="clearfix add-user-container">
          {
            !(_.isEmpty(user_list)) ?
            <div>
              <h4>User List</h4>
              <ul className="current-user-list">
                {
                  _.map(user_list, (user, key) => {
                    return(
                      <li key={key} onClick={this.reRouteToViewUser.bind(this, user.userId)}>
                        <div className="data-inline">
                          <label>{key+1} .</label>
                        </div>
                        <div className="data-inline">
                          <label>User ID:</label>
                          <span>{user.userId} </span>
                        </div>
                        <div className="data-inline">
                          <label>First Name:</label>
                          <span>{user.first_name} </span>
                        </div>
                        <div className="data-inline">
                          <label>Last Name:</label>
                          <span>{user.last_name} </span>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
            : null
          }

          <div className={ collapse ? 'hide' : 'add-user-link' } onClick={this.toggleAddUserForm}>
            <i className="material-icons">add</i>
            <span>Add User</span>
          </div>
          <Form className={ collapse ? 'col-md-8 col-md-offset-2 add-user-form' : 'hide' } onSubmit={this.submitUserDetails}>
            <FormGroup>
              <FormControl
                type="text"
                name="input_first_name"
                placeholder="Add First Name"
                onChange={this.handleInputChange}
                />
              <label className="errorMsg">{updatedError ? updatedError.firstNameError : ''}</label>
            </FormGroup>
            <FormGroup>
              <FormControl
                type="text"
                name="input_last_name"
                placeholder="Add Last Name"
                onChange={this.handleInputChange}
                />
              <label className="errorMsg">{updatedError ? updatedError.lastNameError : ''}</label>
            </FormGroup>
            <FormGroup className="clearfix">
              <div className="generate-id-block">
                <span className="pull-left">UserId : {userId}</span>
                <span className="pull-right" onClick={this.generateUserId.bind(this, 11)}>Generate User ID</span>
                <div className="clear"></div>
                <label className="errorMsg">{updatedError ? updatedError.userIdError : ''}</label>
              </div>
            </FormGroup>
            <FormGroup>
              <FormControl
                type="password"
                name="input_user_pwd"
                placeholder="Create Password: Password must contain a uppercase letter, number & a symbol"
                onChange={this.handlePassword}
                />
              <label className="errorMsg">{updatedError ? updatedError.regExPwdError : ''}</label>
            </FormGroup>
            <div>
              <button type="submit" className="btn add-user-btn">Add User</button>
              <span onClick={this.hideAddUserForm.bind(this)}>Cancel</span>
            </div>
          </Form>
        </div>
      </Col>
    )
  }
}

export default AdminAddUser;
