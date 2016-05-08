import React from 'react';
import { connect } from 'react-redux';

const Template = React.createClass({
	render() {
		const props = this.props;

		return (
			<html>
				<head>
					<meta charSet="utf-8" />
  					<meta name="viewport" content="width=device-width" />
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

const mapping = ({page: { title, stylesheet, script }}) => ({title, stylesheet, script});
export default connect(mapping)(Template);