import Vue from 'vue'
import VueRouter from 'vue-router'
import worldCupHome from '../views/worldCupHome.vue'
import menuRout from '../views/menuRout'
import scores from '../views/scores'
import forecast from '../views/forecast'
import login from '../views/Login'
import onlinePlay from "../views/onlinePlay";
import worldCupLive from "../views/worldCupLive";
import winners from "../views/winners";
import guide from "../views/guide";
import champ from '../views/champ'

Vue.use(VueRouter)

const worldCupChildren = [
    {path: 'menuRout', name: 'menuRout', component: menuRout},
    {path: 'scores', name: 'scores', component: scores},
    {path: 'forecast', name: 'forecast', component: forecast},
    {path: 'login', name: 'login', component: login},
    {path: 'onlinePlay', name: 'onlinePlay', component: onlinePlay},
    {path: 'worldCupLive', name: 'worldCupLive', component: worldCupLive},
    {path: 'winners', name: 'winners', component: winners},
    {path: 'guide', name: 'guide', component: guide},
    {path: 'champ', name: 'champ', component: champ},
]

const routes = [
    {
        path: '/',
        name: 'worldCupHome',
        component: worldCupHome,
        children: worldCupChildren,
    },
    {
        path: '/worldCupHome',
        name: 'worldCupHome',
        component: worldCupHome,
        children: worldCupChildren,
    },
]

const router = new VueRouter({
    base: process.env.BASE_URL,
    routes
})

export default router
