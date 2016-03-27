import React from 'react';
import Todo from '../../components/todo';
import LinkButton from '../../components/linkbutton';
import { connect } from 'react-redux';

const UpdatePage = React.createClass({
	render: function() {
		const props = this.props;
		return (<div className="todo-single todo-update">
			<form className="todo-form" method="post" action={`/${props.id}?_method=put`}>
				<Todo {...props} editable={true} />
				<div className="action-buttons">
					<input type="submit" value="Update" />
					<LinkButton to="/">Cancel</LinkButton>
				</div>
			</form>
		</div>);
	}
});

const mapping = ({todo}) => ({...todo});
const mapped = connect(mapping)(UpdatePage);

export { mapped as UpdatePage };