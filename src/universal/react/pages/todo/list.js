import React from 'react';
import Todo from '../../components/todo';
import LinkButton from '../../components/linkbutton';

const ListPage = React.createClass({
	render: function() {
		const props = this.props;
		return (<div className="todos-list">
			{
				props.todos.map(({id, text, status}) => (
					<div key={id} className="todos-list-item">
						<Todo id={id} text={text} status={status}>
							<LinkButton href={`../views/delete/${id}`}>Del</LinkButton>
							<LinkButton href={`../views/update/${id}`}>Edit</LinkButton>
						</Todo>
					</div>
				))
			}
			<div className="todos-list-footer">
				<LinkButton href={`../views/create`}>Create</LinkButton>
			</div>
		</div>);
	}
});

export { ListPage };