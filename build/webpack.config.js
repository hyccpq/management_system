'use strict'
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length - 1 });
console.log(os.cpus().length);
// const ProgressBarPlugin = require('progress-bar-webpack-plugin');


module.exports = {
    entry: path.resolve(__dirname, "../src/index.tsx"),
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "../dist")
    },

    // Enable sourcemaps for debugging webpack's output.
    // devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {
            	test: /\.(tsx|ts)?$/,
	            use: [
	            	// {
		            // loader: "react-hot-loader/webpack"
	            // },
	            {
		            loader: "happypack/loader?id=babel"
	            },{
		            loader: "awesome-typescript-loader"
	            }]
	
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
	        {
		        enforce: "pre",
		        test: /\.js$/,
		        use: [{
			        loader: "source-map-loader"
		        },{
			        loader: "happypack/loader?id=babel"
		        }]
	           
            },
	        
	        {
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					'happypack/loader?id=less'
				]
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'happypack/loader?id=css',
					// {
					// 	loader: 'style-loader'
					// },
					// {
					// 	loader: 'css-loader'
					// }
				]
			},
	        {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url-loader?limit=8192&name=[name].[ext]&publicPath='
            }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
	plugins: [
		new HappyPack({
			// 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
			id: 'babel',
			// 如何处理 .js 文件，用法和 Loader 配置中一样
			loaders: ['babel-loader?cacheDirectory'],
			// 使用共享进程池中的子进程去处理任务
			threadPool: happyThreadPool,
		}),
		new HappyPack({
			id: 'less',
			// 如何处理 .css 文件，用法和 Loader 配置中一样
			loaders: [
				'css-loader',
				'postcss-loader',
					{
						loader: 'less-loader',
						options: {
							sourceMap: true,
							javascriptEnabled: true
						}
					}
			],
			// 使用共享进程池中的子进程去处理任务
			threadPool: happyThreadPool,
		}),
		new HappyPack({
			id: 'css',
			// 如何处理 .css 文件，用法和 Loader 配置中一样
			loaders: [
				{
					loader: 'typings-for-css-modules-loader',
					options: {
						modules: true,
						namedExport: true,
						camelCase: true
					}
				}, 
				'postcss-loader'
			],
			// 使用共享进程池中的子进程去处理任务
			threadPool: happyThreadPool,
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].[hash:8].css',
			chunkFilename: '[id].[hash:8].css'
		}),
		
	]
};
