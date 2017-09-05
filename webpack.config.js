const path = require('path');
const webpack = require('webpack');
const FriendlyErrors = require('friendly-errors-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const chalk = require('chalk');
const projectConfig = require('./src/env-config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const { dependencies } = require('./package.json');
const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

const port = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV === 'development';

const config = {
  entry: isDev ? ['preact/devtools', './src/index.js'] : './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    chunkFilename: isDev ? '[name].bundle.js' : '[id].bundle.[hash].js',
    filename: isDev ? '[name].bundle.js' : '[id].bundle.[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.graphqlconfig/,
        loader: 'raw-loader'
      },
      isDev
        ? {
            test: /\.css$/,
            loaders: 'style-loader!css-loader'
          }
        : {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: { loader: 'css-loader', options: { sourceMap: false } }
            })
          }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
      services: path.resolve(__dirname, './src/services'),
      components: path.resolve(__dirname, './src/components'),
      stores: path.resolve(__dirname, './src/stores'),
      selectors: path.resolve(__dirname, './src/selectors'),
      utils: path.resolve(__dirname, './src/utils.js')
    }
  },
  devServer: {
    historyApiFallback: true,
    port,
    quiet: true,
    hot: true
  },
  performance: {
    hints: false
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new ExtractTextPlugin({ filename: 'style.css' }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  devtool: 'source-map'
};

if (isDev) {
  config.plugins = [
    ...config.plugins,
    new webpack.NamedModulesPlugin(),
    new FriendlyErrors({
      compilationSuccessInfo: {
        messages: [
          `Application is running on ${chalk.bold.cyan(`http://localhost:${port}`)}`,
          ...Object.keys(projectConfig).map(key => `${key}: ${chalk.bold.cyan(projectConfig[key])}`)
        ]
      }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new AutoDllPlugin({
      inject: true,
      debug: isDev,
      filename: '[name].dll.[hash].js',
      path: './dll',
      entry: Object.keys(dependencies).reduce((acc, dep) => {
        const camelCaseDep = dep.replace(/-([a-z])/g, g => g[1].toUpperCase());
        return Object.assign(acc, { [camelCaseDep]: [camelCaseDep] });
      }, {})
    })
  ];
} else {
  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.(js|jsx)/,
      exclude: /node_modules/,
      enforce: 'pre',
      use: [
        {
          loader: 'eslint-loader',
          options: {
            failOnError: true,
            rules: {
              'no-debugger': 2,
              'no-console': ['error', { allow: ['info', 'warn'] }]
            }
          }
        }
      ]
    }
  ];
  config.plugins = [
    ...config.plugins,
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } }),
    new StyleExtHtmlWebpackPlugin({ minify: true }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true,
      output: {
        comments: false
      }
    }),
    new PreloadWebpackPlugin(),
    new ProgressBarPlugin()
  ];
  if (process.env.NODE_ENV === 'analyze') {
    config.plugins.push(new BundleAnalyzerPlugin());
  }
}

module.exports = config;
