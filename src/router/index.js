import Vue from 'vue'
import VueRouter from 'vue-router'
import DefaultLayout from '../layouts/Default.vue'
//import Home from '../views/Home.vue'
import Encyclopedia from '../views/Encyclopedia.vue'
import Community from '../views/Community.vue'
import Videoplay from '../views/Videoplay.vue'
import Shopmall from '../views/Shopmall.vue'
import AdminManager from '../views/AdminManager.vue'
//import Home from '../views/Home.vue'
//import About from '../views/About.vue'
import test from '../views/test.vue'

//狗狗管理员界面
import DogManager from '../views/adminmanager/dogManager/dogManager.vue'
import ArticeManager from '../views/adminmanager/articeManager/articeManager.vue'
import GoodManager from '../views/adminmanager/shopManager/GoodManager.vue'
import OrderManager from '../views/adminmanager/shopManager/OrderManager.vue'
import UserManager from '../views/adminmanager/userManager/userManager.vue'

//import home from './home.js'
import encyclopedia from './encyclopedia.js'
import community from './community.js'
import videoplay from './videoplay.js'
import shopmall from './shopmall.js'


//狗狗管理员子路由js
import articeManager from './articlManager.js'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        /* name: 'DefaultLayout', */
        component: DefaultLayout,
        children: [{
                path: '',
                redirect: '/encyclopedia/index'
                    /* component:Home  */
            },
            {
                path: '/encyclopedia',
                component: Encyclopedia,
                children: encyclopedia
            },
            {
                path: '/community',
                component: Community,
                children: community
            },
            {
                path: '/videoplay',
                component: Videoplay,
                children: videoplay
            },
            {
                path: '/shopmall',
                component: Shopmall,
                children: shopmall
            },
            {
                path: '/test',
                component: test
            }
        ]
    },
    {
        path: '/adminManager',
        name: 'adminManager',
        component: AdminManager,
        children: [{
                path: 'dogManager',
                component: DogManager
            },
            {
                path: 'articeManager',
                component: ArticeManager,
                children: articeManager
            },
            {
                path: 'goodManager',
                component: GoodManager
            },
            {
                path: 'orderManager',
                component: OrderManager
            },
            {
                path: 'userManager',
                component: UserManager
            }

        ]
    }

    //{
    // path: '/about',
    //  name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    //  component:About
    //}
]

const router = new VueRouter({
    routes
})

export default router