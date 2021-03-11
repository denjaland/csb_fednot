import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./vuex";
import VueI18n from 'vue-i18n'
import VueIntro from 'vue-introjs';


Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his children
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event);
      }
    };
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  },
});

Vue.use(VueI18n);
Vue.use(VueIntro);

const i18n = new VueI18n({
  availableLocales: ['en', 'nl', 'fr'],
  fallbackLocale: 'en',
});

new Vue({
  router,
  store,
  i18n,
  beforeCreate() {
		this.$store.commit('initialiseStore');
	},
  render: (h) => h(App)
}).$mount("#app");

window.Userback = window.Userback || {};
window.Userback.access_token = '11529|24225|Ah99B5Uaqqihv2PD67AkjDEgB';


