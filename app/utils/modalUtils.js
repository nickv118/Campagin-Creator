import React from 'react';
import {CampaignDetailModal} from '../components';

import {ModalTypes} from '../constants';

export function renderModal(type, props) {
	switch(type) {
		case ModalTypes.CAMPAIGN_DETAIL_MODAL:
			return <CampaignDetailModal />;
		default:
			return null;
	}
}
