import React from 'react';
import classnames from 'classnames';

const Todo = React.createClass({
	// all the ugly state / props sync just because React can't handle toggling between a controlled and uncontrolled checkbox
	getInitialState() {
		const { props } = this;
		return { isChecked: props.status === 'DONE' }
	},
	componentWillReceiveProps(nextProps) {
		this.setState({ isChecked: nextProps.status === 'DONE' });
	},
	onChange(e) {
		const { props, state } = this;
		if (props.editable) {
			this.setState({ isChecked: !state.isChecked});
		}
	},
	render() {
		const { props, state, onChange } = this;
		const cssClass = {
			todo: true,
			done: props.status === 'DONE',
			pending: props.status === 'PENDING'
		};

		return (<div className={classnames(cssClass)} data-id={props.id}>
			<input type="checkbox" name="status" checked={state.isChecked} onChange={onChange} disabled={!props.editable} value="DONE" />
			{ props.editable ? <input type="hidden" name="id" value={props.id} /> : null }
			{ props.editable ? <input type="text" name="text" defaultValue={props.text} /> : <span className="text">{props.text}</span> }
			{ this.props.children ? <div className="actions">{this.props.children}</div> : null }
		</div>);
	}
});

export default Todo;