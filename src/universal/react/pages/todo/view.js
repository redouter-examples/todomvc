import React from 'react';
import Todo from '../../components/todo';

const ViewPage = React.createClass({
	render: function() {
		const props = this.props;
		return (<div className="todo-single todo-view">
			<Todo {...props} />
			<button type="button">Back to list</button>
		</div>);
	}
});

export { ViewPage };