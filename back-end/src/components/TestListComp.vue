<template>
    <div class="testlist-wrapper">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>题园列表</span>
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
                            prop="theme"
                            label="主题"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="intro"
                            label="简介"
                            width="280">
                    </el-table-column>
                    <el-table-column
                            prop="imageUrl"
                            label="图片">
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
                @close="closeDialog('testListForm')"
                :close-on-click-modal='false'
                :close-on-press-escape='false'
                :modal-append-to-body="false">
            <el-form
                    ref="testListForm"
                    :model="testListForm"
                    :rules="testListFormRules"
                    :label-width="dialog.formLabelWidth">
                <el-form-item label="期数" prop="vol">
                    <el-input type="text" v-model="testListForm.vol" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="日期" prop="date">
                    <el-input type="text" v-model="testListForm.date" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="主题" prop="theme">
                    <el-input type="text" v-model="testListForm.theme" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="intro">
                    <el-input type="text" v-model="testListForm.intro" autocomplete="off"></el-input>
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
                        <div class="el-upload__tip" slot="tip">提示：只能上传一张格式为jpg/png/gif的图片</div>
                    </el-upload>
                    <!--end 图片上传-->
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit('testListForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'       // 引入辅助函数

    export default {
        name: "TestListComp",
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
                testListForm: {
                    vol: '',
                    date: '',
                    theme: '',
                    intro: '',
                    imageUrl: '',
                },
                // 表单验证规则
                testListFormRules: {
                    vol: [
                        {required: true, message: '期数不能为空', trigger: 'blur'}
                    ],
                    date: [
                        {required: true, message: '日期不能为空', trigger: 'blur'}
                    ],
                    theme: [
                        {required: true, message: '主题不能为空', trigger: 'blur'}
                    ],
                    intro: [
                        {required: true, message: '简介不能为空', trigger: 'blur'},
                    ],
                    imageUrl: [
                        {required: true, message: '图片不能为空', trigger: 'blur'},
                    ],
                },
                editid: '',
                dialogType: '',                  // 弹出框类型：add,edit

                uploadUrl: '/api/uploadImages',  // 上传图片接口地址
            }
        },

        created() {
            // 触发action
            this.getTestList().then(() => {
                this.tableData = this.pageInfo.tableDataEnd;
            });

            // 分页显示
            this.pageInfo.totalItems = this.testlist.length;
            this.pageInfo.tableDataCount = this.testlist;
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
                testlist: state => state.testlist,
            }),
        },

        beforeUpdate() {
            // 保存当前页码
            localStorage.setItem('pagenum', this.pageInfo.currentPage);
        },

        methods: {
            ...mapActions({
                getTestList: 'GET_TESTLIST',
            }),

            // 图片上传
            handleUploadSuccess(res) {
                this.testListForm.imageUrl = res.data[0];
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
                this.dialog.title = '添加题园';
                this.testListForm.vol = '';
                this.testListForm.date = '';
                this.testListForm.theme = '';
                this.testListForm.intro = '';
                this.testListForm.imageUrl = '';
            },

            // 修改
            handleEdit(row) {
                this.dialog.show = true;
                this.dialogType = 'edit';
                this.dialog.title = '修改题园';
                this.editid = row.id;
                this.testListForm.vol = row.vol;
                this.testListForm.date = row.date;
                this.testListForm.theme = row.theme;
                this.testListForm.intro = row.intro;
                this.testListForm.imageUrl = row.imageUrl;
            },

            // 删除
            handleDelete(row) {
                this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let _this = this;
                    this.axios.post("/api/testDel", {
                        id: row.id,
                    }).then((response) => {
                        if (response && response.data) {
                            // 刷新页面
                            _this.getTestList().then(() => {
                                _this.tableData = _this.pageInfo.tableDataEnd;
                                _this.$router.replace({
                                    path: '/blank8',
                                    name: 'blank8'
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
                this.axios.post("/api/testAdd", {
                    vol: _this.testListForm.vol,
                    date: _this.testListForm.date,
                    theme: _this.testListForm.theme,
                    intro: _this.testListForm.intro,
                    imageUrl: _this.testListForm.imageUrl,
                }).then((response) => {
                    if (response && response.data) {
                        // 关闭弹出框
                        _this.dialog.show = false;
                        // 刷新页面
                        _this.getTestList().then(() => {
                            _this.tableData = _this.pageInfo.tableDataEnd;
                            _this.$router.replace({
                                path: '/blank8',
                                name: 'blank8'
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
                this.axios.post("/api/testEdit", {
                    vol: _this.testListForm.vol,
                    date: _this.testListForm.date,
                    theme: _this.testListForm.theme,
                    intro: _this.testListForm.intro,
                    imageUrl: _this.testListForm.imageUrl,
                    id: _this.editid,
                }).then((response) => {
                    if (response && response.data) {
                        // 关闭弹出框
                        _this.dialog.show = false;
                        // 刷新页面
                        _this.getTestList().then(() => {
                            _this.tableData = _this.pageInfo.tableDataEnd;
                            _this.$router.replace({
                                path: '/blank8',
                                name: 'blank8'
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
