import {LOCAL_STORAGE_TOKEN_KEY, ActionTypes} from '../../constants';
const {OPEN_MODAL, CLOSE_MODAL} = ActionTypes;
var initialState = {currentModal: null};

export default function modal(state = initialState, action) {
	const {type, result} = action;

	switch(type) {
		case OPEN_MODAL:
			return {
				...state,
				currentModal: result
			};
		case CLOSE_MODAL:
			return {
				...state,
				currentModal: null
			};
		default: 
			return state;
	}
	return state;
}
