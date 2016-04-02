import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';
import request from 'superagent-bluebird-promise';
/* ... */

export function loadImageLibrary(data) {
  const {LOAD_IMAGE_LIBRARY_REQUESTED, LOAD_IMAGE_LIBRARY_SUCCESS, LOAD_IMAGE_LIBRARY_FAILED} = ActionTypes;
	return {
    types: [LOAD_IMAGE_LIBRARY_REQUESTED, LOAD_IMAGE_LIBRARY_SUCCESS, LOAD_IMAGE_LIBRARY_FAILED],
    promise: request.get(API_Config.baseUrl + '/view/image-library')
      .set('Authorization', `JWT ${data.token}`)
      .set('Content-Type', 'application/json')
      .promise()
	};
}
