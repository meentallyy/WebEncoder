const webpack = require('webpack');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            // Добавляем полифилы для Node.js модулей
            webpackConfig.resolve.fallback = {
                crypto: require.resolve('crypto-browserify'),
                stream: require.resolve('stream-browserify'),
                assert: require.resolve('assert'),
                buffer: require.resolve('buffer'),
                util: require.resolve('util'),
                process: require.resolve('process/browser'),
                vm: require.resolve('vm-browserify')
            };
            
            // Добавляем плагины
            webpackConfig.plugins = [
                ...webpackConfig.plugins,
                new webpack.ProvidePlugin({
                    process: 'process/browser',
                    Buffer: ['buffer', 'Buffer']
                })
            ];
            
            return webpackConfig;
        }
    }
};