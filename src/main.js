import Vue from "vue";
import './plugins/axios'
import App from "./App.vue";
import router from "./router/Router";
import './assets/font-awesome-4.7.0/css/font-awesome.min.css';
import './assets/css/swiper.min.css'
import store from './store'
Vue.config.productionTip = false;
router.push('/musicmaster');
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
