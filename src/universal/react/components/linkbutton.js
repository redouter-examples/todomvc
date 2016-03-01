import React from 'react';

const LinkButton = React.createClass({
	render() {
		const props = this.props;
		return (<a className={props.className} href={props.href}>{props.children}</a>);
	}
});

export default LinkButton;