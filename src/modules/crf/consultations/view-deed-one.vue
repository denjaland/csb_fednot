<template>
  <div>
    <div class="flex flex-row items-center text-gray-500 mb-2">
          
        <router-link :to="'/' + $route.params.locale  + '/crf'"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" class="stroke-current w-4 h-4"><g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)"><path d="M3.753,13.944v8.25h6v-6a1.5,1.5,0,0,1,1.5-1.5h1.5a1.5,1.5,0,0,1,1.5,1.5v6h6v-8.25" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M.753,12.444,10.942,2.255a1.5,1.5,0,0,1,2.122,0L23.253,12.444" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg> </router-link>     
        <div class="mx-3 text-gray-400">/</div>

        <router-link :to="'/' + $route.params.locale + '/crf/consultations'" v-if="$store.state.settings.consultation_history_enabled">{{$t('bc_consultations')}}</router-link>
        <div class="mx-3 text-gray-400" v-if="$store.state.settings.consultation_history_enabled">/</div>

        <router-link :to="'/' + $route.params.locale + '/crf/consultations/' + consultation.consultation_id">{{$t('consultation')}} {{consultation.reference}}</router-link>
        <div class="mx-3 text-gray-400">/</div>
    </div>


    <div class="flex flex-row items-center justify-between mb-4">

      

      <div class="flex flex-row items-center">
        <h1 class="text-2xl text-indigo-800 font-semibold">{{$t('title')}} {{deed.reference}}</h1>
        <div :class="'text-' + r.color + '-600 bg-' + r.color + '-100 px-3 py-1 text-base ml-2 rounded-full text-gray-600 font-semibold shadow'" v-for="r in registers" :key="r.id">{{r.name[$i18n.locale]}}</div>
        
        <div class="bg-green-100 px-3 py-1 text-base ml-2 rounded-full text-green-600 font-semibold shadow">{{$t('status.registered')}}</div>
      </div>
      
      
    </div>
    <deed-view :deed="deed" :deed_global="deed"></deed-view>
  </div>

</template>


<script>
import _ from 'lodash';

import DeedView from '../shared/deed/view';



export default {
  components: {
    DeedView,
  },
  computed: {
    consultation: function() {
      let self = this;
        
        return _.filter(this.$store.state.data.consultations, function(el) { return parseInt(el.consultation_id) === parseInt(self.$route.params.id)})[0];
    },
    deed: function() {
        let self = this;
        
        return _.filter(this.consultation.results, function(el) { return parseInt(el.deed_id) === parseInt(self.$route.params.deed_id)})[0];
      },
    registers: function() {
      let registers = [];
      let self = this;
      _.each(this.deed.acts, function(a) {
          registers.push(_.filter(self.$store.state.meta.register_types, function(el) {
            return el.id === a.register;
          })[0]);
        });
        registers = _.uniqBy(registers, 'id');

        return registers;
    }
  },
  i18n: {
    messages: {
      en: {
        bc_consultations: 'My consultations',
        consultation: 'Consultation',
        title: 'Dossier',
        status: {
          registered: 'Registered'
        },
      },
      nl: {
        bc_consultations: 'Mijn consultaties',
        consultation: 'Consultatie',
        title: 'Dossier',
        status: {
          registered: 'Geregistreerd'
        },
      },
      fr: {
        bc_consultations: 'Mes consultations',
        consultation: 'Consultation',
        title: 'Dossier',
        status: {
          registered: 'Enregistré'
        },
      }
    }
  }
  
}
</script>