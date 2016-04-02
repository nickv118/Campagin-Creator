import React from 'react';
import { Router, Route, IndexRoute, Link, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'


import {
  App,
  Home,
  Campaigns,
  Audience,
  Templates,
  Insights,
  CampaignBuilder,
  Login,
  NotFound
} from 'containers';

export default (store) => {
  const history = syncHistoryWithStore(browserHistory, store);

  const requireLogin = (nextState, replace, cb) => {
    const { auth: { token }} = store.getState();
    if (!token) {
      // oops, not logged in, so can't be here!
      replace('/login');
    }
    cb();
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Router history={history}>
      <Route path="/" component={App} onEnter={requireLogin} >
        { /* Home (main) route */ }
        <IndexRoute component={Home}/>
        <Route path="campaigns" component={Campaigns} />
        <Route path="audience" component={Audience} />
        <Route path="templates" component={Templates} />
        <Route path="insights" component={Insights} />
        <Route path="new-campaign" component={CampaignBuilder} />
      </Route>
      <Route path="login" component={Login} />
      <Route path="*" component={NotFound} status={404} />
    </Router>
  );
};
