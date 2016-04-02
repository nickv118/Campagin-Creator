import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';
/* ... */

export function loadAgentGroups(data) {
  const {LOAD_AGENT_GROUPS_REQUESTED, LOAD_AGENT_GROUPS_SUCCESS, LOAD_AGENT_GROUPS_FAILED} = ActionTypes;
	return {
    types: [LOAD_AGENT_GROUPS_REQUESTED, LOAD_AGENT_GROUPS_SUCCESS, LOAD_AGENT_GROUPS_FAILED],
    promise: request.get(API_Config.baseUrl + '/view/agent-groups')
      .set('Authorization', `JWT ${data.token}`)
      .set('Content-Type', 'application/json')
      .promise()
	};
}
