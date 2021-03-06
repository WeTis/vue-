import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import axios from 'axios';
import qs from 'qs';
import VueRouter from 'vue-router'
import VueIconfont from 'vue-iconfont'
// 路由引入的
import login from './components/login';
import index from './components/index';
import adminList from './components/internal/adminList';
import addAdmin from './components/internal/addAdmin';
import articleList from './components/internal/articleList';
import addArticle from './components/internal/addArticle';

import './font/iconfont.css';

import {Base} from './api/base.js';
const base = new Base();

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$qs = qs;
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueIconfont);

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'adminList',
          component: adminList
        },
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'addAdmin',
          component: addAdmin
        },
        {
          path: "articleList",
          component: articleList
        },
        {
          path: "addArticle",
          component: addArticle,
          name: "addArticle"
        }
      ]
    }
  ]
})
new Vue({
  render: h => h(App),
  router,
  created(){
    
    this.isLogined();
  },
  methods: {
    isLogined(){
      let param = {
        method: 'POST',
        url: 'islogined.php'
      };
      base.request(param)
       .then((res) => {
         console.log(res);
         if(res.data.status == 90000){
            this.$router.push('/index');
          }else{
            this.$router.push('/login');
          }
       })
      // this.$http({
      //   method: 'POST',
      //   url: 'lib/islogined.php',
      // }).then((res) => {
      //   
      //   if(res.data.status == 90000){
      //     this.$router.push('/index');
      //   }else{
      //     this.$router.push('/login');
      //   }
      // })
    }
  },
}).$mount('#app')
