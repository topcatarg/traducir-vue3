// import store from './store';
import store from '@/Store/MainStore';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import Vue from 'vue';
import App from './App.vue';
import './assets/animate.css';
import './registerServiceWorker';
import router from './router';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
