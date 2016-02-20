import React, {PropTypes, Component} from 'react';
import { render } from 'react-dom';
import request from 'superagent';

require('./app.css');

export default class App extends Component {

	constructor(props) {
    super(props);
    this.state = {
      username: '',
      usernameError: '',
      password: '',
      passwordError: '',
      keepLoggedin: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(e) {
    e.preventDefault();
    let errors = {};
    const {username, password} = this.state;
    if (username == '') 
    {
      Object.assign(errors, {usernameError: '*Username is required'});
    }
    if (password == '') 
    {
      Object.assign(errors, {passwordError: '*Password is required'});
    }
    if (Object.keys(errors).length > 0) {
      this.setState(errors);
    }else {
      request
        .post('http://denim-mocks.mybluemix.net/api/auth')
        .send({ user: username, password: password })
        .set('Content-Type', 'application/json')
        .end(function(err, res){
          if (res.statusCode == 200) {
            window.location.href = "https://www.upwork.com/freelancers/~01088299df50a34ea3";
          } else {
            alert('Login Failure!');
          }
        });
    }
  }

  render() {

    return (
    	<div className="login-form">
        <img className="logo" src="./images/logo.png" />
        <div className="input-group">
          <input type="text" placeholder="Username" value={this.state.username} onChange={(e) => this.setState({username: e.target.value, usernameError: ''})} />
        </div>
        {this.state.usernameError && 
          <p className="error-text">{this.state.usernameError}</p>
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
          <button onClick={this.handleLogin}>LOGIN</button>
        </div>
        <div className="other-links">
          <a className="other-link" href="#">SIGN UP</a>
          <a className="other-link" href="#">FORGOT PASSWORD</a>
        </div>
      </div>
    );
  }
}


render(<App />, document.getElementById('container'));
