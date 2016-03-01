import React from 'react';
import Todo from '../../components/todo';
import LinkButton from '../../components/linkbutton';

const DeletePage = React.createClass({
	render: function() {
		const props = this.props;
		return (<div className="todo-single todo-delete">
			<form className="todo-form" method="post" action={`/${props.id}?_method=delete`}>
				<Todo {...props} />
				<div className="action-buttons">
					<input type="submit" value="Confirm" />
					<LinkButton href="/">Cancel</LinkButton>
				</div>
			</form>
		</div>);
	}
});

export { DeletePage };