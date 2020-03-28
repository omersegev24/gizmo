import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '../views/home.vue'
import aboutPage from '../views/about.vue'
import editorPage from '../views/editor.vue'
import templatePage from '../views/template.vue'
import website from '../views/website.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: homePage
  },
  {
    path: '/about',
    name: 'About',
    component: aboutPage
  },
  {
    path: '/editor/:id',
    name: 'Editor',
    component: editorPage
  },
  {
    path: '/template',
    name: 'Template',
    component: templatePage
  },
  {
    path: '/website/:id',
    name: 'Website',
    component: website
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
