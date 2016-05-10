import React from 'react'; // eslint-disable-line no-unused-vars
import { Router } from 'express';
import * as database from '../data/index';

const SIMULATED_DELAY = 1000;
const delay = duration => fn => setTimeout(fn, duration);
const weit = delay(SIMULATED_DELAY);

const router = Router();

const getTodo = (req, res, fn) => {
	const { id } = req.params;
	weit(() => {
		const todo = database.get(id);

		if (todo) {
			fn(todo);
			return res.universalRender();
		} else {
			res.status(404);
		}
	});
};

router.get('/views/show/:id', (req, res) => getTodo(req, res, todo => {
	res.dispatch({type: 'SET_TODO', payload: todo});
	res.dispatch({type: 'SET_PAGE', payload: { title: `view ${req.params.id}`} });
}));

router.get('/views/update/:id', (req, res) => getTodo(req, res, todo => {
	res.dispatch({type: 'SET_TODO', payload: todo});
	res.dispatch({type: 'SET_PAGE', payload: { title: `update ${req.params.id}`}});
}));

router.get('/views/create', (req, res) => res.universalRender());
router.get('/views/delete/:id', (req, res) => getTodo(req, res, todo => {
	res.dispatch({type: 'SET_TODO', payload: todo});
	res.dispatch({type: 'SET_PAGE', payload: { title: `delete ${req.params.id}`}});
}));

router.get('/views/list', (req, res) => {
	const { filter, id } = req.query;
	const todos = database.list();
	const pendingCount = todos.reduce((acc, todo) => acc + (todo.status === 'PENDING' ? 1 : 0), 0);

	res.dispatch({type: 'RESET_LIST'}); // not the most elegant solution. Hmmm...

	if (id) {
		const todo = database.get(id);
		if (todo) {
			res.dispatch({type: 'EDITING', payload: todo });
		} else {
			return res.status(404);
		}
	}
	
	res.dispatch({type: 'SET_META', payload: { pendingCount, filter } });
	res.dispatch({type: 'SET_TODOS', payload: todos.filter(todo => filter === undefined || todo.status === filter)});
	res.dispatch({type: 'SET_PAGE', payload: { title: `todos`} });
	res.universalRender();
});

// TODO: Fix with a generic querystring library later
function getListUrl(filter) {
	return filter ? `/views/list?filter=${filter}` : `/views/list`;
}

// inline update
router.put('/views/list', (req, res) => {
	const { filter, id } = req.query;
	const { text, status } = req.action.body;
	const todo = database.update(id, { text, status });

	if (!todo) {
		return res.status(404);
	} else {
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

// non HTML returning routes
router.post('/', (req, res) => {
	const todo = req.action.body;
	const id = database.add(todo);

	res.universalRedirect(`/${id}`);
})

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { text, status } = req.action.body;
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