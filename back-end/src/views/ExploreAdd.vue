<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加探索</span>
            </div>
            <div class="text item">
                <el-form :inline="true"
                         ref="exploreAddForm"
                         :model="exploreAddForm"
                         :rules="exploreAddFormRules">
                    <el-form-item label="期数" prop="vol">
                        <el-input type="text" v-model="exploreAddForm.vol" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="日期" prop="date">
                        <el-input type="text" v-model="exploreAddForm.date" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="图片" prop="imageUrl">
                        <!--图片上传-->
                        <el-upload
                                :action="uploadUrl"
                                :limit="1"
                                accept="image/jpeg,image/gif,image/png"
                                :on-exceed="handleExceed"
                                :before-upload="onBeforeUpload"
                                :on-success="handleUploadSuccess">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <!--<div class="el-upload__tip" slot="tip">提示：只能上传一张格式为jpg/png/gif的图片</div>-->
                        </el-upload>
                        <!--end 图片上传-->
                    </el-form-item>
                    <el-form-item label="标题" prop="title">
                        <el-input type="text" v-model="exploreAddForm.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="点赞" prop="likeCount">
                        <el-input type="text" v-model="exploreAddForm.likeCount" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <EditorComp v-model="editor.content"></EditorComp>
                <el-button type="primary" @click="handleAdd('exploreAddForm')" class="btn-submit">确认添加
                </el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    // @ is an alias to /src
    import EditorComp from "../components/EditorComp";

    export default {
        name: "ExploreAdd",
        components: {
            EditorComp
        },
        data() {
            return {
                exploreAddForm: {
                    vol: '',
                    date: '',
                    imageUrl: '',
                    title: '',
                    likeCount: 0,
                },
                editor: {
                    content: ''
                },
                // 表单验证规则
                exploreAddFormRules: {
                    vol: [
                        {required: true, message: '必填项', trigger: 'blur'}
                    ],
                    date: [
                        {required: true, message: '必填项', trigger: 'blur'}
                    ],
                    imageUrl: [
                        {required: true, message: '必填项', trigger: 'blur'}
                    ],
                    title: [
                        {required: true, message: '必填项', trigger: 'blur'},
                    ],
                    likeCount: [
                        {required: true, message: '必填项', trigger: 'blur'},
                    ],
                },
                uploadUrl: '/api/uploadImages',  // 上传图片接口地址
            }
        },
        methods: {
            // 图片上传
            handleUploadSuccess(res) {
                this.exploreAddForm.imageUrl = res.data[0];
                this.$message.success(('图片上传成功！'));
            },

            // 超过上传数量
            handleExceed() {
                this.$message.error(('超过上传数量！'));
            },

            // 上传前验证图片格式
            onBeforeUpload(file) {
                const isType = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
                if (!isType) {
                    this.$message.error('上传失败！只能上传jpg/png/gif格式的图片！');
                }
                return isType;
            },

            handleAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let _this = this;
                        this.axios.post("/api/exploreAdd", {
                            vol: _this.exploreAddForm.vol,
                            date: _this.exploreAddForm.date,
                            imageUrl: _this.exploreAddForm.imageUrl,
                            title: _this.exploreAddForm.title,
                            likeCount: _this.exploreAddForm.likeCount,
                            value: _this.editor.content
                        }).then((response) => {
                            if (response && response.data) {
                                _this.$message({
                                    message: '添加成功！',
                                    type: 'success'
                                });
                            } else {
                                _this.$message.error('添加失败，请重试！');
                            }
                        })
                    }
                });
            }
        },
    }
</script>

<style>
    .btn-submit {
        display: block;
        margin: 20px auto;
    }

    .el-form--inline .el-form-item:first-of-type .el-form-item__content,
    .el-form--inline .el-form-item:nth-of-type(5) .el-form-item__content {
        width: 60px;
    }

    .el-form--inline .el-form-item:nth-of-type(2) .el-form-item__content {
        width: 130px;
    }

    .el-form--inline .el-form-item:nth-of-type(3) .el-form-item__content {
        width: 85px;
    }

    .el-form--inline .el-form-item:nth-of-type(4) .el-form-item__content {
        width: 280px;
    }

    .el-form--inline .el-form-item {
        margin-right: 20px;
    }

    .el-form--inline {
        height: 71px;
    }

    .el-upload-list__item:first-child {
        margin-top: 0;
    }

    .el-form-item {
        margin-bottom: 5px;
    }

    .el-upload-list__item-name {
        margin-left: 0;
    }
</style>
