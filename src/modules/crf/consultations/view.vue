<template>
<model-viewer :model="consultation">
  <div v-if="consultation !== null">
    <div class="flex flex-row items-center text-gray-500 mb-2">
          
        <router-link :to="'/' + $route.params.locale  + '/crf'"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" class="stroke-current w-4 h-4"><g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)"><path d="M3.753,13.944v8.25h6v-6a1.5,1.5,0,0,1,1.5-1.5h1.5a1.5,1.5,0,0,1,1.5,1.5v6h6v-8.25" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M.753,12.444,10.942,2.255a1.5,1.5,0,0,1,2.122,0L23.253,12.444" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg> </router-link>     
        <div class="mx-3 text-gray-400">/</div>

        <router-link :to="'/' + $route.params.locale + '/crf/consultations'" v-if="$store.state.settings.consultation_history_enabled">{{$t('breadcrumb')}}</router-link>
        <div class="mx-3 text-gray-400" v-if="$store.state.settings.consultation_history_enabled">/</div>
    </div>
    <div class="flex flex-row items-center justify-between mb-4">

      <h1 class="text-2xl text-indigo-800 font-semibold">{{$t('title', {reference: consultation.reference})}}</h1>
      <action-button :consultation="consultation"></action-button>
    </div>

    <h2 class="text-xl text-gray-800 font-semibold mb-2" v-if="$store.state.state.user.role_id === 3">{{$t('master_data')}}</h2>
    <div class="bg-white rounded shadow mb-12 flex-col p-8" v-if="$store.state.state.user.role_id === 3">
      <!--div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{$t('requestor_title')}}
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{$t('requester_info')}}
          </p>
        </div-->
        <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label
              class="block text-sm font-medium text-gray-700"
            >
              {{$t('study_name')}}
            </label>
            <div class="mt-1 text-sm text-gray-700">
        
              <div v-if="consultation.study.type === 'be'">{{consultation.study.be.name}}</div>
              <div v-else-if="consultation.study.type === 'foreign'">{{consultation.study.foreign.name}}</div> 
              <div v-else>ToDo: implement studies abroad and other organisations</div>
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="last_name"
              class="block text-sm font-medium text-gray-700"
            >
              {{$t('notary')}}
            </label>
            <div class="mt-1 text-sm text-gray-700">
               <div v-if="consultation.study.type === 'be'">{{consultation.notary.be.first_name}} {{consultation.notary.be.last_name}}</div>
                <div v-else-if="consultation.study.type === 'foreign'">{{consultation.notary.foreign.name}}</div> 
                <div v-else>ToDo: implement studies abroad and other organisations</div>


            </div>
          
          </div>
        </div>
    </div>

    <h2 class="text-xl text-gray-800 font-semibold mb-2">{{$t('title_consultation')}}</h2>
    <div class="bg-white rounded shadow mb-12 flex-col">
      <div class="flex flex-col">
        <div class="flex flex-col p-8">
          <div class=" grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-6" v-if="$store.state.settings.consultation_register_checkboxes">
              <div class="mt-1 flex flex-row items-center justify-between" >
                <check-box-input 
                  v-for="rt in $store.state.meta.register_types" 
                  class="mr-4"
                  :key="rt.id" 
                  :value="consultation.registers.includes(rt.id)"
                  v-on:input="consultation.registers.includes(rt.id) ? consultation.registers.splice(consultation.registers.indexOf(rt.id), 1) : consultation.registers.push(rt.id)">
                  <div class="flex flex-col">
                    <div>{{rt.name[$i18n.locale]}}</div>
                    <div class="text-xs text-gray-400 whitespace-nowrap">{{rt.label[$i18n.locale]}}</div>
                    
                  </div>
                </check-box-input>

              </div>
            </div>              
            <div class="sm:col-span-3" v-else>
              <label
                class="block text-sm font-medium"
                :class="{
                  'text-red-500': consultation.registers.length === 0,
                  'text-gray-700': consultation.registers.length > 0            
                }"
              >
                {{$t('registers')}} *
              </label>
              <div class="mt-1">
                <list-search-input :readonly="true" :options="registers_list" :value="consultation.registers" :multi="true" :filter="false"></list-search-input>
              </div>
            </div>
              
            
            <div class="sm:col-span-3">
              <div class="mt-1 flex flex-col">
                <label
                class="block text-sm font-medium text-gray-700"
              >
                {{$t('countries_to_search')}}
              </label>
                <list-search-input :readonly="true" :options="country_list_registers" v-model="consultation.international.countries" :multi="true"></list-search-input>
              </div>
            </div>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700"> {{$t('person')}} </label>
              <div class="mt-1">
                <person-input :readonly="true" v-model="consultation.person"></person-input>
              </div>
            </div>
            <div class="sm:col-span-3" v-if="consultation.partner !== null && consultation.partner.id !== null">
              <label class="block text-sm font-medium text-gray-700"> {{$t('partner')}} </label>
              <div class="mt-1">
                <person-input :readonly="true" v-model="consultation.partner"></person-input>
              </div>
            </div>
            <div class="sm:col-span-3">
            <label
              class="block text-sm font-medium text-gray-700"
            >
              {{$t('reference')}}
            </label>
            <div class="mt-1 text-sm text-gray-700">
              {{consultation.reference}}
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="show_crh_for_crt_warning"
      class="bg-yellow-100 flex flex-row items-center justify-between bg-white px-8 py-4 rounded shadow mb-4 transition-all font-semibold text-sm text-yellow-600 cursor-pointer"
    >
      <div>{{ $t("crh_for_crt_warning") }}</div>
      <div class="flex flex-row items-center">
        <div
          v-on:click="$router.push('/' + $route.params.locale + '/crf/consultations/create?reference=' + consultation.reference +'&person=' + consultation.person.id  + '&registers=1,2')"
          class="px-3 py-1 text-white bg-red-600 hover:bg-red-500 cursor-pointer mr-4 rounded-full shadow"
        >
          {{ $t("do_crh") }}
        </div>
      </div>
    </div>
  
    <div class="flex flex-row items-center justify-between">
      <h2
          class="text-xl text-gray-800 font-semibold mb-2 flex flex-row items-center"
        >
          <div>{{$t('results')}}</div>
          <div
            class="text-sm font-semibold text-white bg-gray-500 px-3 rounded-full ml-4"
          >
            {{ consultation.results.length }}
          </div>
        </h2>
        <div class="text-xs font-semibold text-gray-600">{{$t('results_info', {date: moment(consultation.consultation_date).format('LLL') })}}</div>
      </div>


