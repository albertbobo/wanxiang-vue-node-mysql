import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

Vue.prototype.axios = axios;

import '@/assets/css/font-awesome.css'
import '@/assets/css/reset.css'
import '@/assets/css/global.css'

import $ from 'jquery'

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: function (h) {
        return h(App)
    }
}).$mount('#app');
