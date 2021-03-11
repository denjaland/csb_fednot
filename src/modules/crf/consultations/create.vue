<template>
  <div>
    <div class="flex flex-row items-center text-gray-500 mb-2">
          
        <router-link :to="'/' + $route.params.locale + '/crf'"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" class="stroke-current w-4 h-4"><g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)"><path d="M3.753,13.944v8.25h6v-6a1.5,1.5,0,0,1,1.5-1.5h1.5a1.5,1.5,0,0,1,1.5,1.5v6h6v-8.25" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M.753,12.444,10.942,2.255a1.5,1.5,0,0,1,2.122,0L23.253,12.444" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg> </router-link>     
        <div class="mx-3 text-gray-400">/</div>

        <router-link :to="'/' + $route.params.locale + '/crf/consultations'" v-if="$store.state.settings.consultation_history_enabled">{{$t('breadcrumb')}}</router-link>
        <div class="mx-3 text-gray-400" v-if="$store.state.settings.consultation_history_enabled">/</div>
    </div>
    <div class="flex flex-row items-center justify-between mb-4">

      <h1 class="text-2xl text-indigo-800 font-semibold">{{$t('title')}}</h1>
      
    </div>

    <h2 class="text-xl text-gray-800 font-semibold mb-2">{{$t('master_data')}}</h2>
    <div class="bg-white rounded shadow mb-12 flex-col">
      <div class="flex flex-col">
        <div class="flex flex-col p-8">
          <div class=" flex flex-row items-center justify-between">
            <div class="flex flex-col items-start">
              <div v-if="$store.state.state.user.role_id === 3" class="flex flex-row items-center">
                <div class="relative -ml-3" v-click-outside="close_requester_type">
                  <div class="hover:text-indigo-600 bg-gray-50 px-4 shadow py-2 flex flex-row items-center rounded-full cursor-pointer text-lg leading-6 font-medium text-gray-900 transition-all" v-on:click="state.requester_type_open = !state.requester_type_open">
                    <div>{{$t('consultation_types.' + consultation.study.type)}}</div>
                    <icon-down class="w-3 h-3 ml-2"></icon-down>
                  </div>
                  <div class="z-10 absolute right-0 bg-white rounded shadow overflow-hidden text-indigo-600" v-if="state.requester_type_open">
                    <div v-if="consultation.study.type !== 'be'" class="hover:bg-gray-100 py-2 px-4 cursor-pointer font-semibold whitespace-nowrap"  v-on:click="consultation.study.type = 'be'; close_requester_type()">{{$t('consultation_types.be')}}</div>
                    <div v-if="consultation.study.type !== 'foreign'" class="hover:bg-gray-100 py-2 px-4 cursor-pointer font-semibold whitespace-nowrap"  v-on:click="consultation.study.type = 'foreign'; close_requester_type()">{{$t('consultation_types.foreign')}}</div>
                    <div v-if="consultation.study.type !== 'privileged'" class="hover:bg-gray-100 py-2 px-4 cursor-pointer font-semibold whitespace-nowrap"  v-on:click="consultation.study.type = 'privileged'; close_requester_type()">{{$t('consultation_types.privileged')}}</div>
                    <div v-if="consultation.study.type !== 'other'" class="hover:bg-gray-100 py-2 px-4 cursor-pointer font-semibold whitespace-nowrap"  v-on:click="consultation.study.type = 'other'; close_requester_type()">{{$t('consultation_types.other')}}</div>
                  </div>
                </div>
                
              </div>
              <h3 v-else class="text-lg leading-6 font-medium text-gray-900">
                {{$t('requestor_title')}}
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                {{$t('requestor_info')}}
              </p>
            </div>
            
          </div>
          <div class=" mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700"
              :class="{'text-red-500': !validations.study}"
              >
                {{$t('study_name')}} *
              </label>
              <div class="mt-1">
                <input
                  v-model="$store.state.state.study.name"
                  v-if="$store.state.state.user.role_id !== 3"
                  type="text"
                  readonly
                  class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
                />
                <div v-else> <!-- WE ARE A STUDIEDIENST USER -->
                  <list-search-input :options="study_list" v-on:input="select_study" :value="$store.state.state.study.id" v-if="consultation.study.type === 'be'"></list-search-input>
                  <input
                    v-model="consultation.study.foreign.name"
                    v-if="consultation.study.type === 'foreign'"
                    type="text"
                    class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div class="sm:col-span-3">
              <div  class="flex flex-col" v-if="consultation.study.type === 'be'">
                <div class="flex flex-row items-center justify-between">
                  <label class="block text-sm font-medium text-gray-700"
                  :class="{'text-red-500': !validations.notary}">
                    {{$t('notary')}} *
                  </label>
                </div>
                <div class="mt-1">
                  <list-search-input :options="notary_list" :value="consultation.notary.be === null ? null : consultation.notary.be.id" v-on:input="select_notary"></list-search-input>
                  <input
                    v-model="consultation.notary.foreign.name"
                    v-if="consultation.study.type === 'foreign'"
                    type="text"
                    class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
                  /> 
                </div>
              </div>
              <div v-else>
                TODO: add user information for foreign study, third party or privileged
              </div>
          </div>
        </div>
        <div class=" mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6" v-if="consultation.study.type === 'foreign'">
          <div class="sm:col-span-3">
            <label class="block text-sm font-medium text-gray-700">
              {{$t('study_address')}} *
            </label>
            <div class="mt-1">
              <div class="flex flex-col">
                <div class="flex flex-row items-center py-2">
                  <input
                    v-model="consultation.study.foreign.address.street"
                    v-if="consultation.study.type === 'foreign'"
                    type="text"
                    class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
                    :placeholder="$t('ph_street')"
                  />
                </div>
                <div class="flex flex-row items-center py-2">
                  <input
                    v-model="consultation.study.foreign.address.postal_code"
                    v-if="consultation.study.type === 'foreign'"
                    type="text"
                    class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
                    :placeholder="$t('ph_zip')"
                  />
                  <input
                    v-model="consultation.study.foreign.address.city"
                    v-if="consultation.study.type === 'foreign'"
                    type="text"
                    class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
                    :placeholder="$t('ph_city')"
                  />
                </div>
                <div class="flex flex-col py-2">
                  <list-search-input :options="country_list" v-model="consultation.study.foreign.address.country"></list-search-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col p-8 border-t border-gray-100">
        <div>
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{$t('dossier_title')}}
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{$t('dossier_info')}}
          </p>
        </div>
        <div class=" mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label
              class="block text-sm font-medium text-gray-700"
              :class="{'text-red-500': !validations.reference}"           
            >
              {{$t('reference')}} *
            </label>
            <div class="mt-1">
              <input
                v-model="consultation.reference"
                type="text"
                class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
                :readonly="consultation.person !== null && consultation.person.id !== null"
              />
            </div>
          </div>

        
        </div>
        
        
        </div>
      </div>
    </div>

    <h2 class="text-xl text-gray-800 font-semibold mb-2">{{$t('title_consultation')}}</h2>
    <div class="bg-white rounded shadow flex-col">
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
                :class="{'text-red-500': !validations.registers}"
              >
                {{$t('registers')}} *
              </label>
              <div class="mt-1">
                <list-search-input 
                  :readonly="consultation.person !== null  && consultation.person.id !== null" 
                  :options="registers_list" 
                  :value="consultation.registers" 
                  v-on:input="updateRegisters"
                  :multi="true" 
                  :filter="false"></list-search-input>
              </div>
            </div>
              
            
            <div class="sm:col-span-3">
              <div class="mt-1 flex flex-col" v-if="consultation.registers.includes(1)">
                <label
                class="block text-sm font-medium text-gray-700"
              >
                {{$t('countries_to_search')}}
              </label>
                <list-search-input :options="country_list_registers" v-model="consultation.international.countries" :multi="true"></list-search-input>
              </div>
            </div>
          </div>
          <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700"
              :class="{'text-red-500': !validations.person}"
              > {{$t('person')}} </label>
              <div class="mt-1">
                <person-input v-model="consultation.person" :readonly="!validations.registers || !validations.reference"></person-input>
              </div>
            </div>

            <div class="sm:col-span-3" v-if="consultation.registers.includes(2)">
              <label class="block text-sm font-medium text-gray-700"
              > {{$t('partner')}} </label>
              <div class="mt-1">
                <person-input v-model="consultation.partner" :readonly="!validations.registers || !validations.reference"></person-input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-row mt-4 ">
        <div class="flex flex-row items-stretch">
          <!--div
            
            class="font-semibold text-base bg-gray-100 rounded hover:bg-white py-3 px-6 flex flex-row items-center cursor-pointer"
            v-on:click="Object.assign($data, $options.data())"
          >
            {{$tc('btn_reset')}}
          
          </div-->
        

          <div
            class="font-semibold text-base text-white rounded shadow py-3 px-6 flex flex-row items-center cursor-pointer"
            :class="{
              'cursor-pointer bg-indigo-800 hover:bg-indigo-700': is_valid,
              'cursor-not-allowed bg-indigo-400': !is_valid,
            }"
            v-on:click="storeConsultation"
          >
            {{$tc('btn_consult', consultation.registers.length, {count: consultation.registers.length})}}
          </div>
        </div>
      </div>
  </div>
    
