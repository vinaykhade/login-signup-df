import React, { Component } from "react";
import { Col, Row, HelpBlock, Form, FormGroup, FormControl } from 'react-bootstrap';
import Services from '../../Services/index';
import { Link } from 'react-router';

class ViewAddedUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    if (this.props.location.query.userId) {
      if(sessionStorage.getItem('current_loggedin_user')) {
        const currentUser = JSON.parse(sessionStorage.getItem('current_loggedin_user'));
        if(currentUser.user_type === 'admin') {
          const userDetails = Services.getUserDetails(this.props.location.query.userId);
          this.setState({ userDetails })
        }
      }
    }
  }


  render() {
    const { userDetails } = this.state;
    return(
      <div className="view-user-container clearfix">
        {
          userDetails ?
          <Col md={6} mdOffset={3} className="userDetails-block">
            <h3>User Details</h3>
            <FormGroup>
              <label>First Name</label>
              <FormControl
                type="text"
                disabled
                defaultValue={userDetails.first_name}
                />
            </FormGroup>
            <FormGroup>
              <label>Last Name</label>
              <FormControl
                type="text"
                disabled
                defaultValue={userDetails.last_name}
                />
            </FormGroup>
            <FormGroup>
              <label>User ID</label>
              <FormControl
                type="text"
                disabled
                defaultValue={userDetails.userId}
                />
            </FormGroup>
            <FormGroup>
              <label>Password</label>
              <FormControl
                type="password"
                disabled
                defaultValue={userDetails.password}
                />
            </FormGroup>
            <Link to="/add-user" className="back-btn">
              <i className="material-icons">arrow_back</i>
              <span>Go Back</span>
            </Link>
          </Col> : null
        }
      </div>
    )
  }
}

export default ViewAddedUser;
