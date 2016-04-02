import _ from 'lodash';
import {ActionTypes} from '../../constants';
const {LOAD_IMAGE_LIBRARY_REQUESTED, LOAD_IMAGE_LIBRARY_SUCCESS, LOAD_IMAGE_LIBRARY_FAILED} = ActionTypes;

var initialState = {list: [], detail: null, loading: false, error: null};

export default function image_library(state = initialState, action) {

	switch(action.type) {
		case LOAD_IMAGE_LIBRARY_REQUESTED:
			return {
				...state,
				loading: true,
				list: [],
				error: null
			};
		case LOAD_IMAGE_LIBRARY_SUCCESS:
			return {
				...state,
				loading: false,
				list: action.result.body,
			};
		case LOAD_IMAGE_LIBRARY_FAILED:
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
