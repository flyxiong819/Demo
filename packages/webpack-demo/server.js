const express = require('express');
const webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

// 告知express使用webpack-dev-middleware
// 以及将webpack.config.js配置作为基础文件
app.use(WebpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

// 将文件serve到port 3000
app.listen(3000, () => {
  console.log('example are listening on port: 3000');
});
