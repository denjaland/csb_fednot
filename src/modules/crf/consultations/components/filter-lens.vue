<template>
  <div class="relative flex-grow" v-click-outside="close">
    <div class="flex flex-row items-center justify-between rounded bg-white flex-grow border border-white overflow-hidden">
      <div 
        class="cursor-pointer block w-full outline-none flex flex-row items-center justify-between" v-on:click="state.open = !state.open">
      <div class="px-3 py-1 rounded outline-none flex-grow flex flex-row items-center">
        <component :is="'icon-' + label.icon" class="w-4 h-4 mr-2 text-gray-400"></component>
        <div class="whitespace-nowrap">{{label.label || $t('ph') }}</div>
      </div>
      <icon-down class="w-3 h-3 mx-2"></icon-down>
    </div>
</div>
    <div class="z-10 absolute right-0 bg-white rounded shadow overflow-hidden w-96 text-gray-600 mt-1 transform transition-all duration-150 ease-in-out origin-top" 
    :class="{
        'scale-y-0': !state.open,
        'scale-y-100': state.open
      }">
    

      <div class="hover:pl-2 hover:bg-gray-50 px-4 py-2 border-b cursor-pointer transition-all flex flex-row items-center" v-on:click="v = 'my'; state.open = false; filters.search = ''">
        <icon-person class="w-4 h-4 mr-2 text-gray-400"></icon-person>
        <div>{{$t('my')}}</div>
      </div>
      <div class="hover:pl-2 hover:bg-gray-50 px-4 py-2 border-b cursor-pointer transition-all flex flex-row items-center" v-if="$store.state.state.user.role_id === 3" v-on:click="v = 'all'; state.open = false; filters.search = ''">
        <icon-hamburger class="w-4 h-4 mr-2 text-gray-400"></icon-hamburger>
        <div>{{$t('all')}}</div>
      </div>
      
      <div class="flex flex-col max-h-96 overflow-y-auto" v-if="$store.state.state.user.role_id !== 3">
        <div class="hover:pl-2 hover:bg-gray-50 px-4 py-2 border-b cursor-pointer transition-all flex flex-row items-center" v-for="i in studies" :key="i.id" v-on:click="v = i.id; state.open = false; filters.search = ''">
          <component :is="'icon-' + i.icon" class="w-4 h-4 mr-2 text-gray-400"></component>
          <div>{{i.label}}</div>
        </div>
      </div>

      <div class="flex flex-col max-h-96 overflow-y-auto" v-if="$store.state.state.user.role_id !== 3">
        <div class="hover:pl-2 hover:bg-gray-50 px-4 py-2 border-b cursor-pointer transition-all flex flex-row items-center" v-for="i in notaries" :key="i.id" v-on:click="v = i.id; state.open = false; filters.search = ''">
          <component :is="'icon-' + i.icon" class="w-4 h-4 mr-2 text-gray-400"></component>
          <div>{{i.label}}</div>
        </div>
      </div>
      


      <div class="bg-gray-50 px-4 py-2 border-b" v-if="$store.state.state.user.role_id === 3">
        <search-input v-model="filters.search" class="w-full"></search-input>
      </div>
      <div class="flex flex-col max-h-96 overflow-y-auto" v-if="$store.state.state.user.role_id === 3">
        <div class="hover:pl-2 hover:bg-gray-50 px-4 py-2 border-b cursor-pointer transition-all flex flex-row items-center" v-for="i in filteredvalues" :key="i.id" v-on:click="v = i.id; state.open = false; filters.search = ''">
          <component :is="'icon-' + i.icon" class="w-4 h-4 mr-2 text-gray-400"></component>
          <div>{{i.label}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import _ from 'lodash';
import IconDown from '../../../../components/icons/down';
import SearchInput from '../../../../components/inputs/search';
import IconPerson from '../../../../components/icons/person';
import IconStudy from '../../../../components/icons/study';
import IconOwl from '../../../../components/icons/owl';
import IconHamburger from '../../../../components/icons/hamburger';

export default {
  components: {
    IconDown,
    SearchInput,
    IconPerson,
    IconStudy,
    IconOwl,
    IconHamburger
  },
  data() {
    return {
      state: {
        open: false,
      },
      filters: {
        search: ''
      }
    }
  },
  computed: {
    v: {
      get: function () {
        return this.$route.query.lens || 'my';
      },
      set: function (n) {
        if(this.$route.query.lens !== n) {
          this.$router.push( {query: _.merge({}, this.$route.query, {lens: n}) });
        }
        this.validate();
      } 
    },
    label() {
      let self = this;
      if(this.v === 'my') {
        return {
          icon: 'person',
          label: this.$t('my')
        };
      } else if (this.v === 'all') {
        return {
          icon: 'hamburger',
          label: this.$t('all')
        };
      } else {  
        return _.first(_.filter(this.values, function(item) {
          return item.id === self.v
        }));
      }
    },
    values() {

      let values = [];
      Array.prototype.push.apply(values, this.notaries);
      Array.prototype.push.apply(values, this.studies);
      
      return _.orderBy(values, 'label');
    },
    filteredvalues() {
      let self = this;
      let values = self.values;
      if(this.filters.search.length > 0) {
        values = _.filter(values, function(i) {
          return i.label.toLowerCase().includes(self.filters.search.trim().toLowerCase());
        })
      }
      return _.orderBy(values, 'label');
    },
    notaries() {
      let self = this;
      let notaries = _.filter(this.$store.state.meta.users, function(u) {
        if(self.$store.state.state.user.role_id === 3) return true; // all notaries available to a study user

        return u.study_id === self.$store.state.state.study.id && u.active === true;
      });

      return _.map(notaries, function(n) {
        return {
          id: 'not-' + n.id,
          label: n.last_name + ' ' + n.first_name,
          icon: n.role_id === 1 ? 'owl' : 'person'
        }
      });
    },
    studies() {
      let self = this;
      let studies = _.filter(this.$store.state.meta.studies, function(s) {
        if(s.id === 999) return false;
        if(self.$store.state.state.user.role_id === 3) return true; 

        return s.id === self.$store.state.state.study.id;
      });

      return _.map(studies, function(s) {
        return {
          id: 'study-' + s.id,
          label: s.name,
          icon: 'study'
        }
      });
    }
  },
  methods: {
    close() { this.state.open = false; },
    validate() {
      let isValidValue = ( ['my', 'all'].includes(this.v) || _.map(this.values, function(v) { return v.id}).includes(this.v));
      if(!isValidValue) {
        this.v = 'my';
      }
      if(['all'].includes(this.v) && this.$store.state.state.user.role_id !== 3) {
        this.v = 'my';
      }
    }
  },
  watch: {
    v: function(n, o) {
      this.validate();
      this.$emit('input', n);
    },
  },
  beforeMount() {
    this.validate();
    
  },
  i18n: {
    messages: {
      en: {
        ph: 'Select...',
        my: 'Consulted by me',
        all: 'All consultations',
      },
      nl: {
        ph: 'Selecteren...',
        my: 'Geconsulteerd door mij',
        all: 'Alle consultaties',
      },
      fr: {
        ph: 'Choisir...',
        my: 'Consulté par moi',
        all: 'Tous consultations',
      }
    }
  }

}
</script>