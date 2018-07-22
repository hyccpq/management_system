'use strict'
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.config')
const { resolve } =require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const dev = merge(baseConfig, {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map',
	devServer: {
		contentBase: resolve(__dirname, '../dist'),
		historyApiFallback: true,
		publicPath: '/',
		hot: true,
		hotOnly: true,
		overlay: true,
		inline: true,
		port: 8086,
		proxy:{
			'/manage': {
				target: 'http://admintest.happymmall.com',
				// pathRewrite: {''},
				changeOrigin: true
			},
			'/user': {
				target: 'http://admintest.happymmall.com',
				// pathRewrite: {''},
				changeOrigin: true
			}
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new ForkTsCheckerWebpackPlugin()
	]
})

module.exports = dev