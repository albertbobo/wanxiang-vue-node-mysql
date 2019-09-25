<template>
    <div class="content-wrapper">
        <div class="question-left" v-for="ques in questionLast">
            <div class="question-left-top">
                <button class="bookMark" @click="questionMark(ques.id)"><i class="fa fa-bookmark-o"></i></button>
                <span class="vol-number">Vol.{{ques.vol}}</span>
                <span class="text-date">{{ques.date}}</span>
                <div class="ask-wrapper">
                    <div class="questioner">
                        <span class="questioner-id">{{ques.username}}</span>问：
                    </div>
                    <h1 class="question-title">{{ques.question}}</h1>
                    <div class="question-about">{{ques.description}}</div>
                </div>
            </div>
            <div class="answer-wrapper">
                <div class="respondent"><span class="respondent-id">万象</span>答：</div>
                <div v-html="ques.reply"></div>
            </div>
            <div class="question-left-bottom">
                <button class="like-it" @click="questionLike(ques.id)">
                    <i class="fa fa-heart-o"></i><span class="like-number">{{ques.likeCount}}</span>
                </button>
                <button class="share-it"><i class="fa fa-paper-plane"></i></button>
            </div>
        </div>
        <div class="question-right">
            <div class="column-title">
                <i class="fa fa-envelope-open"></i>
                <span>一问一答</span>
            </div>
            <ul class="question-list">
                <li v-for="item in questionList">
                    <a @click="goQuestion(item.vol)">
                        <span class="vol-number">Vol.{{item.vol}}</span>
                        <span class="question-list-title">{{item.question}}</span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="clear"></div>
        <!--提问-->
        <div class="ask-question">
            <div class="einstein-say">
                <p>爱因斯坦曾经说，</p>
                <p><i class="fa fa-quote-left"></i>提出一个问题往往比解决一个问题更重要。</p>
            </div>
            <div class="ask-form">
                <form ref="askForm" v-model="askForm">
                    <div class="user-profile"><img :src="defaultProfile" alt=""></div>
                    <input class="question-input" type="text" placeholder="写下一个问题吧！" v-model="askForm.question">
                    <div class="clear"></div>
                    <textarea class="question-textarea" placeholder="为什么这么问呢？（选填）"
                              v-model="askForm.description"></textarea>
                </form>
                <button class="btn-submit-question" @click="onSubmit">提交问题</button>
            </div>
        </div>
        <!--end 提问-->
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'QuestionContent',
        data() {
            return {
                questionList: [],
                questionLast: [],
                askForm: {
                    question: '',
                    description: ''
                },
                defaultProfile: require('../assets/imgs/user-profile.jpg'),
            }
        },

        created() {
            this.getQuestionList().then(() => {
                this.questionList = this.questionlist;
            });
            this.getQuestionLast().then(() => {
                this.questionLast = this.questionlast;
            });
        },

        computed: {
            // mapState辅助函数获取state数据
            ...mapState({
                questionlist: state => state.questionlist,
                questionlast: state => state.questionlast,
            }),
        },

        methods: {
            ...mapActions({
                getQuestionList: 'GET_QUESTIONLIST',
                getQuestionLast: 'GET_QUESTIONLAST',
            }),

            // 收藏
            questionMark(id) {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('请先登录');
                    this.$router.push({path: '/login'});
                } else {
                    let markIcon = $(".question-left-top .bookMark i");
                    if (markIcon.hasClass("fa-bookmark-o")) {
                        this.axios.post("/api/questionMarkAdd", {
                            id: id,
                            email: this.$store.state.token.email,
                        }).then((response) => {
                            if (response && response.data) {
                                markIcon.removeClass("fa-bookmark-o").addClass("fa-bookmark").css("color", "#e3ce07");
                                alert("已添加至我的收藏");
                            } else {
                                console.log('error')
                            }
                        });
                    } else {
                        this.axios.post("/api/questionMarkDel", {
                            id: id,
                            email: this.$store.state.token.email,
                        }).then((response) => {
                            if (response && response.data) {
                                markIcon.removeClass("fa-bookmark").addClass("fa-bookmark-o").css("color", "#555");
                                alert("已取消收藏");
                            } else {
                                console.log('error')
                            }
                        });
                    }
                }
            },

            // 点赞
            questionLike(id) {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('请先登录');
                    this.$router.push({path: '/login'});
                } else {
                    let likeIcon = $(".question-left-bottom .like-it");
                    let heartIcon = likeIcon.find($("i"));
                    let likeNumber = parseInt(likeIcon.find($("span.like-number")).text());
                    if (heartIcon.hasClass("fa-heart-o")) {
                        likeNumber++;
                        this.axios.post("/api/questionLike", {
                            id: id,
                            likeCount: likeNumber,
                        }).then((response) => {
                            if (response && response.data) {
                                heartIcon.removeClass("fa-heart-o").addClass("fa-heart").css("color", "#a40000");
                                likeIcon.find($(".like-number")).text(likeNumber).css("color", "#a40000");
                            } else {
                                console.log('error')
                            }
                        });
                    } else {
                        likeNumber--;
                        this.axios.post("/api/questionLike", {
                            id: id,
                            likeCount: likeNumber,
                        }).then((response) => {
                            if (response && response.data) {
                                heartIcon.removeClass("fa-heart").addClass("fa-heart-o").css("color", "#555");
                                likeIcon.find($(".like-number")).text(likeNumber).css("color", "#555");
                            } else {
                                console.log('error')
                            }
                        });
                    }
                }
            },

            onSubmit() {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('请先登录');
                    this.$router.push({path: '/login'});
                } else {
                    if (this.askForm.question === '') {
                        alert('要提出问题才能提交喔')
                    } else {
                        let _this = this;
                        this.axios.post("/api/userAskAdd", {
                            email: _this.$store.state.token.email,
                            username: _this.$store.state.token.username,
                            question: _this.askForm.question,
                            description: _this.askForm.description,
                        }).then((response) => {
                            if (response && response.data) {
                                _this.askForm.question = '';
                                _this.askForm.description = '';
                                alert("提交成功！我们已收到你的问题！");
                            } else {
                                alert("提交失败，请重试！")
                            }
                        });
                    }
                }
            },

            goQuestion(vol) {
                this.axios.post("/api/getQuestionOne", {
                    vol: vol,
                }).then((response) => {
                    if (response && response.data) {
                        this.questionLast = response.data;
                    } else {
                        console.log('error');
                    }
                })
            },

            getList() {
                // current
                $(".question-list li").each(function () {
                    $(".question-list li:first-of-type").addClass("current");
                    $(this).click(function () {
                        $(".question-list li").removeClass("current");
                        $(this).addClass("current");
                    })
                });
            },

            getLast() {
                // 点击收藏问答

            }
        },

        mounted() {
            this.$watch('questionList', function () {
                this.$nextTick(function () {
                    this.getList();
                })
            });
            this.$watch('questionLast', function () {
                this.$nextTick(function () {
                    this.getLast();
                });
            });
        },
    }

</script>
