// root reducer
import { cloneDeep } from 'lodash';
import { combineReducers } from 'redux';
import { isRouteAction } from 'route-action';

const reducerMap = {
	__requests__: function(state = {}, action) {
		const newState = cloneDeep(state);
		if (isRouteAction(action) && action.method === 'GET' && action.statusCode !== 302 /* TODO: Fix this */) {
			const { url, statusCode } = action;
			const timestamp = (new Date()).getTime();
			const freshness = newState[url] = newState[url] || {};

			console.log(`GET ${url} statusCode ${statusCode}`);

			switch (statusCode) {
				case 102:
					freshness.state = 'pending';
					break;

				case 500:
					freshness.state = 'failure';
					freshness.timestamp = timestamp;
					break;

				case 200:
					freshness.state = 'success';
					freshness.timestamp = timestamp;
					break;
			}

			return newState;
		}

		return state;
	},
	__location__: function(state = {}, action) {
		if (isRouteAction(action) && action.method === 'GET') {
			return { path: action.url };
		}
		return state;
	},
	todo: function(state = {}, action) {
		switch (action.type) {
			case 'SET_TODO': return { ...action.payload };
			case 'CLEAR_TODO': return {};
		}
		return state;
	},
	todos: function(state = [], action) {
		switch (action.type) {
			case 'SET_TODOS': return [ ...action.payload ].reverse();
		}
		return state;
	},
	page: function(state = {}, action) {
		switch (action.type) {
			case 'SET_PAGE':
				return { ...state, stylesheet: '/static/styles.css', ...action.payload };
		}

		return state;
	},
	meta: function(state = {}, action) {
		switch (action.type) {
			case 'SET_META':
				return { state, ...action.payload };

			case 'RESET_LIST':
				const newState = cloneDeep(state);
				delete newState.filter;
				return newState;
		}

		return state;
	},
	editing: function(state = {}, action) {
		switch (action.type) {
			case 'EDITING':
				return { ...action.payload };
			case 'RESET_LIST':
				return null;
		}

		return state; // no change
	}

};

export default (state = {}, action) => combineReducers(reducerMap)(state, action);