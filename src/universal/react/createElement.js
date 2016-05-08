// masks the element from view while it is loading
import React from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';

const mapping = ({ __requests__, __location__ }) => ({ requests: __requests__, location: __location__ });

const experiment = (Component, outerProps) => {
	const { route: { weit = true } } = outerProps;
	const Weiting = connect(mapping)(React.createClass({
		render() {

			const { props: { requests, location } } = this;
			const path = requests && location && location.path;
			const stateObj = path && requests[path];

			if (!stateObj) {
				return <Component {...outerProps} />;
			}

			switch (stateObj.state) {
				case 'success': return <Component {...outerProps} />;
				case 'failure': return <div><h1>Failed to load</h1></div>;
				case 'pending': return <Spinner spinnerName="double-bounce" noFadeIn />;
				default: throw new Error(`There is a loading state that is unpopulated for ${location.path} - ${JSON.stringify(stateObj)}`);
			}
		}
	}));

	// if a route has a weit={false}, then it is always rendered without waiting for the AJAX call to complete.
	return !weit ? <Component {...outerProps} /> : <Weiting />;
}

export default (Component, props) => experiment(Component, props);