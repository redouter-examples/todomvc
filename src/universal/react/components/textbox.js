// because React cannot deal with toggling between a controlled an uncontrolled input
// we introduce a controlled input that is ostensibly uncontrolled, but forces an update
// when props change.
import React from 'react';

export default React.createClass({
	getInitialState() {
		const { props } = this;
		return { value: props.value };
	},
	componentWillReceiveProps(nextProps) {
		this.setState({ value: nextProps.value });
	},
	onChange(e) {
		this.setState({ value: e.target.value });
	},
	render() {
		const { props, state, onChange } = this;
		return <input 
			type="text" onChange={onChange} 
			className={props.className} name={props.name} disabled={props.disabled} value={state.value} />;
	}
});