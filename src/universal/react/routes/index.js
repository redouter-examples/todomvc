import React from 'react';
import { Route } from 'react-router';
import Template from '../pages/template';
import { CreatePage, DeletePage, ListPage, UpdatePage, ViewPage } from '../pages/todo';

export default (
	<Route path="/" component={Template}>
		<Route path="views/show/:id" component={ViewPage} />
		<Route path="views/update/:id" component={UpdatePage} />
		<Route path="views/create" component={CreatePage} />
		<Route path="views/delete/:id" component={DeletePage} />
		<Route path="views/list" component={ListPage} />
		<Route path="views/list/:filter" component={ListPage} />
	</Route>
);