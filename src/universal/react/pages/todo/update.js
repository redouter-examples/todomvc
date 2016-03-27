import React from 'react';
import Todo from '../../components/todo';
import LinkButton from '../../components/linkbutton';
import { connect } from 'react-redux';
import Form from '../../components/form';

const UpdatePage = React.createClass({
	render: function() {
		const props = this.props;
		return (<div className="todo-single todo-update">
			<Form className="todo-form" method="post" action={`/${props.id}?_method=put`}>
				<Todo {...props} editable={true} />
				<div className="action-buttons">
					<input type="submit" value="Update" />
					<LinkButton to="/">Cancel</LinkButton>
				</div>
			</Form>
		</div>);
	}
});

const mapping = ({todo}) => ({...todo});
const mapped = connect(mapping)(UpdatePage);

export { mapped as UpdatePage };