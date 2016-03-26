// root reducer
import { cloneDeep /*, findIndex */ } from 'lodash';

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

/*
function findAndPerform(todos, id, fn) {
	const index = findIndex(todos, id);
	if (index !== -1) {
		fn(todos, index);
	}
}
*/

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

		/*
		case 'DELETE_TODO':
			findAndPerform(newState.todos, action.payload.id, (todos, index) => todos.splice(index, 1));
			break;
	
		case 'ADD_TODO':
			newState.todos.push(action.payload);
			break;

		case 'UPDATE_TODO':
			findAndPerform(newState.todos, action.payload.id, (todos, index) => todos.splice(index, 1));
			break;
		*/

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