import React, {Component} from 'react';
import Loader from 'react-loader';

import {LOADER_OPTIONS} from '../constants';

export default class LoadingOverlay extends Component {
  render() {
    return (
      <div className="loading-overlay">
        <Loader loaded={false} options={LOADER_OPTIONS} />
      </div>
    );
  }
}
