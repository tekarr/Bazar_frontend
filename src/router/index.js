import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Signup from '../views/signup.vue'
import Login from '../views/login.vue' 
import productdetail from '../views/productdetail'
import checkout from '../views/checkout.vue'
import cart from '@/views/cart.vue'
import trackorder from '@/views/trackorder.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/product/:id',
    name: 'productdetail',
    component: productdetail
  },
  {
    path: '/cart',
    name: 'cart',
    component: cart
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: checkout
  },
  {
    path: '/trackorder',
    name: 'trackorder',
    component: trackorder
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
