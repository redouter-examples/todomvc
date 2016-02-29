import React from 'react';
import classnames from 'classnames';

const Todo = React.createClass({
	render: function () {
		const props = this.props;
		const cssClass = {
			todo: true,
			done: props.status === 'DONE',
			pending: props.status === 'PENDING'
		};
		const isChecked = props.status === 'DONE';

		return (<div className={classnames(cssClass)} data-id={props.id}>
			<input type="checkbox" name="status" defaultChecked={isChecked} value="DONE" disabled={!props.editable} />
			{ props.editable ? <input type="hidden" name="id" value={props.id} /> : null }
			{ props.editable ? <input type="text" name="text" defaultValue={props.text} /> : <span className="text">{props.text}</span> }
			{ this.props.children ? <div className="actions">{this.props.children}</div> : null }
		</div>);

	}
});

export default Todo;