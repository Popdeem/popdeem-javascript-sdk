const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        contentBase: "./dist",
        disableHostCheck: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "examples/index.html"
        }),
        new CopyPlugin([
            {
                from: "examples/instagram-popdeem.html",
                to: "instagram-popdeem.html"
            },
            {
                from: "examples/redirectscript.js",
                to: "redirectscript.js"
            },
            {
                from: "examples/img",
                to: "img"
            }
        ]),
        new BrowserSyncPlugin(
            {
                host: "localhost",
                port: 3000,
                proxy: "http://localhost:8080/",
                https: true
            },
            {
                reload: false
            }
        )
    ]
};
