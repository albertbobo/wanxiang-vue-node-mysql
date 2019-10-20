import Vue from 'vue'
import Router from 'vue-router'

// 路由懒加载
const Layout = () => import('./views/Layout');
const Home = () => import('./views/Home');
const ReadLayout = () => import('./views/ReadLayout');
const Read1 = () => import('./views/Read1');
const Read2 = () => import('./views/Read2');
const Read3 = () => import('./views/Read3');
const Read4 = () => import('./views/Read4');
const Read5 = () => import('./views/Read5');
const Read6 = () => import('./views/Read6');
const Video = () => import('./views/Video');
const Explore = () => import('./views/Explore');
const Question = () => import('./views/Question');
const Test = () => import('./views/Test');
const Register = () => import('./views/Register');
const Login = () => import('./views/Login');
const FindPwd = () => import('./views/FindPwd');
const UserCenter = () => import('./views/UserCenter');
const EditUserInfo = () => import('./views/EditUserInfo');
const EditPwd = () => import('./views/EditPwd');

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    linkExactActiveClass: 'current',
    routes: [
        {
            path: '/',
            redirect: '/',
            name: 'layout',
            component: Layout,
            children: [{
                path: '/',
                name: 'home',
                component: Home,
            }, {
                path: '/read',
                redirect: '/read1',
                name: 'readLayout',
                component: ReadLayout,
                children: [{
                    path: '/read1',
                    name: 'read1',
                    component: Read1,
                }, {
                    path: '/read2',
                    name: 'read2',
                    component: Read2,
                }, {
                    path: '/read3',
                    name: 'read3',
                    component: Read3,
                }, {
                    path: '/read4',
                    name: 'read4',
                    component: Read4,
                }, {
                    path: '/read5',
                    name: 'read5',
                    component: Read5,
                }, {
                    path: '/read6',
                    name: 'read6',
                    component: Read6,
                }]
            }, {
                path: '/video',
                name: 'video',
                component: Video,
            }, {
                path: '/test',
                name: 'test',
                component: Test,
            }, {
                path: '/question',
                name: 'question',
                component: Question,
            }, {
                path: '/explore',
                name: 'explore',
                component: Explore,
            }, {
                path: '/register',
                name: 'register',
                component: Register
            }, {
                path: '/login',
                name: 'login',
                component: Login,
            }, {
                path: '/findpwd',
                name: 'findpwd',
                component: FindPwd,
            }, {
                path: '/me',
                name: 'me',
                meta: {
                    login_required: true
                },
                component: UserCenter
            }, {
                path: '/editme',
                name: 'editme',
                meta: {
                    login_required: true
                },
                component: EditUserInfo
            }, {
                path: '/editpwd',
                name: 'editpwd',
                meta: {
                    login_required: true
                },
                component: EditPwd,
            }]
        },
    ]
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        localStorage.removeItem('token');
    }
    const token = localStorage.getItem('token');

    if (!token && to.matched.some(function (item) {
        return item.meta.login_required;
    })) {
        next('/login');
    } else {
        next();
    }

});

export default router;
