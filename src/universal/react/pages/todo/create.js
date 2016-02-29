import React from 'react';
import Todo from '../../components/todo';
import LinkButton from '../../components/linkbutton';

const CreatePage = React.createClass({
	render: function() {
		const props = this.props;
		return (<div className="todo-single todo-create">
			<form className="todo-form" method="post" action="/">
				<Todo {...props} editable={true} />
				<input type="submit" value="Create"/>
				<LinkButton href="/">Cancel</LinkButton>
			</form>
		</div>);
	}
});

export { CreatePage };