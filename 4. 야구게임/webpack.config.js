const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

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
					presets: [
						[
							'@babel/preset-env',
							{
								targets: {
									browsers: ['> 1% in KR'],
								},
							},
						],
						'@babel/preset-react',
					],
					plugins: ['react-refresh/babel'],
				},
			},
		],
	},
	plugins: [new RefreshWebpackPlugin()],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.js',
		publicPath: '/dist',
	},
	devServer: {
		devMiddleware: { publicPath: '/dist' },
		static: { directory: path.resolve(__dirname) },
		hot: true,
	},
};
