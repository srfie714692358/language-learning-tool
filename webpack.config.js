const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
	entry: "./src/content.tsx",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "content.js",
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [require("tailwindcss"), require("autoprefixer")],
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "styles.css",
		}),
		new CopyWebpackPlugin({
			patterns: [{ from: "manifest.json", to: "manifest.json" }],
		}),
	],
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".jsx"],
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	mode: process.env.NODE_ENV === "production" ? "production" : "development",
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
};
