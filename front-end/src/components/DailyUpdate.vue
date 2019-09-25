<template>
    <!--今日一更-->
    <div class="daily-wrapper">
        <div class="index-new-title">~ 今日一更 ~</div>
        <ul class="index-new-list">
            <!--悦读-->
            <li v-for="read in dailyReadList">
                <img :src="read.imageUrl" alt="">
                <span class="new-list-tag">悦读</span>
                <div class="new-list-text">
                    <p class="text-date">{{read.date}}</p>
                    <h1 class="new-title" v-for="(item,index) in dailyReadListTitle">
                        <span>{{tag[index]}}</span>
                        <router-link :to="link[index]">{{item.title}}</router-link>
                    </h1>
                </div>
            </li>
            <!--视界-->
            <li v-for="video in dailyVideoList">
                <img :src="video.imageUrl" alt="">
                <span class="new-list-tag">视界</span>
                <div class="new-list-text">
                    <p class="text-date">{{video.date}}</p>
                    <h1 class="new-title">
                        <router-link to="/video">{{video.title}}</router-link>
                    </h1>
                    <h2 class="text-subtitle">{{video.intro}}</h2>
                </div>
            </li>
            <!--题园-->
            <li v-for="test in dailyTestList">
                <img :src="test.imageUrl" alt="">
                <span class="new-list-tag">题园</span>
                <div class="new-list-text">
                    <p class="text-date">{{test.date}}</p>
                    <h1 class="new-title">
                        <router-link to="/test">{{test.theme}}</router-link>
                    </h1>
                    <h2 class="text-subtitle">{{test.intro}}</h2>
                </div>
            </li>
            <!--问答-->
            <li v-for="ques in dailyQuestionList">
                <img :src="ques.imageUrl" alt="">
                <span class="new-list-tag">问答</span>
                <div class="new-list-text">
                    <p class="text-date">{{ques.date}}</p>
                    <h1 class="new-title">
                        <router-link to="/question">{{ques.question}}</router-link>
                    </h1>
                    <h2 class="text-subtitle">{{ques.description}}</h2>
                </div>
            </li>
            <!--探索-->
            <li v-for="explore in dailyExploreList">
                <img :src="explore.imageUrl" alt="">
                <span class="new-list-tag">探索</span>
                <div class="new-list-text">
                    <p class="text-date">{{explore.date}}</p>
                    <h1 class="new-title">
                        <router-link to="/explore">{{explore.title}}</router-link>
                    </h1>
                    <h2 class="text-subtitle">{{explore.intro}}</h2>
                </div>
            </li>
        </ul>
    </div>
    <!--end 今日一更-->
</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default {
        name: 'DailyUpdate',
        data() {
            return {
                dailyReadList: [],
                dailyReadListTitle: [],
                dailyVideoList: [],
                tag: ['[世界之旅]', '[光年之外]', '[人文之美]', '[科技之光]', '[身心之语]', '[万物之理]'],
                link: ['/read1', '/read2', '/read3', '/read4', '/read5', '/read6'],
                dailyTestList: [],
                dailyQuestionList: [],
                dailyExploreList: [],
            }
        },

        created() {
            this.getDailyRead().then(() => {
                this.dailyReadList = this.dailyread;
            });
            this.getDailyReadTitle().then(() => {
                this.dailyReadListTitle = this.dailyreadtitle;
            });
            this.getDailyVideo().then(() => {
                this.dailyVideoList = this.dailyvideo;
            });
            this.getDailyTest().then(() => {
                this.dailyTestList = this.dailytest;
            });
            this.getDailyQuestion().then(() => {
                this.dailyQuestionList = this.dailyquestion;
            });
            this.getDailyExplore().then(() => {
                this.dailyExploreList = this.dailyexplore;
            });
        },

        computed: {
            // mapState辅助函数获取state数据
            ...mapState({
                dailyread: state => state.dailyread,
                dailyreadtitle: state => state.dailyreadtitle,
                dailyvideo: state => state.dailyvideo,
                dailytest: state => state.dailytest,
                dailyquestion: state => state.dailyquestion,
                dailyexplore: state => state.dailyexplore,
            }),
        },

        methods: {
            ...mapActions({
                getDailyRead: 'GET_DAILYREAD',
                getDailyReadTitle: 'GET_DAILYREADTITLE',
                getDailyVideo: 'GET_DAILYVIDEO',
                getDailyTest: 'GET_DAILYTEST',
                getDailyQuestion: 'GET_DAILYQUESTION',
                getDailyExplore: 'GET_DAILYEXPLORE',
            }),
        },
    }
</script>

