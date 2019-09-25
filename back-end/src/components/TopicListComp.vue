<template>
    <div class="topiclist-wrapper">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>题目列表</span>
                <el-button @click="handleAdd()" style="float: right" size="mini" type="primary">添加</el-button>
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
                            prop="testId"
                            label="testId"
                            width="70">
                    </el-table-column>
                    <el-table-column
                            prop="number"
                            label="题号"
                            width="60">
                    </el-table-column>
                    <el-table-column
                            prop="question"
                            label="问题"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="point"
                            label="提示"
                            width="120">
                    </el-table-column>
                    <el-table-column
                            prop="option1"
                            label="选项一"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="option2"
                            label="选项二"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="option3"
                            label="选项三"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="optionRight"
                            label="正确选项"
                            width="80">
                    </el-table-column>
                    <el-table-column
                            prop="answer"
                            label="答案">
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
                @close="closeDialog('topicListForm')"
                :close-on-click-modal='false'
                :close-on-press-escape='false'
                :modal-append-to-body="false">
            <el-form
                    ref="topicListForm"
                    :model="topicListForm"
                    :rules="topicListFormRules"
                    :label-width="dialog.formLabelWidth">
                <el-form-item label="testId" prop="testId">
                    <el-input type="text" v-model="topicListForm.testId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="题号" prop="number">
                    <el-input type="text" v-model="topicListForm.number" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="问题" prop="question">
                    <el-input type="text" v-model="topicListForm.question" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="提示" prop="point">
                    <el-input type="text" v-model="topicListForm.point" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选项一" prop="option1">
                    <el-input type="text" v-model="topicListForm.option1" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选项二" prop="option2">
                    <el-input type="text" v-model="topicListForm.option2" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="选项三" prop="option3">
                    <el-input type="text" v-model="topicListForm.option3" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="正确选项" prop="optionRight">
                    <el-input type="text" v-model="topicListForm.optionRight" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="答案" prop="answer">
                    <el-input type="text" v-model="topicListForm.answer" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit('topicListForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'       // 引入辅助函数

    export default {
        name: "TopicListComp",
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
                topicListForm: {
                    testId: '',
                    number: '',
                    question: '',
                    point: '',
                    option1: '',
                    option2: '',
                    option3: '',
                    optionRight: '',
                    answer: '',
                },
                // 表单验证规则
                topicListFormRules: {
                    testId: [
                        {required: true, message: 'testID不能为空', trigger: 'blur'}
                    ],
                    number: [
                        {required: true, message: '题号不能为空', trigger: 'blur'}
                    ],
                    question: [
                        {required: true, message: '问题不能为空', trigger: 'blur'}
                    ],
                    point: [
                        {required: true, message: '提示不能为空', trigger: 'blur'},
                    ],
                    option1: [
                        {required: true, message: '选项一不能为空', trigger: 'blur'},
                    ],
                    option2: [
                        {required: true, message: '选项二不能为空', trigger: 'blur'},
                    ],
                    option3: [
                        {required: true, message: '选项三不能为空', trigger: 'blur'},
                    ],
                    optionRight: [
                        {required: true, message: '正确选项不能为空', trigger: 'blur'},
                    ],
                    answer: [
                        {required: true, message: '答案不能为空', trigger: 'blur'},
                    ],
                },
                editid: '',
                dialogType: '',                  // 弹出框类型：add,edit
            }
        },

        created() {
            // 触发action
            this.getTopicList().then(() => {
                this.tableData = this.pageInfo.tableDataEnd;
            });

            // 分页显示
            this.pageInfo.totalItems = this.topiclist.length;
            this.pageInfo.tableDataCount = this.topiclist;
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
                topiclist: state => state.topiclist,
            }),
        },

        beforeUpdate() {
            // 保存当前页码
            localStorage.setItem('pagenum', this.pageInfo.currentPage);
        },

        methods: {
            ...mapActions({
                getTopicList: 'GET_TOPICLIST',
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
                this.dialog.show = true;
                this.dialogType = 'add';
                this.dialog.title = '添加题目';
                this.topicListForm.testId = '';
                this.topicListForm.number = '';
                this.topicListForm.question = '';
                this.topicListForm.point = '';
                this.topicListForm.option1 = '';
                this.topicListForm.option2 = '';
                this.topicListForm.option3 = '';
                this.topicListForm.optionRight = '';
                this.topicListForm.answer = '';
            },

            // 修改
            handleEdit(row) {
                this.dialog.show = true;
                this.dialogType = 'edit';
                this.dialog.title = '修改题目';
                this.editid = row.id;
                this.topicListForm.testId = row.testId;
                this.topicListForm.number = row.number;
                this.topicListForm.question = row.question;
                this.topicListForm.point = row.point;
                this.topicListForm.option1 = row.option1;
                this.topicListForm.option2 = row.option2;
                this.topicListForm.option3 = row.option3;
                this.topicListForm.optionRight = row.optionRight;
                this.topicListForm.answer = row.answer;
            },

            // 删除
            handleDelete(row) {
                this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let _this = this;
                    this.axios.post("/api/topicDel", {
                        id: row.id,
                    }).then((response) => {
                        if (response && response.data) {
                            // 刷新页面
                            _this.getTopicList().then(() => {
                                _this.tableData = _this.pageInfo.tableDataEnd;
                                _this.$router.replace({
                                    path: '/blank9',
                                    name: 'blank9'
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
                this.axios.post("/api/topicAdd", {
                    testId: _this.topicListForm.testId,
                    number: _this.topicListForm.number,
                    question: _this.topicListForm.question,
                    point: _this.topicListForm.point,
                    option1: _this.topicListForm.option1,
                    option2: _this.topicListForm.option2,
                    option3: _this.topicListForm.option3,
                    optionRight: _this.topicListForm.optionRight,
                    answer: _this.topicListForm.answer,
                }).then((response) => {
                    if (response && response.data) {
                        // 关闭弹出框
                        _this.dialog.show = false;
                        // 刷新页面
                        _this.getTopicList().then(() => {
                            _this.tableData = _this.pageInfo.tableDataEnd;
                            _this.$router.replace({
                                path: '/blank9',
                                name: 'blank9'
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
                this.axios.post("/api/topicEdit", {
                    testId: _this.topicListForm.testId,
                    number: _this.topicListForm.number,
                    question: _this.topicListForm.question,
                    point: _this.topicListForm.point,
                    option1: _this.topicListForm.option1,
                    option2: _this.topicListForm.option2,
                    option3: _this.topicListForm.option3,
                    optionRight: _this.topicListForm.optionRight,
                    answer: _this.topicListForm.answer,
                    id: _this.editid,
                }).then((response) => {
                    if (response && response.data) {
                        // 关闭弹出框
                        _this.dialog.show = false;
                        // 刷新页面
                        _this.getTopicList().then(() => {
                            _this.tableData = _this.pageInfo.tableDataEnd;
                            _this.$router.replace({
                                path: '/blank9',
                                name: 'blank9'
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

    .el-table td .cell {
        max-height: 46px;
        overflow-y: hidden;
    }
</style>
