import React from 'react'; // eslint-disable-line no-unused-vars
import { Router } from 'express';
import { renderToString } from 'react-dom/server';
import * as database from '../data/index';
import { ListPage, ViewPage, DeletePage, UpdatePage } from '../../universal/react/pages/todo';

const router = Router();

const getOr404 = (req, res, fn) => {
	const { id } = req.params;
	const todo = database.get(id);

	if (todo) {
		const output = fn(todo);
		return res.write(output).status(200).end();
	}

	return res.status(404).end();
};

// these are purely HTML endpoints
router.get('/views/update/:id', (req, res) => {
	getOr404(req, res, todo => renderToString(<UpdatePage text={todo.text} status={todo.status} id={todo.id}/>));
});

router.get('/views/create', (req, res) => {
	getOr404(req, res, todo => renderToString(<CreatePage text={todo.text} status={todo.status} id={todo.id} />));
});

router.get('/views/delete', (req, res) => {
	getOr404(req, res, todo => renderToString(<DeletePage text={todo.text} status={todo.status} id={todo.id} />));
});


// these are, oddly, both a RESTful and a HTML endpoint
router.get('/', (req, res) => {
	const todos = database.list();
	const output = renderToString(<ListPage todos={todos} />);

	res.write(output);
	res.status(200).end();
});

router.get('/:id', (req, res) => {
	getOr404(req, res, todo => renderToString(<ViewPage text={todo.text} status={todo.status} id={todo.id} />));
});


// non HTML returning routes
router.post('/', (req, res) => {
	const todo = req.body;
	const id = database.add(todo);
	res.redirect(`/${id}`);
})

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { text, status } = req.body;
	const todo = database.update(id, { text, status });

	if (todo.id) {
		res.redirect(`/${todo.id}`);	
	} else {
		res.redirect(`/`);
	}
	
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	database.remove(id);
	res.redirect(`/`);
});

export default router;