import React, {Component} from 'react';
import { connect } from 'react-redux';
import { push, replace } from 'react-router-redux';
import {Table, Thead, Th, Tr, Td} from 'reactable';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import Loader from 'react-loaders';

import { loadCampaigns } from '../redux/actions/campaignActions';
import { openModal } from '../redux/actions/modalActions';
import {ModalTypes} from '../constants';

@connect(
  state => ({user: state.auth.user, token: state.auth.token, currentModal: state.modal.currentModal, campaigns: state.campaigns.list, loading: state.campaigns.loading}),
  {openModal, push, replace, loadCampaigns}
)
export default class Home extends Component {
	constructor(props) {
		super(props);
    this.goToCampaignBuilder =this.goToCampaignBuilder.bind(this);
	}

  componentDidMount() {
    this.props.loadCampaigns({token: this.props.token});
  }

  showDetailModal(item, e) {
    this.props.openModal({type: ModalTypes.CAMPAIGN_DETAIL_MODAL, data: item});
  }

  goToCampaignBuilder() {
    this.props.push('/new-campaign');
  }

  render() {
  	const {campaigns, loading} = this.props;
  	const campaigns_table_flex_rates = [20, 20, 20, 12, 15, 13];
  	const table_headers = ['CAMPAIGN NAME', 'AGENT GROUP', 'AUDIENCE', 'GOAL', 'ENDING IN', 'CPM/CTR'];
    return (
      <div className="home-page">
      	<div className="content">
          <div style={{padding: '40px'}}>
        		<div className="content-header">
          		<p className="label">Campaign Performance</p>
          		<a className="btn btn-new-campaign" onClick={this.goToCampaignBuilder}>START A NEW CAMPAIGN</a>
          	</div>
          	<div className="campaigns-table">
          		<div className="row heading">
          			{table_headers.map((h, i) => <p key={i} className="cell" style={{width: `${campaigns_table_flex_rates[i]}%`}}>{h}</p>)}
        			</div>
              {loading && <div style={{textAlign: 'center', marginTop: '50px'}}><Loader type="ball-pulse" /></div>}
        			{campaigns.map((c, index) => {
        				return (
                  <div className="row" key={index} onClick={this.showDetailModal.bind(this, c)}>
                    <p className="cell" style={{width: `${campaigns_table_flex_rates[0]}%`}}>{c.name}</p>
                    <p className="cell" style={{width: `${campaigns_table_flex_rates[1]}%`}}>{c.agent_group_name}</p>
                    <p className="cell" style={{width: `${campaigns_table_flex_rates[2]}%`}}>{c.audience_name}</p>
                    <p className="cell" style={{width: `${campaigns_table_flex_rates[3]}%`}}>{c.goal}</p>
                    <p className="cell" style={{width: `${campaigns_table_flex_rates[4]}%`}}>{`${_.startCase(moment(c.end_date).fromNow())}`}</p>
                    <p className="cell" style={{width: `${campaigns_table_flex_rates[5]}%`}}>{`${numeral(c.cpm).format('$0,0.00')}/${numeral(c.ctr).format('0,0.0')}`}</p>
        					</div>
        				);
        			})}
          	</div>
          </div>
        </div>
      </div>
    );
  }
}
