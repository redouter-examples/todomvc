import React from 'react';
import Todo from '../../components/todo';
import LinkButton from '../../components/linkbutton';
import { connect } from 'react-redux';

const ViewPage = React.createClass({
	render: function() {
		const props = this.props;
		return (<div className="todo-single todo-view">
			<Todo {...props} />
			<div className="action-buttons">
				<LinkButton href="/">Back to list</LinkButton>
			</div>
		</div>);
	}
});

const mapping = ({todo}) => ({...todo});
const mapped = connect(mapping)(ViewPage);

export { mapped as ViewPage };