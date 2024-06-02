import { createRouter, createWebHistory } from 'vue-router'

// customer imports ------------------------------------------------
import HomeView from '../views/customer/HomeView.vue'
import AboutView from '../views/customer/AboutView.vue'
import Signup from '../views/customer/signup.vue'
import Login from '../views/customer/login.vue' 
import productdetail from '../views/customer/productdetail'
import checkout from '../views/customer/checkout.vue'
import cart from '@/views/customer/cart.vue'
import trackorder from '@/views/customer/trackorder.vue'
import orderhistory from '@/views/customer/orderhistory.vue'

// admin imports ------------------------------------------------
import AdminLayout from "../views/admin/adminLayout.vue";
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

// vendor imports ------------------------------------------------
import vendorLayout from '@/views/vendor/vendorLayout.vue'
import vdashboard from '@/views/vendor/vdashboard.vue'
import vstore from '@/views/vendor/vstore.vue'
import vproducts from '@/views/vendor/vproducts.vue'
import vorders from '@/views/vendor/vorders.vue'
import vnotification from '@/views/vendor/vnotification.vue'
import vprofile from '@/views/vendor/vprofile.vue'
import Addproduct from '@/components/vendor/Addproduct.vue'
import store from "@/store";


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
    component: Signup,

  },
  {
    path: '/login',
    name: 'login',
    component: Login,

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
    component:  AdminLayout,
    requireAuth: true,
    role: ['admin'],
    children: [
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
  },


  //vendor routes --------------------------------------
  {
    path: '/vendor',
    redirect: '/vendor/dashboard',
    name: 'vendor',
    component:  vendorLayout,
    requireAuth: true,
    role: ['vendor'],
    children: [
      {
        path: '/vendor/dashboard',
        name: 'Dashboard ',
        component: vdashboard
      },
      {
        path: '/vendor/notification',
        name: 'Notification ',
        component: vnotification
      },
      {
        path: '/vendor/products',
        name: 'Products',
        component: vproducts
      },
      {
        path: '/vendor/products/add',
        name: 'Add Product',
        component: Addproduct
      },
      {
        path: '/vendor/store',
        name: 'Store',
        component: vstore
      },
      {
        path: '/vendor/orders',
        name: 'Orders ',
        component: vorders
      },
      {
        path: '/vendor/profile',
        name: 'Profile ',
        component: vprofile
      },
    ]
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requireAuth)){
        if(!store.getters['auth/authenticated']){
        next({
            name: 'login',
            query: {redirect: to.fullPath}
        })
        }else{
        let user = store.getters['auth/user']
        if(to.matched.some(record => record.meta.role)){
            if(to.meta.role.includes(user.role)){
            next()
            }else{
            next({name: 'home'})
            }
        }else{
            next()
        }
        }
    }else{
        next()
    }
})


export default router
