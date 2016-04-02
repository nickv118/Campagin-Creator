import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';
/* ... */

export function loginWithEmailPassword(email, password) {
  const {LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILED} = ActionTypes;
	return {
    types: [LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILED],
    promise: request.post(API_Config.baseUrl + '/auth')
      .send({ email, password })
      .set('Content-Type', 'application/json')
      .promise()
	};
}

export function loginWithToken(token) {
  const {LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILED} = ActionTypes;
  return {
    types: [LOGIN_REQUESTED, LOGIN_SUCCESS, LOGIN_FAILED],
    promise: request.get(API_Config.baseUrl + '/protected')
      .set('Authorization', `JWT ${token}`)
      .set('Content-Type', 'application/json')
      .promise()
  };
}

export function logout() {
  const {LOGOUT} = ActionTypes;
  return {
    type: LOGOUT,
    result: {}
  };
}
