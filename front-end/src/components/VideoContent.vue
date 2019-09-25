<template>
    <div class="content-wrapper">
        <div class="video-left" v-for="video in videoPlay">
            <div class="video-left-top">
                <span class="vol-number">Vol.{{video.vol}}</span>
                <span class="text-date">{{video.date}}</span>
                <h1 class="text-title">{{video.title}}</h1>
                <button class="bookMark" @click="videoMark(video.id)"><i class="fa fa-bookmark-o"></i></button>
            </div>
            <div class="video-play">
                <video class="playVideo" controls autoplay>
                    <source :src="video.videoUrl" type="video/mp4">
                </video>
            </div>
            <div class="video-summary">
                <p>{{video.intro}}</p>
            </div>
            <div class="video-left-bottom">
                <button class="like-it" @click="likeVideo(video.id)">
                    <i class="fa fa-heart-o"></i><span class="like-number">{{video.likeCount}}</span>
                </button>
                <button class="share-it"><i class="fa fa-paper-plane"></i></button>
            </div>
        </div>

        <div class="video-right">
            <div class="column-title">
                <i class="fa fa-desktop"></i>
                <span>视界一览</span>
            </div>
            <ul class="video-list">
                <li v-for="item in videoList" @click="goVideo(item.vol)">
                    <div class="video-img">
                        <img :src="item.imageUrl" alt="">
                        <i class="fa fa-play-circle-o"></i>
                    </div>
                    <div class="video-list-content">
                        <span class="vol-number" v-model="item.vol">Vol.{{item.vol}}</span>
                        <span class="text-date">{{item.date}}</span>
                        <span class="video-list-title">{{item.title}}</span>
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
        name: 'VideoContent',
        data() {
            return {
                videoList: [],
                videoPlay: []
            }
        },

        created() {
            this.getVideoList().then(() => {
                this.videoList = this.videolist;
            });
            this.getVideoLast().then(() => {
                this.videoPlay = this.videolast;
            });
        },

        computed: {
            // mapState辅助函数获取state数据
            ...mapState({
                videolist: state => state.videolist,
                videolast: state => state.videolast,
            }),
        },

        methods: {
            ...mapActions({
                getVideoList: 'GET_VIDEOLIST',
                getVideoLast: 'GET_VIDEOLAST',
            }),

            goVideo(vol) {
                this.axios.post("/api/getVideoOne", {
                    vol: vol,
                }).then((response) => {
                    if (response && response.data) {
                        this.videoPlay = response.data;
                    } else {
                        console.log('error');
                    }
                })
            },

            // 收藏
            videoMark(id) {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('请先登录');
                    this.$router.push({path: '/login'});
                } else {
                    let markIcon = $(".video-left-top .bookMark i");
                    if (markIcon.hasClass("fa-bookmark-o")) {
                        this.axios.post("/api/videoMarkAdd", {
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
                        this.axios.post("/api/videoMarkDel", {
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
            likeVideo(id) {
                const token = localStorage.getItem('token');
                if (!token) {
                    alert('请先登录');
                    this.$router.push({path: '/login'});
                } else {
                    let likeIcon = $(".video-left-bottom .like-it");
                    let heartIcon = likeIcon.find($("i"));
                    let likeNumber = parseInt(likeIcon.find($("span.like-number")).text());
                    if (heartIcon.hasClass("fa-heart-o")) {
                        likeNumber++;
                        this.axios.post("/api/videoLike", {
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
                        this.axios.post("/api/videoLike", {
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
                // 播放图标
                let videoImg = $(".video-img");
                let videoImgHeight = videoImg.innerHeight();
                videoImg.css("line-height", videoImgHeight + "px");

                // current
                $(".video-list li").each(function () {
                    $(".video-list li:first-of-type").addClass("current");
                    $(this).click(function () {
                        $(".video-list li").removeClass("current");
                        $(this).addClass("current");
                    })
                });
            },

            getPlay() {
                // 播放区域高度
                let videoLeftHeight = $(".video-left").innerHeight();
                $(".video-right").css("max-height", videoLeftHeight);

                // 重新加载视频
                $(".playVideo").load();
            }
        },

        mounted() {
            this.$watch('videoList', function () {
                this.$nextTick(function () {
                    this.getList();
                })
            });
            this.$watch('videoPlay', function () {
                this.$nextTick(function () {
                    this.getPlay();
                });
            });
        },
    }

</script>
