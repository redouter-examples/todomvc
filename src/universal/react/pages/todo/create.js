import React from 'react';
import Todo from '../../components/todo';

const CreatePage = React.createClass({
	render: function() {
		const props = this.props;
		return (<div className="todo-single todo-create">
			<h1>Create todo</h1>
			<Todo {...props} mode="CREATE" />
			<button type="button">Create</button>
			<button type="button">Cancel</button>
		</div>);
	}
});

export { CreatePage };