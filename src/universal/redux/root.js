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

/*
const INITIAL = {
	page: {
		title: 'Todo App',
		stylesheet: '/static/styles.css'
	},
	
	todos: [
		{ 
			id: 'apple',
			text: 'Buy apples',
			status: 'DONE'
		},
		{
			id: 'banana',
			text: 'Pay the rent',
			status: 'PENDING'
		}
	],

	todo: undefined,

	meta: {
		filter: undefined,
		pendingCount: 0
	}
	
}

// feels like a clone of server/data/index
export default function rootReducer(state = INITIAL, action) {

	const newState = cloneDeep(state);

	switch (action.type) {
		case 'SET_TODO':
			newState.todo = action.payload;
			break;

		case 'SET_TODOS':
			newState.todos = action.payload;
			break;

		case 'SET_TITLE':
			newState.page.title = action.payload;
			break;

		case 'SET_STYLESHEET':
			newState.page.stylesheet = action.payload.stylesheet;
			break;

		case 'SET_FILTER':
			newState.meta.filter = action.payload;
			break;

		case 'SET_PENDING_COUNT':
			newState.meta.pendingCount = action.payload;
			break;

		case 'CLEAR_FILTER':
			delete newState.meta.filter;
			break;

		default:
			return state;
	}

	return newState;
}
*/