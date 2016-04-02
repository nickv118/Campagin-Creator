import React, {Component} from 'react';
import { connect } from 'react-redux';
import Avatar from 'react-avatar';
import {FaComments, FaCog} from 'react-icons/lib/fa';

@connect(
  state => ({user: state.auth.user}),
  {}
)
export default class Header extends Component {
  render() {
    const {user} = this.props;
    return (
      <div className="header">
        <div className="header-content">
        	<p className="title">Welcome back, {user && user.first_name}.</p>
        	<div className="header-icon"><Avatar size={60} src={user && user.avatar_url} round={true} /></div>
        	<div className="header-icon"><span>1</span><FaComments size="50" /></div>
        	<div className="header-icon"><FaCog size="50" /></div>
          <img className="logo" src="/assets/images/logo_black.png" />
        </div>
      </div>
    );
  }
}
