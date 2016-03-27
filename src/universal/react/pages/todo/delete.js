import React from 'react';
import Todo from '../../components/todo';
import LinkButton from '../../components/linkbutton';
import Form from '../../components/form';
import { connect } from 'react-redux';

const DeletePage = React.createClass({
	render: function() {
		const props = this.props;
		return (<div className="todo-single todo-delete">
			<Form className="todo-form" method="post" action={`/${props.id}?_method=delete`}>
				<Todo {...props} />
				<div className="action-buttons">
					<input type="submit" value="Confirm" />
					<LinkButton to="/">Cancel</LinkButton>
				</div>
			</Form>
		</div>);
	}
});

const mapping = ({ todo }) => ({ ...todo });
const mapped = connect(mapping)(DeletePage);

export { mapped as DeletePage };