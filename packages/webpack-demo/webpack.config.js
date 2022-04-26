const path = require('path');

module.exports = {
  entry: {
    app: {
      import: './src/index.js',
      // filename: 'test.js'
      // filename: 'name_[name].fullhash_[fullhash].id_[id].chunkhash_[chunkhash].contenthash_[contenthash].file_[file].query_[query].fragment_[fragment].base_[base].path_[path].ext_[ext].url_[url].bundle.js',
    },
  },
  output: {
    // name_app.fullhash_c0a4a4617bd91687996f.id_143.chunkhash_283df260cbd8d31bed38.contenthash_8365e49e0447f6f86374.file_[file].query_[query].fragment_[fragment].base_[base].path_[path].ext_[ext].url_[url].bundle
    // filename: 'name_[name].fullhash_[fullhash].id_[id].chunkhash_[chunkhash].contenthash_[contenthash].file_[file].query_[query].fragment_[fragment].base_[base].path_[path].ext_[ext].url_[url].bundle.js',
    // path: path.resolve(__dirname, 'dist'),

    path: '/Users/jensonchen/web/github/Demo/packages/webpack-demo/dist/test/[fullhash]',
    publicPath: 'https://cdn.example.com/assets/[fullhash]/',

  }
};
