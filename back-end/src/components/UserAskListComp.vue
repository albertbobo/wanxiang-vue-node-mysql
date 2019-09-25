<template>
    <div class="userasklist-wrapper">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>提问列表</span>
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
                            prop="email"
                            label="帐号"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="username"
                            label="昵称"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="question"
                            label="问题"
                            width="250">
                    </el-table-column>
                    <el-table-column
                            prop="description"
                            label="问题描述">
                    </el-table-column>
                    <el-table-column
                            label="操作"
                            width="150">
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    type="info"
                                    @click="handleDetail(scope.row)">详情
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
                :title="dialog.title"
                :visible.sync="dialog.show"
                @close="closeDialog('UserAskListForm')"
                :close-on-click-modal='false'
                :close-on-press-escape='false'
                :modal-append-to-body="false">
            <el-form
                    ref="UserAskListForm"
                    :model="UserAskListForm"
                    :label-width="dialog.formLabelWidth">
                <el-form-item label="账号" prop="email">
                    <el-input type="text" v-model="UserAskListForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="username">
                    <el-input type="text" v-model="UserAskListForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="问题" prop="question">
                    <el-input type="text" v-model="UserAskListForm.question" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="问题描述" prop="description">
                    <el-input type="textarea" v-model="UserAskListForm.description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--end 弹出框-->
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "UserAskListComp",
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
                UserAskListForm: {
                    email: '',
                    username: '',
                    question: '',
                    description: '',
                },
            }
        },

        created() {
            // 触发action
            this.getUserAskList().then(() => {
                this.tableData = this.pageInfo.tableDataEnd;
            });

            // 分页显示
            this.pageInfo.totalItems = this.userasklist.length;
            this.pageInfo.tableDataCount = this.userasklist;
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
                userasklist: state => state.userasklist,
            }),
        },

        beforeUpdate() {
            // 保存当前页码
            localStorage.setItem('pagenum', this.pageInfo.currentPage);
        },

        methods: {
            ...mapActions({
                getUserAskList: 'GET_USERASKLIST',
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

            // 详情
            handleDetail(row) {
                this.dialog.show = true;
                this.dialog.title = '提问详情';
                this.UserAskListForm.email = row.email;
                this.UserAskListForm.username = row.username;
                this.UserAskListForm.question = row.question;
                this.UserAskListForm.description = row.description;
            },

            // 删除
            handleDelete(row) {
                this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let _this = this;
                    this.axios.post("/api/userAskDel", {
                        id: row.id,
                    }).then((response) => {
                        if (response && response.data) {
                            // 刷新页面
                            _this.getUserAskList().then(() => {
                                _this.tableData = _this.pageInfo.tableDataEnd;
                                _this.$router.replace({
                                    path: '/blank7',
                                    name: 'blank7'
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
        height: 100px;
    }
</style>
