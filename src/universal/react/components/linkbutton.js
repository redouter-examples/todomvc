import React from 'react';

const LinkButton = React.createClass({
	render() {
		const props = this.props;
		return (<a href={props.href}>{props.children}</a>);
	}
});

export default LinkButton;