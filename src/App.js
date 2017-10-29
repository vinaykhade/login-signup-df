import React, { Component } from "react";
import './assets/stylesheets/main.scss';
import Services from './Services/index';
import Header from './Containers/Header';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Services.createAdminCredentials();
  }

  render() {
    return (
      <div className="main-container clearfix">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

export default App;
