<template>
    <div class="adminuser-wrapper">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>管理员用户</span>
                <el-button @click="handleAdd()" style="float: right" size="mini" type="primary">添加</el-button>
            </div>
            <div class="text item">
                <!--表格-->
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="序号"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="username"
                            label="帐号"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="昵称">
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
                :title="dialog.title"
                :visible.sync="dialog.show"
                @close="closeDialog('adminForm')"
                :close-on-click-modal='false'
                :close-on-press-escape='false'
                :modal-append-to-body="false">
            <el-form
                    ref="adminForm"
                    :model="adminForm"
                    :rules="adminFormRules"
                    :label-width="dialog.formLabelWidth">
                <el-form-item label="帐号" prop="username">
                    <el-input type="text" v-model="adminForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="name">
                    <el-input type="text" v-model="adminForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="adminForm.password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit('adminForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    // 引入辅助函数
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "AdminUserComp",
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
                adminForm: {
                    username: '',
                    name: '',
                    password: '',
                },
                // 表单验证规则
                adminFormRules: {
                    username: [
                        {required: true, message: '帐号不能为空', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '昵称不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur'}
                    ],
                },
                editid: '',
                dialogType: '',    // 弹出框类型：add,edit
            }
        },

        created() {
            // 触发action
            this.getAdminList().then(() => {
                this.tableData = this.pageInfo.tableDataEnd;
            });

            // 分页显示
            this.pageInfo.totalItems = this.adminlist.length;
            this.pageInfo.tableDataCount = this.adminlist;
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
                adminlist: state => state.adminlist,
            })
        },

        beforeUpdate() {
            // 保存当前页码
            localStorage.setItem('pagenum', this.pageInfo.currentPage);
        },

        methods: {
            ...mapActions({
                getAdminList: 'GET_ADMINLIST',
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

            // 添加
            handleAdd() {
                this.dialogType = 'add';
                this.dialog.show = true;
                this.dialog.title = '添加管理员用户';
                this.adminForm.username = '';
                this.adminForm.name = '';
                this.adminForm.password = '';
            },

            // 修改
            handleEdit(row) {
                this.editid = row.id;
                this.dialogType = 'edit';
                this.dialog.show = true;
                this.dialog.title = '修改管理员用户信息';
                this.adminForm.username = row.username;
                this.adminForm.name = row.name;
                this.adminForm.password = row.password;
            },

            // 删除
            handleDelete(row) {
                this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let _this = this;
                    this.axios.post("/api/adminDel", {
                        id: row.id,
                    }).then((response) => {
                        if (response && response.data) {
                            // 刷新页面
                            _this.getAdminList().then(() => {
                                _this.tableData = _this.pageInfo.tableDataEnd;
                                _this.$router.replace({
                                    path: '/blank',
                                    name: 'blank'
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

            // 提交表单
            handleSubmit(formName) {
                // 表单数据验证完成之后，提交数据;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.dialogType === 'add') {
                            this.save();
                        } else if (this.dialogType === 'edit') {
                            this.update();
                        } else {
                            this.$message({
                                message: '操作异常！',
                                type: "error"
                            });
                        }
                    }
                });
            },

            // 保存新增数据
            save() {
                // 保留this
                let _this = this;
                // 获取表单填写信息，发送给后端
                this.axios.post("/api/adminAdd", {
                    username: _this.adminForm.username,
                    name: _this.adminForm.name,
                    password: _this.adminForm.password
                }).then((response) => {
                    if (response && response.data) {
                        // 关闭弹出框
                        _this.dialog.show = false;
                        // 刷新页面
                        _this.getAdminList().then(() => {
                            _this.tableData = _this.pageInfo.tableDataEnd;
                            _this.$router.replace({
                                path: '/blank',
                                name: 'blank'
                            });
                        });
                        _this.$message({
                            message: '添加成功！',
                            type: 'success'
                        });
                    } else {
                        _this.$message.error('添加失败，请重试！');
                    }
                });
            },

            // 保存修改数据
            update() {
                let _this = this;
                // 获取表单填写信息，发送给后端
                this.axios.post("/api/adminEdit", {
                    username: _this.adminForm.username,
                    name: _this.adminForm.name,
                    password: _this.adminForm.password,
                    id: _this.editid,
                }).then((response) => {
                    if (response && response.data) {
                        // 关闭弹出框
                        _this.dialog.show = false;
                        // 刷新页面
                        _this.getAdminList().then(() => {
                            _this.tableData = _this.pageInfo.tableDataEnd;
                            _this.$router.replace({
                                path: '/blank',
                                name: 'blank'
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
</style>
