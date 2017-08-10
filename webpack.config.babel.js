import webpack from 'webpack';
import path from 'path';

const PRODUCTION = process.env.NODE_ENV === 'production';

export default {
  context: path.resolve(__dirname, './src'),
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/assets',
  },
  // Configuration for dev server
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    port: 3000,
  },

  devtool: PRODUCTION ? 'cheap-module-source-map' : 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    ...(
      PRODUCTION ? [
        new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
      ] : [
        new webpack.NamedModulesPlugin(),
      ]
    ),
  ],
  // http://webpack.github.io/docs/configuration.html#resolve-extensions
  //resolve: {
    //extensions: ['', '.js', '.jsx']
  //}
};
