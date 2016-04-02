import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import _ from 'lodash';
import moment from 'moment';
import numeral from 'numeral';
import Loader from 'react-loaders';
import {FaClose} from 'react-icons/lib/fa';

import { loadCampaignDetails } from '../redux/actions/campaignActions';
import { closeModal } from '../redux/actions/modalActions';
import {modalStyles} from '../styles/modal';

const mock_agent = {
	agent: 'John Smith',
	individual_cpm: '$2.50',
	individual_ctr: '50.4'
};

@connect(
  state => ({user: state.auth.user, token: state.auth.token, modal: state.modal.currentModal, detail: state.campaigns.detail, loading: state.campaigns.loading}),
  {closeModal, loadCampaignDetails}
)
export default class CampaignDetailModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalOpen: true
		};
		this.closeModal = this.closeModal.bind(this);
	}

	componentDidMount() {
    this.props.loadCampaignDetails({token: this.props.token, campaign_id: this.props.modal.data.id});
  }

	closeModal() {
		this.setState({isModalOpen: false}, () => this.props.closeModal());
	}

	render() {
		const {modal: {data}, detail, loading} = this.props;
		const {isModalOpen} = this.state;
  	const cell_classes = ['agent', 'cpm', 'ctr'];
  	let content = null;
  	if (loading) {
  		content = <div style={{textAlign: 'center', marginTop: '50px'}}><Loader type="ball-pulse" /></div>;
  	} else if (detail) {
  		content = (
  			<div>
			  	<div className="stats-section">
				  	<div className="info-block">
				  		<p className="label">AGENT GROUP</p>
				  		<p className="value">{detail.agent_group}</p>
				  	</div>
				  	<div className="info-block">
				  		<p className="label">AUDIENCE</p>
				  		<p className="value">{detail.audience_name} <span className="gray">{`(${detail.audience_desc})`}</span></p>
				  	</div>
				  	<div className="info-block">
				  		<p className="label">GOAL</p>
				  		<p className="value">{detail.goal}</p>
				  	</div>
				  	<div className="info-block">
				  		<p className="label">START DATE</p>
				  		<p className="value">{moment(detail.start_date).format('M/D/YY')}</p>
				  	</div>
				  	<div className="info-block">
				  		<p className="label">ENDING DATE</p>
				  		<p className="value">{moment(detail.end_date).format('M/D/YY')}</p>
				  	</div>
				  </div>
				  <div style={{display: 'flex', flexDirection: 'row'}}>
				  	<div className="stats-section fill" style={{marginRight: '25px'}}>
				  		<div className="info-block">
					  		<p className="label">COST PER IMPRESSION (OVERALL)</p>
					  		<p className="value large">{numeral(data.cpm).format('$0,0.00')}</p>
					  	</div>
				  	</div>
				  	<div className="stats-section fill">
				  		<div className="info-block">
					  		<p className="label">CLICK THROUGH RATE (OVERALL)</p>
					  		<p className="value large">{numeral(data.ctr).format('0,0.0')}</p>
					  	</div>
				  	</div>
				  </div>
				  <div className="agents-table">
	      		<div className="row heading">
	      			<p className="cell agent">AGENT</p>
	      			<p className="cell cpm">INDIVIDUAL CPM</p>
	      			<p className="cell ctr">INDIVIDUAL CTR</p>
	    			</div>
	    			{detail.agents.map((c, index) => {
	    				return (
	    					<div className="row" key={index}>
	    						<p className="cell agent">{c.name}</p>
	    						<p className="cell cpm">{numeral(c.cpm).format('$0,0.00')}</p>
	    						<p className="cell ctr">{numeral(c.ctr).format('0,0.0')}</p>
	    					</div>
	    				);
	    			})}
	      	</div>
      	</div>
  		);
  	}
		return (
			<Modal className="modal campaign-detail-modal" isOpen={isModalOpen} onRequestClose={this.closeModal} style={modalStyles}>
			  <div className="modal-header">
        	<a className="btn btn-close-modal" onClick={this.closeModal}><FaClose size={15} /> <span style={{verticalAlign: 'middle'}}>CLOSE</span></a>
        	<p className="title">{data.name}</p>
			  </div>
			  {content}
			</Modal>
		);
	}
}
