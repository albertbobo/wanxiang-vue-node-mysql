import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

const state = {
    slidelist: JSON.parse(localStorage.getItem('slidelist')),
    readlist1_1: JSON.parse(localStorage.getItem('readlist1_1')),
    readlist2_1: JSON.parse(localStorage.getItem('readlist2_1')),
    readlist3_1: JSON.parse(localStorage.getItem('readlist3_1')),
    readlist4_1: JSON.parse(localStorage.getItem('readlist4_1')),
    readlist5_1: JSON.parse(localStorage.getItem('readlist5_1')),
    readlist6_1: JSON.parse(localStorage.getItem('readlist6_1')),
    videolist: JSON.parse(localStorage.getItem('videolist')),
    videolast: JSON.parse(localStorage.getItem('videolast')),
    explorelist: JSON.parse(localStorage.getItem('explorelist')),
    explorelast: JSON.parse(localStorage.getItem('explorelast')),
    questionlist: JSON.parse(localStorage.getItem('questionlist')),
    questionlast: JSON.parse(localStorage.getItem('questionlast')),
    testlist: JSON.parse(localStorage.getItem('testlist')),
    testlast: JSON.parse(localStorage.getItem('testlast')),
    dailyread: JSON.parse(localStorage.getItem('dailyread')),
    dailyreadtitle: JSON.parse(localStorage.getItem('dailyreadtitle')),
    dailyvideo: JSON.parse(localStorage.getItem('dailyvideo')),
    dailytest: JSON.parse(localStorage.getItem('dailytest')),
    dailyquestion: JSON.parse(localStorage.getItem('dailyquestion')),
    dailyexplore: JSON.parse(localStorage.getItem('dailyexplore')),
    token: JSON.parse(localStorage.getItem('token')),
    readmarklist: JSON.parse(localStorage.getItem('readmarklist')),
    videomarklist: JSON.parse(localStorage.getItem('videomarklist')),
    questionmarklist: JSON.parse(localStorage.getItem('questionmarklist')),
    exploremarklist: JSON.parse(localStorage.getItem('exploremarklist')),
};

