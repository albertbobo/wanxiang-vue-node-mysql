<template>
    <!--banner-->
    <div class="banner">
        <swiper :options="swiperOption" class="swiper-wrap" v-if="slideShowList.length">
            <swiper-slide v-for="slideShow in slideShowList">
                <img :src="slideShow.imageUrl" alt="banner">
                <div class="banner-wrapper">
                    <div class="banner-date">
                        <p class="date-dmy">
                            <span class="date-day">{{slideShow.day}}</span>
                            <span class="date-slash">/</span>{{slideShow.monthYear}}
                        </p>
                    </div>
                    <div class="banner-sentence">
                        <p class="saying">
                            <i class="fa fa-quote-left"></i>
                            <span>{{slideShow.saying}}</span>
                        </p>
                        <p class="author">by {{slideShow.author}}</p>
                    </div>
                    <div class="clear"></div>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        </swiper>
    </div>
    <!--end banner-->
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import {swiper, swiperSlide} from "vue-awesome-swiper";

    require("swiper/dist/css/swiper.css");

    export default {
        name: 'SlideShow',
        components: {
            swiper,
            swiperSlide
        },

        data() {
            return {
                slideShowList: [],
                swiperOption: {
                    notNextTick: true,
                    loop: false,
                    autoplay: false,
                    autoHeight: true,         // 自适应高度
                    observer: true,           // 修改swiper自己或子元素时，自动初始化swiper
                    observeParents: true,     // 修改swiper的父元素时，自动初始化swiper
                    initialSlide: 0,          // 初始化时slide的索引
                    speed: 800,               // 滑动速度
                    grabCursor: true,         // 小手掌抓取滑动
                    pagination: {             // 分页器
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                    navigation: {             // 左右切换
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                }
            }
        },

        created() {
            this.getSlideList().then(() => {
                this.slideShowList = this.slidelist;
            });
        },

        computed: {
            // mapState辅助函数获取state数据
            ...mapState({
                slidelist: state => state.slidelist,
            }),
        },

        methods: {
            ...mapActions({
                getSlideList: 'GET_SLIDELIST',
            }),
        },
    }
</script>
