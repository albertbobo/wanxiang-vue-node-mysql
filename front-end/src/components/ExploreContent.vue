<template>
    <div class="content-wrapper">
        <div class="explore-left" v-for="explore in exploreLast">
            <div class="explore-left-top">
                <span class="vol-number">Vol.{{explore.vol}}</span>
                <span class="text-date">{{explore.date}}</span>
                <h1 class="text-title">{{explore.title}}</h1>
                <button class="bookMark" @click="exploreMark(explore.id)"><i class="fa fa-bookmark-o"></i></button>
            </div>
            <div class="explore-content-wrapper">
                <div class="explore-content" v-html="explore.content"></div>
            </div>
            <div class="explore-left-bottom">
                <button class="like-it" @click="exploreLike(explore.id)">
                    <i class="fa fa-heart-o"></i><span class="like-number">{{explore.likeCount}}</span>
                </button>
                <button class="share-it"><i class="fa fa-paper-plane"></i></button>
            </div>
        </div>

        <div class="explore-right">
            <div class="column-title">
                <i class="fa fa-paw"></i>
                <span>探索求真</span>
            </div>
            <ul class="explore-list">
                <li v-for="item in exploreList" @click="goExplore(item.vol)">
                    <div class="explore-img">
                        <img :src="item.imageUrl" alt="">
                    </div>
                    <div class="explore-list-content">
                        <span class="vol-number">Vol.{{item.vol}}</span>
                        <span class="text-date">{{item.date}}</span>
                        <span class="explore-list-title">{{item.title}}</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="clear"></div>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'ExploreContent',
        data() {
            return {
                exploreList: [],
                exploreLast: []
            }
        },

        created() {
            this.getExploreList().then(() => {
                this.exploreList = this.explorelist;
            });
            this.getExploreLast().then(() => {
                this.exploreLast = this.explorelast;
            });
        },

        computed: {
            // mapState辅助函数获取state数据
            ...mapState({
                explorelist: state => state.explorelist,
                explorelast: state => state.explorelast,
            }),
        },

        methods: {
            ...mapActions({
                getExploreList: 'GET_EXPLORELIST',
                getExploreLast: 'GET_EXPLORELAST',
            }),

            goExplore(vol) {
                this.axios.post("/api/getExploreOne", {
                    vol: vol,
                }).then((response) => {
                    if (response && response.data) {
                        this.exploreLast = response.data;
                    } else {
                        console.log('error');
                    }
                })
            },

            // 收藏
            exploreMark(id) {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('请先登录');
                    this.$router.push({path: '/login'});
                } else {
                    let markIcon = $(".explore-left-top .bookMark i");
                    if (markIcon.hasClass("fa-bookmark-o")) {
                        this.axios.post("/api/exploreMarkAdd", {
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
                        this.axios.post("/api/exploreMarkDel", {
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
            exploreLike(id) {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('请先登录');
                    this.$router.push({path: '/login'});
                } else {
                    let likeIcon = $(".explore-left-bottom .like-it");
                    let heartIcon = likeIcon.find($("i"));
                    let likeNumber = parseInt(likeIcon.find($("span.like-number")).text());
                    if (heartIcon.hasClass("fa-heart-o")) {
                        likeNumber++;
                        this.axios.post("/api/exploreLike", {
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
                        this.axios.post("/api/exploreLike", {
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

            getList() {
                // current
                $(".explore-list li").each(function () {
                    $(".explore-list li:first-of-type").addClass("current");
                    $(this).click(function () {
                        $(".explore-list li").removeClass("current");
                        $(this).addClass("current");
                    })
                });
            },

            getLast() {
                // 点击收藏探索

            }
        },

        mounted() {
            this.$watch('exploreList', function () {
                this.$nextTick(function () {
                    this.getList();
                })
            });
            this.$watch('exploreLast', function () {
                this.$nextTick(function () {
                    this.getLast();
                });
            });
        },
    }

</script>