const mutations = {
    // 获取SLIDESHOW列表
    GET_SLIDELIST(state, slidelist) {
        localStorage.setItem('slidelist', JSON.stringify(slidelist));
        state.slidelist = slidelist;
    },
    // 获取悦读分类1默认排序列表
    GET_READLIST_1_1(state, readlist1_1) {
        localStorage.setItem('readlist1_1', JSON.stringify(readlist1_1));
        state.readlist1_1 = readlist1_1;
    },
    // 获取悦读分类2默认排序列表
    GET_READLIST_2_1(state, readlist2_1) {
        localStorage.setItem('readlist2_1', JSON.stringify(readlist2_1));
        state.readlist2_1 = readlist2_1;
    },
    // 获取悦读分类3默认排序列表
    GET_READLIST_3_1(state, readlist3_1) {
        localStorage.setItem('readlist3_1', JSON.stringify(readlist3_1));
        state.readlist3_1 = readlist3_1;
    },
    // 获取悦读分类4默认排序列表
    GET_READLIST_4_1(state, readlist4_1) {
        localStorage.setItem('readlist4_1', JSON.stringify(readlist4_1));
        state.readlist4_1 = readlist4_1;
    },
    // 获取悦读分类5默认排序列表
    GET_READLIST_5_1(state, readlist5_1) {
        localStorage.setItem('readlist5_1', JSON.stringify(readlist5_1));
        state.readlist5_1 = readlist5_1;
    },
    // 获取悦读分类6默认排序列表
    GET_READLIST_6_1(state, readlist6_1) {
        localStorage.setItem('readlist6_1', JSON.stringify(readlist6_1));
        state.readlist6_1 = readlist6_1;
    },
    // 获取视界往期列表
    GET_VIDEOLIST(state, videolist) {
        localStorage.setItem('videolist', JSON.stringify(videolist));
        state.videolist = videolist;
    },
    // 获取最新一期视频数据
    GET_VIDEOLAST(state, videolast) {
        localStorage.setItem('videolast', JSON.stringify(videolast));
        state.videolast = videolast;
    },
    // 获取探索往期列表
    GET_EXPLORELIST(state, explorelist) {
        localStorage.setItem('explorelist', JSON.stringify(explorelist));
        state.explorelist = explorelist;
    },
    // 获取最新一期探索数据
    GET_EXPLORELAST(state, explorelast) {
        localStorage.setItem('explorelast', JSON.stringify(explorelast));
        state.explorelast = explorelast;
    },
    // 获取问答往期列表
    GET_QUESTIONLIST(state, questionlist) {
        localStorage.setItem('questionlist', JSON.stringify(questionlist));
        state.questionlist = questionlist;
    },
    // 获取最新一期问答数据
    GET_QUESTIONLAST(state, questionlast) {
        localStorage.setItem('questionlast', JSON.stringify(questionlast));
        state.questionlast = questionlast;
    },
    // 获取题园往期列表
    GET_TESTLIST(state, testlist) {
        localStorage.setItem('testlist', JSON.stringify(testlist));
        state.testlist = testlist;
    },
    // 获取最新一期题园数据
    GET_TESTLAST(state, testlast) {
        localStorage.setItem('testlast', JSON.stringify(testlast));
        state.testlast = testlast;
    },
    // 获取今日一更悦读列表
    GET_DAILYREAD(state, dailyread) {
        localStorage.setItem('dailyread', JSON.stringify(dailyread));
        state.dailyread = dailyread;
    },
    // 获取悦读表最新标题
    GET_DAILYREADTITLE(state, dailyreadtitle) {
        localStorage.setItem('dailyreadtitle', JSON.stringify(dailyreadtitle));
        state.dailyreadtitle = dailyreadtitle;
    },
    // 获取今日一更视界列表
    GET_DAILYVIDEO(state, dailyvideo) {
        localStorage.setItem('dailyvideo', JSON.stringify(dailyvideo));
        state.dailyvideo = dailyvideo;
    },
    // 获取今日一更题园列表
    GET_DAILYTEST(state, dailytest) {
        localStorage.setItem('dailytest', JSON.stringify(dailytest));
        state.dailytest = dailytest;
    },
    // 获取今日一更问答列表
    GET_DAILYQUESTION(state, dailyquestion) {
        localStorage.setItem('dailyquestion', JSON.stringify(dailyquestion));
        state.dailyquestion = dailyquestion;
    },
    // 获取今日一更探索列表
    GET_DAILYEXPLORE(state, dailyexplore) {
        localStorage.setItem('dailyexplore', JSON.stringify(dailyexplore));
        state.dailyexplore = dailyexplore;
    },
    // 将当前登录用户的数据保存在localStorage
    SET_TOKEN(state, token) {
        localStorage.setItem('token', JSON.stringify(token));
        state.token = token;
    },
    // 获取用户悦读收藏列表
    GET_READMARKLIST(state, readmarklist) {
        localStorage.setItem('readmarklist', JSON.stringify(readmarklist));
        state.readmarklist = readmarklist;
    },
    // 获取用户视界收藏列表
    GET_VIDEOMARKLIST(state, videomarklist) {
        localStorage.setItem('videomarklist', JSON.stringify(videomarklist));
        state.videomarklist = videomarklist;
    },
    // 获取用户问答收藏列表
    GET_QUESTIONMARKLIST(state, questionmarklist) {
        localStorage.setItem('questionmarklist', JSON.stringify(questionmarklist));
        state.questionmarklist = questionmarklist;
    },
    // 获取用户探索收藏列表
    GET_EXPLOREMARKLIST(state, exploremarklist) {
        localStorage.setItem('exploremarklist', JSON.stringify(exploremarklist));
        state.exploremarklist = exploremarklist;
    },
};

