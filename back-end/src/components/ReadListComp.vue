<template>
    <div class="readlist-wrapper">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>悦读列表</span>
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
                            prop="category"
                            label="分类"
                            width="60">
                    </el-table-column>
                    <el-table-column
                            prop="title"
                            label="标题"
                            width="220">
                    </el-table-column>
                    <el-table-column
                            prop="content"
                            label="内容"
                            width="320">
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
                :title="dialog.title"
                :visible.sync="dialog.show"
                @close="closeDialog('readListForm')"
                :close-on-click-modal='false'
                :close-on-press-escape='false'
                :modal-append-to-body="false">
            <el-form
                    ref="readListForm"
                    :model="readListForm"
                    :rules="readListFormRules"
                    :label-width="dialog.formLabelWidth">
                <el-form-item label="期数" prop="vol">
                    <el-input type="text" v-model="readListForm.vol" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="日期" prop="date">
                    <el-input type="text" v-model="readListForm.date" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="分类" prop="category">
                    <el-input type="text" v-model="readListForm.category" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input type="text" v-model="readListForm.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="正文" prop="content">
                    <el-input type="textarea" v-model="readListForm.content" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="点赞" prop="likeCount">
                    <el-input type="text" v-model="readListForm.likeCount" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit('readListForm')">确 定</el-button>
            </div>
        </el-dialog>
        <!--end 弹出框-->
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "ReadListComp",
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
                readListForm: {
                    vol: '',
                    date: '',
                    category: '',
                    title: '',
                    content: '',
                    likeCount: ''
                },
                // 表单验证规则
                readListFormRules: {
                    vol: [
                        {required: true, message: '期数不能为空', trigger: 'blur'}
                    ],
                    date: [
                        {required: true, message: '日期不能为空', trigger: 'blur'}
                    ],
                    category: [
                        {required: true, message: '分类不能为空', trigger: 'blur'}
                    ],
                    title: [
                        {required: true, message: '标题不能为空', trigger: 'blur'},
                    ],
                    content: [
                        {required: true, message: '正文不能为空', trigger: 'blur'},
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
            this.getReadList().then(() => {
                this.tableData = this.pageInfo.tableDataEnd;
            });

            // 分页显示
            this.pageInfo.totalItems = this.readlist.length;
            this.pageInfo.tableDataCount = this.readlist;
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
                readlist: state => state.readlist,
            }),
        },

        beforeUpdate() {
            // 保存当前页码
            localStorage.setItem('pagenum', this.pageInfo.currentPage);
        },

        methods: {
            ...mapActions({
                getReadList: 'GET_READLIST',
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
                this.dialog.title = '修改悦读';
                this.readListForm.vol = row.vol;
                this.readListForm.date = row.date;
                this.readListForm.category = row.category;
                this.readListForm.title = row.title;
                this.readListForm.content = row.content;
                this.readListForm.likeCount = row.likeCount;
            },

            // 删除
            handleDelete(row) {
                this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let _this = this;
                    this.axios.post("/api/readDel", {
                        id: row.id,
                    }).then((response) => {
                        if (response && response.data) {
                            // 刷新页面
                            _this.getReadList().then(() => {
                                _this.tableData = _this.pageInfo.tableDataEnd;
                                _this.$router.replace({
                                    path: '/blank3',
                                    name: 'blank3'
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
                        this.axios.post("/api/readEdit", {
                            vol: _this.readListForm.vol,
                            date: _this.readListForm.date,
                            category: _this.readListForm.category,
                            title: _this.readListForm.title,
                            content: _this.readListForm.content,
                            likeCount: _this.readListForm.likeCount,
                            id: _this.editid,
                        }).then((response) => {
                            if (response && response.data) {
                                // 关闭弹出框
                                _this.dialog.show = false;
                                // 刷新页面
                                _this.getReadList().then(() => {
                                    _this.tableData = _this.pageInfo.tableDataEnd;
                                    _this.$router.replace({
                                        path: '/blank3',
                                        name: 'blank3'
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
