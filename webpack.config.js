const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
	entry: "./src/index",
	target: "web",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "js/[name].[contenthash].js",
		chunkFilename: "js/[name].[contenthash].js",
	},
	optimization: {
		splitChunks: {
			chunks: "all",
		},
	},
	devtool: "source-map",
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],
	},
	devServer: {
		static: path.join(__dirname, "public/"),
		devMiddleware: {
			publicPath: "/dist/",
		},
		port: 3000,
		hot: "only",
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif)$/i,
				exclude: /node_modules/,
				use: [
					{
						loader: "file-loader",
					},
				],
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(ts|js)x?$/,
				exclude: /node_modules/,
				use: "babel-loader",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			favicon: false,
			template: "./public/index.html",
		}),
		new ForkTsCheckerWebpackPlugin(),
		new ReactRefreshWebpackPlugin(),
	],
};
