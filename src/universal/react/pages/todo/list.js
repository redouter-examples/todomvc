import React from 'react';
import Todo from '../../components/todo';

const ListPage = React.createClass({
	render: function() {
		const { todos } = this.props;
		return (<div className="todos-list">
			{
				todos.map(({id, text, status}) => {
					<div key={id} className="todos-list-item">
						<Todo id={id} text={text} status={status}></Todo>
						<button type="button">Del</button>
						<button type="button">Edit</button>
					</div>
				})
			}
			<div className="todos-list-footer">
				<button type="button">Create</button>
			</div>
		</div>);
	}
});

export { ListPage };