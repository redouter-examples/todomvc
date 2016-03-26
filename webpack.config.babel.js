// import { addLiveReload } from './src/build/webpack';
import path from 'path';

const BASE_CONFIG = {
	entry: {
		app: [
			'./src/client/index.js'
		]
	},
	output: {
		path: path.join(__dirname, 'src', 'client'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel'
		}]
	},
	resolve: {
		extensions: ['', '.jsx', '.js']
	}
};

export default BASE_CONFIG;