<template>
    <div class="login-form">
        <img src="../assets/img/login-elephant.png" alt="logo" class="login-img">
        <!--登录表单-->
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px"
                 class="demo-loginForm">
            <h1 class="title">管理员登录</h1>
            <el-form-item label="帐号" prop="username">
                <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "LoginForm",
        data() {
            return {
                // 登录表单的数据
                loginForm: {
                    username: '',
                    password: '',
                },
                // 验证规则
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                    ],
                },
            };
        },

        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // 保留this
                        let _this = this;
                        // 获取用户登录信息，发送给后端
                        this.axios.post("/api/checkLogin", {
                            username: _this.loginForm.username,
                            name: _this.loginForm.name,
                            password: _this.loginForm.password,
                        }).then(response => {
                            if (response.data.length) {
                                // 把当前登录用户数据存入state
                                _this.$store.commit('SET_TOKEN', response.data[0]);
                                _this.$message({
                                    message: '登录成功！',
                                    type: 'success'
                                });
                                // 跳转到后台首页
                                _this.$router.push('/');
                            } else {
                                _this.$message.error('帐号或密码错误！');
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style>
    body, html, #app, .login-wrapper {
        height: 100%;
    }

    .login-wrapper {
        display: flex;
        height: 100%;
        background-color: #f5f4e7;
        justify-content: center;
        align-items: center;
    }

    .login-form form {
        z-index: 1;
        position: relative;
        top: -50px;
        width: 400px;
        background-color: #fff;
        padding: 50px 32px 0 0;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 4px #ccc;
    }

    .login-form .title {
        margin-left: 32px;
        padding: 10px 0 22px 0;
        color: #555;
        text-align: center;
        font-weight: bold;
        font-size: 1.6rem;
        letter-spacing: 1px;
    }

    .login-img {
        z-index: 2;
        position: relative;
        width: 168px;
        height: 102px;
        margin: 0 auto;
    }
</style>
