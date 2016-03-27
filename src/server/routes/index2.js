import React from 'react'; // eslint-disable-line no-unused-vars
import { Router } from 'express';
import * as database from '../data/index';

const router = Router();

const getTodo = (req, res, fn) => {
	const { id } = req.params;
	const todo = database.get(id);

	if (todo) {
		fn(todo);
		return res.universalRender();
	} else {
		res.status(404);
	}
};

router.get('/views/show/:id', (req, res) => getTodo(req, res, todo => {
	res.dispatch({type: 'SET_TODO', payload: todo});
	res.dispatch({type: 'SET_TITLE', payload: `view ${req.params.id}`});
}));

router.get('/views/update/:id', (req, res) => getTodo(req, res, todo => {
	res.dispatch({type: 'SET_TODO', payload: todo});
	res.dispatch({type: 'SET_TITLE', payload: `update ${req.params.id}`});
}));

router.get('/views/create', (req, res) => res.universalRender());
router.get('/views/delete/:id', (req, res) => getTodo(req, res, todo => {
	res.dispatch({type: 'SET_TODO', payload: todo});
	res.dispatch({type: 'SET_TITLE', payload: `delete ${req.params.id}`});
}));

router.get('/views/list/:filter?', (req, res) => {
	const filter = req.params.filter;
	const todos = database.list();
	const pendingCount = todos.reduce((acc, todo) => acc + (todo.status === 'PENDING' ? 1 : 0), 0);

	res.dispatch({type: 'SET_PENDING_COUNT', payload: pendingCount});
	if (filter) {
		res.dispatch({type: 'SET_FILTER', payload: filter});
	}
	res.dispatch({type: 'SET_TODOS', payload: todos.filter(todo => filter === undefined || todo.status === filter)});
	res.dispatch({type: 'SET_TITLE', payload: `todos`});
	res.universalRender();
});

// these are custom business logic endpoints
// WARNING: This shouldn't be a get, but I'm lazy
router.get('/actions/clearcompleted', (req, res) => {
	database.removeCompleted();
	res.redirect('/views/list');
});

// these are, oddly, both potentially a RESTful and also a HTML endpoint
router.get('/', (req, res) => res.universalRedirect('/views/list'));
router.get('/:id', (req, res) => res.universalRedirect(`/views/show/${req.params.id}`));

// non HTML returning routes
router.post('/', (req, res) => {
	const todo = req.body;
	const id = database.add(todo);
	res.universalRedirect(`/${id}`);
})

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { text, status } = req.body;
	const todo = database.update(id, { text, status });

	if (todo.id) {
		res.universalRedirect(`/${todo.id}`);	
	} else {
		res.universalRedirect(`/`);
	}
	
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	database.remove(id);
	res.universalRedirect(`/`);
});

export default router;