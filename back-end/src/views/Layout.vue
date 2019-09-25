<template>
    <div class="wrapper">
        <el-container style="height: 500px; border: 1px solid #eee">
            <!--左侧导航-->
            <el-aside width="220px" style="background-color: rgb(238, 241, 246)">
                <el-menu
                        :default-active="defaultActive"
                        router
                        :unique-opened="true"
                        background-color="#EEF1F6"
                        text-color="#555"
                        active-text-color="#5ABCCB">
                    <el-menu-item index="/" class="title-wrapper">
                        <div class="logo">
                            <img src="../assets/img/logo.png" alt="">
                        </div>
                        <span class="title">后台管理系统</span>
                    </el-menu-item>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-user-solid"></i>用户管理</template>
                        <el-menu-item index="user"><i class="el-icon-finished"></i>注册用户</el-menu-item>
                        <el-menu-item index="adminuser"><i class="el-icon-finished"></i>管理员用户</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-s-order"></i>首页管理</template>
                        <el-menu-item index="slideshow"><i class="el-icon-finished"></i>banner</el-menu-item>
                        <el-menu-item index="dailylist"><i class="el-icon-finished"></i>今日一更</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-s-order"></i>悦读管理</template>
                        <el-menu-item index="readlist"><i class="el-icon-finished"></i>悦读列表</el-menu-item>
                        <el-menu-item index="readadd"><i class="el-icon-finished"></i>添加悦读</el-menu-item>
                        <el-menu-item index="readmark"><i class="el-icon-finished"></i>悦读收藏</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-s-order"></i>视界管理</template>
                        <el-menu-item index="videolist"><i class="el-icon-finished"></i>视界列表</el-menu-item>
                        <el-menu-item index="videomark"><i class="el-icon-finished"></i>视界收藏</el-menu-item>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-s-order"></i>题园管理</template>
                        <el-menu-item index="testlist"><i class="el-icon-finished"></i>题园列表</el-menu-item>
                        <el-menu-item index="topiclist"><i class="el-icon-finished"></i>题目列表</el-menu-item>
                    </el-submenu>
                    <el-submenu index="6">
                        <template slot="title"><i class="el-icon-s-order"></i>问答管理</template>
                        <el-menu-item index="questionlist"><i class="el-icon-finished"></i>问答列表</el-menu-item>
                        <el-menu-item index="questionadd"><i class="el-icon-finished"></i>添加问答</el-menu-item>
                        <el-menu-item index="userasklist"><i class="el-icon-finished"></i>提问列表</el-menu-item>
                        <el-menu-item index="questionmark"><i class="el-icon-finished"></i>问答收藏</el-menu-item>
                    </el-submenu>
                    <el-submenu index="7">
                        <template slot="title"><i class="el-icon-s-order"></i>探索管理</template>
                        <el-menu-item index="explorelist"><i class="el-icon-finished"></i>探索列表</el-menu-item>
                        <el-menu-item index="exploreadd"><i class="el-icon-finished"></i>添加探索</el-menu-item>
                        <el-menu-item index="exploremark"><i class="el-icon-finished"></i>探索收藏</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!--右侧内容-->
            <el-container>
                <!--顶部内容-->
                <el-header style="text-align: right; font-size: 12px">
                    <el-dropdown>
                        <span v-if="name">欢迎你，{{name}}</span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <span @click="signOut()">退出系统</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </el-header>
                <!--主体内容-->
                <el-main>
                    <!--路由出口-->
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "Layout",
        computed: {
            ...mapState({
                name: state => state.token.name
            }),

            defaultActive: function () {
                return this.$route.path.replace('/', '');
            }
        },

        methods: {
            signOut() {
                this.$router.push('/login');
            }
        }
    }
</script>

<style>
    html, body, #app, .index, .wrapper {
        height: 100%;
    }

    .el-container {
        min-height: 100% !important;
    }

    .el-header {
        background-color: #b0c4cb;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        background-color: #EEF1F6 !important;
        color: #333;
    }

    .el-aside i:first-child:before {
        position: relative;
        top: -2px;
        color: #b0c4cb;
    }

    .el-menu {
        border-right: none;
    }

    .el-main {
        padding: 15px !important;
    }

    .el-submenu__title {
        padding-left: 30px !important;
    }

    .el-submenu__title:hover, .el-menu-item:hover {
        background-color: #f7faff !important;
    }

    .el-submenu .el-menu-item {
        padding-left: 56px !important;
    }

    .el-dropdown-selfdefine {
        cursor: pointer;
    }

    .el-dropdown-menu {
        margin-top: 0 !important;
    }

    .title-wrapper {
        height: 60px;
        line-height: 60px;
        background-color: #b0c4cb !important;
        text-align: center;
    }

    .title-wrapper:hover {
        background-color: #b0c4cb !important;
    }

    .title-wrapper .title {
        color: #000 !important;
        font-size: 1.5rem;
        font-weight: 800;
        letter-spacing: 1px;
    }

    .logo {
        display: inline-block;
        height: 28px;
        margin: 0 5px 5px 0;
        vertical-align: middle;
    }

    .logo img {
        display: inline-block;
        height: 100%;
        vertical-align: top;
    }

    .el-card__header {
        line-height: 30px;
        font-size: 15px;
        color: #555;
    }
</style>
