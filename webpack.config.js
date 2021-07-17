const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const config = {
	entry: {
		'wp-cpg': './assets/js/src/wp-cpg/settings.js'
	},
	output: {
		filename: 'js/wp-cpg-settings.js',
		path: path.resolve(__dirname, 'assets')
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader?url=false', 'postcss-loader', 'sass-loader' ]
			},
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '/css/wp-cpg-settings.css'
		}),
		new BrowserSyncPlugin({
			proxy: 'localhost/',
			port: 3000,
			files: [ '**/*.php' ],
			ghostMode: {
				clicks: false,
				location: false,
				forms: false,
				scroll: false
			},
			injectChanges: true,
			logFileChanges: true,
			logLevel: 'debug',
			logPrefix: 'wepback',
			notify: false,
			reloadDelay: 0
		})
	]
};

//If true JS and CSS files will be minified
if (process.env.NODE_ENV === 'production') {
	config.plugins.push(
		new CssMinimizerPlugin()
	);
}

module.exports = config;
