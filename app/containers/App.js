import React, {Component} from 'react';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';
import {renderModal} from '../utils/modalUtils';
import classNames from 'classnames';

import {LOCAL_STORAGE_TOKEN_KEY} from '../constants';

import { loginWithToken } from '../redux/actions/authActions';
import { LoadingOverlay, SideNav, Header } from '../components';

const noSideNavPages = ['/new-campaign'];

@connect(
  state => ({user: state.auth.user, token: state.auth.token, currentModal: state.modal.currentModal, currentRouting: state.routing.locationBeforeTransitions, authLoading: state.auth.loading}),
  {loginWithToken, push, replace}
)
export default class App extends Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {user, token} = this.props;
    if (!user) {
      this.props.loginWithToken(token);
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.token && !newProps.token) { // means login fail or logout
      if(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);  
      }
      setTimeout(() => this.props.replace('/login'), 10);
    }
  }

  render() {
  	const {currentModal, currentRouting, authLoading} = this.props;
    const shouldShowSideNav = currentRouting && noSideNavPages.indexOf(currentRouting.pathname) == -1;

    let sidenav = null;
    let content = null;
    if (authLoading) {
      content = <LoadingOverlay />;
    } else {
      sidenav = shouldShowSideNav && <SideNav />;
      content = (
        <div className={classNames('content-container', {'no-nav': !shouldShowSideNav})}>
          <Header />
          {this.props.children}
          {currentModal && renderModal(currentModal.type)}
        </div>
      );
    }

    return (
      <div className={classNames('app-container', {darken: (currentRouting && currentRouting.pathname == '/new-campaign')})}>
        { sidenav }
        { content }
      </div>
    );
  }
}
