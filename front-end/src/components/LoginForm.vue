<template>
    <div class="content-wrapper">
        <div class="login-wrapper">
            <div class="login-top">
                <span>登录</span>
                <div class="login-img">
                    <img src="../assets/imgs/login-elephant.png" alt="">
                </div>
            </div>
            <div class="form-content-wrapper login-content-wrapper">
                <form class="login-form" ref="loginForm">
                    <label>
                        <input type="text" placeholder="邮箱" v-model="loginForm.email" autocomplete="off">
                        <span class="input-msg">{{emailMsg}}</span>
                    </label>
                    <label>
                        <input type="password" placeholder="密码" v-model="loginForm.password" autocomplete="off">
                        <span class="input-msg">{{pwdMsg}}</span>
                    </label>
                    <div class="login-btn">
                        <router-link to="/findpwd" class="forget-pwd">忘记密码？</router-link>
                        <div class="btn-form btn-login-submit" @click="loginSubmit">登 录</div>
                    </div>
                </form>
                <div class="others-login">
                    <div class="others-login-title">
                        <span>第三方登录</span>
                    </div>
                    <button class="btn-wechat"><i class="fa fa-wechat"></i></button>
                </div>
                <div class="login-goto">没有帐号？
                    <router-link to="/register">注册</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LoginForm',
        data() {
            return {
                loginForm: {
                    email: '',
                    password: ''
                },
                emailMsg: '',
                pwdMsg: ''
            }
        },

        methods: {
            // 点击登录
            loginSubmit() {
                let regEmail = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z]{2,5}$/;
                if (this.loginForm.email === '') {
                    this.emailMsg = '请输入邮箱';
                    this.pwdMsg = '';
                } else if (!regEmail.test(this.loginForm.email)) {
                    this.emailMsg = '邮箱格式不正确';
                    this.pwdMsg = '';
                } else if (this.loginForm.password === '') {
                    this.emailMsg = '';
                    this.pwdMsg = '请输入密码';
                } else {
                    this.emailMsg = '';
                    this.pwdMsg = '';
                    let _this = this;
                    this.axios.post("/api/verifyUser", {
                        email: _this.loginForm.email,
                        password: _this.loginForm.password,
                    }).then((response) => {
                        if (response.data.length) {
                            // 把当前登录用户数据存入state
                            _this.$store.commit('SET_TOKEN', response.data[0]);
                            $(".menu li a").removeClass("current");
                            $(".animenu ul li a").removeClass("current");
                            _this.$router.push('/');
                        } else {
                            _this.emailMsg = '帐号或密码错误';
                            _this.pwdMsg = '帐号或密码错误';
                        }
                    });
                }
            }
        },
    }

</script>
