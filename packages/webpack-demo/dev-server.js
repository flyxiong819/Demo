const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const config = {
  mode: 'development',
  entry: [
    './node_modules/webpack/hot/dev-server.js',
    './node_modules/webpack-dev-server/client/index.js?hot=true&live-reload=true',
    './src/index.js',
  ],
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'HMR',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
}

const compiler = webpack(config);

const server = new WebpackDevServer({hot: false, client: false}, compiler);

(async () => {
  await server.start();
  console.log('dev server is running');
})();
