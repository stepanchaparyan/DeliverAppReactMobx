import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import '../../stylesheets/dashboard.scss';
import BG from '../../assets/bg2.jpg';

class Dashboard extends Component {
  render() {
    // const { auth } = this.props;
    // if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="dashboard">
        <div className="mainText">This is the main page</div>
        <img id="BG" src={BG} alt="justPhoto" />
      </div>
    )
  }
}

export default Dashboard;