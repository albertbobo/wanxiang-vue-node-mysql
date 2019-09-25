<template>
    <div class="read-content-wrapper">
        <ul class="read-content-list">
            <li v-for="item in readList">
                <span class="vol-number">Vol.{{item.vol}}</span>
                <span class="text-date">{{item.date}}</span>
                <button class="bookMark">
                    <i class="fa fa-bookmark-o"></i>
                </button>
                <h1 class="text-title">{{item.title}}</h1>
                <div class="read-content">
                    <div class="read-content-part">
                        <div class="read-img-small"><img src="" alt=""></div>
                        <span></span>
                        <button class="btn-read-all">阅读全文<i class="fa fa-caret-down"></i></button>
                        <div class="clear"></div>
                    </div>
                    <div class="read-content-all">
                        <div v-html="item.content"></div>
                        <button class="btn-read-collapse">收起<i class="fa fa-caret-up"></i></button>
                        <div class="clear"></div>
                    </div>
                </div>
                <div class="read-list-bottom">
                    <button class="like-it">
                        <i class="fa fa-heart-o"></i>
                        <span class="like-number">{{item.likeCount}}</span>
                    </button>
                    <button class="share-it"><i class="fa fa-paper-plane"></i></button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'ReadContent6',
        data() {
            return {
                readList: [],
            }
        },

        created() {
            this.getReadList().then(() => {
                this.readList = this.readlist;
            });
        },

        computed: {
            // mapState辅助函数获取state数据
            ...mapState({
                readlist: state => state.readlist6_1,
            }),
        },

        methods: {
            ...mapActions({
                getReadList: 'GET_READLIST_6_1',
            }),

            getList() {
                let _this = this;
                $(".read-content-list li").each(function () {
                    // 点击喜欢悦读
                    let heartIcon = $(this).find($(".like-it i"));
                    let likeNumber = parseInt($(this).find($(".like-number")).text());
                    $(this).find($(".like-it")).click(function () {
                        const token = localStorage.getItem('token');
                        if (!token) {
                            alert('请先登录');
                            _this.$router.push({path: '/login'});
                        } else {
                            let index = $(this).parents(".read-content-list li").index();
                            let readId = _this.readList[index].id;
                            if (heartIcon.hasClass("fa-heart-o")) {
                                likeNumber++;
                                _this.axios.post("/api/readLike", {
                                    id: readId,
                                    likeCount: likeNumber,
                                }).then((response) => {
                                    if (response && response.data) {
                                        heartIcon.removeClass("fa-heart-o").addClass("fa-heart").css("color", "#a40000");
                                        $(this).find($(".like-number")).text(likeNumber).css("color", "#a40000");
                                    } else {
                                        console.log('error')
                                    }
                                });
                            } else {
                                likeNumber--;
                                _this.axios.post("/api/readLike", {
                                    id: readId,
                                    likeCount: likeNumber,
                                }).then((response) => {
                                    if (response && response.data) {
                                        heartIcon.removeClass("fa-heart").addClass("fa-heart-o").css("color", "#555");
                                        $(this).find($(".like-number")).text(likeNumber).css("color", "#555");
                                    } else {
                                        console.log('error')
                                    }
                                });
                            }
                        }
                    });

                    // 点击收藏悦读
                    $(this).find($(".bookMark")).click(function () {
                        const token = localStorage.getItem('token');
                        if (!token) {
                            alert('请先登录');
                            _this.$router.push({path: '/login'});
                        } else {
                            let index = $(this).parents(".read-content-list li").index();
                            let readId = _this.readList[index].id;
                            let markIcon = $(this).find($(".bookMark i"));
                            if (markIcon.hasClass("fa-bookmark-o")) {
                                _this.axios.post("/api/readMarkAdd", {
                                    id: readId,
                                    email: _this.$store.state.token.email,
                                }).then((response) => {
                                    if (response && response.data) {
                                        markIcon.removeClass("fa-bookmark-o").addClass("fa-bookmark").css("color", "#e3ce07");
                                        alert("已添加至我的收藏");
                                    } else {
                                        console.log('error')
                                    }
                                });
                            } else {
                                _this.axios.post("/api/readMarkDel", {
                                    id: readId,
                                    email: _this.$store.state.token.email,
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
                    });

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
                    })
                });
            }
        },

        mounted() {
            this.$watch('readList', function () {
                this.$nextTick(function () {
                    this.getList();
                })
            });
        },
    }

</script>
