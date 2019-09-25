<template>
    <div class="content-wrapper">
        <div class="test-wrapper" v-for="test in testLast">
            <span class="vol-number">Vol.{{test.vol}}</span>
            <span class="text-date">{{test.date}}</span>
            <div class="test-img">
                <img :src="test.imageUrl" alt="">
            </div>
            <div class="test-left">
                <!--主题-->
                <div class="test-topic" v-if="topicShow">
                    <div class="test-title test-theme-icon"><i class="fa fa-lightbulb-o"></i>{{test.theme}}</div>
                    <div class="test-ask">{{test.intro}}</div>
                    <button class="btn-test btn-start-test"
                            @click="startTest(test.id)"><i class="fa fa-play"></i>开始答题
                    </button>
                </div>
                <!--end 主题-->
                <ul class="test-question-list">
                    <li v-for="topic in topicList">
                        <!--题目-->
                        <div class="test-question" v-if="questionShow">
                            <div class="test-title test-question-icon">
                                <i class="fa fa-question"></i>{{topic.question}}
                            </div>
                            <div class="test-ask">{{topic.point}}</div>
                            <form action="" class="test-form">
                                <div class="test-option">
                                    <input type="radio" class="test-radio" id="chk1" name="test-option" value="1">
                                    <label for="chk1"></label>
                                    <span>{{topic.option1}}</span>
                                </div>
                                <div class="test-option">
                                    <input type="radio" class="test-radio" id="chk2" name="test-option" value="2">
                                    <label for="chk2"></label>
                                    <span>{{topic.option2}}</span>
                                </div>
                                <div class="test-option">
                                    <input type="radio" class="test-radio" id="chk3" name="test-option" value="3">
                                    <label for="chk3"></label>
                                    <span>{{topic.option3}}</span>
                                </div>
                            </form>
                            <button class="btn-test btn-answer-test"
                                    @click="answerTest(topic.optionRight)">答题
                            </button>
                        </div>
                        <!--end 题目-->
                        <!--题目答案-->
                        <div class="test-answer">
                            <div class="test-answer-wrong" v-if="wrongShow">
                                <div class="test-title test-remove-icon"><i class="fa fa-remove"></i>抱歉，答错了</div>
                            </div>
                            <div class="test-answer-right" v-if="rightShow">
                                <div class="test-title test-check-icon"><i class="fa fa-check"></i>恭喜，答对了！</div>
                            </div>
                            <div class="test-ask" v-if="answerShow">{{topic.answer}}</div>
                            <button class="btn-test btn-next-question" v-if="nextShow"
                                    @click="nextQuestion(test.id,topic.number)">下一题
                            </button>
                        </div>
                        <!--end 题目答案-->
                    </li>
                </ul>
                <!--显示成绩-->
                <div class="test-result" v-if="resultShow">
                    <div class="test-title test-flag-icon">
                        <i class="fa fa-flag"></i>
                        你的成绩为：<span class="test-score">{{resultGrade}}</span>
                    </div>
                    <p>总共有：<span class="test-total">5</span>道题</p>
                    <p>总共答对了：<span class="test-total-right">{{rightCount}}</span>道题</p>
                    <p>总共答错了：<span class="test-total-wrong">{{wrongCount}}</span>道题</p>
                    <button class="btn-test btn-restart-test" @click="restartTest">重做</button>
                </div>
                <!--end 显示成绩-->
            </div>
            <div class="clear"></div>
        </div>

        <div class="test-list-wrapper">
            <ul class="test-list">
                <li v-for="item in testList">
                    <div class="test-list-img">
                        <img :src="item.imageUrl" alt="">
                    </div>
                    <div class="test-list-content">
                        <div class="vol-date">
                            <span class="vol-number">Vol.{{item.vol}}</span>
                            <span class="text-date">{{item.date}}</span>
                        </div>
                        <div class="test-theme"><a @click="goTest(item.vol)">{{item.theme}}</a></div>
                        <div class="test-theme-about">{{item.intro}}</div>
                    </div>
                </li>
            </ul>
            <div class="clear"></div>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'TestContent',
        data() {
            return {
                testList: [],
                testLast: [],
                topicList: [],
                topicShow: true,
                questionShow: false,
                wrongShow: false,
                rightShow: false,
                answerShow: false,
                nextShow: false,
                resultShow: false,
                rightCount: 0,
                wrongCount: 0,
                resultGrade: '',
            }
        },

        created() {
            this.getTestList().then(() => {
                this.testList = this.testlist;
            });
            this.getTestLast().then(() => {
                this.testLast = this.testlast;
            });
        },

        computed: {
            // mapState辅助函数获取state数据
            ...mapState({
                testlist: state => state.testlist,
                testlast: state => state.testlast,
            }),
        },

        methods: {
            ...mapActions({
                getTestList: 'GET_TESTLIST',
                getTestLast: 'GET_TESTLAST',
            }),

            // 点击开始答题
            startTest(id) {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('请先登录');
                    this.$router.push({path: '/login'});
                } else {
                    this.topicShow = false;
                    this.axios.post("/api/getTopicTest", {
                        id: id,
                        number: 1
                    }).then((response) => {
                        if (response && response.data) {
                            this.questionShow = true;
                            this.topicList = response.data;
                        } else {
                            console.log('error');
                        }
                    });
                }
            },

            // 点击答题，显示答案
            answerTest(optionRight) {
                if ($('.test-radio[name="test-option"]').is(":checked")) {
                    let val = parseInt($('.test-radio[name="test-option"]:checked').val());
                    if (val === optionRight) {
                        this.rightShow = true;
                        this.rightCount++;
                    } else {
                        this.wrongShow = true;
                        this.wrongCount++;
                    }
                    this.questionShow = false;
                    this.answerShow = true;
                    this.nextShow = true;
                    if (this.rightCount >= 5) {
                        this.resultGrade = '优秀';
                    } else if (this.rightCount >= 3 && this.rightCount <= 4) {
                        this.resultGrade = '良好';
                    } else {
                        this.resultGrade = '一般';
                    }
                } else {
                    alert('请选择答案！');
                }
            },

            // 点击下一题
            nextQuestion(id, number) {
                number++;
                this.rightShow = false;
                this.wrongShow = false;
                this.answerShow = false;
                this.nextShow = false;
                this.axios.post("/api/getTopicTest", {
                    id: id,
                    number: number
                }).then((response) => {
                    if (response && response.data) {
                        this.questionShow = true;
                        this.topicList = response.data;
                    } else {
                        console.log('error');
                    }
                });
                if (number === 6) {
                    this.questionShow = false;
                    this.resultShow = true;
                }
            },

            // 点击重做
            restartTest() {
                this.rightCount = 0;
                this.wrongCount = 0;
                this.resultShow = false;
                this.topicShow = true;
            },

            // 点击切换期数
            goTest(vol) {
                this.topicShow = true;
                this.questionShow = false;
                this.wrongShow = false;
                this.rightShow = false;
                this.answerShow = false;
                this.nextShow = false;
                this.resultShow = false;
                this.rightCount = 0;
                this.wrongCount = 0;
                this.resultGrade = '';
                this.axios.post("/api/getTestOne", {
                    vol: vol,
                }).then((response) => {
                    if (response && response.data) {
                        this.testLast = response.data;
                    } else {
                        console.log('error');
                    }
                })
            },

            getList() {
                // 题园列表文字截取显示
                $(".test-list li").each(function () {
                    let testAbout = $(this).find(".test-theme-about");
                    if (testAbout.text().length > 25) {
                        let testAboutText = testAbout.text().substring(0, 25) + "…";
                        testAbout.text(testAboutText);
                    }
                });
            },
        },

        mounted() {
            this.$watch('testList', function () {
                this.$nextTick(function () {
                    this.getList();
                })
            });
        },
    }

</script>
