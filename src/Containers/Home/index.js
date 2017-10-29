import React, { Component } from "react";
import { browserHistory } from 'react-router';
import Login from '../Login';
import Services from '../../Services/index';

class Home extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.checkAuthorization();
  }

  checkAuthorization() {
    const currentUser = Services.userDetails();
    if(currentUser !== null) {
      if(currentUser.user_type === 'user') {
        browserHistory.push('/user/my-profile');
      } else if(currentUser.user_type === 'admin') {
        browserHistory.push('/add-user');
      }
    }
  }

  render() {
    return(
      <div>
        <Login />
      </div>
    )
  }
}

export default Home;
