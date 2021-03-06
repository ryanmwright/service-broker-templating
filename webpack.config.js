const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const extend = require('extend');

module.exports = () => {
    const baseConfig = {
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.(handlebars)$/,
                    use: {
                        loader: 'handlebars-loader',
                        query: {
                            helperDirs: [
                                path.resolve(__dirname, 'src', 'handlebars', 'helpers')
                            ]
                        }
                    }
                }
            ]
        },
        plugins: [
            // Ignore any typing files that get generated
            new webpack.WatchIgnorePlugin([
                /css\.d\.ts$/
            ])
        ],
        output: {
            filename: './[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                handlebars: 'handlebars/dist/handlebars.min.js'
            }
        }
    };

    return [
        merge(baseConfig, {
            target: 'node',
            entry: {
                main: `${__dirname}/src/main.ts`
            },
            plugins: [
                new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })
            ],
            externals: fs.readdirSync("node_modules")
                .reduce(function (acc, mod) {
                    if (mod === ".bin") {
                        return acc;
                    }
                    acc[mod] = "commonjs " + mod;
                    return acc;
                }, {})
        }),
        merge(baseConfig, {
            entry: {
                actions: `${__dirname}/src/actions.module.ts`
            },
            output: {
                library: 'sbgen'
            }
        }),
        merge(baseConfig, {
            entry: {
                patterns: `${__dirname}/src/patterns.module.ts`
            },
            output: {
                library: 'sbgen'
            }
        }),
    ];
};