<template>
    <div class="content-wrapper">
        <div class="my-card-wrapper">
            <div class="my-cover-wrapper">
                <label class="upload-picture">
                    <button class="btn-upload-cover">
                        <i class="fa fa-camera"></i>
                        <span>更换封面图片</span>
                    </button>
                    <input type="file" accept="image/png,image/jpeg" class="upload-picture-input">
                </label>
                <div class="my-cover">
                    <img :src="defaultCover" alt="" class="my-cover-img">
                </div>
            </div>
            <div class="my-info-wrapper">
                <div class="my-profile-wrapper">
                    <label class="upload-picture">
                        <div class="upload-profile-mask profile-edit-mask">
                            <div class="upload-profile">
                                <i class="fa fa-camera"></i>
                                <span>更换头像</span>
                            </div>
                        </div>
                        <input type="file" accept="image/png,image/jpeg" class="upload-picture-input">
                    </label>
                    <div class="my-profile">
                        <img :src="defaultProfile" alt="" class="my-profile-img">
                    </div>
                </div>
                <div class="edit-my-info">
                    <form class="edit-info-form" ref="editInfoForm">
                        <label>
                            <span>昵称：</span>
                            <input type="text" v-model="editInfoForm.username" class="edit-my-username">
                        </label>
                        <label>
                            <span>签名：</span>
                            <input type="text" v-model="editInfoForm.signature" class="edit-my-introduction">
                        </label>
                        <label>
                            <span>邮箱：</span>
                            <span class="edit-my-email">{{editInfoForm.email}}</span>
                        </label>
                        <label>
                            <span>密码：</span>
                            <router-link to="/editpwd">修改密码</router-link>
                        </label>
                    </form>
                    <div class="btn-submit-info" @click="editInfoSubmit">保存</div>
                </div>
                <router-link to="/me" class="btn-comeback-my"><span>返回个人中心 ></span></router-link>
                <div class="clear"></div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'EditContent',
        data() {
            return {
                defaultProfile: require('../assets/imgs/user-profile.jpg'),
                defaultCover: require('../assets/imgs/user-cover.jpg'),
                editInfoForm: {
                    username: this.$store.state.token.username,
                    signature: this.$store.state.token.signature,
                    email: this.$store.state.token.email,
                }
            }
        },

        methods: {
            editInfoSubmit() {
                if (this.editInfoForm.username === '') {
                    alert('请输入昵称')
                } else if (this.editInfoForm.signature === '') {
                    alert('请输入签名')
                } else {
                    let _this = this;
                    // 修改用户昵称、签名
                    this.axios.post("/api/userInfoEdit", {
                        email: _this.$store.state.token.email,
                        username: _this.editInfoForm.username,
                        signature: _this.editInfoForm.signature
                    }).then((response) => {
                        if (response && response.data) {
                            alert('修改成功！')
                        } else {
                            console.log('error');
                        }
                    });
                    // 更新token
                    this.axios.post("/api/getLoginUser", {
                        email: _this.$store.state.token.email,
                    }).then((response) => {
                        if (response && response.data) {
                            _this.$store.commit('SET_TOKEN', response.data[0]);
                        } else {
                            console.log('error');
                        }
                    });
                }
            }
        },
    }

</script>
