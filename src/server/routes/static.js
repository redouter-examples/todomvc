import React from 'react'; // eslint-disable-line no-unused-vars
import { Router } from 'express';
import * as database from '../data/index';

const router = Router();

const getTodoAndRender = (req, res, fn) => {
	const { id } = req.params;
	const todo = database.get(id);

	if (todo) {
		fn(todo);
		return res.universalRender();
	} else {
		res.status(404);
	}
};

router.get('/views/show/:id', (req, res) => getTodoAndRender(req, res, todo => {
	res.dispatch({type: 'SET_TODO', payload: todo});
	res.dispatch({type: 'SET_PAGE', payload: { title: `view ${req.params.id}`} });
}));

router.get('/views/update/:id', (req, res) => getTodoAndRender(req, res, todo => {
	res.dispatch({type: 'SET_TODO', payload: todo});
	res.dispatch({type: 'SET_PAGE', payload: { title: `update ${req.params.id}`}});
}));

router.get('/views/create', (req, res) => {
	res.dispatch({type: 'SET_PAGE', payload: { title: `create todo`}});
	res.universalRender(); 
});

router.get('/views/delete/:id', (req, res) => getTodoAndRender(req, res, todo => {
	res.dispatch({type: 'SET_TODO', payload: todo});
	res.dispatch({type: 'SET_PAGE', payload: { title: `delete ${req.params.id}`}});
}));

// non HTML returning routes
router.post('/', (req, res) => {
	const todo = req.action.body;
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