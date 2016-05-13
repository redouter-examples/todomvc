// because React cannot deal with toggling between a controlled an uncontrolled input
// we introduce a controlled input that is ostensibly uncontrolled, but forces an update
// when props change.
import React from 'react';

export default React.createClass({
	getInitialState() {
		const { props } = this;
		return { checked: props.checked };
	},
	componentWillReceiveProps(nextProps) {
		this.setState({ checked: nextProps.checked });
	},
	onChange() {
		const { state } = this;
		this.setState({ checked: !state.checked});
	},
	render() {
		const { props, state, onChange } = this;
		return <input 
			type="checkbox" onChange={onChange} 
			className={props.className} name={props.name} disabled={props.disabled} value={props.value}
			checked={state.checked} />;
	}
});