<template>
  <div class="flex flex-col mb-8 shadow-lg">
    <div
      class="flex flex-col items-center py-3 bg-gradient-to-r from-indigo-900 to-indigo-700"
    >
      <div class="container px-2 flex flex-row items-center justify-between">
      <div class="text-2xl lg:text-3xl text-white ">
        
          <div class="flex flex-row items-center">
            <router-link :to="'/' + $route.params.locale">
              <div class="flex flex-row items-center">
                <icon-logo class="w-8 h-8 lg:w-12 lg:h-12 lg:mr-4 text-indigo-300"></icon-logo>
                <div class="hidden lg:block">FEDNOT</div>
              </div>
            </router-link>
            <product-switcher class="ml-4 lg:ml-8"></product-switcher>
          </div>

      </div>
      <div class=" text-white">
        <div class="flex flex-row items-center">
          <header-messages class="mr-4 lg:mr-8"></header-messages>
          <div class="flex flex-col lg:flex-row">
            <header-study class="mb-2 lg:mb-0 lg:mr-8"></header-study>
            <header-user class="lg:mr-8"></header-user>
          </div>
          <language-switcher></language-switcher>
        </div>
      </div>
      </div>
    </div>
    <div
      class="flex flex-col items-center  bg-indigo-800 shadow-xl text-indigo-300"
    >
    <div class="flex flex-row items-center justify-between container px-2">
    <menu-component></menu-component>
    <div class="flex flex-row items-center">
      <test-data-component></test-data-component>
      <settings-component class="ml-6"></settings-component>
      <email-component class="ml-6"></email-component>
    </div>
    </div>
    </div>
  </div>
</template>
<script>

import TestDataComponent from './header/testdata';
import SettingsComponent from './header/settings';
import LanguageSwitcher from './header/language-switcher';
import EmailComponent from './header/email';
import ProductSwitcher from './header/product-switcher';
import MenuComponent from './header/menu';
import HeaderMessages from './header/messages';
import IconLogo from './icons/logo';


import HeaderStudy from './header/study';
import HeaderUser from './header/user';


export default {
  components: {
    IconLogo,
    TestDataComponent,
    EmailComponent,
    SettingsComponent,
    LanguageSwitcher,
    HeaderStudy,
    HeaderUser,
    ProductSwitcher,
    MenuComponent,
    HeaderMessages
  },

  

  i18n: {
    messages: {
      en: {
        welcome: 'Welcome',
        my_registrations: 'My Registrations',
        consultation: 'My Consultations',
      },
      nl: {
        welcome: 'Welkom',
        my_registrations: 'Mijn inschrijvingen',
        consultation: 'Mijn Consultaties',
      },
      fr: {
        welcome: 'Bienvenue',
        my_registrations: 'Mes inscriptions',
        consultation: 'Mes Consultations',
      }
    }
  }
}

</script>