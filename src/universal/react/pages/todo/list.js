import React from 'react';
import Todo from '../../components/todo';
import LinkButton from '../../components/linkbutton';
import classnames from 'classnames';
import { connect } from 'react-redux';

const ListPage = React.createClass({
	render: function() {
		const props = this.props;
		const filterClass = {
			all: classnames({'active-filter': !props.filter }),
			PENDING: classnames({'active-filter': props.filter === 'PENDING'}),
			DONE : classnames({'active-filter': props.filter === 'DONE'})
		};

		return (<div className="todos-list">
			{
				props.todos.map(({id, text, status}) => (
					<div key={id} className="todos-list-item" tabIndex="0">
						<Todo id={id} text={text} status={status}>
							<LinkButton to={`/views/delete/${id}`}>Del</LinkButton>
							<LinkButton to={`/views/update/${id}`}>Edit</LinkButton>
						</Todo>
					</div>
				))
			}
			<div className="todos-list-footer action-buttons">
				<span className="summary">{props.pendingCount} {props.pendingCount === 1 ? 'item' : 'items' } left</span>
				<div className="filter-buttons">
					<LinkButton className={filterClass.all} to={`/views/list`}>All</LinkButton>
					<LinkButton className={filterClass.PENDING} to={`/views/list/PENDING`}>Active</LinkButton>
					<LinkButton className={filterClass.DONE} to={`/views/list/DONE`}>Completed</LinkButton>
				</div>
				<div className="action-buttons">
					<LinkButton to={`/views/create`}>Create</LinkButton>
					<LinkButton to={`/actions/clearCompleted`}>Clear Completed</LinkButton>
				</div>
			</div>

		</div>);
	}
});

const mapping = ({ todos, meta: { filter, pendingCount } }) => ({ todos, filter, pendingCount });
const mapped = connect(mapping)(ListPage);

export { mapped as ListPage };