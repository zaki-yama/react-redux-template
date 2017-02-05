import webpack from 'webpack';
import path from 'path';

export default {
  context: path.resolve(__dirname, './src'),
  entry: {
    javascript: './index.js',
    html: './index.html',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  // Configuration for dev server
  devServer: {
    contentBase: 'dist',
    port: 3000,
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.html$/,
        loader: 'file?name=[path][name].[ext]',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
  // http://webpack.github.io/docs/configuration.html#resolve-extensions
  //resolve: {
    //extensions: ['', '.js', '.jsx']
  //}
};
