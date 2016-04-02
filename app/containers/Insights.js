import React, {Component} from 'react';
import { connect } from 'react-redux';

@connect(
  state => ({user: state.auth.user}),
  {}
)
export default class Insights extends Component {
  render() {
    return (
      <div className="campaigns-page">
        <h1>Insights</h1>
      </div>
    );
  }
}
