import webpack from 'webpack';
import { cloneDeep } from 'lodash';

export function addLiveReload(config) {
	const newConfig = cloneDeep(config);

	newConfig.entry.app.unshift('webpack-hot-middleware/client');

	newConfig.plugins = [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	].concat(newConfig.plugins || []);

	return newConfig;
}

export function addReactHotReload(config) {
	var newConfig = cloneDeep(config);

	newConfig.plugins = [
		['react-transform', {
			transforms: [{
				transform: 'react-transform-hmr',
				imports: ['react'],
				locals: ['module']
			}]
		}]
	].concat(newConfig.plugins || []);

	newConfig.module.loaders.push({
		test: /.jsx?$/,
		exclude: /node_modules/,
		loader: 'babel'
	});

	return newConfig;
}