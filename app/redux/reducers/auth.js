import {LOCAL_STORAGE_TOKEN_KEY, ActionTypes} from '../../constants';
const {LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT} = ActionTypes;

let initialToken = null;
initialToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
if (initialToken) {
	initialToken = JSON.parse(initialToken);
}

let initialState = {user: null, token: initialToken, loading: false, error: null};

export default function auth(state = initialState, action) {

	switch(action.type) {
		case LOGIN_REQUESTED:
			return {
				...state,
				loading: true,
				user: null,
				error: null
			};
		case LOGIN_SUCCESS:
			if (action.result.statusCode == 200 && _.has(action.result.body, 'access_token')) {
				localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(action.result.body.access_token));	
			}
			return {
				...state,
				loading: false,
				[action.result.statusCode == 200 ? 'user' : 'error']: action.result.statusCode == 200 ? _.omit(action.result.body, 'access_token') : action.result.body,
				token: action.result.statusCode == 200 ? (action.result.body.access_token || state.token) : null
			};
		case LOGIN_FAILED:
			return {
				...state,
				loading: false,
				token: null,
				error: action.result
			};
		case LOGOUT:
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
			return {
				...state,
				user: null,
				token: null
			};
		default: 
			return state;
	}
	return state;
}
