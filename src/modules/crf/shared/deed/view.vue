<template>
  
  <div v-if="deed">
    

    <h2 class="text-xl text-gray-800 font-semibold mb-2">{{$t('master_data')}}</h2>
    <div class="bg-white rounded shadow mb-12 flex-col">
      <div class="flex flex-col">
        <div class="flex flex-col p-8">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{$t('study_title')}}
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{$t('study_info')}}
          </p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label
              for="first_name"
              class="block text-sm font-medium text-gray-700"
            >
              {{$t('study_name')}}
            </label>
            <div class="mt-1 text-sm text-gray-700">
        
              <div v-if="deed.study.type === 'be'">{{deed.study.be.name}}</div>
              <div v-else-if="deed.study.type === 'foreign'">{{deed.study.foreign.name}}</div> 
              <div v-else>ToDo: implement studies abroad and other organisations</div>
            </div>
          </div>

          <div class="sm:col-span-3"
            :class="{
                'bg-yellow-100 -mx-2 px-2 -my-2 py-2 shadow rounded': modus === 'review' && (deed.study.type === 'be' ? deed.notary.be.id : deed.notary.foreign) !== (deed_global.study.type === 'be' ? deed_global.notary.be.id : deed_global.notary.foreign)
              }"
          >
            <label
              class="block text-sm font-medium text-gray-700"
            >
              {{$t('notary')}}
            </label>
            <div class="mt-1 text-sm text-gray-700 flex flex-row items-center">
              <div><div v-if="deed.study.type === 'be'">{{deed.notary.be.first_name}} {{deed.notary.be.last_name}}</div>
                <div v-else-if="deed.study.type === 'foreign'">{{deed.notary.foreign.name}}</div> 
                <div v-else>ToDo: implement studies abroad and other organisations</div></div>
              <div class="ml-4 text-gray-500 flex flex-row items-center" v-if="modus === 'review' && deed.repertorium !== deed_global.repertorium">(<div v-if="deed_global.study.type === 'be'">{{deed_global.notary.be.first_name}} {{deed_global.notary.be.last_name}}</div>
                <div v-else-if="deed_global.study.type === 'foreign'">{{deed_global.notary.foreign.name}}</div> 
                <div v-else>ToDo: implement studies abroad and other organisations</div>)</div>
            </div>
          
          </div>
        </div>
        </div>
<div class="flex flex-col p-8 border-t border-gray-100">
        <div class="">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{$t('dossier_title')}}
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{$t('dossier_info')}}
          </p>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-12">
          
          <div class="flex flex-col "
          :class="{
                'bg-yellow-100 -mx-2 px-2 -my-2 py-2 shadow rounded': modus === 'review' && deed.reference !== deed_global.reference,
                'col-span-3': naban !== null,
                'col-span-6': naban === null
              }">
            <label
              for="first_name"
              class="block text-sm font-medium text-gray-700"
              
            >
              {{$t('reference')}}
            </label>
            <div class="mt-1 text-sm text-gray-700 flex flex-row items-center">
              <div>{{deed.reference}}</div>
              <div class="ml-4 text-gray-500" v-if="modus === 'review' && deed.reference !== deed_global.reference">({{deed_global.reference}})</div>
            </div>
          </div>

          <div v-if="!(naban === null)" class="col-span-3 flex flex-col "
