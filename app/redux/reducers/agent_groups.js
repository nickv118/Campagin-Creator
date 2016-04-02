import _ from 'lodash';
import {ActionTypes} from '../../constants';
const {LOAD_AGENT_GROUPS_REQUESTED, LOAD_AGENT_GROUPS_SUCCESS, LOAD_AGENT_GROUPS_FAILED} = ActionTypes;

var initialState = {list: [], detail: null, loading: false, error: null};

export default function agent_groups(state = initialState, action) {

	switch(action.type) {
		case LOAD_AGENT_GROUPS_REQUESTED:
			return {
				...state,
				loading: true,
				list: [],
				error: null
			};
		case LOAD_AGENT_GROUPS_SUCCESS:
			return {
				...state,
				loading: false,
				list: action.result.body,
			};
		case LOAD_AGENT_GROUPS_FAILED:
			return {
				...state,
				loading: false,
				error: action.result
			};
		default: 
			return state;
	}
	return state;
}
