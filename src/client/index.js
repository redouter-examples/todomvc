/* global window, document */

import { universal, client } from 'redouter';
import routes from '../universal/react/routes';
import rootReducer from '../universal/redux/root';

const history = universal.createHistory();
const store = universal.createStore(
	{ 
		reducer: rootReducer,
		initialState: window.__INITIAL_STATE__
	},
	client.requestRedux(history)
);

client.routeTrigger(history, store);

universal.createRouterComponent(routes, history, (err, Component) => {
	if (err) {
		console.error(err);
	} else {
		universal.render(Component, store, document);
	}
});