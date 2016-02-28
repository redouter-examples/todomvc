import React from 'react';
import Todo from '../../components/todo';

const UpdatePage = React.createClass({
	render: function() {
		const props = this.props;
		return (<div className="todo-single todo-update">
			<h1>Update todo</h1>
			<Todo {...props} mode="UPDATE" />
			<button type="button">Update</button>
			<button type="button">Cancel</button>
		</div>);
	}
});

export { UpdatePage };