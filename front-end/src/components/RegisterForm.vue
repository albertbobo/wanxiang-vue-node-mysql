+<template>
    <div class="content-wrapper">
        <div class="login-wrapper">
            <div class="login-top">
                <span>注册</span>
                <div class="login-img">
                    <img src="../assets/imgs/login-elephant.png" alt="">
                </div>
            </div>
            <div class="form-content-wrapper login-content-wrapper">
                <form class="login-form" ref="registerForm">
                    <div class="reg-first-wrapper" v-if="regFirstShow">
                        <label>
                            <input type="text" placeholder="验证邮箱" v-model="registerForm.email" autocomplete="off">
                            <span class="input-msg">{{emailMsg}}</span>
                        </label>
                        <label>
                            <input type="password" placeholder="设置密码" v-model="registerForm.password"
                                   autocomplete="off">
                            <span class="input-msg">{{pwdMsg}}</span>
                        </label>
                        <div class="login-btn">
                            <div class="btn-form" @click="regNext">下一步</div>
                        </div>
                    </div>
                    <div class="reg-next-wrapper" v-if="regNextShow">
                        <label class="reg-code">
                            <input type="text" placeholder="验证码" v-model="registerForm.code" autocomplete="off">
                            <button class="send-code" :disabled="disabled" @click="sendRegCode">{{regCode}}</button>
                            <span class="input-msg">{{codeMsg}}</span>
                        </label>
                        <div class="login-btn">
                            <div class="btn-form" @click="regSubmit(registerForm.code)">完成并登录</div>
                        </div>
                    </div>
                </form>
                <div class="login-goto">已有帐号？
                    <router-link to="/login">登录</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RegisterForm',
        data() {
            return {
                regFirstShow: true,
                regNextShow: false,
                registerForm: {
                    email: '',
                    password: '',
                    code: ''
                },
                emailMsg: '',
                pwdMsg: '',
                codeMsg: '',
                disabled: false,
                regCode: '获取验证码',
                time: 0,
                emailCode: '',
            }
        },

        methods: {
            // 点击下一步
            regNext() {
                // 邮箱、密码有效性验证
                let regEmail = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z]{2,5}$/;
                if (this.registerForm.email === '') {
                    this.emailMsg = '请输入邮箱';
                    this.pwdMsg = '';
                } else if (!regEmail.test(this.registerForm.email)) {
                    this.emailMsg = '邮箱格式不正确';
                    this.pwdMsg = '';
                } else if (this.registerForm.password === '') {
                    this.emailMsg = '';
                    this.pwdMsg = '请输入密码';
                } else if (this.registerForm.password.length < 6) {
                    this.emailMsg = '';
                    this.pwdMsg = '密码长度至少为6位';
                } else {
                    this.emailMsg = '';
                    this.pwdMsg = '';
                    // 验证邮箱是否已被注册
                    let _this = this;
                    this.axios.post("/api/getUserEmail", {
                        email: _this.registerForm.email,
                    }).then((response) => {
                        if (response.data.length) {
                            _this.emailMsg = '该邮箱已被注册';
                        } else {
                            _this.regFirstShow = false;
                            _this.regNextShow = true;
                        }
                    });
                }
            },

            // 点击获取验证码
            sendRegCode() {
                this.time = 60;
                this.disabled = true;
                this.timer();
                $(".send-code").css({
                    "color": "#aaa",
                    "cursor": "default",
                });

                // 发送验证码
                let _this = this;
                this.axios.post("/api/sendEmailCode", {
                    email: _this.registerForm.email,
                    mysubject: '欢迎注册万象',
                }).then((response) => {
                    if (response && response.data) {
                        _this.emailCode = response.data;
                    } else {
                        console.log('error');
                    }
                });
            },

            // 获取验证码倒计时
            timer() {
                if (this.time > 0) {
                    this.time--;
                    this.regCode = this.time + 's后重新获取';
                    setTimeout(this.timer, 1000);
                } else {
                    this.time = 0;
                    this.regCode = "获取验证码";
                    this.disabled = false;
                    $(".send-code").css({
                        "cursor": "pointer",
                    });
                }
            },

            // 点击完成注册
            regSubmit(code) {
                let inputCode = parseInt(code);
                if (code === '') {
                    this.codeMsg = '请输入验证码';
                } else if (inputCode === this.emailCode) {
                    this.codeMsg = '';
                    // 将注册信息写入用户表
                    let _this = this;
                    this.axios.post("/api/userAdd", {
                        email: _this.registerForm.email,
                        password: _this.registerForm.password,
                        username: '用户_' + Math.random().toString().slice(-6),
                        signature: '一句话介绍自己'
                    }).then((response) => {
                        if (response && response.data) {
                            // 跳转至登录页
                            _this.$router.push('/login');
                        } else {
                            console.log('error');
                        }
                    });
                } else {
                    this.codeMsg = '验证码错误';
                }
            },

        },
    }

</script>
