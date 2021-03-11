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
      }"
    >
    

      <div v-if="$store.state.state.user.role_id === 3 && workitems.length > 0" 
      class="hover:pl-2 hover:bg-gray-50 font-semibold text-blue-600 px-4 py-2 border-b cursor-pointer transition-all text-white flex flex-row items-center" v-on:click="v = 'work'; state.open = false; filters.search = ''; state.submenu = null">
        <icon-work class="w-4 h-4 mr-2 text-gray-400"></icon-work>
        <div class="flex flex-row items-center justify-between flex-grow">
          <div>{{$t('work')}}</div>
          <div class="bg-blue-600 text-white font-semibold text-xs px-2 rounded-full">{{workitems.length}}</div>
        </div>
      </div>

      <div class="hover:pl-2 hover:bg-gray-50 px-4 py-2 border-b cursor-pointer transition-all flex flex-row items-center" v-on:click="v = 'my'; state.open = false; filters.search = ''; state.submenu = null">
        <icon-person class="w-4 h-4 mr-2 text-gray-400"></icon-person>
        <div>{{$t('my')}}</div>
      </div>
      <div class="hover:pl-2 hover:bg-gray-50 px-4 py-2 border-b cursor-pointer transition-all flex flex-row items-center" v-if="$store.state.state.user.role_id === 3" v-on:click="v = 'all'; state.open = false; filters.search = ''; state.submenu = null">
        <icon-hamburger class="w-4 h-4 mr-2 text-gray-400"></icon-hamburger>
        <div>{{$t('all')}}</div>
      </div>
      
      <div class="flex flex-col max-h-96 overflow-y-auto" v-if="$store.state.state.user.role_id !== 3">
        <div class="hover:pl-2 hover:bg-gray-50 px-4 py-2 border-b cursor-pointer transition-all flex flex-row items-center" v-for="i in studies" :key="i.id" v-on:click="v = i.id; state.open = false; filters.search = ''; state.submenu = null">
          <component :is="'icon-' + i.icon" class="w-4 h-4 mr-2 text-gray-400"></component>
          <div>{{i.label}}</div>
        </div>
      </div>

      

      <!-- STUDIES -->
      <div v-if="$store.state.state.user.role_id === 3" class="relative transition-all flex flex-col" >
        <div class="flex flew-row items-center justify-between hover:bg-gray-50 px-4 py-2 border-b cursor-pointer" v-on:click="state.submenu = (state.submenu === 'studies' ? null : 'studies'); filters.search = ''">
          <div class="flex flex-row items-center">
            <icon-study class="w-4 h-4 mr-2 text-gray-400"></icon-study>
            <div :class="{
              'font-semibold': state.submenu === 'studies'
            }">{{$t('executed_at')}}...</div>
          </div>
          <component :is="state.submenu === 'studies' ? 'icon-down' : 'icon-right'" class="w-3 h-3 text-gray-400"></component>
        </div>
      </div>
      <div v-if="$store.state.state.user.role_id === 3" class=" flex flex-col transform transition-all duration-150 ease-in-out origin-top"
        :class="{
          'scale-y-0 max-h-0': state.submenu !== 'studies',
          'scale-y-100 max-h-96': state.submenu === 'studies'
        }"
      >
        <div class="bg-gray-50 px-4 py-2 border-b" v-if="$store.state.state.user.role_id === 3 && state.submenu === 'studies'">
          <search-input v-model="filters.search" class="w-full"></search-input>
        </div>
        <div class="flex flex-col  overflow-y-auto" v-if="state.submenu === 'studies'">
          <div class="hover:bg-gray-50 px-5 py-2 border-b cursor-pointer transition-all flex flex-row items-center" v-for="i in filter_and_page(studies)[0]" :key="i.id" v-on:click="v = i.id; state.open = false; filters.search = ''; state.submenu = null">
            <component :is="'icon-' + i.icon" class="w-4 h-4 mr-2 text-gray-400"></component>
            <div>{{i.label}}</div>
          </div>
        </div>
      </div>



      <!-- REGISTERED BY -->
      <div class="hover:pl-2 hover:bg-gray-50 px-4 py-2 border-b cursor-pointer transition-all flex flex-row items-center justify-between" v-on:click="state.submenu = state.submenu === 'registered_by' ? null : 'registered_by'; filters.search = ''">
        <div class="flex flex-row items-center">
            <icon-person class="w-4 h-4 mr-2 text-gray-400"></icon-person>
            <div :class="{
              'font-semibold': state.submenu === 'registered_by'
            }">{{$t('registered_by')}}...</div>
        </div>
        <component :is="state.submenu === 'registered_by' ? 'icon-down' : 'icon-right'" class="w-3 h-3 text-gray-400"></component>
      </div>
      <div class="flex flex-col transform transition-all duration-150 ease-in-out origin-top"
        :class="{
          'scale-y-0 max-h-0': state.submenu !== 'registered_by',
          'scale-y-100 max-h-96 ': state.submenu === 'registered_by'
        }"
      >
        <div class="bg-gray-50 px-4 py-2 border-b" v-if="$store.state.state.user.role_id === 3 && state.submenu === 'registered_by'">
          <search-input v-model="filters.search" class="w-full"></search-input>
        </div>
        <div class="flex flex-col  overflow-y-auto" v-if="state.submenu === 'registered_by'">
          <div class="hover:bg-gray-50 px-5 py-2 border-b cursor-pointer transition-all flex flex-row items-center" v-for="i in filter_and_page(registered_by)[0]" :key="i.id" v-on:click="v = i.id; state.open = false; filters.search = ''; state.submenu = null">
            <component :is="'icon-' + i.icon" class="w-4 h-4 mr-2 text-gray-400"></component>
            <div>{{i.label}}</div>
          </div>
        </div>
      </div>

      <!-- EXECUTED BY -->
      <div class="hover:pl-2 hover:bg-gray-50 px-4 py-2 border-b cursor-pointer transition-all flex flex-row items-center justify-between" v-on:click="state.submenu = state.submenu === 'executed_by' ? null : 'executed_by'; filters.search = ''">
        <div class="flex flex-row items-center">
            <icon-owl class="w-4 h-4 mr-2 text-gray-400"></icon-owl>
            <div :class="{
              'font-semibold': state.submenu === 'executed_by'
            }">{{$t('executed_by')}}...</div>
        </div>
        <component :is="state.submenu === 'executed_by' ? 'icon-down' : 'icon-right'" class="w-3 h-3 text-gray-400"></component>
      </div>
      <div class="flex flex-col transform transition-all duration-150 ease-in-out origin-top"
      :class="{
          'scale-y-0 max-h-0': state.submenu !== 'executed_by',
          'scale-y-100 max-h-96': state.submenu === 'executed_by'
        }">
        <div class="bg-gray-50 px-4 py-2 border-b" v-if="$store.state.state.user.role_id === 3 && state.submenu === 'executed_by'">
          <search-input v-model="filters.search" class="w-full"></search-input>
        </div>
        <div class="flex flex-col  overflow-y-auto" v-if="state.submenu === 'executed_by'">
          <div class="hover:bg-gray-50 px-5 py-2 border-b cursor-pointer transition-all flex flex-row items-center" v-for="i in filter_and_page(executed_by)[0]" :key="i.id" v-on:click="v = i.id; state.open = false; filters.search = ''; state.submenu = null">
            <component :is="'icon-' + i.icon" class="w-4 h-4 mr-2 text-gray-400"></component>
            <div>{{i.label}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import _ from 'lodash';
import IconDown from '../../../../components/icons/down';
import IconRight from '../../../../components/icons/right';
import SearchInput from '../../../../components/inputs/search';
import IconPerson from '../../../../components/icons/person';
import IconStudy from '../../../../components/icons/study';
import IconSupport from '../../../../components/icons/support';
import IconOwl from '../../../../components/icons/owl';
import IconHamburger from '../../../../components/icons/hamburger';
import IconWork from '../../../../components/icons/work';

export default {
  components: {
    IconRight,
    IconDown,
    SearchInput,
    IconPerson,
    IconStudy,
    IconSupport,
    IconOwl,
    IconHamburger,
    IconWork
  },
  data() {
    return {
      state: {
        open: false,
        submenu: null,
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
    workitems() {
      return _.filter(this.$store.state.data.deeds, function(d) {
        return _.filter(d.staging, function(s) { return s.status === 'pending'; }).length > 0;
      });
    },
    label() {
      let self = this;
      switch(this.v.split('-')[0]) {
        case 'my':
          return {
            icon: 'person',
            label: this.$t('my')
          };
        case 'work':
          return {
            icon: 'work',
            label: this.$t('work')
          };
        case 'all':
          return {
            icon: 'hamburger',
            label: this.$t('all')
          };
        case 'reg': // registered by...
          let p = _.filter(this.registered_by, function(i) { return i.id === self.v; })[0];
          return {
            icon: p.icon,
            label: this.$t('registered_by') + ' ' + p.label 
          };
        case 'not': // registered by...
          let n = _.filter(this.executed_by, function(i) { return i.id === self.v; })[0];
          return {
            icon: n.icon,
            label: this.$t('executed_by') + ' ' + n.label
          };
        case 'study':
          let s = _.filter(this.studies, function(i) { return i.id === self.v; })[0];
          return {
            icon: s.icon,
            label: this.$t('executed_at') + ' ' + s.label
          };
        default:
          return {
            icon: null,
            label: 'ERROR'
          }
      }


      
    },
    

    
    executed_by() {
      let self = this;
      let users = _.filter(this.$store.state.meta.users, function(u) {
        return (self.$store.state.state.user.role_id === 3 || u.study_id === self.$store.state.state.study.id) && u.role_id === 1;
      });

      return _.map(users, function(u) {
        return {
          id: 'not-' + u.id,
          label: u.last_name + ' ' + u.first_name,
          icon: 'owl'
        }
      })
    },
    registered_by() {

      let self = this;
      let users = _.filter(this.$store.state.meta.users, function(u) {
        return self.$store.state.state.user.role_id === 3 || u.study_id === self.$store.state.state.study.id;
      });

      return _.map(users, function(u) {
        let icon = '';
        switch(u.role_id) {
          case 1:
            icon = 'owl';
            break;
          case 2:
            icon = 'person';
            break;
          case 3:
            icon = 'support';
            break;
          default:
            icon = '';
        }
        return {
          id: 'reg-' + u.id,
          label: u.last_name + ' ' + u.first_name,
          icon: icon
        }
      })


    },
    
    users() {
      let self = this;
      let notaries = _.filter(this.$store.state.meta.users, function(u) {
        if(self.$store.state.state.user.role_id === 3) return u.role_id === 1; // all notaries available to a study user

        return u.role_id === 1 && u.study_id === self.$store.state.state.study.id;
      });

      return _.map(notaries, function(n) {
        return {
          id: 'not-' + n.id,
          label: n.last_name + ' ' + n.first_name,
          icon: 'owl'
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
    filter_and_page(data) {
      let self = this;
      if(this.filters.search.length > 0) {
        data = _.filter(data, function(i) {
          return i.label.toLowerCase().includes(self.filters.search.trim().toLowerCase());
        })
      } 
      return _.chunk(_.orderBy(data, 'label'), 20);      
    },
    close() { this.state.open = false; },
    validate() {

      let isValidValue = false;
      switch(this.v.split('-')[0]) {
        case 'my':
          isValidValue = true;
          break;
        case 'work':
        case 'all':
          isValidValue = this.$store.state.state.user.role_id === 3;
          break;
        case 'reg': // registered by...
          isValidValue = _.map(this.registered_by, function(v) { return v.id }).includes(this.v);
          break;
        case 'not': // registered by...
          isValidValue = _.map(this.executed_by, function(v) { return v.id }).includes(this.v);
          break;
        case 'study':
          isValidValue = _.map(this.studies, function(v) {return v.id}).includes(this.v);
          break;
        default:
          isValidValue = false;
      }

      if(!isValidValue) {
        this.v = 'my';
      }
      
    }
  },
  
  watch: {
    v: {
      immediate: true,
      handler(n, o) {
        this.$emit('label-updated', this.label.label);
      },
    },
  },
  beforeMount() {
    this.validate();
    
  },
  i18n: {
    messages: {
      en: {
        ph: 'Select...',
        my: 'Registered by me',
        all: 'All deeds',
        work: 'Pending validation',
        registered_by: 'Registered by',
        executed_by: 'Executed by',
        executed_at: 'Executed in study'
      },
      nl: {
        ph: 'Selecteren...',
        my: 'Ingeschreven door mij',
        all: 'Alle aktes',
        work: 'In afwachting van validatie',
        registered_by: 'Ingeschreven door',
        executed_by: 'Verleden door',
        executed_at: 'Verleden in studie'
      },
      fr: {
        ph: 'Choisir...',
        my: 'Inscrit par moi',
        all: 'Tous actes',
        work: 'Modifications à valider',
        registered_by: 'Inscrit par',
        executed_by: 'Exécuté par',
        executed_at: 'Exécuté dans l\'étude'
      }
    }
  }

}
</script>