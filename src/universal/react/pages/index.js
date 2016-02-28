import React from 'react';
import Todo from '../components/todo';

const IndexPage = React.createClass({
	render: function() {
		const { todos } = this.props;
		console.log(`In IndexPage, ${todos.map(({id, text, status}) => id+text+status)}`);
		return (<div className="todos-list">
			{
				todos.map(({id, text, status}) => <Todo id={id} text={text} status={status}></Todo>)
			}
		</div>);
	}
});

export default IndexPage;