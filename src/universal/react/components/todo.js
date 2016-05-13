import React from 'react';
import classnames from 'classnames';
import Checkbox from './checkbox';
import Textbox from './textbox';

const Todo = React.createClass({
	getDefaultProps() {
		return {
			completable: true,
			editable: false
		}
	},
	render() {
		const { props } = this;
		const cssClass = {
			todo: true,
			done: props.status === 'DONE',
			pending: props.status === 'PENDING'
		};

		return (<div className={classnames(cssClass)} data-id={props.id}>
			{ props.completable ? <Checkbox name="status" checked={props.status === 'DONE'} disabled={!props.editable} value="DONE" /> : null }
			{ props.editable && props.id ? <input type="hidden" name="id" value={props.id} /> : null }
			{ props.editable ? <Textbox name="text" value={props.text} /> : <span className="text">{props.text}</span> }
			{ this.props.children ? <div className="actions">{this.props.children}</div> : null }
		</div>);
	}
});

export default Todo;