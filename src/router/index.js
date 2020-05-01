import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
    {
      path: '/ships',
      name: 'Ships',
      component: () => import(/* webpackChunkName: "about" */ '../views/Ships.vue')
    },
    {
      path: '/ships/tech1',
      name: 'T1Ships',
      component: () => import(/* webpackChunkName: "about" */ '../views/ships/TechI.vue')
    },
    {
      path: '/ships/tech2',
      name: 'T2Ships',
      component: () => import(/* webpackChunkName: "about" */ '../views/ships/TechII.vue')
    },
    {
      path: '/ships/tech3',
      name: 'T3Ships',
      component: () => import(/* webpackChunkName: "about" */ '../views/ships/TechIII.vue')
    },
    {
      path: '/ammo',
      name: 'Ammo',
      component: () => import(/* webpackChunkName: "about" */ '../views/Ammo.vue')
    },
    {
      path: '/reactions',
      name: 'ReactionsRoot',
      component: () => import(/* webpackChunkName: "about" */ '../views/Reactions.vue')
    },
    {
      path: '/reactions/alchemy',
      name: 'Alchemy',
      component: () => import(/* webpackChunkName: "about" */ '../views/reactions/Alchemy.vue')
    },
    {
      path: '/reactions/fuel',
      name: 'Fuel',
      component: () => import(/* webpackChunkName: "about" */ '../views/reactions/Fuel.vue')
    },
    {
      path: '/reactions/reactions',
      name: 'Reactions',
      component: () => import(/* webpackChunkName: "about" */ '../views/reactions/Reactions.vue')
    },
    {
      path: '/modules',
      name: 'Modules',
      component: () => import(/* webpackChunkName: "about" */ '../views/Modules.vue')
    }
]

const router = new VueRouter({
  routes
})

export default router