>
            <label
              class="block text-sm font-medium text-gray-700"
              
            >
              {{$t('naban')}}
            </label>
            <div class="mt-1 text-sm text-gray-700 flex flex-row items-center">
              <div>{{naban}}</div>
            </div>
          </div>

          <div class="sm:col-span-6"
          :class="{
                'bg-yellow-100 -mx-2 px-2 -my-2 py-2 shadow rounded': modus === 'review' && deed.repertorium !== deed_global.repertorium
              }">
            <label
              class="block text-sm font-medium text-gray-700"
              
            >
              {{$t('repertorium')}}
            </label>
            <div class="mt-1 text-sm text-gray-700 flex flex-row items-center">
              <div>{{deed.repertorium}}</div>
              <div class="ml-4 text-gray-500" v-if="modus === 'review' && deed.repertorium !== deed_global.repertorium">({{deed_global.repertorium}})</div>
            </div>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-3"
          :class="{
                'bg-yellow-100 -mx-2 px-2 -my-2 py-2 shadow rounded': modus === 'review' && deed.deed_date !== deed_global.deed_date
              }">
            <label
              class="block text-sm font-medium text-gray-700"
            
            >
              {{$t('deed_date')}}
            </label>
            <div class="mt-1 text-sm text-gray-700 flex flex-row items-center">
              <div>{{moment(deed.deed_date).format('LL')}}</div>
              <div class="ml-4 text-gray-500" v-if="modus === 'review' && deed.deed_date !== deed_global.deed_date">({{moment(deed_global.deed_date).format('LL')}})</div>
            </div>
          </div>
          <div class="sm:col-span-3">
            <label
              for="first_name"
              class="block text-sm font-medium text-gray-700"
            >
              {{$t('created_by')}}
            </label>
            <div class="mt-1 text-sm text-gray-700 flex flex-row items-center">
              <div class="mt-1 text-sm text-gray-700 flex flex-row items-center" >
                <div :class="{'px-3 py-1 rounded-full font-semibold mr-4 text-xs bg-gray-50': $store.state.state.user.role_id === 3}">{{moment(deed.registration_date).format('LL')}}</div>
                <div class="flex flew-row items-center" v-if="$store.state.state.user.role_id === 3">
                  <img class="w-6 h-6 rounded-full mr-2" :src="'https://www.gravatar.com/avatar/' + deed.user.hash + '?d=monsterid&f=y'" >
                  <div>{{deed.user.first_name}} {{deed.user.last_name}}</div>
                  <div class="px-3 py-1 rounded-full font-semibold ml-4 text-xs" :class="{
                    'bg-green-100 text-green-800': deed.user.role_id === 1,
                    'bg-blue-100 text-blue-800': deed.user.role_id === 2,
                    'bg-red-100 text-red-800': deed.user.role_id === 3,
                  }">{{$store.getters.meta('roles', deed.user.role_id).label[$i18n.locale]}}</div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <div class="-mx-8 px-8 py-3 mt-3 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 bg-gray-50" v-if="$store.state.state.user.role_id === 3">
          <div class="sm:col-span-3">
        
            <div class="mt-1">
              <check-box-input :value="deed.billable" :readonly="true">
                {{$t('billable')}}
              </check-box-input>
            
            </div>
          </div>
          <div class="sm:col-span-3 row-span-2">

            <label
              class="block text-sm font-medium text-gray-700"
              v-if="modifications.length > 0"
            >
              {{$tc('modifications', modifications.length, {count: modifications.length})}}
            </label>
            <div class="mt-1 text-sm text-gray-700 flex flex-row items-center" v-for="mod in modifications" :key="mod.id">
              <div class="px-3 py-1 rounded-full font-semibold mr-4 text-xs bg-white">{{moment(mod.created).format('LLL')}}</div>
        


              <img class="w-6 h-6 rounded-full mr-2" :src="'https://www.gravatar.com/avatar/' + mod.user.hash + '?d=monsterid&f=y'">
              <div>{{mod.user.first_name}} {{mod.user.last_name}}</div>
              <div class="px-3 py-1 rounded-full font-semibold ml-4 text-xs" :class="{
                'bg-green-100 text-green-800': mod.user.role_id === 1,
                'bg-blue-100 text-blue-800': mod.user.role_id === 2,
                'bg-red-100 text-red-800': mod.user.role_id === 3,
              }">{{$store.getters.meta('roles', mod.user.role_id).label[$i18n.locale]}}</div>
            </div>
            
          </div>
          <div class="sm:col-span-3">
            <label
              for="first_name"
              class="block text-sm font-medium text-gray-700"
            >
              {{$t('comment')}}
            </label>
            <div class="mt-1 text-sm text-gray-700">
              {{deed.comment}}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

    <div class="flex flex-row items-center mb-2 justify-between">
      <h2
        class="text-xl text-gray-800 font-semibold mb-2 flex flex-row items-center"
      >
        <div>{{$t('legal_acts')}}</div>
        <div
          class="text-sm font-semibold text-white bg-gray-500 px-3 rounded-full ml-4"
        >
          {{ deed.acts.length }}
        </div>
      </h2>
    </div>

    <view-act
      class="mt-2"
      :act="act"
      :acts="deed.acts"
      :open="$route.hash === '#' + act.reference"
      v-for="(act, i) in deed.acts"
      :key="act.act_id"
      v-on:open="$router.push({hash: act.reference})"
      v-on:close="$router.push({hash: ''})"
      :modus="modus"
      :active_act="deed_global.acts[i]"
    ></view-act>

  </div>

