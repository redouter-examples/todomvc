import React from 'react';

const ActionButton = React.createClass({
	getDefaultProps: () => ({ method: 'POST', action: '' }),
	render() {
		const props = this.props;
		const alreadyHasQs = props.action.includes('?');
		const finalAction = `${props.action}${alreadyHasQs ? '&' : '?' }_method=${props.method}`;

		// an action button simply submits the form, with a specific RESTful verb in mind
		// this is achived using the HTML5 attribute formaction (_method will be added to the querystring)
		return <button type="submit" formAction={finalAction}>{props.children}</button>;
	}
});

export default ActionButton;