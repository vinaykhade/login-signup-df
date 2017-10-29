import React from 'react';
import { Router, Route, IndexRoute ,browserHistory } from 'react-router';
import App from './src/App';
import Home from './src/Containers/Home';
import AdminAddUser from './src/Containers/AddUser';
import AdminViewUser from './src/Containers/ViewUser';
import UserProfile from './src/Containers/UserProfile';

const Root = React.createClass({
  render(){
    return(
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={Home}/>
          <Route path="/add-user" component={AdminAddUser} />
          <Route path="/admin/view-user" component={AdminViewUser} />
          <Route path="/user/my-profile" component={UserProfile} />
        </Route>
      </Router>
    );
  }
});

export default Root;
