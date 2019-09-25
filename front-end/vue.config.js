const webpack = require('webpack');
module.exports = {
    baseUrl: '/',
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "windows.jQuery": "jquery"
            })
        ]
    },
    devServer: {
        port: 9090,
        proxy: {
            '/api': {
                target: 'http://localhost:8088',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
};
