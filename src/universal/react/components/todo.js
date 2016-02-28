import React from 'react';
import classnames from 'classnames';

const Todo = React.createClass({
	render: function () {
		const { id, text, status } = this.props;
		const cssClass = {
			todo: true,
			done: status === 'DONE',
			pending: status === 'PENDING'
		};

		return (<div className={classnames(cssClass)} data-id={id}>
			<span className="text">{text}</span>
		</div>);
	}
});

export default Todo;