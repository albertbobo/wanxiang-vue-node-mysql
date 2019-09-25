<template>
    <div class="content-wrapper">
        <div class="edit-wrapper">
            <div class="edit-top-wrapper">
                <div class="edit-top">
                    <router-link to="/me">个人中心</router-link>
                    <span>&nbsp;>&nbsp;修改密码</span>
                </div>
            </div>
            <div class="form-content-wrapper">
                <form class="login-form edit-pwd-form" ref="editPwdForm">
                    <label>
                        <input type="password" placeholder="旧密码" v-model="editPwdForm.password"
                               autocomplete="off">
                        <span class="input-msg">{{pwdMsg}}</span>
                    </label>
                    <label>
                        <input type="password" placeholder="新密码" v-model="editPwdForm.newPassword"
                               autocomplete="off">
                        <span class="input-msg">{{newPwdMsg}}</span>
                    </label>
                    <label>
                        <input type="password" placeholder="确认密码" v-model="editPwdForm.confirmPassword"
                               autocomplete="off">
                        <span class="input-msg">{{cfmPwdMsg}}</span>
                    </label>
                    <div class="login-btn">
                        <div class="btn-form btn-edit-submit" @click="editPwdSubmit">保存并重新登录</div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'EditPwdForm',
        data() {
            return {
                editPwdForm: {
                    password: '',
                    newPassword: '',
                    confirmPassword: '',
                },
                pwdMsg: '',
                newPwdMsg: '',
                cfmPwdMsg: ''
            }
        },

        methods: {
            editPwdSubmit() {
                if (this.editPwdForm.password === '') {
                    this.pwdMsg = '请输入旧密码';
                    this.newPwdMsg = '';
                    this.cfmPwdMsg = '';
                } else if (this.editPwdForm.newPassword === '') {
                    this.pwdMsg = '';
                    this.newPwdMsg = '请输入新密码';
                    this.cfmPwdMsg = '';
                } else if (this.editPwdForm.newPassword.length < 6) {
                    this.pwdMsg = '';
                    this.newPwdMsg = '密码长度至少为6位';
                    this.cfmPwdMsg = '';
                } else if (this.editPwdForm.confirmPassword === '') {
                    this.pwdMsg = '';
                    this.newPwdMsg = '';
                    this.cfmPwdMsg = '请再次确认密码';
                } else if (this.editPwdForm.newPassword !== this.editPwdForm.confirmPassword) {
                    this.pwdMsg = '';
                    this.newPwdMsg = '';
                    this.cfmPwdMsg = '两次输入的密码不一致';
                } else {
                    let _this = this;
                    this.axios.post("/api/verifyUser", {
                        email: _this.$store.state.token.email,
                        password: _this.editPwdForm.password,
                    }).then((response) => {
                        if (response.data.length) {
                            _this.editUserPwd();
                        } else {
                            _this.pwdMsg = '密码验证失败，请重新输入';
                            _this.newPwdMsg = '';
                            _this.cfmPwdMsg = '';
                        }
                    });
                }
            },

            // 修改用户密码
            editUserPwd() {
                let _this = this;
                this.axios.post("/api/userEditPwd", {
                    email: _this.$store.state.token.email,
                    password: _this.editPwdForm.newPassword,
                }).then((response) => {
                    if (response && response.data) {
                        _this.pwdMsg = '';
                        _this.newPwdMsg = '';
                        _this.cfmPwdMsg = '';
                        _this.$router.push('/login');
                    } else {
                        console.log('error');
                    }
                });
            }
        }
    }
</script>
