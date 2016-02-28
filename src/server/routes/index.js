import React from 'react'; // eslint-disable-line no-unused-vars
import { Router } from 'express';
import { renderToString } from 'react-dom/server';
import * as database from '../data/index';
import IndexPage from '../../universal/react/pages/index';
import Todo from '../../universal/react/components/todo';

const router = Router();

router.get('/', (req, res) => {
	const todos = database.list();
	const output = renderToString(<IndexPage todos={todos} />);

	res.write(output);
	res.status(200).end();
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	const todo = database.get(id);

	if (todo) {
		const output = renderToString(<Todo text={todo.text} status={todo.status} id={todo.id} />);
		res.write(output);
		res.status(200).end();
	} else {
		res.status(404).end();
	}
});

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