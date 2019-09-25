<template>
    <div class="slideshow-wrapper">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>banner</span>
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
                            prop="day"
                            label="日期"
                            width="60">
                    </el-table-column>
                    <el-table-column
                            prop="monthYear"
                            label="年月"
                            width="90">
                    </el-table-column>
                    <el-table-column
                            prop="imageUrl"
                            label="图片"
                            width="260">
                    </el-table-column>
                    <el-table-column
                            prop="saying"
                            label="名言"
                            width="260">
                    </el-table-column>
                    <el-table-column
                            prop="author"
                            label="作者">
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
                @close="closeDialog('slideShowForm')"
                :close-on-click-modal='false'
                :close-on-press-escape='false'
                :modal-append-to-body="false">
            <el-form
                    ref="slideShowForm"
                    :model="slideShowForm"
                    :rules="slideShowFormRules"
                    :label-width="dialog.formLabelWidth">
                <el-form-item label="期数" prop="vol">
                    <el-input type="text" v-model="slideShowForm.vol" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="日期" prop="day">
                    <el-input type="text" v-model="slideShowForm.day" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="年月" prop="monthYear">
                    <el-input type="text" v-model="slideShowForm.monthYear" autocomplete="off"></el-input>
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
                <el-form-item label="名言" prop="saying">
                    <el-input type="text" v-model="slideShowForm.saying" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="author">
                    <el-input type="text" v-model="slideShowForm.author" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit('slideShowForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'       // 引入辅助函数

    export default {
        name: "SlideShowComp",
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
                slideShowForm: {
                    vol: '',
                    day: '',
                    monthYear: '',
                    imageUrl: '',
                    saying: '',
                    author: '',
                },
                // 表单验证规则
                slideShowFormRules: {
                    vol: [
                        {required: true, message: '期数不能为空', trigger: 'blur'}
                    ],
                    day: [
                        {required: true, message: '日期不能为空', trigger: 'blur'}
                    ],
                    monthYear: [
                        {required: true, message: '年月不能为空', trigger: 'blur'}
                    ],
                    imageUrl: [
                        {required: true, message: '图片不能为空', trigger: 'blur'},
                    ],
                    saying: [
                        {required: true, message: '名言不能为空', trigger: 'blur'},
                    ],
                    author: [
                        {required: true, message: '作者不能为空', trigger: 'blur'},
                    ],
                },
                editid: '',
                dialogType: '',                  // 弹出框类型：add,edit

                uploadUrl: '/api/uploadImages',  // 上传图片接口地址
            }
        },

        created() {
            // 触发action
            this.getSlideList().then(() => {
                this.tableData = this.pageInfo.tableDataEnd;
            });

            // 分页显示
            this.pageInfo.totalItems = this.slidelist.length;
            this.pageInfo.tableDataCount = this.slidelist;
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
                slidelist: state => state.slidelist,
            }),
        },

        beforeUpdate() {
            // 保存当前页码
            localStorage.setItem('pagenum', this.pageInfo.currentPage);
        },

        methods: {
            ...mapActions({
                getSlideList: 'GET_SLIDELIST',
            }),

            // 图片上传
            handleUploadSuccess(res) {
                this.slideShowForm.imageUrl = res.data[0];
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
                this.dialog.title = '添加banner';
                this.slideShowForm.vol = '';
                this.slideShowForm.day = '';
                this.slideShowForm.monthYear = '';
                this.slideShowForm.imageUrl = '';
                this.slideShowForm.saying = '';
                this.slideShowForm.author = '';
            },

            // 修改
            handleEdit(row) {
                this.dialog.show = true;
                this.dialogType = 'edit';
                this.dialog.title = '修改banner';
                this.editid = row.id;
                this.slideShowForm.vol = row.vol;
                this.slideShowForm.day = row.day;
                this.slideShowForm.monthYear = row.monthYear;
                this.slideShowForm.imageUrl = row.imageUrl;
                this.slideShowForm.saying = row.saying;
                this.slideShowForm.author = row.author;
            },

            // 删除
            handleDelete(row) {
                this.$confirm('此操作将永久删除数据，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let _this = this;
                    this.axios.post("/api/slideDel", {
                        id: row.id,
                    }).then((response) => {
                        if (response && response.data) {
                            // 刷新页面
                            _this.getSlideList().then(() => {
                                _this.tableData = _this.pageInfo.tableDataEnd;
                                _this.$router.replace({
                                    path: '/blank2',
                                    name: 'blank2'
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
                this.axios.post("/api/slideAdd", {
                    vol: _this.slideShowForm.vol,
                    day: _this.slideShowForm.day,
                    monthYear: _this.slideShowForm.monthYear,
                    imageUrl: _this.slideShowForm.imageUrl,
                    saying: _this.slideShowForm.saying,
                    author: _this.slideShowForm.author,
                }).then((response) => {
                    if (response && response.data) {
                        // 关闭弹出框
                        _this.dialog.show = false;
                        // 刷新页面
                        _this.getSlideList().then(() => {
                            _this.tableData = _this.pageInfo.tableDataEnd;
                            _this.$router.replace({
                                path: '/blank2',
                                name: 'blank2'
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
                this.axios.post("/api/slideEdit", {
                    vol: _this.slideShowForm.vol,
                    day: _this.slideShowForm.day,
                    monthYear: _this.slideShowForm.monthYear,
                    imageUrl: _this.slideShowForm.imageUrl,
                    saying: _this.slideShowForm.saying,
                    author: _this.slideShowForm.author,
                    id: _this.editid,
                }).then((response) => {
                    if (response && response.data) {
                        // 关闭弹出框
                        _this.dialog.show = false;
                        // 刷新页面
                        _this.getSlideList().then(() => {
                            _this.tableData = _this.pageInfo.tableDataEnd;
                            _this.$router.replace({
                                path: '/blank2',
                                name: 'blank2'
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