<table
        class="min-w-full divide-y divide-gray-200 rounded shadow overflow-hidden"
      >
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <div class="flex flex-col">
                <div>{{ $t("column.dossier") }}</div>
                <div class="text-gray-400">{{ $t('column.repertorium')}}</div>
              </div>
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <div class="flex flex-col">
                <div>{{ $t("column.study") }}</div>
                <div class="text-gray-400">{{ $t('column.notary')}}</div>
              </div>
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ $t("column.deed") }}
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ $t("column.declarers") }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 h-96 overflow-y-auto">
          <tr
            v-for="d in consultation.results"
            :key="d.deed_id"
            class="cursor-pointer hover:bg-gray-50 transition-all"
            v-on:click="
              $router.push('/' + $route.params.locale + '/crf/consultations/' + $route.params.id + '/registrations/' + d.deed_id)
            "
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ d.reference }}</div>
              <div class="text-sm text-gray-500">{{ d.repertorium }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">
                <div v-if="d.study.type === 'be'">{{ d.study.be.name }}</div>
                <div v-else-if="d.study.type === 'foreign'">
                  {{ d.study.foreign.name }}
                </div>
                <div v-else>
                  ToDo: implement studies abroad and other organisations
                </div>
              </div>
              <div class="text-sm text-gray-500">
                <div v-if="d.study.type === 'be'">
                  {{ d.notary.be.first_name }} {{ d.notary.be.last_name }}
                </div>
                <div v-else-if="d.study.type === 'foreign'">
                  {{ d.notary.foreign.name }}
                </div>
                <div v-else>
                  ToDo: implement studies abroad and other organisations
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900 flex flex-row items-center">
                <div>{{ d.deed_date }}</div>
                <div
                  :class="'text-' + r.color + '-600 bg-' + r.color + '-100 px-2 py-1 text-xs ml-2 rounded-full'"
                  
                  v-for="r in d.registers"
                  :key="r.id"
                >
                  {{ r.name[$i18n.locale] }}
                </div>
              </div>
              <div class="text-sm text-gray-500">
                {{ $tc("legal_acts", d.acts.length, { count: d.acts.length }) }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div
                class="text-sm text-gray-900"
                v-for="(p, pi) in d.declarers"
                :key="pi"
              >
                {{ p.last_name }} {{ p.first_name }}
              </div>
            </td>
          </tr>
        </tbody>
      </table>




  
  </div>
 </model-viewer>   
</template>
<script>

import _ from 'lodash';
import IconDown from '../../../components/icons/down';
import ListSearchInput from '../../../components/inputs/list-search';
import CheckBoxInput from '../../../components/inputs/checkbox';
import PersonInput from '../../../components/inputs/person';
import moment from 'moment/min/moment-with-locales';
import ActionButton from '../shared/consultation/components/action-button';
import ModelViewer from '../../../components/base/model-viewer';

export default {
  components: {ModelViewer, ActionButton, IconDown, ListSearchInput, CheckBoxInput, PersonInput},
  data() {
    return {
      state: {
        requester_type_open: false
      },
    
    }
  },
  computed: {
    show_crh_for_crt_warning() {
      if(this.consultation.registers.includes(1) && !this.consultation.registers.includes(2) && this.consultation.person.dod !== null) {
        return true;
      } else {
        return false;
      }
    },
    consultation: function() {
      return this.$store.getters.consultation(this.$route.params.id);
    
    },
    notary_list() {
      let self = this;

      if(this.consultation.study.type !== 'be' || this.$store.state.state.study === null || this.$store.state.state.study.id === 999) return [];

      let notaries = _.filter(this.$store.state.meta.users, function(u) {

        return u.study_id === self.$store.state.state.study.id && u.active === true;
      });

      return _.map(notaries, function(n) {
        return {
          id: n.id,
          label: n.last_name + ' ' + n.first_name,
          tag: n.role_id === 1 ? 'notary' : 'clerk'
        };
      });

    },
    study_list() {
      let self = this;
      let studies = _.filter(this.$store.state.meta.studies, function(s) {
        if(self.$store.state.state.user.role_id === 3) {
          // study users have access to all studies...
          return s.id !== 999;
        }

        return s.id === self.$store.state.state.user.study_id;
      });

      return _.map(studies, function(s) {
        return {
          id: s.id,
          label: s.name,
          info: ''
        };
      });
    },
    country_list() {
      let self = this;
      return _.map(this.$store.state.meta.countries, function(c) {
        return {
          id: c.id,
          label: c.name[self.$i18n.locale] + ' [' + c.id + ']',
        }
      })
    },
    country_list_registers() {
      return _.filter(this.country_list, function(c) {
        return ['bg', 'ee', 'hu', 'it', 'lv', 'lu', 'pl', 'pt', 'ro', 'si', 'sk', 'es', 'ch', 'nl', 'fr'].includes(c.id.toLowerCase())
      })
    },

    registers_list() {
      let self = this;
      return _.map(this.$store.state.meta.register_types, function(c) {
        return {
          id: c.id,
          label: c.name[self.$i18n.locale],
          info: c.label[self.$i18n.locale]
        }
      })
    }
  },
  methods: {
    moment(date) {
      return moment(date).locale(this.$route.params.locale);
    },
    close_requester_type() {this.state.requester_type_open = false;},
    select_study(v) {
      let studies = _.filter(this.$store.state.meta.studies, function(s) { return s.id === v});
      if(studies.length === 1) {
        this.$store.commit('state_study', studies[0]);
      }
    },
    select_notary(v) {
      let notaries = _.filter(this.$store.state.meta.users, function(s) { return s.id === v});
      if(notaries.length === 1) {
        this.consultation.notary.be = notaries[0];
      }
    },
    storeConsultation() {
      this.$store.commit('addConsultation', this.consultation);
      this.$router.push('/' + this.$route.params.locale + '/crf/consultations/' + _.last(this.$store.state.data.consultations).consultation_id);
    }
  },
  i18n: {
    messages: {
      en: {
        crh_for_crt_warning: 'This consultation does not include deeds from CRM which might be applicable for the succession',
        do_crh: 'New consultation including CRM',
        master_data: 'Master Data',
        title: 'Consultation {reference}',
        breadcrumb: 'My consultations',
        coming: 'This page is still under construction.  Come back soon!',
        consultation_types: {
          be: 'Belgian study',
          foreign: 'Foreign study',
          privileged: 'Privileged organisation',
          other: 'Other organisation'
        },
        requestor_title: 'Requestor information',
        requestor_info: 'For auditing purposes, all information regarding the consultation is being logged.',
        study_name: 'Study Name',
        notary: 'Clerk / Notary',
        dossier_title: 'Dossier Data',
        dossier_info: 'Data related to the dossier justifying the consultation',
        reference: 'Reference',
        study_address: 'Address',
        title_consultation: 'Search Parameters',
        registers: 'Registers to consult',
        countries_to_search: 'Foreign registers to consult',
        person: 'Person to make consultation for',
        results: 'Search results',
        legal_acts: "1 legal act | {count} legal acts",
        column: {
          dossier: "Dossier",
          study: "Study",
          deed: "Deed",
          declarers: "Declarers",
          repertorium: 'Repertorium',
          notary: 'Notary'
        },
        results_info: 'Results as registered on {date}',
        partner: 'Optionally limit consultation within CRM for partner'
      },
      nl: {
        crh_for_crt_warning: 'Deze consultatie bevat geen gegevens van CRH dewelke van belang kunnen zijn voor de erfopvolging.',
        do_crh: 'Nieuwe consultatie inclusief CRH',
        master_data: 'Kerngegevens',
        title: 'Consultatie {reference}',
        breadcrumb: 'Mijn consultaties',
        coming: 'Deze pagina is nog in opbouw. Kom snel terug!',
        consultation_types: {
          be: 'Belgische studie',
          foreign: 'Buitenlandse studie',
          privileged: 'Organisatie gemachtigd tot uitgebreide opzoeking',
          other: 'Andere organisatie'
        },
        requestor_title: 'Informatie over de aanvrager',
        requestor_info: 'Voor auditdoeleinden wordt alle informatie over de raadpleging bijgehouden.',
        study_name: 'Naam van de studie',
        notary: 'Studiemedewerker / notaris',
        dossier_title: 'Dossiergegevens',
        dossier_info: 'Gegevens met betrekking tot het dossier die de raadpleging rechtvaardigen',
        reference: 'Referentie',
        study_address: 'Adres',
        title_consultation: 'Zoekopdracht',
        registers: 'Te raadplegen registers',
        countries_to_search: 'Opzoeken in buitenlandse registers',
        person: 'Persoon waarvoor raadpleging dient te gebeuren',
        results: 'Zoekresultaten',
        legal_acts: "1 rechtshandeling | {count} rechtshandelingen",
        column: {
          dossier: "Dossier",
          study: "Studie",
          deed: "Akte",
          declarers: "Declaranten",
          repertorium: 'Repertorium',
          notary: 'Notaris'
        },
        results_info: 'Resultaten zoals ingeschreven op {date}',
        partner: '(Optioneel) Beperk consultatie binnen CRH tot overeenkomsten met deze partner:'
      },
      fr: {
        crh_for_crt_warning: 'Cette consultation ne contient aucune donnée de RCH qui pourrait être importante pour la succession.',
        do_crh: 'Nouvelle consultation incluant RCH ',
        master_data: 'Données de base',
        title: 'Consultation {reference}',
        breadcrumb: 'Mes consultations',
        coming: 'Cette page est encore en cours de construction. Reviens bientôt!',
        consultation_types: {
          be: 'Etude belgique',
          foreign: 'Etude étrangère',
          privileged: 'Organisation autorisée à effectuer une recherche approfondie',
          other: 'Autre organisation'
        },
        requestor_title: 'Information sur le demandeur',
        requestor_info: 'Toutes les informations relatives à la consultation sont conservées à des fins d\'audit.',
        study_name: 'Nom de l\'étude',
        notary: 'Clerc / notaire',
        dossier_title: 'Données du dossier',
        dossier_info: 'Données relatives au dossier justifiant la consultation',
        reference: 'Référence',
        study_address: 'Adresse',
        title_consultation: 'Paramètres de recherche',
        registers: 'Registres à consulter',
        countries_to_search: 'Des registres internationaux à consulter',
        person: 'Personne à consulter',
        results: 'Résultats de la recherche',
        legal_acts: "1 acte juridique | {count} actes juridiques",
        column: {
          dossier: "Dossier",
          study: "Studie",
          deed: "Acte",
          declarers: "Declarers",
          repertorium: 'Répertoire',
          notary: 'Notaire'
        },
        results_info: 'Résultats comment inscrits le {date}',
        partner: '(Facultatif) Limitez la consultation au sein de CRH aux accords avec ce partenaire:'
      }
    }
  }
}
</script>