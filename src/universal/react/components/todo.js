import React from 'react';
import classnames from 'classnames';

const formModes = ['CREATE', 'UPDATE'];

const TodoForm = React.createClass({
	render: function() {
		const props = this.props;
		const method = props.mode === 'CREATE' ? 'POST' : 'PUT';

		return (
			<form 
				method={method}
				target={props.target}>
				<input type="text" name="text" defaultValue={props.text} />
			</form>
		);
	}
});

const Todo = React.createClass({
	render: function () {
		const props = this.props;
		const isForm = formModes.includes(props.mode);
		const cssClass = {
			todo: true,
			done: props.status === 'DONE',
			pending: props.status === 'PENDING',
			'todo-form': isForm
		};

		return (<div className={classnames(cssClass)} data-id={props.id}>
			<input type="checkbox" name="status" defaultChecked={ props.status === 'PENDING'} />
			{ isForm ? 
				<TodoForm mode={props.mode} target={props.target} text={props.text}/> : 
				<span className="text">{props.text}</span> 
			}
		</div>);

	}
});

export default Todo;