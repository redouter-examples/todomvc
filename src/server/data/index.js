// WARNING: SIDE EFFECTS GALORE
// acts as a simple data storage mechanism
import uuid from 'uuid';
import { find, findIndex, cloneDeep } from 'lodash';

const DONE = 'DONE';
const PENDING = 'PENDING';

function generateId() {
	return uuid.v4();
}

function validStatus(status) {
	return [DONE, PENDING].includes(status);
}

const todos = [
	{ 
		id: 'apple',
		text: 'Buy apples',
		status: DONE
	},
	{
		id: 'banana',
		text: 'Pay the rent',
		status: PENDING
	}
];

const get = id => {
	const todo = find(todos, {id});
	if (todo) {
		return todo;
	} else {
		console.warn(`Could not find todo with id ${id}`);
	}
}

const update = (id, { text }) => {
	const todo = get(id);
	if (todo) {
		todo.text = text;
	}
}

const add = ({ text }) => {
	todos.push({
		id: generateId(),
		text,
		status: PENDING
	});
}

const list = () => cloneDeep(todos);

const setStatus = (id, status) => {
	if (validStatus(status)) {
		const record = find(todos, { id });
		if (record) {
			record.status = status;
		} else {
			console.warn(`Could not find a todo with id ${id}`);
		}
	} else {
		console.warn(`Attempted to set invalid status ${status} on ${id}`);
	}
};

const remove = id => {
	const index = findIndex(todos, {id});
	if (index) {
		todos.splice(index,1);
	} else {
		console.warn(`Tried to delete a TODO that doesn't exist: ${id}`);
	}
};

export { add, get, list, update, setStatus, remove };