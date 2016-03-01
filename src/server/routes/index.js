import React from 'react'; // eslint-disable-line no-unused-vars
import { Router } from 'express';
import { renderToString } from 'react-dom/server';
import * as database from '../data/index';
import Template from '../../universal/react/pages/template';
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

const wrap = (Component, title="") => <Template stylesheet="/static/styles.css" title={title}>{Component}</Template>;
const render = (Component, title="") => `<!DOCTYPE HTML>${renderToString(wrap(Component, title))}`;

// these are purely HTML endpoints
router.get('/views/show/:id', (req, res) => getOr404(req, res, todo => render(<ViewPage {...todo} />, `view ${req.params.id}`)));
router.get('/views/update/:id', (req, res) => getOr404(req, res, todo => render(<UpdatePage {...todo} />, `update ${req.params.id}`)));
router.get('/views/create', (req, res) => write(res, render(<CreatePage />, `create`)));
router.get('/views/delete/:id', (req, res) => getOr404(req, res, todo => render(<DeletePage {...todo} />, `delete ${req.params.id}`)));
router.get('/views/list/:filter?', (req, res) => {
	const filter = req.params.filter;
	const todos = database.list();
	const pendingCount = todos.reduce((acc, todo) => acc + (todo.status === 'PENDING' ? 1 : 0), 0)
	write(res, render(<ListPage 
		filter={filter}
		pendingCount={pendingCount}
		todos={todos.filter(todo => filter === undefined || todo.status === filter)} />
	, `todos`));
});

// these are custom business logic endpoints
// WARNING: This shouldn't be a get, but I'm lazy
router.get('/actions/clearcompleted', (req, res) => {
	database.removeCompleted();
	res.redirect('/views/list');
});

// these are, oddly, both potentially a RESTful and also a HTML endpoint
router.get('/', (req, res) => res.redirect('/views/list'));
router.get('/:id', (req, res) => res.redirect(`/views/show/${req.params.id}`));

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