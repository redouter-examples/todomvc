import React from 'react'; // eslint-disable-line no-unused-vars
import { Router } from 'express';
import * as database from '../data/index';

// TODO: Fix with a generic querystring library later
function getListUrl(filter) {
	return filter ? `/views/list?filter=${filter}` : `/views/list`;
}

const router = Router();

router.get('/views/list', (req, res) => {
	const { filter, id } = req.query;
	const todos = database.list();
	const pendingCount = todos.reduce((acc, todo) => acc + (todo.status === 'PENDING' ? 1 : 0), 0);

	res.dispatch({type: 'RESET_LIST'}); // not the most elegant solution. Hmmm...
	res.dispatch({type: 'SET_META', payload: { pendingCount, filter } });
	res.dispatch({type: 'SET_TODOS', payload: todos.filter(todo => filter === undefined || todo.status === filter)});
	

	if (id) {
		const todo = database.get(id);
		if (todo) {
			res.dispatch({type: 'SET_PAGE', payload: { title: `editing` }});
			res.dispatch({type: 'EDITING', payload: todo });
		} else {
			return res.status(404);
		}
	} else {
		res.dispatch({type: 'SET_PAGE', payload: { title: `todos`} });
	}
	
	res.universalRender();
});

// inline create
router.post('/views/list', (req, res) => {
	const { filter } = req.query;
	const todo = req.action.body;
	database.add(todo);

	res.dispatch({type: 'CLEAR_TODO'});

	res.universalRedirect(getListUrl(filter));
});

// inline update
router.put('/views/list', (req, res) => {
	const { filter, id } = req.query;
	const { text, status } = req.action.body;
	const todo = database.update(id, { text, status });

	if (!todo) {
		return res.status(404);
	} else {
		res.dispatch({type: 'EDITING', payload: todo}); // weird side effect. optimistic update while waiting for authoritatie response
		return res.universalRedirect(getListUrl(filter));
	}
});

// inline delete
router.delete('/views/list', (req, res) => {
	const { filter, id } = req.query;
	database.remove(id);
	return res.universalRedirect(getListUrl(filter));
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

export default router;