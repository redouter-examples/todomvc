// import { addLiveReload } from './src/build/webpack';
import path from 'path';

const babelLoaderPath = require.resolve('babel-loader');

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
			loader: babelLoaderPath
		},{
	        test: /\.css$/,
	        loader: 'style-loader!css-loader'
		}]
	},
	resolve: {
		extensions: ['', '.jsx', '.js']
	}
};

export default BASE_CONFIG;