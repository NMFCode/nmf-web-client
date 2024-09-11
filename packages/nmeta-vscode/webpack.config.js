'use strict';

const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const nodeModules = path.resolve(__dirname, '../../../node_modules');

/**@type {import('webpack').Configuration}*/
const config = {
    target: 'node',

    entry: path.resolve(__dirname, 'src/nmeta-extension.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'nmeta-extension.js',
        libraryTarget: 'commonjs2'
    },
    devtool: 'source-map',
    externals: {
        vscode: 'commonjs vscode'
    },
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '..', '..', 'backend', 'NMetaGlspEditor.Server.exe')
                },
                {
                    from: path.resolve(__dirname, '..', 'nmeta-glsp-webview', 'dist', 'nmetaWebview.js')
                },
                {
                    from: path.resolve(__dirname, '..', 'property-view', 'dist', 'property-view')
                },
                {
                    from: path.resolve(__dirname, '..', 'property-view', 'dist', 'index.html'),
                    to: path.resolve(__dirname, '..', 'dist', 'property-view')
                }
            ]
        })
    ],
    ignoreWarnings: [/Can't resolve .* in '.*ws\/lib'/],
    performance: {
        hints: false
    }
};

module.exports = config;
