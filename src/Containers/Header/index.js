import React, { Component } from "react";
import { Col, Row } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Services from '../../Services/index';

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  logOutUser(e) {
    e.preventDefault();
    sessionStorage.removeItem('current_loggedin_user');
    browserHistory.push('/')
  }

  render() {
    const userDetails = Services.userDetails();
    return(
      <Row>
        <Col md={8} mdOffset={2}>
          <div className="header-block clearfix">
            <div className="img-block pull-left">
              <img src={require('../../assets/images/deepfence_logo.png')} alt="Logo" />
            </div>
            {
              userDetails !== null ?
              <div className="pull-right logged-in-out-block">
                <h4>Logged In As: {userDetails.userDetails.first_name} {userDetails.userDetails.last_name}</h4>
                <button className="btn" onClick={this.logOutUser.bind(this)}>Logout</button>
              </div>
              : null
            }

          </div>
        </Col>
      </Row>
    )
  }
}

export default Header;
