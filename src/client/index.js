/* global window, document */

import { universal, client } from 'redouter';
import routes from '../universal/react/routes';
import rootReducer from '../universal/redux/root';

const history = universal.createHistory();
const store = universal.createStore(
	{ 
		reducer: rootReducer,
		intialState: window.__INITIAL_STATE__
	},
	client.requestRedux(history)
);

client.routeTrigger(history, store);
universal.createRouterComponent(routes, history, (err, Component) => {
	if (err) {
		console.error(err);
	} else {
		const target = document.getElementsByTagName('html')[0];
		console.log(target.getAttribute('data-react-checksum'));
		universal.render(Component, store, target);
	}
});