</template>


<script>
import _ from 'lodash';
import moment from 'moment/min/moment-with-locales';

import ActionButton from './components/action-button';
import ViewAct from '../act/view';
import CheckBoxInput from '../../../../components/inputs/checkbox';

export default {
  components: {
    ActionButton,
    ViewAct,
    CheckBoxInput
  },
  props: {
    deed: {
      required: true
    },
    deed_global: {
      required: true
    },
    modus: {
      required: true
    }
  },
  data() {
    return {
      state: {
        selected_act: null,
        now: moment()
      }
    }
  }, 
  methods: {
    moment(date) {
      return moment(date).locale(this.$route.params.locale);
    }
  },
  mounted() {
    let self = this;
    setInterval(function() {
      self.state.now = moment()
    }, 1000);
  },
  computed: {

    naban() {
      let has_naban = _.filter(this.deed.acts, function(a) {
        return [2,6,7].includes(a.id);
      }).length > 0;

      if(!has_naban) return null;

      return this.state.now.subtract(12, 'seconds') > moment(this.deed_global.staging[0].created) ? this.deed_global.naban : this.$t('processing');
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
    },
    modifications: function() {
      return _.map(_.filter(this.deed_global.staging, function(s) {return s.status === 'promoted' && s.type !== 'creation';}), function(s, i) {
        return {
          id: i,
          user: s.deed.user,
          created: s.created
        };
      });
    }
  },
  i18n: {
    messages: {
      en: {
        processing: 'Processing...',
        master_data: 'Master Data',
        study_title: 'Study Data',
        study_info: 'Data related to the study making the registration',
        study_name: 'Study Name',
        notary: 'Notary',
        dossier_title: 'Deed Information',
        dossier_info: 'Data related to the deed',
        reference: 'Reference',
        naban: 'Reference NABAN',
        repertorium: 'Repertorium',
        deed_date: 'Deed date',
        registered: 'Registration',
        legal_acts: 'Legal Acts',
        billable: 'Invoice registration',
        created_by: 'Registration',
        modifications: '1 registered correction|{count} registered corrections',
        comment: 'Justification and other comments'
      },
      nl: {
        processing: 'In afwachting...',
        master_data: 'Kerngegevens',
        study_title: 'Studiegegevens',
        study_info: 'Gegevens met betrekking tot het kantoor dat de registratie verricht',
        study_name: 'Naam van de studie',
        notary: 'Notaris',
        dossier_title: 'Aktegegevens',
        dossier_info: 'Gegevens met betrekking tot de akte',
        reference: 'Referentie',
        naban: 'Referentie NABAN',
        repertorium: 'Repertorium',
        deed_date: 'Aktedatum',
        registered: 'Inschrijving',
        legal_acts: 'Rechtshandelingen',
        billable: 'Inschrijving factureren',
        created_by: 'Inschrijving',
        modifications: '1 ingeschreven correctie|{count} ingeschreven correcties',
        comment: 'Rechtvaardiging en andere opmerkingen',
      },
      fr: {
        processing: 'En attente...', 
        master_data: 'Données de base',
        study_title: 'Données de l\'étude',
        study_info: 'Données relatives à l\'étude qui fait l\'enregistrement',
        study_name: 'Nom de l\'étude',
        notary: 'Notaire',
        dossier_title: 'Données de l\'acte',
        dossier_info: 'Données relative à l\'acte',
        reference: 'Référence',
        naban: 'Référence NABAN',
        repertorium: 'Repertorium',
        deed_date: 'Date de l\'acte',
        registration: 'Inscription',
        legal_acts: 'Actes juridiques',
        billable: 'Facturer l\'inscription',
        created_by: 'Inscription',
        modifications: '1 correction inscrite|{count} corrections inscrites',
        comment: 'Justification et autres remarques',
      }
    }
  }
}
</script>