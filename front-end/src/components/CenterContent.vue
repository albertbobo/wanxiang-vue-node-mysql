<template>
    <div class="content-wrapper">
        <div class="my-card-wrapper">
            <div class="my-cover-wrapper">
                <label class="upload-picture">
                    <button class="btn-upload-cover">
                        <i class="fa fa-camera"></i>
                        <span>更换封面图片</span>
                    </button>
                    <input type="file" accept="image/png,image/jpeg" class="upload-picture-input">
                </label>
                <div class="my-cover">
                    <img :src="defaultCover" alt="" class="my-cover-img">
                </div>
            </div>
            <div class="my-info-wrapper">
                <div class="my-profile-wrapper">
                    <label class="upload-picture">
                        <div class="upload-profile-mask">
                            <div class="upload-profile">
                                <i class="fa fa-camera"></i>
                                <span>更换头像</span>
                            </div>
                        </div>
                        <input type="file" accept="image/png,image/jpeg" class="upload-picture-input">
                    </label>
                    <div class="my-profile">
                        <img :src="defaultProfile" alt="" class="my-profile-img">
                    </div>
                </div>
                <div class="my-info">
                    <div class="my-username">{{username}}</div>
                    <div class="my-introduction">{{signature}}</div>
                </div>
                <router-link to="/editme" class="btn-edit-info"><span>编辑个人资料</span></router-link>
                <div class="clear"></div>
            </div>
        </div>

        <!--我的收藏-->
        <div class="my-mark-wrapper">
            <!--tabs-->
            <div class="mark-tabs-wrapper">
                <div class="mark-title">
                    <div class="mark-title-icon">
                        <img src="../assets/imgs/icon-mark.png" alt="">
                    </div>
                    <span>我的收藏</span>
                </div>
                <ul class="mark-list tabs">
                    <li>
                        <a href="#tab1">
                            <div class="mark-tab-img">
                                <img src="../assets/imgs/icon-mark-tab1.png" alt="">
                                <img src="../assets/imgs/icon-mark-tab1-hover.png" alt="">
                            </div>
                            <span>悦读</span>
                        </a>
                    </li>
                    <li>
                        <a href="#tab2">
                            <div class="mark-tab-img">
                                <img src="../assets/imgs/icon-mark-tab2.png" alt="">
                                <img src="../assets/imgs/icon-mark-tab2-hover.png" alt="">
                            </div>
                            <span>视界</span>
                        </a>
                    </li>
                    <li>
                        <a href="#tab3">
                            <div class="mark-tab-img">
                                <img src="../assets/imgs/icon-mark-tab3.png" alt="">
                                <img src="../assets/imgs/icon-mark-tab3-hover.png" alt="">
                            </div>
                            <span>问答</span>
                        </a>
                    </li>
                    <li>
                        <a href="#tab4">
                            <div class="mark-tab-img">
                                <img src="../assets/imgs/icon-mark-tab4.png" alt="">
                                <img src="../assets/imgs/icon-mark-tab4-hover.png" alt="">
                            </div>
                            <span>探索</span>
                        </a>
                    </li>
                </ul>
            </div>
            <!--end tabs-->

            <div class="mark-content-wrapper">
                <!--悦读收藏-->
                <div class="mark-read-wrapper tab-content" id="tab1">
                    <ul class="read-content-list mark-read-list">
                        <li v-for="readMark in readMarkList">
                            <span class="vol-number">Vol.{{readMark.vol}}</span>
                            <span class="text-date">{{readMark.date}}</span>
                            <button class="bookMark"><i class="fa fa-bookmark is-bookMart-it"></i></button>
                            <h1 class="text-title">{{readMark.title}}</h1>
                            <div class="read-content">
                                <div class="read-content-part">
                                    <div class="read-img-small"><img src="" alt=""></div>
                                    <span></span>
                                    <button class="btn-read-all">阅读全文<i class="fa fa-caret-down"></i></button>
                                    <div class="clear"></div>
                                </div>
                                <div class="read-content-all">
                                    <div v-html="readMark.content"></div>
                                    <button class="btn-read-collapse">收起<i class="fa fa-caret-up"></i></button>
                                    <div class="clear"></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="mark-nothing" v-if="isReadNullShow">收藏夹空空如也 ~</div>
                </div>
                <!--end 悦读收藏-->

                <!--视界收藏-->
                <div class="mark-video-wrapper tab-content" id="tab2">
                    <ul class="mark-others-list mark-video-list">
                        <li v-for="videoMark in videoMarkList">
                            <span class="vol-number">Vol.{{videoMark.vol}}</span>
                            <span class="text-date">{{videoMark.date}}</span>
                            <button class="bookMark"><i class="fa fa-bookmark is-bookMart-it"></i></button>
                            <div class="mark-list-headline">
                                <router-link to="/video">{{videoMark.title}}</router-link>
                            </div>
                        </li>
                    </ul>
                    <div class="mark-nothing" v-if="isVideoNullShow">收藏夹空空如也 ~</div>
                </div>
                <!--end 视界收藏-->

                <!--问答收藏-->
                <div class="mark-question-wrapper tab-content" id="tab3">
                    <ul class="mark-others-list mark-question-list">
                        <li v-for="questionMark in questionMarkList">
                            <span class="vol-number">Vol.{{questionMark.vol}}</span>
                            <span class="text-date">{{questionMark.date}}</span>
                            <button class="bookMark"><i class="fa fa-bookmark is-bookMart-it"></i></button>
                            <div class="mark-list-headline">
                                <router-link to="/question">{{questionMark.question}}</router-link>
                            </div>
                        </li>
                    </ul>
                    <div class="mark-nothing" v-if="isQuestionNullShow">收藏夹空空如也 ~</div>
                </div>
                <!--end 问答收藏-->

                <!--探索收藏-->
                <div class="mark-explore-wrapper tab-content" id="tab4">
                    <ul class="mark-others-list mark-explore-list">
                        <li v-for="exploreMark in exploreMarkList">
                            <span class="vol-number">Vol.{{exploreMark.vol}}</span>
                            <span class="text-date">{{exploreMark.date}}</span>
                            <button class="bookMark"><i class="fa fa-bookmark is-bookMart-it"></i></button>
                            <div class="mark-list-headline">
                                <router-link to="/explore">{{exploreMark.title}}</router-link>
                            </div>
                        </li>
                    </ul>
                    <div class="mark-nothing" v-if="isExploreNullShow">收藏夹空空如也 ~</div>
                </div>
                <!--end 探索收藏-->
            </div>
            <div class="clear"></div>
        </div>
        <!--end 我的收藏-->
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'CenterContent',
        data() {
            return {
                defaultProfile: require('../assets/imgs/user-profile.jpg'),
                defaultCover: require('../assets/imgs/user-cover.jpg'),
                loginUser: this.$store.state.token.email,
                readMarkList: [],
                videoMarkList: [],
                questionMarkList: [],
                exploreMarkList: [],
                isReadNullShow: false,
                isVideoNullShow: false,
                isQuestionNullShow: false,
                isExploreNullShow: false,
            }
        },

        created() {
            this.getReadMarkList().then(() => {
                this.userReadMarkList = this.readmarklist.filter(v => v.email === this.loginUser);
                this.readMarkList = this.userReadMarkList;
            });
            this.getVideoMarkList().then(() => {
                this.userVideoMarkList = this.videomarklist.filter(v => v.email === this.loginUser);
                this.videoMarkList = this.userVideoMarkList;
            });
            this.getQuestionMarkList().then(() => {
                this.userQuestionMarkList = this.questionmarklist.filter(v => v.email === this.loginUser);
                this.questionMarkList = this.userQuestionMarkList;
            });
            this.getExploreMarkList().then(() => {
                this.userExploreMarkList = this.exploremarklist.filter(v => v.email === this.loginUser);
                this.exploreMarkList = this.userExploreMarkList;
            });
        },

        computed: {
            ...mapState({
                username: state => state.token.username,
                signature: state => state.token.signature,
                readmarklist: state => state.readmarklist,
                videomarklist: state => state.videomarklist,
                questionmarklist: state => state.questionmarklist,
                exploremarklist: state => state.exploremarklist,
            }),
        },

        methods: {
            ...mapActions({
                getReadMarkList: 'GET_READMARKLIST',
                getVideoMarkList: 'GET_VIDEOMARKLIST',
                getQuestionMarkList: 'GET_QUESTIONMARKLIST',
                getExploreMarkList: 'GET_EXPLOREMARKLIST',
            }),

            // tabs
            markTabs() {
                $(".tab-content").hide();
                $("ul.tabs li:first").addClass("current").show();
                $(".tab-content:first").show();
                $("ul.tabs li").click(function () {
                    $("ul.tabs li").removeClass("current");
                    $(this).addClass("current");
                    $(".tab-content").hide();
                    let activeTab = $(this).find("a").attr("href");
                    $(activeTab).fadeIn(300);
                    return false;
                });
            },

            getReadList() {
                let _this = this;
                let markReadList = $(".mark-read-list li");
                markReadList.each(function () {
                    // 悦读文字截取显示
                    let readAll = $(this).find($(".read-content-all"));
                    let readPart = $(this).find($(".read-content-part"));
                    readAll.each(function () {
                        let imgFirst = readAll.find("img:first-of-type");
                        if (imgFirst.length > 0) {
                            let imgClone = imgFirst.clone();
                            readPart.find($(".read-img-small")).show().find("img").replaceWith(imgClone);
                        }
                        if (readAll.text().length > 120) {
                            let readText = readAll.text().substring(0, 120) + "…";
                            readPart.find($(".read-content-part span")).text(readText);
                        }
                    });

                    // 点击阅读全文
                    $(this).find($(".btn-read-all")).click(function () {
                        readPart.hide();
                        readAll.show();
                    });

                    // 点击收起全文
                    $(this).find($(".btn-read-collapse")).click(function () {
                        readAll.hide();
                        readPart.show();
                    });

                    // 点击取消收藏悦读
                    $(this).find($(".bookMark")).click(function () {
                        let index = $(this).parents(markReadList).index();
                        let readId = _this.readMarkList[index].id;
                        _this.axios.post("/api/readMarkDel", {
                            id: readId,
                            email: _this.$store.state.token.email,
                        }).then((response) => {
                            if (response && response.data) {
                                _this.getReadMarkList().then(() => {
                                    _this.userReadMarkList = _this.readmarklist.filter(v => v.email === _this.loginUser);
                                    _this.readMarkList = _this.userReadMarkList;
                                });
                            } else {
                                console.log('error')
                            }
                        });
                    });
                });
                if (markReadList.length === 0) {
                    this.isReadNullShow = true;
                }
            },

            getVideoList() {
                let _this = this;
                let markVideoList = $(".mark-video-list li");
                markVideoList.each(function () {
                    $(this).find($(".bookMark")).click(function () {
                        let index = $(this).parents(markVideoList).index();
                        let videoId = _this.videoMarkList[index].id;
                        _this.axios.post("/api/videoMarkDel", {
                            id: videoId,
                            email: _this.$store.state.token.email,
                        }).then((response) => {
                            if (response && response.data) {
                                _this.getVideoMarkList().then(() => {
                                    _this.userVideoMarkList = _this.videomarklist.filter(v => v.email === _this.loginUser);
                                    _this.videoMarkList = _this.userVideoMarkList;
                                });
                            } else {
                                console.log('error')
                            }
                        });
                    });
                });
                if (markVideoList.length === 0) {
                    this.isVideoNullShow = true;
                }
            },

            getQuestionList() {
                let _this = this;
                let markQuestionList = $(".mark-question-list li");
                markQuestionList.each(function () {
                    $(this).find($(".bookMark")).click(function () {
                        let index = $(this).parents(markQuestionList).index();
                        let questionId = _this.questionMarkList[index].id;
                        _this.axios.post("/api/questionMarkDel", {
                            id: questionId,
                            email: _this.$store.state.token.email,
                        }).then((response) => {
                            if (response && response.data) {
                                _this.getQuestionMarkList().then(() => {
                                    _this.userQuestionMarkList = _this.questionmarklist.filter(v => v.email === _this.loginUser);
                                    _this.questionMarkList = _this.userQuestionMarkList;
                                });
                            } else {
                                console.log('error')
                            }
                        });
                    });
                });
                if (markQuestionList.length === 0) {
                    this.isQuestionNullShow = true;
                }
            },

            getExploreList() {
                let _this = this;
                let markExploreList = $(".mark-explore-list li");
                markExploreList.each(function () {
                    $(this).find($(".bookMark")).click(function () {
                        let index = $(this).parents(markExploreList).index();
                        let exploreId = _this.exploreMarkList[index].id;
                        _this.axios.post("/api/exploreMarkDel", {
                            id: exploreId,
                            email: _this.$store.state.token.email,
                        }).then((response) => {
                            if (response && response.data) {
                                _this.getExploreMarkList().then(() => {
                                    _this.userExploreMarkList = _this.exploremarklist.filter(v => v.email === _this.loginUser);
                                    _this.exploreMarkList = _this.userExploreMarkList;
                                });
                            } else {
                                console.log('error')
                            }
                        });
                    });
                });
                if (markExploreList.length === 0) {
                    this.isExploreNullShow = true;
                }
            },
        },

        mounted() {
            this.markTabs();
            this.$watch('readMarkList', function () {
                this.$nextTick(function () {
                    this.getReadList();
                })
            });
            this.$watch('videoMarkList', function () {
                this.$nextTick(function () {
                    this.getVideoList();
                })
            });
            this.$watch('questionMarkList', function () {
                this.$nextTick(function () {
                    this.getQuestionList();
                })
            });
            this.$watch('exploreMarkList', function () {
                this.$nextTick(function () {
                    this.getExploreList();
                })
            });
        }
    }

</script>
