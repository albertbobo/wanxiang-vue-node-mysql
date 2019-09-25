<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加问答</span>
            </div>
            <div class="text item">
                <el-form :inline="true"
                         ref="questionAddForm"
                         :model="questionAddForm"
                         :rules="questionAddFormRules">
                    <el-form-item label="期数" prop="vol">
                        <el-input type="text" v-model="questionAddForm.vol" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="日期" prop="date">
                        <el-input type="text" v-model="questionAddForm.date" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="昵称" prop="username">
                        <el-input type="text" v-model="questionAddForm.username" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="问题" prop="question">
                        <el-input type="text" v-model="questionAddForm.question" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="问题描述" prop="description">
                        <el-input type="text" v-model="questionAddForm.description" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="点赞" prop="likeCount">
                        <el-input type="text" v-model="questionAddForm.likeCount" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <EditorComp v-model="editor.content"></EditorComp>
                <el-button type="primary" @click="handleAdd('questionAddForm')" class="btn-submit">确认添加
                </el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    // @ is an alias to /src
    import EditorComp from "../components/EditorComp";

    export default {
        name: "ReadAdd",
        components: {
            EditorComp
        },
        data() {
            return {
                questionAddForm: {
                    vol: '',
                    date: '',
                    username: '',
                    question: '',
                    description: '',
                    likeCount: 0,
                },
                editor: {
                    content: ''
                },
                // 表单验证规则
                questionAddFormRules: {
                    vol: [
                        {required: true, message: '必填项', trigger: 'blur'}
                    ],
                    date: [
                        {required: true, message: '必填项', trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: '必填项', trigger: 'blur'}
                    ],
                    question: [
                        {required: true, message: '必填项', trigger: 'blur'},
                    ],
                    description: [
                        {required: true, message: '必填项', trigger: 'blur'},
                    ],
                    likeCount: [
                        {required: true, message: '必填项', trigger: 'blur'},
                    ],
                },
            }
        },
        methods: {
            handleAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let _this = this;
                        this.axios.post("/api/questionAdd", {
                            vol: _this.questionAddForm.vol,
                            date: _this.questionAddForm.date,
                            username: _this.questionAddForm.username,
                            question: _this.questionAddForm.question,
                            description: _this.questionAddForm.description,
                            likeCount: _this.questionAddForm.likeCount,
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
    .el-form--inline .el-form-item:nth-of-type(6) .el-form-item__content {
        width: 60px;
    }

    .el-form--inline .el-form-item:nth-of-type(2) .el-form-item__content {
        width: 130px;
    }

    .el-form--inline .el-form-item:nth-of-type(3) .el-form-item__content {
        width: 180px;
    }

    .el-form--inline .el-form-item:nth-of-type(4) .el-form-item__content,
    .el-form--inline .el-form-item:nth-of-type(5) .el-form-item__content {
        width: 350px;
    }

    .el-form--inline .el-form-item {
        margin-right: 20px;
    }
</style>
