import React from 'react';
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

export default router;