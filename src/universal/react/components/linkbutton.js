import React from 'react';
import { Link } from 'react-router';

const LinkButton = React.createClass({
	render() {
		const props = this.props;

		if (props.to) {
			// react router element
			return <Link className={props.className} to={props.to}>{props.children}</Link>;
		} else {
			return (<a className={props.className} href={props.href}>{props.children}</a>);	
		}
		
	}
});

export default LinkButton;