import _ from 'underscore';
import { browserHistory } from 'react-router';

const Services = {

  userDetails: () => {
    if (!(_.isEmpty(sessionStorage.getItem('current_loggedin_user')))) {
      const user = JSON.parse(sessionStorage.getItem('current_loggedin_user'));
      return user
    } else {
      return null
    }
  },

  createAdminCredentials() {
    if(!localStorage.getItem('db_user')) {
      let db_user = [];
      let values = {
        'first_name': 'Admin',
        'last_name': '',
        'userId': 'alpha000',
        'password': 'onetopconpopone',
        'user_type': 'admin'
      }
      db_user[0] = values;
      localStorage.setItem('db_user', JSON.stringify(db_user));
    }
  },

  loginAdmin(userId, password) {

    const db_user = JSON.parse(localStorage.getItem('db_user'));
    let responseData = {
      'success': false
    };
    _.map( db_user, (user, key) => {
      let userIdMatch, passwordMatch = false;
      if(user.userId == userId && user.password == password) {
        responseData.success = true;
        responseData.user_type = user.user_type;
        responseData.userDetails = {
          'first_name': user.first_name,
          'last_name': user.last_name,
          'userId': user.userId
        }
      }
    });
    if(responseData.success) {
      if(responseData.user_type === 'admin') {
        browserHistory.push('/add-user')
      } else {
        browserHistory.push('/user/my-profile')
      }
      sessionStorage.setItem('current_loggedin_user', JSON.stringify(responseData));
    }

    return responseData;

  },

  addNewUser(details) {
    if(localStorage.getItem('db_user')) {
      let db_user = JSON.parse(localStorage.getItem('db_user'));
      db_user.push(details);
      localStorage.setItem('db_user', JSON.stringify(db_user));
      let responseData = {
        'success': true,
        'db_user': db_user
      }
      return responseData;
    }
  },

  getUserDetails(userId) {
    if(localStorage.getItem('db_user')) {
      const db_user = JSON.parse(localStorage.getItem('db_user'));
      let userObject = _.find(db_user, function(user) { return user.userId === userId});
      return userObject;
    }
  },

  updateUser(values) {
    if(localStorage.getItem('db_user')) {
      const db_user = JSON.parse(localStorage.getItem('db_user'));
      let userObject = _.find(db_user, function(user) { return user.userId === values.userId});
      _.map(db_user, (user, key) => {
        if(user.userId === values.userId) {
          user.first_name = values.first_name;
          user.last_name = values.last_name;
          user.password = values.password;
        }
      })

      localStorage.setItem('db_user', JSON.stringify(db_user));
      let responseData = {
        'success': true,
        'userDetails': _.find(db_user, function(user) { return user.userId === values.userId})
      }
      return responseData;

    }
  }

}

export default Services;
