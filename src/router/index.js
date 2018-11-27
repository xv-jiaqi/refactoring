import Vue from 'vue';
import Router from 'vue-router';
import * as types from '@/store/types/account-types';
import store from '@/store';

Vue.use(Router);

const routes = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: () => import('@/views/'),
    children: [{
      path: '/home',
      name: 'home',
      component: () => import('@/views/home/home.vue'),
    },
    {
      path: '/about-need-auth',
      name: 'about-need-auth',
      meta: {
        auth: 'about-need-auth',
      },
      component: () => import('@/views/home/home.vue'),
    }],
    redirect: () => 'login',
  }, {
    path: '/login',
    name: 'login',
    component: () => import('@/views/account/login.vue'),
  }],
});

routes.beforeEach((to, from, next) => {
  if (to.meta.auth) { // 判断是否有路由权限, 防止用户直接输入没有权限的页面url
    const authInfo = JSON.parse(localStorage.authInfo || '{}');
    if (!authInfo[to.meta.auth]) {
      console.log('没有该路由的权限');
      store.dispatch(types.LOGOUT_REQUEST);
      routes.replace({
        name: 'login',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default routes;