const actions = {
    GET_SLIDELIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getSlideList2').then(response => {
                commit('GET_SLIDELIST', response.data);
                resolve();
            })
        })
    },
    GET_READLIST_1_1({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getReadList1Vol').then(response => {
                commit('GET_READLIST_1_1', response.data);
                resolve();
            })
        })
    },
    GET_READLIST_2_1({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getReadList2Vol').then(response => {
                commit('GET_READLIST_2_1', response.data);
                resolve();
            })
        })
    },
    GET_READLIST_3_1({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getReadList3Vol').then(response => {
                commit('GET_READLIST_3_1', response.data);
                resolve();
            })
        })
    },
    GET_READLIST_4_1({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getReadList4Vol').then(response => {
                commit('GET_READLIST_4_1', response.data);
                resolve();
            })
        })
    },
    GET_READLIST_5_1({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getReadList5Vol').then(response => {
                commit('GET_READLIST_5_1', response.data);
                resolve();
            })
        })
    },
    GET_READLIST_6_1({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getReadList6Vol').then(response => {
                commit('GET_READLIST_6_1', response.data);
                resolve();
            })
        })
    },
    GET_VIDEOLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getVideoList2').then(response => {
                commit('GET_VIDEOLIST', response.data);
                resolve();
            })
        })
    },
    GET_VIDEOLAST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getVideoLast').then(response => {
                commit('GET_VIDEOLAST', response.data);
                resolve();
            })
        })
    },
    GET_EXPLORELIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getExploreList2').then(response => {
                commit('GET_EXPLORELIST', response.data);
                resolve();
            })
        })
    },
    GET_EXPLORELAST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getExploreLast').then(response => {
                commit('GET_EXPLORELAST', response.data);
                resolve();
            })
        })
    },
    GET_QUESTIONLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getQuestionList2').then(response => {
                commit('GET_QUESTIONLIST', response.data);
                resolve();
            })
        })
    },
    GET_QUESTIONLAST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getQuestionLast').then(response => {
                commit('GET_QUESTIONLAST', response.data);
                resolve();
            })
        })
    },
    GET_TESTLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getTestList').then(response => {
                commit('GET_TESTLIST', response.data);
                resolve();
            })
        })
    },
    GET_TESTLAST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getTestLast').then(response => {
                commit('GET_TESTLAST', response.data);
                resolve();
            })
        })
    },
    GET_DAILYREAD({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getDailyRead').then(response => {
                commit('GET_DAILYREAD', response.data);
                resolve();
            })
        })
    },
    GET_DAILYREADTITLE({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getDailyReadTitle').then(response => {
                commit('GET_DAILYREADTITLE', response.data);
                resolve();
            })
        })
    },
    GET_DAILYVIDEO({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getDailyVideo').then(response => {
                commit('GET_DAILYVIDEO', response.data);
                resolve();
            })
        })
    },
    GET_DAILYTEST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getDailyTest').then(response => {
                commit('GET_DAILYTEST', response.data);
                resolve();
            })
        })
    },
    GET_DAILYQUESTION({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getDailyQuestion').then(response => {
                commit('GET_DAILYQUESTION', response.data);
                resolve();
            })
        })
    },
    GET_DAILYEXPLORE({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getDailyExplore').then(response => {
                commit('GET_DAILYEXPLORE', response.data);
                resolve();
            })
        })
    },
    GET_READMARKLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getReadMark').then(response => {
                commit('GET_READMARKLIST', response.data);
                resolve();
            })
        })
    },
    GET_VIDEOMARKLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getVideoMark').then(response => {
                commit('GET_VIDEOMARKLIST', response.data);
                resolve();
            })
        })
    },
    GET_QUESTIONMARKLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getQuestionMark').then(response => {
                commit('GET_QUESTIONMARKLIST', response.data);
                resolve();
            })
        })
    },
    GET_EXPLOREMARKLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getExploreMark').then(response => {
                commit('GET_EXPLOREMARKLIST', response.data);
                resolve();
            })
        })
    },
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
})
