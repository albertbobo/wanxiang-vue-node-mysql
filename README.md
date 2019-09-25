## About

此项目是一个基于 vue + node 构建的前后端分离的响应式科普网站，包含了前端子系统和后台管理系统，使用mysql数据库，所有的数据都是从服务器端获取的真实数据，具有注册、登录、数据管理、文件上传、富文本编辑等功能。

## 技术栈

前端：vue2.6.10、vue-cli3.7.0、vuex、vue-router、webpack、axios、element-ui

后端：node、express、mysql

## 项目运行

```
git clone https://github.com/albertbobo/wanxiang-vue-node-mysql.git

// 前端子系统代码在front-end目录下，后台管理系统代码在back-end目录下，node代码在server目录下

cd front-end (back-end)

npm i

npm run serve

cd server

nodemon app

```