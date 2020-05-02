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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: 'my title', auth: false
    }
  },
  {
    path: '/ships',
    name: 'Ships',
    component: () => import(/* webpackChunkName: "about" */ '../views/Ships.vue')
  },
  {
    path: '/ships/faction',
    name: 'FactionShips',
    component: () => import(/* webpackChunkName: "about" */ '../views/ships/Faction.vue')
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
    path: '/ammo/tech1',
    name: 'T1Ammo',
    component: () => import(/* webpackChunkName: "about" */ '../views/ammo/TechI.vue')
  },
  {
    path: '/ammo/tech2',
    name: 'T2Ammo',
    component: () => import(/* webpackChunkName: "about" */ '../views/ammo/TechII.vue')
  },
  {
    path: '/implants',
    name: 'Implants',
    component: () => import(/* webpackChunkName: "about" */ '../views/Implants.vue')
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
  },
  {
    path: '/modules/faction',
    name: 'FactionModules',
    component: () => import(/* webpackChunkName: "about" */ '../views/modules/Faction.vue')
  },
  {
    path: '/modules/tech1',
    name: 'T1Modules',
    component: () => import(/* webpackChunkName: "about" */ '../views/modules/TechI.vue')
  },
  {
    path: '/modules/tech2',
    name: 'T2sModules',
    component: () => import(/* webpackChunkName: "about" */ '../views/modules/TechII.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
