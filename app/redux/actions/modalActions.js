import {ActionTypes, API_Config} from '../../constants';
import _ from 'lodash';

export function openModal(data) {
  const {OPEN_MODAL} = ActionTypes;
	return {
    type: OPEN_MODAL,
    result: data
	};
}

export function closeModal() {
  const {CLOSE_MODAL} = ActionTypes;
  return {
    type: CLOSE_MODAL,
    result: null
  };
}
