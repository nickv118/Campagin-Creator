import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';
import request from 'superagent';
import Loader from 'react-loaders';

import { loginWithEmailPassword } from '../redux/actions/authActions';

@connect(
  state => ({user: state.auth.user, token: state.auth.token, loading: state.auth.loading}),
  {loginWithEmailPassword, push, replace}
)
export default class Login extends Component {

	constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      keepLoggedin: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    if(this.props.user || this.props.token) {
      this.props.replace('/');
    }
  }

  componentWillReceiveProps(newProps) {
    if(!this.props.user && newProps.user) {
      setTimeout(() => this.props.replace('/'), 10);
    }
  }

  handleLogin(e) {
    e.preventDefault();
    let errors = {};
    const {email, password} = this.state;
    if (email == '') 
    {
      Object.assign(errors, {emailError: '*Email is required'});
    }
    if (password == '') 
    {
      Object.assign(errors, {passwordError: '*Password is required'});
    }
    if (Object.keys(errors).length > 0) {
      this.setState(errors);
    }else {
      this.props.loginWithEmailPassword(email, password)
    }
  }

  render() {
    const {loading} = this.props;

    return (
      <div className="login-page">
      	<div className="login-form">
          <img className="logo" src="/assets/images/logo.png" />
          <div className="input-group">
            <input type="text" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value, emailError: ''})} />
          </div>
          {this.state.emailError && 
            <p className="error-text">{this.state.emailError}</p>
          }
          <div className="input-group">
            <input type="password" placeholder="Password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value, passwordError: ''})} />
          </div>
          {this.state.passwordError && 
            <p className="error-text">{this.state.passwordError}</p>
          }
          <div className="input-group">
            <input type="checkbox" checked={this.state.keepLoggedin} onChange={(e) => this.setState({keepLoggedin: e.target.checked})} /> Keep me logged in
          </div>
          <div className="submit-button">
            <button className="btn fill" onClick={this.handleLogin}>LOGIN</button>
          </div>
          {loading && <div style={{textAlign: 'center'}}><Loader type="ball-pulse" /></div>}
          <div className="other-links">
            <a className="other-link" href="#">SIGN UP</a>
            <a className="other-link" href="#">FORGOT PASSWORD</a>
          </div>
        </div>
      </div>
    );
  }
}