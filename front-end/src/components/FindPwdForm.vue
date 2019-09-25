<template>
    <div class="content-wrapper">
        <div class="edit-wrapper">
            <div class="edit-top-wrapper">
                <div class="edit-top">
                    <router-link to="/login">登录</router-link>
                    <span>&nbsp;>&nbsp;忘记密码</span>
                </div>
            </div>
            <ul class="find-pwd-step">
                <li class="pwd-step1">① 设置新密码</li>
                <li>---------------</li>
                <li class="pwd-step2">② 重置密码</li>
                <li>---------------</li>
                <li class="pwd-step3">③ 重置成功</li>
            </ul>
            <div class="form-content-wrapper">
                <form class="login-form" ref="findPwdForm">
                    <div class="find-pwd-first" v-if="findPwdFirstShow">
                        <label>
                            <input type="text" placeholder="邮箱" v-model="findPwdForm.email" autocomplete="off">
                            <span class="input-msg">{{emailMsg}}</span>
                        </label>
                        <label>
                            <input type="password" placeholder="新密码" v-model="findPwdForm.password" autocomplete="off">
                            <span class="input-msg">{{pwdMsg}}</span>
                        </label>
                        <div class="login-btn" @click="findPwdNext">
                            <div class="btn-form btn-find-next">下一步</div>
                        </div>
                    </div>
                    <div class="find-pwd-next" v-if="findPwdNextShow">
                        <label class="reg-code">
                            <input type="text" placeholder="验证码" v-model="findPwdForm.code" autocomplete="off">
                            <button class="send-code" :disabled="disabled" @click="sendFindPwdCode">{{regCode}}</button>
                            <span class="input-msg">{{codeMsg}}</span>
                        </label>
                        <div class="login-btn" @click="findPwdSubmit(findPwdForm.code)">
                            <div class="btn-form btn-find-submit">确定</div>
                        </div>
                    </div>
                    <div class="find-pwd-last" v-if="findPwdLastShow">
                        <div class="icon-finish"><i class="fa fa-check"></i></div>
                        <div class="text-finish">密码重置成功</div>
                        <div class="back-login"><span>{{time2}}s 后返回登录</span></div>
                        <div class="login-btn">
                            <router-link to="/login" class="btn-form re-login">重新登录</router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FindPwdForm',
        data() {
            return {
                findPwdFirstShow: true,
                findPwdNextShow: false,
                findPwdLastShow: false,
                findPwdForm: {
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
                time2: 0,
            }
        },

        methods: {
            // 点击下一步
            findPwdNext() {
                let regEmail = /^[A-Za-z0-9]+([-_.][A-Za-z0-9]+)*@([A-Za-z0-9]+[-.])+[A-Za-z]{2,5}$/;
                if (this.findPwdForm.email === '') {
                    this.emailMsg = '请输入邮箱';
                    this.pwdMsg = '';
                } else if (!regEmail.test(this.findPwdForm.email)) {
                    this.emailMsg = '邮箱格式不正确';
                    this.pwdMsg = '';
                } else if (this.findPwdForm.password === '') {
                    this.emailMsg = '';
                    this.pwdMsg = '请设置新密码';
                } else if (this.findPwdForm.password.length < 6) {
                    this.emailMsg = '';
                    this.pwdMsg = '密码长度至少为6位';
                } else {
                    this.emailMsg = '';
                    this.pwdMsg = '';
                    let _this = this;
                    this.axios.post("/api/getUserEmail", {
                        email: _this.findPwdForm.email,
                    }).then((response) => {
                        if (response.data.length) {
                            _this.emailMsg = '';
                            _this.findPwdFirstShow = false;
                            _this.findPwdNextShow = true;
                            $('.pwd-step2').css("color", "#e3ce07");
                            $('.pwd-step1').css("color", "#555");
                        } else {
                            _this.emailMsg = '该邮箱未被注册';
                        }
                    });
                }
            },

            // 点击获取验证码
            sendFindPwdCode() {
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
                    email: _this.findPwdForm.email,
                    mysubject: '万象邮箱验证',
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

            // 点击确定修改密码
            findPwdSubmit(code) {
                let inputCode = parseInt(code);
                if (code === '') {
                    this.codeMsg = '请输入验证码';
                } else if (inputCode === this.emailCode) {
                    this.codeMsg = '';
                    let _this = this;
                    this.axios.post("/api/userEditPwd", {
                        email: _this.findPwdForm.email,
                        password: _this.findPwdForm.password,
                    }).then((response) => {
                        if (response && response.data) {
                            _this.findPwdNextShow = false;
                            _this.findPwdLastShow = true;
                            $('.pwd-step2').css("color", "#555");
                            $('.pwd-step3').css("color", "#e3ce07");
                            // 5s后跳转至登录页
                            _this.time2 = 5;
                            _this.timer2();
                        } else {
                            console.log('error');
                        }
                    });
                } else {
                    this.codeMsg = '验证码错误';
                }
            },

            // 跳转至登录页倒计时
            timer2() {
                if (this.time2 > 0) {
                    this.time2--;
                    setTimeout(this.timer2, 1000);
                } else {
                    this.time2 = 0;
                    this.$router.push('/login');
                }
            },
        },
    }

</script>
