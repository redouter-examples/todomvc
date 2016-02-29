import React from 'react';

const Template = React.createClass({
	render() {
		const props = this.props;

		return (
			<html>
				<head>
					{ props.title ? <title>{props.title}</title> : null }
					{ props.stylesheet ? <link rel="stylesheet" href={props.stylesheet} /> : null }
				</head>
				<body>
					<div id="container">
						{ props.title ? <h1>{props.title}</h1> : null }
						{ props.children }
					</div>
				</body>
				{ props.script ? <script src={props.script}></script> : null }
			</html>
		);
	}
});

export default Template;