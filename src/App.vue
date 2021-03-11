<template>
  <div
    id="app"
    class="antialiased text-gray-900 flex flex-col min-h-screen bg-gradient-to-b from-gray-200 to-gray-100 justify-between"
  >
    <div class="flex flex-col">
      <header-component class="fixed z-10 w-full"></header-component>
      <div class="flex flex-col items-center pt-40">
        <div class="container pb-32 px-2">
          <user-middleware v-if="$store.state.state.user === null"></user-middleware>
          <router-view v-else></router-view>
        </div>
      </div>
      <switch-study></switch-study>
    </div>
    
    <div class="flex flex-col items-center bg-gradient-to-br from-gray-700 to-gray-900">
        <div class=" border-4 border-indigo-600 cursor-pointer transition-all duration-150 hover:bg-indigo-600 bg-indigo-500 text-white -mt-6 px-6 py-3 rounded-full shadow-lg font-semibold ring-2 ring-indigo-100 hover:ring-4 ring-opacity-75 ring-offset-2 ring-offset-transparent" v-on:click="feedback">
        {{$t('feedback')}}
      </div>
      <div class="container text-center text-gray-600 p-12">
          {{$t('disclaimer')}}
        </div>
    </div>
    <toaster-component></toaster-component>
  </div>
</template>

<script>
import _ from 'lodash';
import HeaderComponent from "./components/header";
import UserMiddleware from './components/middleware/user';
import ToasterComponent from './components/base/toaster';

import SwitchStudy from "./components/context/switch-study";


export default {
  name: "App",
  components: {
    HeaderComponent,
    UserMiddleware,
    SwitchStudy,
    ToasterComponent
  },
  computed: {
    locale: function() { return this.$route.params.locale || 'en'; }
  },
  methods: {
    setLocale() {
      if(!['en', 'fr', 'nl'].includes(this.locale)) {
        this.$router.push({params: {locale: 'en'}});
      }
      this.$root.$i18n.locale = this.locale;
      window.Userback.widget_settings = _.merge({}, window.Userback.widget_settings, {
        language: this.locale
      });
    },
    feedback() {
      window.Userback.custom_data = {
        state: this.$store.state
      };
      window.Userback.open()
    }
  },
  beforeMount() {
    this.setLocale();
  },
  watch: {
    locale: function(n, o) {
      this.setLocale();
    
    }
  },
  i18n: {
    messages: {
      en: {
        disclaimer: 'This app is developed for demonstrational purposes only.  No rights can be derived from this, and the final product may and probably will defer from what is currently being demonstrated.',
        feedback: 'Help us improve and send us your feedback'
      },
      nl: {
        disclaimer: 'Deze app is slechts ontwikkeld voor demonstratieve doeleinden.  Er kunnen geen rechten van worden ontleend, en het finale product kan en zal wellicht afwijken van wat hier wordt getoond. ',
        feedback: 'Help ons te verbeteren, en stuur ons jouw feedback'
      },
      fr: {
        disclaimer: 'Cette application est développée à des fins de démonstration uniquement. Aucun droit ne peut en être dérivé, et le produit final peut et sera probablement différé de ce qui est actuellement démontré.',
        feedback: 'Aidez-nous à nous améliorer et envoyez-nous vos commentaires'
      }
    }
  }
};
</script>

<style>
@import "./styles/style.css";
</style>
