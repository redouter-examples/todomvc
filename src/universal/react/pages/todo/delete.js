import React from 'react';
import Todo from '../../components/todo';

const DeletePage = React.createClass({
	render: function() {
		const props = this.props;
		return (<div className="todo-single todo-delete">
			<h1>Confirm delete</h1>
			<Todo {...props} />
			<button type="button">Confirm</button>
			<button type="button">Cancel</button>
		</div>);
	}
});

export { DeletePage };