module.exports = {
    // 修改的配置
    baseUrl: '/',
    devServer: {
        // 将baseUrl: '/api',改为baseUrl: '/',
        proxy: {
            '/api': {
                target: 'http://localhost:8088',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};
