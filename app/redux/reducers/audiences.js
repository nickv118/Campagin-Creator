import _ from 'lodash';
import {ActionTypes} from '../../constants';
const {LOAD_AUDIENCES_REQUESTED, LOAD_AUDIENCES_SUCCESS, LOAD_AUDIENCES_FAILED} = ActionTypes;

var initialState = {list: [], detail: null, loading: false, error: null};

export default function audiences(state = initialState, action) {

	switch(action.type) {
		case LOAD_AUDIENCES_REQUESTED:
			return {
				...state,
				loading: true,
				list: [],
				error: null
			};
		case LOAD_AUDIENCES_SUCCESS:
			return {
				...state,
				loading: false,
				list: action.result.body,
			};
		case LOAD_AUDIENCES_FAILED:
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
