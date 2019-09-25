<template>
    <div class="questionlist-wrapper">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>问答列表</span>
            </div>
            <div class="text item">
                <!--表格-->
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="序号"
                            width="60">
                    </el-table-column>
                    <el-table-column
                            prop="vol"
                            label="期数"
                            width="60">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="日期"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="username"
                            label="昵称"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="question"
                            label="问题"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="description"
                            label="问题描述"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="reply"
                            label="回答"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="likeCount"
                            label="点赞">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="150">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="warning"
                                    @click="handleEdit(scope.row)">修改
                            </el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.row)">删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--分页-->
                <div class="pagination-wrapper">
                    <el-pagination
                            background
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pageInfo.currentPage"
                            :page-sizes="[5, 10, 15]"
                            :page-size="pageInfo.pageSize"
                            layout="total, sizes, prev, pager, next"
                            :total="pageInfo.totalItems">
                    </el-pagination>
                </div>
            </div>
        </el-card>

        <!--弹出框-->
        <el-dialog
                :question="dialog.title"
                :visible.sync="dialog.show"
                @close="closeDialog('questionListForm')"
                :close-on-click-modal='false'
                :close-on-press-escape='false'
                :modal-append-to-body="false">
            <el-form
                    ref="questionListForm"
                    :model="questionListForm"
                    :rules="questionListFormRules"
                    :label-width="dialog.formLabelWidth">
                <el-form-item label="期数" prop="vol">
                    <el-input type="text" v-model="questionListForm.vol" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="日期" prop="date">
                    <el-input type="text" v-model="questionListForm.date" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="username">
                    <el-input type="text" v-model="questionListForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="问题" prop="question">
                    <el-input type="text" v-model="questionListForm.question" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="问题描述" prop="description">
                    <el-input type="text" v-model="questionListForm.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="回答" prop="reply">
                    <el-input type="textarea" v-model="questionListForm.reply" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="点赞" prop="likeCount">
                    <el-input type="text" v-model="questionListForm.likeCount" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit('questionListForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!--end 弹出框-->
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "QuestionListComp",
        data() {
            return {
                // 表格
                tableData: [],
                // 分页
                pageInfo: {
                    tableDataCount: [],
                    tableDataEnd: [],
                    currentPage: 1,    // 当前页码
                    totalItems: 0,     // 数据总数目
                    pageSize: 5,       // 每页显示数目
                },
                // 弹出框信息
                dialog: {
                    title: '',
                    show: false,
                    formLabelWidth: '80px'
                },
                // 表单
                questionListForm: {
                    vol: '',
                    date: '',
                    username: '',
                    question: '',
                    description: '',
                    reply: '',
                    likeCount: ''
                },
                // 表单验证规则
                questionListFormRules: {
                    vol: [
                        {required: true, message: '期数不能为空', trigger: 'blur'}
                    ],
                    date: [
                        {required: true, message: '日期不能为空', trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: '昵称不能为空', trigger: 'blur'}
                    ],
                    question: [
                        {required: true, message: '问题不能为空', trigger: 'blur'},
                    ],
                    description: [
                        {required: true, message: '问题描述不能为空', trigger: 'blur'},
                    ],
                    reply: [
                        {required: true, message: '回答不能为空', trigger: 'blur'},
                    ],
                    likeCount: [
                        {required: true, message: '点赞不能为空', trigger: 'blur'},
                    ],
                },
                editid: '',
            }
        },

        created() {
            // 触发action
            this.getQuestionList().then(() => {
                this.tableData = this.pageInfo.tableDataEnd;
            });

            // 分页显示
            this.pageInfo.totalItems = this.questionlist.length;
            this.pageInfo.tableDataCount = this.questionlist;
            if (this.pageInfo.totalItems > this.pageInfo.pageSize) {
                for (let index = 0; index < this.pageInfo.pageSize; index++) {
                    this.pageInfo.tableDataEnd.push(this.pageInfo.tableDataCount[index]);
                }
            } else {
                this.pageInfo.tableDataEnd = this.pageInfo.tableDataCount;
            }
            // 获取当前页码
            this.currentPage = Number(localStorage.getItem('pagenum'));
            this.handleCurrentChange(this.currentPage);
        },

        computed: {
            // mapState辅助函数获取state数据
            ...mapState({
                questionlist: state => state.questionlist,
            }),
        },

        beforeUpdate() {
            // 保存当前页码
            localStorage.setItem('pagenum', this.pageInfo.currentPage);
        },

        methods: {
            ...mapActions({
                getQuestionList: 'GET_QUESTIONLIST',
            }),

            // 分页
            // 每页条数切换
            handleSizeChange(pageSize) {
                this.pageInfo.pageSize = pageSize;
                this.handleCurrentChange(this.pageInfo.currentPage);
            },
            // 页码切换
            handleCurrentChange(currentPage) {
                this.pageInfo.currentPage = currentPage;
                this.currentChangePage(this.pageInfo.tableDataCount, currentPage);
                this.tableData = this.pageInfo.tableDataEnd;
            },
            // 分页方法
            currentChangePage(list, currentPage) {
                let from = (currentPage - 1) * this.pageInfo.pageSize;
                let to = currentPage * this.pageInfo.pageSize;
                this.pageInfo.tableDataEnd = [];
                for (; from < to; from++) {
                    if (list[from]) {
                        this.pageInfo.tableDataEnd.push(list[from]);
                    }
                }
            },

            // 修改
            handleEdit(row) {
                this.editid = row.id;
                this.dialog.show = true;
                this.dialog.title = '修改问答';
                this.questionListForm.vol = row.vol;
                this.questionListForm.date = row.date;
                this.questionListForm.username = row.username;
                this.questionListForm.question = row.question;
                this.questionListForm.description = row.description;
                this.questionListForm.reply = row.reply;
                this.questionListForm.likeCount = row.likeCount;
            },

            // 删除
            handleDelete(row) {
                this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let _this = this;
                    this.axios.post("/api/questionDel", {
                        id: row.id,
                    }).then((response) => {
                        if (response && response.data) {
                            // 刷新页面
                            _this.getQuestionList().then(() => {
                                _this.tableData = _this.pageInfo.tableDataEnd;
                                _this.$router.replace({
                                    path: '/blank6',
                                    name: 'blank6'
                                });
                            });
                            _this.$message({
                                message: '删除成功！',
                                type: 'success'
                            });
                        } else {
                            _this.$message.error('删除失败，请重试！');
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            // 关闭弹出框，数据重置
            closeDialog(formName) {
                this.$refs[formName].resetFields();
            },

            // 提交修改
            handleSubmit(formName) {
                // 表单数据验证完成之后，提交数据;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let _this = this;
                        this.axios.post("/api/questionEdit", {
                            vol: _this.questionListForm.vol,
                            date: _this.questionListForm.date,
                            username: _this.questionListForm.username,
                            question: _this.questionListForm.question,
                            description: _this.questionListForm.description,
                            reply: _this.questionListForm.reply,
                            likeCount: _this.questionListForm.likeCount,
                            id: _this.editid,
                        }).then((response) => {
                            if (response && response.data) {
                                // 关闭弹出框
                                _this.dialog.show = false;
                                // 刷新页面
                                _this.getQuestionList().then(() => {
                                    _this.tableData = _this.pageInfo.tableDataEnd;
                                    _this.$router.replace({
                                        path: '/blank6',
                                        name: 'blank6'
                                    });
                                });
                                _this.$message({
                                    message: '修改成功！',
                                    type: 'success'
                                });
                            } else {
                                _this.$message.error('修改失败，请重试！');
                            }
                        });
                    }
                });
            },
        }
    }
</script>

<style>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .el-button--danger:focus {
        background-color: #F56C6C !important;
        border-color: #F56C6C !important;
    }

    .pagination-wrapper {
        float: right;
        padding: 20px 0;
    }

    .el-table td .cell {
        max-height: 46px;
        overflow-y: hidden;
    }

    .el-textarea textarea {
        height: 200px;
    }
</style>
