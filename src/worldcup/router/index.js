import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import worldCupHome from '../views/worldCupHome.vue'
import chat from '../views/chat'
import menuRout from '../views/menuRout'
import scores from '../views/scores'
import forecast from '../views/forecast'
import login from '../views/Login'
import onlinePlay from "../views/onlinePlay";
import winners from "../views/winners";
import guide from "../views/guide";
import champ from '../views/champ'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'worldCupHome',
        component: worldCupHome,
        children: [
            {path: 'Pm', name: 'Pm', component: chat},
            {path: 'menuRout', name: 'menuRout', component: menuRout},
            {path: 'scores', name: 'scores', component: scores},
            {path: 'forecast', name: 'forecast', component: forecast},
            {path: 'login', name: 'login', component: login},
            {path: 'onlinePlay', name: 'onlinePlay', component: onlinePlay},
            {path: 'winners', name: 'winners', component: winners},
            {path: 'guide', name: 'guide', component: guide},
            {path: 'champ', name: 'champ', component: champ},

        ],
    },

    {
        path: '/worldCupHome',
        name: 'worldCupHome',
        component: worldCupHome,
        children: [
            {path: 'Pm', name: 'Pm', component: chat},
            {path: 'menuRout', name: 'menuRout', component: menuRout},
            {path: 'scores', name: 'scores', component: scores},
            {path: 'forecast', name: 'forecast', component: forecast},
            {path: 'login', name: 'login', component: login},
            {path: 'onlinePlay', name: 'onlinePlay', component: onlinePlay},
            {path: 'winners', name: 'winners', component: winners},
            {path: 'guide', name: 'guide', component: guide},
            {path: 'champ', name: 'champ', component: champ},

        ],
    },


    // {
    //   path: '/',
    //   name: 'Home',
    //   component: Home
    // },
    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router
