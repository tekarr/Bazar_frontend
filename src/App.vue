<template>
  <div>
    
  </div>
  <nav v-show="false">
    <router-link to="/">Shop</router-link><br>
    <router-link to="/about">About</router-link>
  </nav>
  <router-view></router-view>
</template>


<script>
import Navbarr from './components/Navbarr.vue';
import AboutView from './views/AboutView.vue';
import HomeView from './views/HomeView.vue';

export default {
  components: {
    Navbarr,
    HomeView,
    AboutView
  },
data() {
    return {
    };
},
methods: {
}
};
</script>




<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 20px;
  position: absolute;
  right: 1%;
  top: 11%;
  background: rgb(52, 52, 52);
  border-radius: 20px;
}

nav a {
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
  line-height: 30px;
  transition: all 200ms ease-in-out;
}
nav a:hover{
  border-bottom: 2px solid #ffffff;
}

nav a.router-link-exact-active {
  color: #e60e5e;
}


</style>
