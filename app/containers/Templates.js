import React, {Component} from 'react';
import { connect } from 'react-redux';

@connect(
  state => ({user: state.auth.user}),
  {}
)
export default class Templates extends Component {
  render() {
    return (
      <div className="campaigns-page">
        <h1>Templates</h1>
      </div>
    );
  }
}
