import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// 注册vuex
Vue.use(Vuex);

// 状态
const state = {
    token: JSON.parse(localStorage.getItem('token')),
    adminlist: JSON.parse(localStorage.getItem('adminlist')),
    slidelist: JSON.parse(localStorage.getItem('slidelist')),
    readlist: JSON.parse(localStorage.getItem('readlist')),
    videolist: JSON.parse(localStorage.getItem('videolist')),
    explorelist: JSON.parse(localStorage.getItem('explorelist')),
    questionlist: JSON.parse(localStorage.getItem('questionlist')),
    userasklist: JSON.parse(localStorage.getItem('userasklist')),
    testlist: JSON.parse(localStorage.getItem('testlist')),
    topiclist: JSON.parse(localStorage.getItem('topiclist')),
    dailylist: JSON.parse(localStorage.getItem('dailylist')),
    userlist: JSON.parse(localStorage.getItem('userlist')),
    readmarklist: JSON.parse(localStorage.getItem('readmarklist')),
    videomarklist: JSON.parse(localStorage.getItem('videomarklist')),
    questionmarklist: JSON.parse(localStorage.getItem('questionmarklist')),
    exploremarklist: JSON.parse(localStorage.getItem('exploremarklist')),
};

// mutations主要用来操作state
const mutations = {
    // 将当前登录用户的数据保存在localStorage
    SET_TOKEN(state, token) {
        localStorage.setItem('token', JSON.stringify(token));
        state.token = token;
    },
    // 获取全局的管理员用户数据
    GET_ADMINLIST(state, adminlist) {
        localStorage.setItem('adminlist', JSON.stringify(adminlist));
        state.adminlist = adminlist;
    },
    // 获取SLIDESHOW列表数据
    GET_SLIDELIST(state, slidelist) {
        localStorage.setItem('slidelist', JSON.stringify(slidelist));
        state.slidelist = slidelist;
    },
    // 获取悦读列表数据
    GET_READLIST(state, readlist) {
        localStorage.setItem('readlist', JSON.stringify(readlist));
        state.readlist = readlist;
    },
    // 获取视界列表数据
    GET_VIDEOLIST(state, videolist) {
        localStorage.setItem('videolist', JSON.stringify(videolist));
        state.videolist = videolist;
    },
    // 获取探索列表数据
    GET_EXPLORELIST(state, explorelist) {
        localStorage.setItem('explorelist', JSON.stringify(explorelist));
        state.explorelist = explorelist;
    },
    // 获取问答列表数据
    GET_QUESTIONLIST(state, questionlist) {
        localStorage.setItem('questionlist', JSON.stringify(questionlist));
        state.questionlist = questionlist;
    },
    // 获取用户提问列表数据
    GET_USERASKLIST(state, userasklist) {
        localStorage.setItem('userasklist', JSON.stringify(userasklist));
        state.userasklist = userasklist;
    },
    // 获取题园列表数据
    GET_TESTLIST(state, testlist) {
        localStorage.setItem('testlist', JSON.stringify(testlist));
        state.testlist = testlist;
    },
    // 获取测试题目列表数据
    GET_TOPICLIST(state, topiclist) {
        localStorage.setItem('topiclist', JSON.stringify(topiclist));
        state.topiclist = topiclist;
    },
    // 获取今日一更列表数据
    GET_DAILYLIST(state, dailylist) {
        localStorage.setItem('dailylist', JSON.stringify(dailylist));
        state.dailylist = dailylist;
    },
    // 获取全局的注册用户数据
    GET_USERLIST(state, userlist) {
        localStorage.setItem('userlist', JSON.stringify(userlist));
        state.userlist = userlist;
    },
    // 获取所有悦读收藏列表数据
    GET_READMARKLIST(state, readmarklist) {
        localStorage.setItem('readmarklist', JSON.stringify(readmarklist));
        state.readmarklist = readmarklist;
    },
    // 获取所有视界收藏列表数据
    GET_VIDEOMARKLIST(state, videomarklist) {
        localStorage.setItem('videomarklist', JSON.stringify(videomarklist));
        state.videomarklist = videomarklist;
    },
    // 获取所有问答收藏列表数据
    GET_QUESTIONMARKLIST(state, questionmarklist) {
        localStorage.setItem('questionmarklist', JSON.stringify(questionmarklist));
        state.questionmarklist = questionmarklist;
    },
    // 获取所有探索收藏列表数据
    GET_EXPLOREMARKLIST(state, exploremarklist) {
        localStorage.setItem('exploremarklist', JSON.stringify(exploremarklist));
        state.exploremarklist = exploremarklist;
    },
};

// 定义actions，异步的，主要是提交mutations，用来操作改变状态
const actions = {
    GET_ADMINLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getAdminList').then(response => {
                commit('GET_ADMINLIST', response.data);
                resolve();
            })
        })
    },
    GET_SLIDELIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getSlideList').then(response => {
                commit('GET_SLIDELIST', response.data);
                resolve();
            })
        })
    },
    GET_READLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getReadList').then(response => {
                commit('GET_READLIST', response.data);
                resolve();
            })
        })
    },
    GET_VIDEOLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getVideoList').then(response => {
                commit('GET_VIDEOLIST', response.data);
                resolve();
            })
        })
    },
    GET_EXPLORELIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getExploreList').then(response => {
                commit('GET_EXPLORELIST', response.data);
                resolve();
            })
        })
    },
    GET_QUESTIONLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getQuestionList').then(response => {
                commit('GET_QUESTIONLIST', response.data);
                resolve();
            })
        })
    },
    GET_USERASKLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getUserAskList').then(response => {
                commit('GET_USERASKLIST', response.data);
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
    GET_TOPICLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getTopicList').then(response => {
                commit('GET_TOPICLIST', response.data);
                resolve();
            })
        })
    },
    GET_DAILYLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getDailyList').then(response => {
                commit('GET_DAILYLIST', response.data);
                resolve();
            })
        })
    },
    GET_USERLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getUserList').then(response => {
                commit('GET_USERLIST', response.data);
                resolve();
            })
        })
    },
    GET_READMARKLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getReadMarkAll').then(response => {
                commit('GET_READMARKLIST', response.data);
                resolve();
            })
        })
    },
    GET_VIDEOMARKLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getVideoMarkAll').then(response => {
                commit('GET_VIDEOMARKLIST', response.data);
                resolve();
            })
        })
    },
    GET_QUESTIONMARKLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getQuestionMarkAll').then(response => {
                commit('GET_QUESTIONMARKLIST', response.data);
                resolve();
            })
        })
    },
    GET_EXPLOREMARKLIST({commit}) {
        return new Promise((resolve) => {
            axios.get('/api/getExploreMarkAll').then(response => {
                commit('GET_EXPLOREMARKLIST', response.data);
                resolve();
            })
        })
    },
};

export default new Vuex.Store({
    state,
    mutations,
    actions
})
