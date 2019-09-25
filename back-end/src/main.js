import Vue from 'vue'
import ElementUI from 'element-ui';     // 引入element-ui
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'               // 引入axios
import '@/assets/css/reset.css'         // 引入公共样式

Vue.prototype.axios = axios;            // 将axios挂载到prototype上，在组件中可以直接使用this.axios访问

Vue.use(ElementUI);                     // 注册element-ui

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
