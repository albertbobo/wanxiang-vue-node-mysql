<template>
    <div class="editor-wrapper">
        <div ref="editorMenu" class="editorMenu"></div>
        <div ref="editor" class="editor"></div>
    </div>
</template>

<script>
    let E = require('wangeditor');

    export default {
        name: "EditorComp",
        data() {
            return {
                editor: null,
                content: null
            }
        },
        model: {
            prop: 'value',
            event: 'change',
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            isClear: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            isClear(val) {
                // 触发清除文本域内容
                if (val) {
                    this.editor.txt.clear();
                    this.content = null
                }
            }
        },
        mounted() {
            this.setEditor();
            this.editor.txt.html(this.value);
        },

        methods: {
            setEditor() {
                this.editor = new E(this.$refs.editorMenu, this.$refs.editor);
                // 打开debug模式
                this.editor.customConfig.debug = true;
                // 上传文件到服务器
                this.editor.customConfig.uploadImgServer = '/api/uploadImages';
                this.editor.customConfig.uploadFileName = 'file';

                this.editor.customConfig.onchange = (html) => {
                    this.content = html;                    // 绑定当前输入的值
                    this.$emit('change', this.content)      // 将内容同步到父组件中
                };
                // 创建富文本编辑器
                this.editor.create();
            },
        },
    }
</script>

<style>
    .editor-wrapper {
        margin-top: -2px;
        background-color: #fff;
    }

    .editorMenu {
        border: 1px solid #ccc;
    }

    .editor {
        height: 280px;
        margin-top: -1px;
        border: 1px solid #ccc;
    }
</style>
