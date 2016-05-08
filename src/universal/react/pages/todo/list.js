import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import LinkButton from '../../components/linkbutton';
import { Create, View, Edit } from '../../components/inline';

const ListPage = React.createClass({
	render() {
		const props = this.props;
		const filterClass = {
			all: classnames({'active-filter': !props.filter }),
			PENDING: classnames({'active-filter': props.filter === 'PENDING'}),
			DONE : classnames({'active-filter': props.filter === 'DONE'})
		};
		const editingId = props.editing && props.editing.id;
		const BASE_ACTION = `/views/list?${props.filter ? `filter=${props.filter}&` : ''}`;

		return (<div className="todos-list">
			<Create action={BASE_ACTION} text={props.todo.text} />
			{
				props.todos.map(({id, text, status}) => {
					if (id === editingId) {
						return <Edit action={BASE_ACTION} key={id} id={id} text={props.editing.text} status={props.editing.status} />;
					} else { 
						return <View action={BASE_ACTION} key={id} id={id} text={text} status={status} />;
					}
				})
			}
			<div className="todos-list-footer action-buttons">
				<span className="summary">{props.pendingCount} {props.pendingCount === 1 ? 'item' : 'items' } left</span>
				<div className="filter-buttons">
					<LinkButton className={filterClass.all} to={`/views/list`}>All</LinkButton>
					<LinkButton className={filterClass.PENDING} to={`/views/list?filter=PENDING`}>Active</LinkButton>
					<LinkButton className={filterClass.DONE} to={`/views/list?filter=DONE`}>Completed</LinkButton>
				</div>
				<div className="action-buttons">
					<LinkButton to={`/actions/clearCompleted`}>Clear Completed</LinkButton>
				</div>
			</div>

		</div>);
	}
});

const mapping = ({ todos, meta: { filter, pendingCount }, editing, todo }) => ({ todos, filter, pendingCount, editing, todo });
const mapped = connect(mapping)(ListPage);

export { mapped as ListPage };