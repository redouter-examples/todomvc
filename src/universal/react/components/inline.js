import React from 'react';

import Form from './form';
import Todo from './todo';
import LinkButton from './linkbutton';
import ActionButton from './actionbutton';

const ICONS = {
	PENCIL: `\u{1F58A}`,
	DISK: `\u{1f4be}`,
	TRASH: `\u{1f5d1}`,
	CANCEL: `\u{274c}`
};

export const Create = React.createClass({
	render() {
		const { props } = this;
		const onSubmit = ({text = ''}) => text && text.trim().length > 0;

		return (<div className="todos-list-item todos-create">
			<Form className="inline-form" method="post" action={props.action} autocomplete="off" onSubmit={onSubmit}>
				<Todo text={props.text} editable={true} completable={false} placeholder="What needs to be done?"></Todo>
			</Form>
		</div>);
	}
});

export const View = React.createClass({
	render() {
		const { props } = this;
		const ACTION_URL = `${props.action}id=${props.id}`;

		return (<div className="todos-list-item">
			<Form className="inline-form" method="post" action={ACTION_URL} autocomplete="off">
				<Todo text={props.text} id={props.id} status={props.status} editable={false}>
					<LinkButton to={ACTION_URL}>{ICONS.PENCIL}</LinkButton>
				</Todo>
			</Form>
		</div>);
	}
});

export const Edit = React.createClass({
	render() {
		const { props } = this;
		const ACTION_URL = `${props.action}id=${props.id}`;

		const BUTTONS = {
			SAVE: <ActionButton key="save" action={ACTION_URL} method="put">{ICONS.DISK}</ActionButton>,
			DELETE: <ActionButton key="delete" action={ACTION_URL} method="delete">{ICONS.TRASH}</ActionButton>,
			CANCEL: <LinkButton key="cancel" to={props.action}>{ICONS.CANCEL}</LinkButton>
		};

		return (<div className="todos-list-item">
			<Form className="inline-form" method="post" action={ACTION_URL} autocomplete="off">
				<Todo text={props.text} id={props.id} status={props.status} editable={true}>
					{ [BUTTONS.SAVE, BUTTONS.DELETE, BUTTONS.CANCEL] }
				</Todo>
			</Form>
		</div>);

	}
})