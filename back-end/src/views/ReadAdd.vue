<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>添加悦读</span>
            </div>
            <div class="text item">
                <el-form :inline="true"
                         ref="readAddForm"
                         :model="readAddForm"
                         :rules="readAddFormRules">
                    <el-form-item label="期数" prop="vol">
                        <el-input type="text" v-model="readAddForm.vol" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="日期" prop="date">
                        <el-input type="text" v-model="readAddForm.date" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="分类" prop="category">
                        <el-input type="text" v-model="readAddForm.category" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="标题" prop="title">
                        <el-input type="text" v-model="readAddForm.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="点赞" prop="likeCount">
                        <el-input type="text" v-model="readAddForm.likeCount" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <EditorComp v-model="editor.content"></EditorComp>
                <el-button type="primary" @click="handleAdd('readAddForm')" class="btn-submit">确认添加
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
                readAddForm: {
                    vol: '',
                    date: '',
                    category: '',
                    title: '',
                    likeCount: 0,
                },
                editor: {
                    content: ''
                },
                // 表单验证规则
                readAddFormRules: {
                    vol: [
                        {required: true, message: '必填项', trigger: 'blur'}
                    ],
                    date: [
                        {required: true, message: '必填项', trigger: 'blur'}
                    ],
                    category: [
                        {required: true, message: '必填项', trigger: 'blur'}
                    ],
                    title: [
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
                        this.axios.post("/api/readAdd", {
                            vol: _this.readAddForm.vol,
                            date: _this.readAddForm.date,
                            category: _this.readAddForm.category,
                            title: _this.readAddForm.title,
                            likeCount: _this.readAddForm.likeCount,
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
    .el-form--inline .el-form-item:nth-of-type(3) .el-form-item__content,
    .el-form--inline .el-form-item:nth-of-type(5) .el-form-item__content {
        width: 60px;
    }

    .el-form--inline .el-form-item:nth-of-type(2) .el-form-item__content {
        width: 130px;
    }

    .el-form--inline .el-form-item:nth-of-type(4) .el-form-item__content {
        width: 280px;
    }

    .el-form--inline .el-form-item {
        margin-right: 20px;
    }
</style>
