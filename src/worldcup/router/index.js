import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import worldCupHome from '../views/worldCupHome.vue'
import chat from '../views/chat'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'worldCupHome',
    component: worldCupHome,
    children: [{path: 'Pm', name: 'worldCupHome.Pm', component: chat}],
  },

  {
    path: '/worldCupHome',
    name: 'worldCupHome',
    component: worldCupHome,
    children: [{path: 'Pm', name: 'worldCupHome.Pm', component: chat}],
  },


  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
