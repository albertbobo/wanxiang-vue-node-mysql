import Vue from 'vue'
import Router from 'vue-router'

// 路由懒加载
const Login = () => import('./views/Login');
const Layout = () => import('./views/Layout');
const Home = () => import('./views/Home');
const User = () => import('./views/User');
const AdminUser = () => import('./views/AdminUser');
const SlideShow = () => import('./views/SlideShow');
const ReadList = () => import('./views/ReadList');
const ReadAdd = () => import('./views/ReadAdd');
const VideoList = () => import('./views/VideoList');
const ExploreList = () => import('./views/ExploreList');
const ExploreAdd = () => import('./views/ExploreAdd');
const QuestionList = () => import('./views/QuestionList');
const QuestionAdd = () => import('./views/QuestionAdd');
const UserAskList = () => import('./views/UserAskList');
const TestList = () => import('./views/TestList');
const TopicList = () => import('./views/TopicList');
const DailyList = () => import('./views/DailyList');
const ReadMark = () => import('./views/ReadMark');
const VideoMark = () => import('./views/VideoMark');
const QuestionMark = () => import('./views/QuestionMark');
const ExploreMark = () => import('./views/ExploreMark');

const Blank = () => import('./components/Blank');
const Blank2 = () => import('./components/Blank2');
const Blank3 = () => import('./components/Blank3');
const Blank4 = () => import('./components/Blank4');
const Blank5 = () => import('./components/Blank5');
const Blank6 = () => import('./components/Blank6');
const Blank7 = () => import('./components/Blank7');
const Blank8 = () => import('./components/Blank8');
const Blank9 = () => import('./components/Blank9');
const Blank10 = () => import('./components/Blank10');
const Blank11 = () => import('./components/Blank11');

// 注册路由
Vue.use(Router);

// 配置路由
const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '/',
        redirect: '/',
        name: 'layout',
        component: Layout,
        children: [{
            path: '/',
            name: 'home',
            component: Home
        }, {
            path: '/user',
            name: 'user',
            component: User
        }, {
            path: '/adminuser',
            name: 'adminuser',
            component: AdminUser
        }, {
            path: '/slideshow',
            name: 'slideshow',
            component: SlideShow
        }, {
            path: '/readlist',
            name: 'readlist',
            component: ReadList
        }, {
            path: '/readadd',
            name: 'readadd',
            component: ReadAdd
        }, {
            path: '/videolist',
            name: 'videolist',
            component: VideoList
        }, {
            path: '/explorelist',
            name: 'explorelist',
            component: ExploreList
        }, {
            path: '/exploreadd',
            name: 'exploreadd',
            component: ExploreAdd
        }, {
            path: '/questionlist',
            name: 'questionlist',
            component: QuestionList
        }, {
            path: '/questionadd',
            name: 'questionadd',
            component: QuestionAdd
        }, {
            path: '/userasklist',
            name: 'userasklist',
            component: UserAskList
        }, {
            path: '/testlist',
            name: 'testlist',
            component: TestList
        }, {
            path: '/topiclist',
            name: 'topiclist',
            component: TopicList
        }, {
            path: '/dailylist',
            name: 'dailylist',
            component: DailyList
        }, {
            path: '/readmark',
            name: 'readmark',
            component: ReadMark
        }, {
            path: '/videomark',
            name: 'videomark',
            component: VideoMark
        }, {
            path: '/questionmark',
            name: 'questionmark',
            component: QuestionMark
        }, {
            path: '/exploremark',
            name: 'exploremark',
            component: ExploreMark
        }, {
            path: '/blank',
            name: 'blank',
            component: Blank
        }, {
            path: '/blank2',
            name: 'blank2',
            component: Blank2
        }, {
            path: '/blank3',
            name: 'blank3',
            component: Blank3
        }, {
            path: '/blank4',
            name: 'blank4',
            component: Blank4
        }, {
            path: '/blank5',
            name: 'blank5',
            component: Blank5
        }, {
            path: '/blank6',
            name: 'blank6',
            component: Blank6
        }, {
            path: '/blank7',
            name: 'blank7',
            component: Blank7
        }, {
            path: '/blank8',
            name: 'blank8',
            component: Blank8
        }, {
            path: '/blank9',
            name: 'blank9',
            component: Blank9
        }, {
            path: '/blank10',
            name: 'blank10',
            component: Blank10
        }, {
            path: '/blank11',
            name: 'blank11',
            component: Blank11
        }]
    }]
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        localStorage.removeItem('token');
    }
    const token = localStorage.getItem('token');
    if (!token && to.path !== '/login') {
        next({path: '/login'});
    } else {
        next();
    }
});

export default router;
