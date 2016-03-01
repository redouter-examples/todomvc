import React from 'react';
import Todo from '../../components/todo';
import LinkButton from '../../components/linkbutton';
import classnames from 'classnames';

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
							<LinkButton href={`/views/delete/${id}`}>Del</LinkButton>
							<LinkButton href={`/views/update/${id}`}>Edit</LinkButton>
						</Todo>
					</div>
				))
			}
			<div className="todos-list-footer action-buttons">
				<span className="summary">{props.pendingCount} {props.pendingCount === 1 ? 'item' : 'items' } left</span>
				<div className="filter-buttons">
					<LinkButton className={filterClass.all} href={`/views/list`}>All</LinkButton>
					<LinkButton className={filterClass.PENDING} href={`/views/list/PENDING`}>Active</LinkButton>
					<LinkButton className={filterClass.DONE} href={`/views/list/DONE`}>Completed</LinkButton>
				</div>
				<div className="action-buttons">
					<LinkButton href={`/views/create`}>Create</LinkButton>
					<LinkButton href={`/actions/clearCompleted`}>Clear Completed</LinkButton>
				</div>
			</div>

		</div>);
	}
});

export { ListPage };