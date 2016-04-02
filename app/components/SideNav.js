import React, {Component} from 'react';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';
import Avatar from 'react-avatar';
import {FaComments, FaCog} from 'react-icons/lib/fa';
import classNames from 'classnames';

@connect(
  state => ({currentRouting: state.routing.locationBeforeTransitions}),
  {push, replace}
)
export default class SideNav extends Component {

  constructor(props) {
    super(props);
  }

  goToPage(path) {
    // console.log('going to: ', path);
    this.props.push(path);
  }

  render() {
    const {currentRouting} = this.props;
    const isHome = currentRouting && currentRouting.pathname == '/';
    const isCampaigns = currentRouting && currentRouting.pathname == '/campaigns';
    const isAudience = currentRouting && currentRouting.pathname == '/audience';
    const isTemplates = currentRouting && currentRouting.pathname == '/templates';
    const isInsights = currentRouting && currentRouting.pathname == '/insights';

    return (
      <div className="sidenav">
        <img className="nav-logo" src="/assets/images/american_national.png" />
        <div className="menu-block">
          <div className={classNames('menu-item', {active: isHome})} onClick={!isHome ? this.goToPage.bind(this, '/') : null}>
            <img className="menu-icon" src={`/assets/images/menu/home${isHome ? '_selected' : ''}.png`} />
            <p className="label">HOME</p>
          </div>
          <div className={classNames('menu-item', {active: isCampaigns})} onClick={!isCampaigns ? this.goToPage.bind(this, '/campaigns') : null}>
            <img className="menu-icon" src={`/assets/images/menu/campaign${isCampaigns ? '_selected' : ''}.png`} />
            <p className="label">CAMPAIGN</p>
          </div>
          <div className={classNames('menu-item', {active: isAudience})} onClick={!isAudience ? this.goToPage.bind(this, '/audience') : null}>
            <img className="menu-icon" src={`/assets/images/menu/audience${isAudience ? '_selected' : ''}.png`} />
            <p className="label">AUDIENCE</p>
          </div>
          <div className={classNames('menu-item', {active: isTemplates})} onClick={!isTemplates ? this.goToPage.bind(this, '/templates') : null}>
            <img className="menu-icon" src={`/assets/images/menu/templates${isTemplates ? '_selected' : ''}.png`} />
            <p className="label">TEMPLATES</p>
          </div>
          <div className={classNames('menu-item', {active: isInsights})} onClick={!isInsights ? this.goToPage.bind(this, '/insights') : null}>
            <img className="menu-icon" src={`/assets/images/menu/insights${isInsights ? '_selected' : ''}.png`} />
            <p className="label">INSIGHTS</p>
          </div>
        </div>
      </div>
    );
  }
}
