// 引入mysql
const mysql = require('mysql');

// 创建连接
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'wanxiang'
});

// 暴露出去
module.exports = connection;