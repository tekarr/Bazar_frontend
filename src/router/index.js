import { createRouter, createWebHistory } from 'vue-router'
import { hasRole } from './permissions';

// customer imports ------------------------------------------------
import HomeView from '../views/customer/HomeView.vue'
import AboutView from '../views/customer/AboutView.vue'
import Signup from '../views/customer/signup.vue'
import signin from '../views/customer/signin.vue'
import Signup2 from '@/views/customer/Signup2.vue';
import Login2 from '@/views/customer/Login2.vue';
import productpage from '../views/customer/productpage.vue'
import cart from '@/views/customer/cart.vue'
import trackorder from '@/views/customer/trackorder.vue'
import ordersc from '@/views/customer/ordersc.vue'
import cprofile from '@/views/customer/profile.vue'
import becomevendor from '@/views/customer/becomevendor.vue'
import Customerlayout from '@/views/customer/customerlayout.vue';
import StorePage from '@/views/customer/storepage.vue';
import thanks from '@/views/customer/thanks.vue'
import Reset from '@/views/customer/reset.vue';
import Orderview from '@/views/customer/orderview.vue';
import Notifications from '@/views/customer/notifications.vue';

// admin imports ------------------------------------------------
import AdminLayout from "../views/admin/adminLayout.vue";
import dashboard from '../views/admin/dashboard.vue'
import notification from '@/views/admin/notification.vue'
import users from '@/views/admin/users.vue'
import stores from '@/views/admin/stores.vue'
import orders from '@/views/admin/orders.vue'
import profile from '@/views/admin/profile.vue'
import Add from '@/components/admin/Add.vue'
import EditUser from '@/components/admin/edit-user.vue';
import addStore from '@/components/admin/add-store.vue'
import editStore from '@/components/admin/edit-store.vue'
import Products from '@/views/admin/products.vue';
import Orderedit from '@/views/admin/orderedit.vue';
import Invoices from '@/views/admin/invoices.vue';

// vendor imports ------------------------------------------------
import vendorLayout from '@/views/vendor/vendorLayout.vue'
import vdashboard from '@/views/vendor/vdashboard.vue'
import vstore from '@/views/vendor/vstore.vue'
import vproducts from '@/views/vendor/vproducts.vue'
import vorders from '@/views/vendor/vorders.vue'
import vnotification from '@/views/vendor/vnotification.vue'
import vprofile from '@/views/vendor/vprofile.vue'
import Addproduct from '@/components/vendor/Addproduct.vue'
import Editproduct from '@/components/vendor/Editproduct.vue'
import store from "@/store";
import Vieworder from '@/views/vendor/vieworder.vue';
import Editproduct2 from '@/components/admin/editproduct2.vue';















const routes = [

   //customer routes --------------------------------------
  {
    path: '/',
    redirect: '/',
    name: 'public',
    component:  Customerlayout,
    //role: ['customer'],
    //requiresAuth: true,
    // beforeEnter: hasRole([0]),
    children: [
        {
          path: '/',
          name: 'home',
          component: HomeView
        },
        {
          path: '/store/:id', // Define a route parameter
          name: 'StorePage',
          component: StorePage
        },
        {
          path: '/about',
          name: 'about',
          component: AboutView
        },
        {
          path: '/signup',
          name: 'Signup2',
          component: Signup2,

        },
        {
          path: '/signin',
          name: 'Login2',
          component: Login2,

        },
        {
          path: '/product/:id',
          name: 'productpage',
          component: productpage
        },
        {
          path: '/cart',
          name: 'cart',
          component: cart
        },
        {
          path: '/thanks',
          name: 'thanks',
          component: thanks
        },
      ]
    },
    {
      path: '/reset-password',
      component: Reset,
      props: true
    },
  //customer routes --------------------------------------
  {
  path: '/customer',
  redirect: '/customer/profile',
  name: 'shop',
  component:  Customerlayout,
  role: ['customer'],
  //requiresAuth: true,
  beforeEnter: hasRole([3]),
  children: [
      {
        path: '/customer/checkout',
        name: 'checkout',
        component: cart
      },
      {
        path: '/customer/orders',
        name: 'orders',
        component: ordersc
      },
      {
        path: '/customer/orders/track/:id',
        name: 'trackorder',
        component: trackorder
      },
      {
        path: '/customer/order/view/:id',
        name: 'orderview',
        component: Orderview
      },
      {
        path: '/customer/profile',
        name: 'profile',
        component: cprofile
      },
      {
        path: '/customer/notifications',
        name: 'notifications',
        component: Notifications
      },
      {
        path: '/customer/becomevendor',
        name: 'becomevendor',
        component: becomevendor
      },
    ]
  },


  //admin routes --------------------------------------
  {
    path: '/admin',
    redirect: '/admin/dashboard',
    name: 'Admin',
    component:  AdminLayout,
    role: ['admin'],
    meta: { requiresAuth: true, requiresAdmin: true },
    beforeEnter: hasRole([1]),
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
        name: 'AddUser',
        component: Add
      },
      {
        path: '/admin/users/edit/:id',
        name: 'EditUser',
        component: EditUser
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
        path: '/admin/store/edit/:id',
        name: 'EditStore',
        component: editStore
      },
      {
        path: '/admin/products',
        name: 'products',
        component: Products
      },
      {
        path: '/admin/edit-product/:id',
        name: 'EditProduct ',
        component: Editproduct2,
        props: true,
      },
      {
        path: '/admin/orders',
        name: 'Orders',
        component: orders
      },
      {
        path: '/admin/orders/:id',
        name: 'Update Order',
        component: Orderedit
      },
      {
        path: '/admin/orders/:id/invoices',
        name: 'invoices',
        component: Invoices
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
    beforeEnter: hasRole([2]),
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
        path: '/vendor/edit-product/:id',
        name: 'EditProduct',
        component: Editproduct,
        props: true,
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
        path: '/vendor/order/:id',
        name: 'view order',
        component: Vieworder
      },
      {
        path: '/vendor/profile',
        name: 'Profile ',
        component: vprofile
      },
    ]
  },


  {name:'Error', path: '/error',  component: () => import('@/views/Error.vue')},

  { path: '/:pathMatch  (.*)*', name: 'not-found', component: () => import('@/views/Error.vue')}
    ]


;


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})



export default router
