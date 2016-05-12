import React from 'react';
import Form from '../../components/form';
import Todo from '../../components/todo';
import LinkButton from '../../components/linkbutton';
import ActionButton from '../../components/actionbutton';
import classnames from 'classnames';
import { connect } from 'react-redux';

// these components are not in separate files because they have little purpose outside of the
// List view

const ICONS = {
	PENCIL: `\u{1F58A}`,
	DISK: `\u{1f4be}`,
	TRASH: `\u{1f5d1}`,
	CANCEL: `\u{274c}`
};

const ITEM_VARIANTS = {
	InlineCreate: React.createClass({
		render() {
			const { props } = this;
			const onSubmit = ({text = ''}) => text && text.trim().length > 0;

			return (<div className="todos-list-item">
				<Form className="inline-form" method="post" action={props.action} autocomplete="off" onSubmit={onSubmit}>
					<Todo text={props.text} editable={true} completable={false}></Todo>
				</Form>
			</div>);
		}
	}),
	Inline: React.createClass({
		render() {
			const { props } = this;
			const ACTION_URL = `${props.action}id=${props.id}`;

			const BUTTONS = {
				SAVE: <ActionButton key="save" action={ACTION_URL} method="put">{ICONS.DISK}</ActionButton>,
				DELETE: <ActionButton key="delete" action={ACTION_URL} method="delete">{ICONS.TRASH}</ActionButton>,
				CANCEL: <LinkButton key="cancel" to={props.action}>{ICONS.CANCEL}</LinkButton>,
				EDIT: <LinkButton key="edit" to={ACTION_URL}>{ICONS.PENCIL}</LinkButton>
			};

			return (<div className="todos-list-item">
				<Form className="inline-form" method="post" action={ACTION_URL} autocomplete="off">
					<Todo text={props.text} id={props.id} status={props.status} editable={props.editingMode}>
						{ 
							props.editingMode ? [BUTTONS.SAVE, BUTTONS.DELETE, BUTTONS.CANCEL] : [BUTTONS.EDIT] 
						}
					</Todo>
				</Form>
			</div>);
		}
	}),
	Normal: React.createClass({
		render() {
			const { props } = this;

			return (<div className="todos-list-item">
					<Todo {...props}>
						<LinkButton to={`/views/delete/${props.id}`}>Del</LinkButton>
						<LinkButton to={`/views/update/${props.id}`}>Edit</LinkButton>
					</Todo>
			</div>);
		}
	})
};

const ListPage = React.createClass({
	getDefaultProps() {
		return {
			todo: { 
				text: ''
			}
		};
	},
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
			<ITEM_VARIANTS.InlineCreate action={BASE_ACTION} text={props.todo.text} />
			{
				props.todos.map(({id, text, status}) => {
					if (id === editingId) {
						return <ITEM_VARIANTS.Inline action={BASE_ACTION} key={id} id={id} text={props.editing.text} status={props.editing.status} editingMode={true} />;
					} else { 
						return <ITEM_VARIANTS.Inline action={BASE_ACTION} key={id} id={id} text={text} status={status} />;
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
					<LinkButton to={`/views/create`}>Create</LinkButton>
					<LinkButton to={`/actions/clearCompleted`}>Clear Completed</LinkButton>
				</div>
			</div>

		</div>);
	}
});

const mapping = ({ todos, meta: { filter, pendingCount }, editing, todo }) => ({ todos, filter, pendingCount, editing });
const mapped = connect(mapping)(ListPage);

export { mapped as ListPage };