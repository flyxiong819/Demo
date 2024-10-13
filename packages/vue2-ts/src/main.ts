import Vue from 'vue';
import Router from 'vue-router';
import routerInfo from './router';
import App from './App.vue';
import VueCompositionAPI from '@vue/composition-api';


// 组合式API
Vue.use(VueCompositionAPI);

// 处理路由信息
Vue.use(Router);
const router = new Router(routerInfo);

router.beforeEach((to, from, next) => {
  // 离开当前页面时，隐藏弹框和toast
  next();
});

Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  render: h => h(App),
}).$mount('#app');
