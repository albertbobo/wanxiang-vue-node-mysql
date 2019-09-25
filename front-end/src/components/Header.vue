<template>
    <header>
        <div class="top">
            <div class="container">
                <div class="logo">
                    <router-link to="/">
                        <img src="../assets/imgs/logo.png" alt="万象">
                    </router-link>
                </div>
                <div class="nav-wrapper">
                    <!--nav-->
                    <nav>
                        <!--折叠式导航-->
                        <div class="animenu">
                            <div class="animenu-bar">
                                <button class="animenu-toggle">
                                    <span class="animenu-toggle-bar"></span>
                                    <span class="animenu-toggle-bar"></span>
                                    <span class="animenu-toggle-bar"></span>
                                </button>
                            </div>
                            <ul>
                                <li>
                                    <router-link to="/">首页</router-link>
                                </li>
                                <li>
                                    <router-link to="/read">悦读</router-link>
                                </li>
                                <li>
                                    <router-link to="/video">视界</router-link>
                                </li>
                                <li>
                                    <router-link to="/test">题园</router-link>
                                </li>
                                <li>
                                    <router-link to="/question">问答</router-link>
                                </li>
                                <li>
                                    <router-link to="/explore">探索</router-link>
                                </li>
                            </ul>
                        </div>
                        <!--end 折叠式导航-->
                        <!--导航-->
                        <div class="menu">
                            <ul>
                                <li>
                                    <router-link to="/"><span>首页</span></router-link>
                                </li>
                                <li>
                                    <router-link to="/read"><span>悦读</span></router-link>
                                </li>
                                <li>
                                    <router-link to="/video"><span>视界</span></router-link>
                                </li>
                                <li>
                                    <router-link to="/test"><span>题园</span></router-link>
                                </li>
                                <li>
                                    <router-link to="/question"><span>问答</span></router-link>
                                </li>
                                <li>
                                    <router-link to="/explore"><span>探索</span></router-link>
                                </li>
                            </ul>
                        </div>
                        <!--end 导航-->
                    </nav>
                    <!--end nav-->
                    <!--search-->
                    <div class="search-bar">
                        <form action="">
                            <input type="search" class="search-input" placeholder="搜索万象…" autofocus>
                        </form>
                        <button class="btn-search">
                            <span class="btn-hexagon-search"><i class="fa fa-search"></i></span>
                        </button>
                        <button class="search-close">
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                    <!--end search-->

                    <!--login-->
                    <div class="header-login">
                        <div class="btn-login" @click="isLogin">
                            <span class="btn-hexagon-user"><i class="fa fa-user"></i></span>
                        </div>
                        <ul v-if="userCenterShow">
                            <li>
                                <div class="btn-center" @click="toCenter">
                                    <i class="fa fa-user fa-fw"></i>个人中心
                                </div>
                            </li>
                            <li>
                                <div class="btn-out" @click="signOut"><i class="fa fa-power-off fa-fw"></i>退出</div>
                            </li>
                        </ul>
                    </div>
                    <!--end login-->
                </div>
                <!--end search-->
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'Header',

        data() {
            return {
                userCenterShow: false,
            }
        },

        methods: {
            // 点击登录按钮
            isLogin() {
                // 若未登录，进入登录页
                // 若已登录，选择进入个人中心或退出登录
                const token = localStorage.getItem('token');
                if (!token) {
                    this.$router.push({path: '/login'});
                    $(".menu li a").removeClass("current");
                    $(".animenu ul li a").removeClass("current");
                } else {
                    this.userCenterShow = !this.userCenterShow
                }
            },

            // 点击退出登录
            signOut() {
                localStorage.removeItem('token');
                this.userCenterShow = false;
            },

            // 点击进入个人中心
            toCenter() {
                this.$router.push({path: '/me'});
                this.userCenterShow = false;
                $(".menu li a").removeClass("current");
                $(".animenu ul li a").removeClass("current");
            }
        },

        mounted() {
            // 导航选中样式
            $(".menu li a").click(function () {
                $(".menu li a").removeClass("current");
                $(this).addClass("current");
            });
            $(".animenu ul li a").click(function () {
                $(".animenu ul li a").removeClass("current");
                $(this).addClass("current");
            });

            // 点击折叠式导航
            $(".animenu-toggle").click(function () {
                $(".animenu-toggle").toggleClass("animenu-toggle-active");
                $(".animenu ul").stop(true, false).slideToggle(300);
            });

            // 点击搜索
            $(".btn-search").click(function () {
                $(".btn-login").hide();
                let searchInput = $(".search-input");
                if (searchInput.is(":hidden")) {
                    $(searchInput).show();
                    $(".btn-search").css("right", "55px");
                    $(".search-close").fadeIn(300);
                } else {
                    //search
                }
            });
            $(".search-close").click(function () {
                $(".search-input").hide();
                $(".search-close").hide();
                if ($(window).width() <= 640) {
                    $(".btn-search").css("right", "15px");
                } else {
                    $(".btn-search").css("right", "0");
                }
                $(".btn-login").delay(200).fadeIn(300);
            });
        }
    }
</script>