</template>
<script>

import _ from 'lodash';
import IconDown from '../../../components/icons/down';
import ListSearchInput from '../../../components/inputs/list-search';
import CheckBoxInput from '../../../components/inputs/checkbox';
import PersonInput from '../../../components/inputs/person';
import moment from 'moment';


export default {
  components: {IconDown, ListSearchInput, CheckBoxInput, PersonInput},
  beforeMount() {
    if(this.$route.query.from) {
      let from = this.$store.getters.consultation(this.$route.query.from);
      if(from !== null) {
        this.consultation.reference = _.cloneDeep(from.reference);
        this.consultation.registers = _.cloneDeep(from.registers);
        this.consultation.international = _.cloneDeep(from.international);
        this.consultation.person = _.cloneDeep(from.person);
        this.consultation.partner = _.cloneDeep(from.partner);
      }
    }
    this.consultation.reference = this.$route.query.reference || this.consultation.reference;
    this.consultation.registers = (this.$route.query.registers ? _.map(_.cloneDeep(this.$route.query.registers).split(','), function(e) { return parseInt(e)}) : this.consultation.registers) || this.consultation.registers;
    this.consultation.person = this.$store.getters.meta('people', parseInt(this.$route.query.person)) || this.consultation.person;
  },
  data() {
    return {
      state: {
        requester_type_open: false,
        register_1_selected: false
      },
      consultation: {
        study: {
          type: 'be',

          foreign: {
            name: '',
            address: {
              street: '',
              postal_code: '',
              city: '',
              country: ''
            }
          }
        },
        notary: {
          be: this.$store.state.state.user.role_id === 3 ? null : this.$store.state.state.user,
          foreign: {
            name: "",
          },
        },
        reference: '',
        registers: [],
        international: {
          countries: []
        },
        person: null,
        partner: null,
        consultation_date: moment(),
      }
    }
  },
  computed: {
    validations() {
      return {
        study: !((this.consultation.study.type === 'be' && this.$store.state.state.study.id === 999) || (this.consultation.study.type === 'foreign' && this.consultation.study.foreign.name.trim().length < 2)),
        notary: !((this.consultation.study.type === 'be' && this.consultation.notary.be === null) || (this.consultation.study.type === 'foreign' && this.consultation.notary.foreign.name.trim().length < 2)),
        reference: this.consultation.reference.trim().length >= 2,
        person: this.consultation.person && this.consultation.person.id !== null,
        registers: this.consultation.registers.length > 0
      }
    },
    is_valid() {
      return this.validations.study && this.validations.notary && this.validations.reference && this.validations.person && this.validations.registers;
    },
    notary_list() {
      let self = this;

      if(this.consultation.study.type !== 'be' || this.$store.state.state.study === null || this.$store.state.state.study.id === 999) return [];

      let notaries = _.filter(this.$store.state.meta.users, function(u) {
        if(self.$store.state.state.user.role_id === 3) {
          return u.study_id === self.$store.state.state.study.id && u.active === true;
        } else {
          return u.id === self.$store.state.state.user.id;
        }
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
      if(!this.is_valid) return false;
      this.$store.commit('addConsultation', this.consultation);
      this.$router.push('/' + this.$route.params.locale + '/crf/consultations/' + _.last(this.$store.state.data.consultations).consultation_id);
    },
    updateRegisters(value) {
      if(value.includes(1) && !value.includes(2) && !this.state.register_1_selected === true) {
        // value.push(2);
      }
      
      this.consultation.registers = value;
      
      this.state.register_1_selected = this.consultation.registers.includes(1);
      
    }
  },
  i18n: {
    messages: {
      en: {
        master_data: 'Master Data',
        title: 'New Consultation',
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
        btn_reset: 'Reset',
        btn_consult: 'Consult the register | Consult {count} registers',
        ph_street: 'Street and number',
        ph_zip: 'Postal code',
        ph_city: 'City',
        partner: 'Optionally limit consultation within CRM for partner'
      },
      nl: {
        master_data: 'Kerngegevens',
        title: 'Nieuwe Consultatie',
        breadcrumb: 'Mijn consultaties',
        coming: 'Deze pagina is nog in opbouw. Kom snel terug!',
        consultation_types: {
          be: 'Belgische studie',
          foreign: 'Buitenlandse studie',
          privileged: 'Organisatie gemachtigd tot uitgebreide opzoeking',
          other: 'Andere organisatie'
        },
        requestor_title: 'Informatie over de aanvrager',
        requestor_info: 'Voor auditdoeleinden wordt alle informatie over de consultatie bijgehouden.',
        study_name: 'Naam van de studie',
        notary: 'Studiemedewerker / notaris',
        dossier_title: 'Dossiergegevens',
        dossier_info: 'Gegevens met betrekking tot het dossier die de consultatie rechtvaardigen',
        reference: 'Referentie',
        study_address: 'Adres',
        title_consultation: 'Zoekopdracht',
        registers: 'Te consulteren registers',
        countries_to_search: 'Opzoeken in buitenlandse registers',
        person: 'Persoon waarvoor consultatie dient te gebeuren',
        btn_reset: 'Reset',
        btn_consult: 'Consulteer het register | Consulteer {count} registers',
        ph_street: 'Straat en nummer',
        ph_zip: 'Postcode',
        ph_city: 'Gemeente',
        partner: '(Optioneel) Beperk consultatie binnen CRH tot overeenkomsten met deze partner:'
      },
      fr: {
        master_data: 'Données de base',
        title: 'Nouveaux Consultation',
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
        btn_reset: 'Reset',
        btn_consult: 'Consulter le registre | Consulter {count} registres',
        ph_street: 'Rue et numéro',
        ph_zip: 'Code postale',
        ph_city: 'City',
        partner: '(Facultatif) Limitez la consultation au sein de CRH aux accords avec ce partenaire:'
      }
    }
  }
}
</script>