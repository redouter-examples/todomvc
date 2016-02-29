import React from 'react';
import Todo from '../../components/todo';
import LinkButton from '../../components/linkbutton';

const UpdatePage = React.createClass({
	render: function() {
		const props = this.props;
		return (<div className="todo-single todo-update">
			<form className="todo-form" method="post" action={`/${props.id}?_method=put`}>
				<Todo {...props} editable={true} />
				<input type="submit" value="Update" />
				<LinkButton href="/">Cancel</LinkButton>
			</form>
		</div>);
	}
});

export { UpdatePage };