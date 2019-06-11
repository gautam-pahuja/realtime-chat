const webpack = require('webpack')
//const { resolve } = require('path')
const path = require('path')
const fs = require('fs')

const NODE_ENV = process.env.NODE_ENV
const __DEV__  = NODE_ENV !== 'production'
const SRC_DIR  = path.normalize('./src')
const REL_DIR  = path.normalize('./release')

module.exports = {
    target: 'node',
    devtool: 'source-map',
    entry: {
        'index': [ 'babel-polyfill', 'server/index.js' ],
    },
    externals: fs.readdirSync('./node_modules'),
    resolve: {
        modules: [ SRC_DIR, 'node_modules' ],
        extensions: [ '.js', '.jsx', '.json' ]
    },
    output: {
        path: REL_DIR,
        publicPath: '/',
        filename: '[name].js',
        pathinfo: true,
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                include: SRC_DIR,
                loader: 'babel'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            __DEV__    : JSON.stringify(__DEV__),
            __CLIENT__ : JSON.stringify(true),
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        })
    ].concat(
        __DEV__ ? [] : [
            new webpack.optimize.DedupePlugin()
        ]
    ),
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
        setImmediate: false
    }
}
