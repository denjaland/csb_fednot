<template>
<div class="relative px-6 py-1 rounded bg-indigo-800" v-if="$store.state.state.user !== null" v-click-outside="close">
  <div class="flex flex-row items-center cursor-pointer" v-if="$store.state.state.user !== null" v-on:click="state.open = !state.open">
  <div class="flex flex-col justify-right mr-4 " >
    <div class="text-indigo-200 text-right hidden lg:block">{{$t('welcome')}},</div>
    <div class="text-right" >{{$store.state.state.user.first_name}} {{$store.state.state.user.last_name}}</div>
  </div>
  <div>
    <img
      :src="'https://www.gravatar.com/avatar/' + $store.state.state.user.hash + '?d=monsterid&f=y'"
      class="rounded-full w-6 h-6 lg:w-10 lg:h-10"
    />
  </div>
  </div>

  <div class="z-10 absolute right-0 bg-white rounded shadow overflow-hidden text-indigo-600 transform transition-all duration-150 ease-in-out origin-top-right" 
    :class="{
      'scale-0': !state.open || $store.state.state.user === null,
      'scale-100': state.open && $store.state.state.user !== null
    }">
      <div class="hover:bg-gray-100 hover:text-red-600 py-2 px-4 cursor-pointer font-semibold" v-on:click="$store.commit('state_user', null)">{{$t('logout')}}</div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      state: {
        open: false
      }
    }
  },
  methods: {
    close: function() {
      this.state.open = false;
    }
  },
  i18n: {
    messages: {
      en: {
        welcome: 'Welcome',
        logout: 'Log out'
      },
      nl: {
        welcome: 'Welkom',
        logout: 'Afmelden'
      },
      fr: {
        welcome: 'Bienvenue',
        logout: 'se déconnecter'
      }
    }
  }
}
</script>
