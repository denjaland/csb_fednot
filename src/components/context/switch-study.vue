<template>
  <modal-component :open="$store.state.switches.study && $store.state.state.study !== null">
    <div class="bg-white">
      <div class="flex flex-col h-96 overflow-y-auto">
        <div class="mt-3 text-center sm:mt-0 sm:text-left px-6">
          <div class="flex flex-row items-center justify-between">
          <div class="flex flex-col">
            <h3
              class="text-lg leading-6 font-medium text-gray-900 pt-4"
              id="modal-headline"
            >
              {{$t('title')}}
            </h3>
            <div class=" text-gray-400  text-sm mr-6 transition-all pb-4" >{{$t('intro')}}</div>
          </div>

          <search-input v-model="filters.search" class="w-96"></search-input>

          </div>

<ul class="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
  <li v-on:click="$store.commit('state_study', s)" class="cursor-pointer col-span-1 bg-gradient-to-br from-white to-gray-100 hover:from-indigo-600 hover:to-indigo-700 hover:text-white transition-all rounded shadow flex flex-row text-xs p-4 text-gray-600" v-for="s in studies" :key="s.id">
    <div class="flex flex-col items-center py-2 px-4">
      <icon-owl class="w-10 h-10"></icon-owl>
    </div>
    <div class="flex flex-col w-full">
      <!--div class="">{{u.role.label[$i18n.locale]}}</div-->
      <div class="flex flex-row items-center justify-between">

        <div class="font-semibold text-sm">{{s.name}}</div>
        <div class="flex flex-row items-center" v-if="s.deed_count > 0">
          <icon-deed class="w-3 h-3 mr-2 "></icon-deed>
          <div >{{s.deed_count}} {{$tc('registrations', s.deed_count)}}</div>

        </div>
      </div>
      <div class="flex flex-row">
        <div class="flex flex-row items-center w-full mr-6" v-for="u in users_for_study(s)" :key="u.id">
          <!--img :src="'https://www.gravatar.com/avatar/' + u.hash + '?d=monsterid&f=y'" class="w-6 h-6 rounded-full mx-2"-->
          <div class="whitespace-nowrap">{{u.first_name}} {{u.last_name}}</div>
        </div>
      </div>
      <div class="flex-col mt-4">
        <div>{{s.address.street}} {{s.address.nbr}}</div>
        <div>{{s.address.postal_code}} {{s.address.city}}</div>
      </div>
    </div>
  </li>
</ul>
</div></div>
<div class="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row items-center justify-between">
      <div class="text-gray-600 text-xs font-semibold"></div>
      <button
        type="button"
        v-on:click.prevent="$store.commit('switch', 'study')"
        class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
      >
        {{$t('close')}}
      </button>
    </div>
        
      
    </div>
          
  </modal-component>
</template>
<script>
import _ from 'lodash';
import SearchInput from '../inputs/search';
import IconOwl from '../icons/owl';
import IconDeed from '../icons/deed';
import ModalComponent from '../base/modal';

export default {
  components: {SearchInput, IconOwl, IconDeed, ModalComponent},
  data() {
    return {
      filters: {
        search: ''
      }
    }
  },
  methods: {
    users_for_study(study) {
      return _.filter(this.$store.state.meta.users, function(u) {
        return u.study_id === study.id && u.role_id === 1 && u.active;
      });
    }
  },

  computed: {

    studies: function() {
      let self = this;
      let s = self.$store.state.meta.studies;

      // filter access...
      s = _.filter(s, function(s) {
        if(self.$store.state.state.user.role_id === 3) {
          return s.id !== 999;
        } else {
          return s.id === self.$store.state.state.user.study_id;
        }
      });

      s = _.map(s, function(study) {
        study.deed_count = _.filter(self.$store.state.data.deeds, function(deed) {
          return deed.study.type === 'be' && deed.study.be.id === study.id
        }).length; 
        return study;    
      });

      if(this.filters.search.length > 0) {
        s = _.filter(s, function(el) {
          return el.name
            .toLowerCase()
            .includes(self.filters.search.toLowerCase()) 
            
            ||

            _.filter(self.users_for_study(el), function(u) {
              return u.first_name.toLowerCase().includes(self.filters.search.toLowerCase()) ||
                     u.last_name.toLowerCase().includes(self.filters.search.toLowerCase());
            }).length > 0;
          
        });
      }

      return s;
    }

  },
  i18n: {
    messages: {
      en: {
        title: 'Switch study',
        intro: 'Switch to the study you want to work for',
        close: 'Close',
        registrations: 'registration | registrations'
      },
      nl: {
        title: 'Selecteer een studie',
        intro: 'Kies de studie waarvoor je wil werken',
        close: 'Sluiten',
        registrations: 'inschrijving | inschrijvingen'
      },
      fr: {
        title: 'Choisir une étude',
        intro: 'Choisissez l\'étude pour laquelle tu veux travailler',
        close: 'Fermer',
        registrations: 'inscription | inscriptions'
      }
    }
  }
}
</script>