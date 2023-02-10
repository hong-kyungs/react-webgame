const path = require('path');
const { webpack } = require('webpack');

module.exports = {
	name: 'wordrelay-setting',
	mode: 'development', //개발용, 실서비스 : production
	devtool: 'eval',
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	entry: {
		app: ['./client'],
	},
	module: {
		rules: [
			{
				test: /\.jsx?/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env', '@babel/preset-react'],
				},
			},
		],
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.js',
	},
};
