import React from 'react'; // eslint-disable-line no-unused-vars
import { Router } from 'express';
import { renderToString } from 'react-dom/server';
import * as database from '../data/index';
import { ListPage, CreatePage, ViewPage, DeletePage, UpdatePage } from '../../universal/react/pages/todo';

const router = Router();

const write = (res, output) => {
	res.status(200);
	res.write(output);
	res.end();
}

const notfound = res => res.status(404).end();

const getOr404 = (req, res, fn) => {
	const { id } = req.params;
	const todo = database.get(id);

	if (todo) {
		return write(res, fn(todo));
	}

	return notfound(res);
};

// these are purely HTML endpoints
router.get('/views/show/:id', (req, res) => {
	getOr404(req, res, todo => renderToString(<ViewPage {...todo} />));
});

router.get('/views/update/:id', (req, res) => {
	getOr404(req, res, todo => renderToString(<UpdatePage {...todo} />));
});

router.get('/views/create', (req, res) => {
	write(res, renderToString(<CreatePage />));
});

router.get('/views/delete/:id', (req, res) => {
	getOr404(req, res, todo => renderToString(<DeletePage {...todo} />));
});

router.get('/views/list', (req, res) => {
	const todos = database.list();
	write(res, renderToString(<ListPage todos={todos} />));
});

// these are, oddly, both a RESTful and a HTML endpoint
router.get('/', (req, res) => {
	if (req.xhr) {
		return write(res, JSON.stringify(database.list()));
	}

	res.redirect('/views/list');
});

router.get('/:id', (req, res) => {
	if (req.xhr) {
		getOr404(req, res, todo => JSON.stringify(todo));
	} else {
		res.redirect(`/views/show/${req.params.id}`);
	}
});


// non HTML returning routes
router.post('/', (req, res) => {
	console.log(`POST body ${JSON.stringify(req.body)}`);
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