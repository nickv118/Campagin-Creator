import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';
/* ... */

export function loadAudiences(data) {
  const {LOAD_AUDIENCES_REQUESTED, LOAD_AUDIENCES_SUCCESS, LOAD_AUDIENCES_FAILED} = ActionTypes;
	return {
    types: [LOAD_AUDIENCES_REQUESTED, LOAD_AUDIENCES_SUCCESS, LOAD_AUDIENCES_FAILED],
    promise: request.get(API_Config.baseUrl + '/view/audiences')
      .set('Authorization', `JWT ${data.token}`)
      .set('Content-Type', 'application/json')
      .promise()
	};
}
