import _ from 'lodash';
import {ActionTypes} from '../../constants';
const {LOAD_CAMPAIGNS_REQUESTED, LOAD_CAMPAIGNS_SUCCESS, LOAD_CAMPAIGNS_FAILED, LOAD_CAMPAIGN_DETAILS_REQUESTED, LOAD_CAMPAIGN_DETAILS_SUCCESS, LOAD_CAMPAIGN_DETAILS_FAILED, LOAD_AD_PREVIEW_REQUESTED, LOAD_AD_PREVIEW_SUCCESS, LOAD_AD_PREVIEW_FAILED, CREATE_CAMPAIGN_REQUESTED, CREATE_CAMPAIGN_SUCCESS, CREATE_CAMPAIGN_FAILED} = ActionTypes;

var initialState = {list: [], detail: null, preview: null, loading: false, error: null, createLoading: false, createSuccess: false, createError: null};

export default function campaigns(state = initialState, action) {

	switch(action.type) {
		case LOAD_CAMPAIGNS_REQUESTED:
			return {
				...state,
				loading: true,
				list: [],
				error: null
			};
		case LOAD_CAMPAIGNS_SUCCESS:
			return {
				...state,
				loading: false,
				list: action.result.body,
			};
		case LOAD_CAMPAIGNS_FAILED:
			return {
				...state,
				loading: false,
				error: action.result
			};
		case LOAD_CAMPAIGN_DETAILS_REQUESTED:
			return {
				...state,
				loading: true,
				detail: null,
				error: null
			};
		case LOAD_CAMPAIGN_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				detail: action.result.body,
			};
		case LOAD_CAMPAIGN_DETAILS_FAILED:
			return {
				...state,
				loading: false,
				error: action.result
			};
		case LOAD_AD_PREVIEW_REQUESTED:
			return {
				...state,
				loading: true,
				preview: null,
				error: null
			};
		case LOAD_AD_PREVIEW_SUCCESS:
			return {
				...state,
				loading: false,
				preview: action.result.body.body,
			};
		case LOAD_AD_PREVIEW_FAILED:
			return {
				...state,
				loading: false,
				error: action.result
			};
		case CREATE_CAMPAIGN_REQUESTED:
			return {
				...state,
				createLoading: true,
				createSuccess: false,
				createError: null
			};
		case CREATE_CAMPAIGN_SUCCESS:
			return {
				...state,
				createLoading: false,
				createSuccess: action.result.body.success,
			};
		case CREATE_CAMPAIGN_FAILED:
			return {
				...state,
				createLoading: false,
				createError: action.result
			};
		default: 
			return state;
	}
	return state;
}
