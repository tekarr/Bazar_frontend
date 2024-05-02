import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import Signup from '../views/signup.vue'
import Login from '../views/login.vue' 
import productdetail from '../views/productdetail.vue'
import cart from '../views/cart.vue'

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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
