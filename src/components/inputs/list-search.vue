<template>
  <div class="relative" v-click-outside="close">
    <div class="flex flex-col"><div 
        :class="{
          'text-gray-400': label === null,
          'cursor-pointer': !readonly
        }"
        class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none flex flex-row items-center justify-between" v-on:click="state.open = readonly ? false : !state.open">
      <div>{{label || $t('ph')}}</div>
      <icon-down class="w-3 h-3 ml-2" v-if="!readonly"></icon-down>
    </div>
    <div class="border rounded p-2 text-xs font-semibold text-gray-500 mt-2" v-if="!multi && info.length > 0">{{info}}</div>
</div>
    <div class="z-10 absolute left-0 bg-white rounded shadow overflow-hidden w-full" v-if="state.open">
      <div class="bg-gray-50 px-4 py-2 border-b" v-if="filter">
        <search-input v-model="filters.search" class="w-full"></search-input>
      </div>
      <div class="flex flex-col max-h-96 overflow-y-auto">
        <div class="hover:pl-2 hover:bg-gray-50 px-4 py-2 border-b cursor-pointer transition-all flex flex-col" v-for="val in values" :key="val.id" v-on:click="select(val)">
          <div class="flex flex-row items-center">
            <div v-if="multi">
              <icon-yes v-if="v.includes(val.id)" class="w-4 h-4 text-green-500 mr-2"></icon-yes>
              <icon-no v-else class="w-4 h-4 mr-2 text-gray-400"></icon-no>
            </div>
            <div class="flex flex-row items-center justify-between flex-grow">
              <div :class="{
                'text-gray-400': ['inactive', 'external'].includes(val.tag)
              }">{{val.label}}</div>
              <div class="px-3 py-1 text-xs text-gray-500 shadow rounded-full" v-if="val.tag.length > 0"
                :class="{
                  'bg-red-100 text-red-600': val.tag === 'external',
                  'bg-green-100 text-green-600': val.tag === 'notary',
                  'bg-blue-100 text-blue-600': val.tag === 'clerk'
                }">{{$t('tags.' + val.tag)}}</div>
              </div>
          </div>
          <div v-if="(parseInt($store.state.settings.select_search_info_position) !== 2 || multi) && val.info.length > 0" class="text-xs text-gray-400">{{val.info}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import _ from 'lodash';
import IconDown from '../icons/down';
import SearchInput from './search';
import IconYes from '../icons/check_yes';
import IconNo from '../icons/check_no';

export default {
  components: {
    IconDown,
    SearchInput,
    IconYes,
    IconNo,
  },
  props: {
    value: {
      required: true
    },
    options:{
      required: true
    },
    filter: {
      required: false,
      default: true
    },
    readonly: {
      required: false,
      default: false,
    },
    multi: {
      required: false,
      default: false
    }
  },
  data() {
    return {
      v: this.value,
      state: {
        open: false,
      },
      filters: {
        search: ''
      }
    }
  },
  computed: {
    info() {
      let self = this;
      if(parseInt(this.$store.state.settings.select_search_info_position) === 1 || this.v === null || parseInt(this.v) === 999) return '';
      
      let i = _.filter(this.values, function(el) {
        return el.id === self.v;
      })[0];
      return i.info || '';
    },
    label() {
      let self = this;
      if(!this.multi) {
        
        if(self.v === null) return null;

        let i = _.filter(this.options, function(o) { return o.id === self.v});
        if(i.length > 0) return i[0].label;
        return null;
      } else { 
        let items = _.map(_.orderBy(_.filter(this.options, function(o) {
          return self.v.includes(o.id)
        }), 'label'), function(o) { return o.label });

        return items.join(', ');
      }
     
    },
    values() {
      let self = this;
      //let v = this.options;

      let v = _.map(this.options, function(o) {
        return _.merge({}, {id: null, label: '', info: '', tag: '', sorter: o.label}, o);
      })

      if(this.filters.search.length > 0) {
        v = _.filter(v, function(i) {
          return i.label.toLowerCase().includes(self.filters.search.toLowerCase())
            || i.info.toLowerCase().includes(self.filters.search.toLowerCase());
        })
      }
      
    
      return _.orderBy(v, 'sorter');
    }
  },
  methods: {
    close() { this.state.open = false; },
    select(val) {
      if(this.multi) {
        this.v.includes(val.id) ? this.v.splice(this.v.indexOf(val.id), 1) : this.v.push(val.id);
      } else {
        this.v = val.id;
        this.state.open = false;
        this.filters.search = '';
      }

    },
    validate() {
      if(this.multi) {
        
      } else {
        if(!_.map(this.options, function(o) { return o.id }).includes(this.v)) {
          this.v = null;
        }
        if(this.v === null && _.filter(this.options, function(o) { 
          let tes = _.merge({}, {tag:''}, o);
          return tes.tag.length === 0; 
        }).length === 1)  {
          this.v = _.filter(this.options, function(o) { return (o.tag || '').length === 0; })[0].id;
        }
      }
      
    }
  },
  watch: {
    options: function(n, o) {
      this.validate();
    },
    v: function(n, o) {
      if(n === null && this.multi) this.v = n = [];
      this.$emit('input', n);
    },
  },
  mounted() {
    this.validate();
  },
  i18n: {
    messages: {
      en: {
        ph: 'Select...',
        tags: {
          inactive: 'Inactive',
          external: 'External',
          notary: 'Notary',
          clerk: 'Clerk'
        }
      },
      nl: {
        ph: 'Selecteren...',
        tags: {
          inactive: 'Inactief',
          external: 'Extern',
          notary: 'Notaris',
          clerk: 'Notarismedewerker'
        }
      },
      fr: {
        ph: 'Choisir...',
        tags: {
          inactive: 'Inactif',
          external: 'Externe',
          notary: 'Notaire',
          clerk: 'Clerc'
        }
      }
    }
  }

}
</script>