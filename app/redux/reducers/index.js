import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import campaigns from './campaigns';
import agent_groups from './agent_groups';
import audiences from './audiences';
import image_library from './image_library';
import modal from './modal';

export default combineReducers({
    auth,
    campaigns,
    agent_groups,
    audiences,
    image_library,
    modal,
    routing: routerReducer
});
