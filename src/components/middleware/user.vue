<template>
  

  <div>
     <div class="flex flex-col mb-4">
       <div class="flex flex-row items-center justify-between">

        <h1 class="text-2xl text-indigo-800 font-semibold">
          {{$t('title')}}
        </h1>
<div
                    class="flex flex-row items-center border focus-within:border-indigo-800 rounded bg-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.1"
                      xmlns:xlink="http://www.w3.org/1999/xlink"
                      xmlns:svgjs="http://svgjs.com/svgjs"
                      viewBox="0 0 140 140"
                      class="w-4 h-4 mx-2 stroke-current"
                    >
                      <g
                        transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)"
                      >
                        <path
                          d="M0.750 9.812 A9.063 9.063 0 1 0 18.876 9.812 A9.063 9.063 0 1 0 0.750 9.812 Z"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          transform="translate(-3.056 4.62) rotate(-23.025)"
                        ></path>
                        <path
                          d="M16.221 16.22L23.25 23.25"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                        ></path>
                      </g>
                    </svg>
                    <input
                      type="text"
                      v-model="filters.search"
                      class="px-3 py-1 rounded outline-none w-96"
                      :placeholder="$t('search_ph')"
                    />
                  </div>

</div>
      <div class="text-gray-500">

        <div v-if="$i18n.locale === 'nl'">
          Vooraleer je de magie kan ontdekken, kies een gebruikersprofiel.
        </div>
        <div v-else-if="$i18n.locale === 'fr'">
          Avant de découvrir la magie, veuillez sélectionner l'utilisateur.
        </div>
        <div v-else>
          Before you can discover the magic, please select a user.
        </div>

      </div>
    </div>
    
      <ul class="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        <li v-on:click="select(u)" class="cursor-pointer col-span-1 bg-gradient-to-br from-white to-gray-100 hover:from-indigo-600 hover:to-indigo-700 hover:text-white transition-all rounded shadow flex flex-row items-center text-xs p-4 text-gray-600" v-for="u in users" :key="u.id">
          <div class="flex flex-col items-center py-2 px-4 mb-2"><img class="w-10 h-10 rounded-full border-2 border-white" :src="'https://www.gravatar.com/avatar/' + u.hash + '?d=monsterid&f=y'"></div>
          <div class="flex flex-col items-start">
            <div class="px-2 py-1 rounded-full font-semibold" :class="{
              'bg-green-100 text-green-800': u.role.id === 1,
              'bg-blue-100 text-blue-800': u.role.id === 2,
              'bg-red-100 text-red-800': u.role.id === 3,
            }">{{u.role.label[$i18n.locale]}}</div>
            <div class="font-semibold text-sm">{{u.first_name}} {{u.last_name}}</div>
            <div class="font-semibold">{{u.study.name}}</div>
          </div>
        </li>
      </ul>
    
  </div>

</template>


<script>

import _ from 'lodash';

export default {
  data() {
    return {
      filters: {
        study: '',
        search: ''
      }
    }
  },
mounted() {
  if(this.$store.state.state.user === null && parseInt(this.$route.query.user) > 0) {
    let user = this.$store.getters.meta('users', parseInt(this.$route.query.user));
    if(user) {
      this.select(user);
    } 
  }
},
methods: {
  select(user) {
    this.$store.commit('state_user', user);
    this.$store.commit('addNotification', {message: this.$t('welcome', user), type: 'info', icon: 'hi'});
  }
},
computed: {
    users: function() {
      let self = this;

      let users = _.filter(this.$store.state.meta.users, function(u) { return u.active; });

      users = _.map(users, function(el) {
        el.role = _.filter(self.$store.state.meta.roles, function(r) {
          return r.id === el.role_id;
        })[0];

        el.study = _.filter(self.$store.state.meta.studies, function(s) {
          return s.id === el.study_id;
        })[0];

        return el;
      });

      
      if (this.filters.search.length > 0) {
        users = _.filter(users, function (el) {
          return el.first_name
            .toLowerCase()
            .includes(self.filters.search.toLowerCase()) ||
            el.last_name
            .toLowerCase()
            .includes(self.filters.search.toLowerCase()) ||
            el.study.name
            .toLowerCase()
            .includes(self.filters.search.toLowerCase())
            ;
        });
      }


      return _.sortBy(users, ['last_name', 'first_name']);
    }
  },
i18n: {
  
  messages: {
    en: {
      title: 'Welcome',
      search_ph: 'Search...',
      welcome: 'Welcome, {first_name}!'
    },
    nl: {
      title: 'Welkom',
      search_ph: 'Zoek...',
      welcome: 'Welkom, {first_name}!'
    },
    fr: {
      title: 'Bienvenue',
      search_ph: 'Rechercher',
      welcome: 'Bienvenue, {first_name}!'
    }
  }
}
  
}
</script>