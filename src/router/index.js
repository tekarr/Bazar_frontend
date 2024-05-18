import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/customer/HomeView.vue'
import AboutView from '../views/customer/AboutView.vue'
import Signup from '../views/customer/signup.vue'
import Login from '../views/customer/login.vue' 
import productdetail from '../views/customer/productdetail'
import checkout from '../views/customer/checkout.vue'
import cart from '@/views/customer/cart.vue'
import trackorder from '@/views/customer/trackorder.vue'
import orderhistory from '@/views/customer/orderhistory.vue'
import dashboard from '../views/admin/dashboard.vue'
import notification from '@/views/admin/notification.vue'
import users from '@/views/admin/users.vue'
import stores from '@/views/admin/stores.vue'
import orders from '@/views/admin/orders.vue'
import profile from '@/views/admin/profile.vue'
import Add from '@/components/admin/Add.vue'
import edit from '@/components/admin/edit.vue'
import addStore from '@/components/admin/add-store.vue'
import editStore from '@/components/admin/edit-store.vue'

const routes = [
  
  //customer routes --------------------------------------
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
  },
  {
    path: '/orderhistory',
    name: 'orderhistory',
    component: orderhistory
  },


  //admin routes --------------------------------------
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    name: 'Admin',
  },
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: dashboard
  },
  {
    path: '/admin/notification',
    name: 'Notification',
    component: notification
  },
  {
    path: '/admin/notification',
    name: 'Notification',
    component: notification
  },
  {
    path: '/admin/users',
    name: 'Users',
    component: users
  },
  {
    path: '/admin/users/add',
    name: 'Add User',
    component: Add
  },
  {
    path: '/admin/users/edit',
    name: 'Edit User',
    component: edit
  },
  {
    path: '/admin/stores',
    name: 'Stores',
    component: stores
  },
  {
    path: '/admin/store/add',
    name: 'Add Store',
    component: addStore
  },
  {
    path: '/admin/store/edit',
    name: 'Edit Store',
    component: editStore
  },
  {
    path: '/admin/orders',
    name: 'Orders',
    component: orders
  },
  {
    path: '/admin/profile',
    name: 'Profile',
    component: profile
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
