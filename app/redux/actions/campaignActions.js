import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';
/* ... */

export function loadCampaigns(data) {
  const {LOAD_CAMPAIGNS_REQUESTED, LOAD_CAMPAIGNS_SUCCESS, LOAD_CAMPAIGNS_FAILED} = ActionTypes;
	return {
    types: [LOAD_CAMPAIGNS_REQUESTED, LOAD_CAMPAIGNS_SUCCESS, LOAD_CAMPAIGNS_FAILED],
    promise: request.get(API_Config.baseUrl + '/view/dashboard/campaigns')
      .set('Authorization', `JWT ${data.token}`)
      .set('Content-Type', 'application/json')
      .promise()
	};
}

export function loadCampaignDetails(data) {
  const {LOAD_CAMPAIGN_DETAILS_REQUESTED, LOAD_CAMPAIGN_DETAILS_SUCCESS, LOAD_CAMPAIGN_DETAILS_FAILED} = ActionTypes;
  return {
    types: [LOAD_CAMPAIGN_DETAILS_REQUESTED, LOAD_CAMPAIGN_DETAILS_SUCCESS, LOAD_CAMPAIGN_DETAILS_FAILED],
    promise: request.get(`${API_Config.baseUrl}/view/dashboard/campaigns/${data.campaign_id}/details`)
      .set('Authorization', `JWT ${data.token}`)
      .set('Content-Type', 'application/json')
      .promise()
  };
}

export function loadAdPreview(data) {
  const {LOAD_AD_PREVIEW_REQUESTED, LOAD_AD_PREVIEW_SUCCESS, LOAD_AD_PREVIEW_FAILED} = ActionTypes;
  return {
    types: [LOAD_AD_PREVIEW_REQUESTED, LOAD_AD_PREVIEW_SUCCESS, LOAD_AD_PREVIEW_FAILED],
    promise: request.post(API_Config.baseUrl + '/view/ad-preview')
      .send(_.omit(data, 'token'))
      .set('Authorization', `JWT ${data.token}`)
      .set('Content-Type', 'application/json')
      .promise()
  };
}

export function createCampaign(data) {
  const {CREATE_CAMPAIGN_REQUESTED, CREATE_CAMPAIGN_SUCCESS, CREATE_CAMPAIGN_FAILED} = ActionTypes;
  return {
    types: [CREATE_CAMPAIGN_REQUESTED, CREATE_CAMPAIGN_SUCCESS, CREATE_CAMPAIGN_FAILED],
    promise: request.post(API_Config.baseUrl + '/campaigns')
      .send(_.omit(data, 'token'))
      .set('Authorization', `JWT ${data.token}`)
      .set('Content-Type', 'application/json')
      .promise()
  };
}
