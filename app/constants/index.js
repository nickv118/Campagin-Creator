import keyMirror from 'keymirror';

export const LOCAL_STORAGE_TOKEN_KEY = 'denim.session.token';

export const ActionTypes = keyMirror({
	LOGIN_REQUESTED: null,
	LOGIN_SUCCESS: null,
	LOGIN_FAILED: null,
	LOGOUT: null,
	OPEN_MODAL: null,
	CLOSE_MODAL: null,
	LOAD_CAMPAIGNS_REQUESTED: null, 
	LOAD_CAMPAIGNS_SUCCESS: null, 
	LOAD_CAMPAIGNS_FAILED: null,
	LOAD_CAMPAIGN_DETAILS_REQUESTED: null,
	LOAD_CAMPAIGN_DETAILS_SUCCESS: null, 
	LOAD_CAMPAIGN_DETAILS_FAILED: null,
	LOAD_AGENT_GROUPS_REQUESTED: null,
	LOAD_AGENT_GROUPS_SUCCESS: null,
	LOAD_AGENT_GROUPS_FAILED: null,
	LOAD_AUDIENCES_REQUESTED: null,
	LOAD_AUDIENCES_SUCCESS: null,
	LOAD_AUDIENCES_FAILED: null,
	LOAD_IMAGE_LIBRARY_REQUESTED: null,
	LOAD_IMAGE_LIBRARY_SUCCESS: null,
	LOAD_IMAGE_LIBRARY_FAILED: null,
	LOAD_AD_PREVIEW_REQUESTED: null,
	LOAD_AD_PREVIEW_SUCCESS: null,
	LOAD_AD_PREVIEW_FAILED: null,
	CREATE_CAMPAIGN_REQUESTED: null,
	CREATE_CAMPAIGN_SUCCESS: null,
	CREATE_CAMPAIGN_FAILED: null
});

export const ModalTypes = keyMirror({
	CAMPAIGN_DETAIL_MODAL: null
});

export const API_Config = {
	baseUrl: 'http://americannational.denimlabs.io/api'
};

export const LOADER_OPTIONS = {
    lines: 13,
    length: 20,
    width: 10,
    radius: 30,
    corners: 1,
    rotate: 0,
    direction: 1,
    color: '#000',
    speed: 1,
    trail: 60,
    shadow: false,
    hwaccel: false,
    zIndex: 2e9,
    top: '50%',
    left: '50%',
    scale: 1.00
};
