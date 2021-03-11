<template>
  <div class="flex flex-col">
    <h2 class="text-xl text-gray-800 font-semibold mb-2">{{$t('master_data')}}</h2>

    <div class="bg-white rounded shadow mb-12 flex-col">
      <div class="flex flex-col">
        <div class="flex flex-col p-8">
          <div class=" flex flex-row items-center justify-between">
            <div class="flex flex-col items-start">
              <div v-if="$store.state.state.user.role_id === 3" class="flex flex-row items-center">
                <div class="relative -ml-3" v-click-outside="close_study_type">
                  <div class="hover:text-indigo-600 bg-gray-50 px-4 shadow py-2 flex flex-row items-center rounded-full cursor-pointer text-lg leading-6 font-medium text-gray-900 transition-all" v-on:click="state.study_type_open = !state.study_type_open">
                    <div>{{$t('study_types.' + deed.study.type)}}</div>
                    <icon-down class="w-3 h-3 ml-2"></icon-down>
                  </div>
                  <div class="z-10 absolute right-0 bg-white rounded shadow overflow-hidden text-indigo-600" v-if="state.study_type_open">
                    <div v-if="deed.study.type !== 'be'" class="hover:bg-gray-100 py-2 px-4 cursor-pointer font-semibold whitespace-nowrap"  v-on:click="deed.study.type = 'be'; close_study_type()">{{$t('study_types.be')}}</div>
                    <div v-if="deed.study.type !== 'foreign'" class="hover:bg-gray-100 py-2 px-4 cursor-pointer font-semibold whitespace-nowrap"  v-on:click="deed.study.type = 'foreign'; close_study_type()">{{$t('study_types.foreign')}}</div>
                    <div v-if="deed.study.type !== 'other'" class="hover:bg-gray-100 py-2 px-4 cursor-pointer font-semibold whitespace-nowrap"  v-on:click="deed.study.type = 'other'; close_study_type()">{{$t('study_types.other')}}</div>
                  </div>
                </div>
                <check-box-input class="ml-6" :value="deed.admin.allow_all_notaries" v-on:input="deed.admin.allow_all_notaries = !deed.admin.allow_all_notaries" v-if="$store.state.settings.allow_all_notaries_for_support && deed.study.type === 'be' && $store.state.state.user.role_id === 3">
                  {{$t('allow_all_notaries')}}
                </check-box-input>
              </div>
              <h3 v-else class="text-lg leading-6 font-medium text-gray-900">
                {{$t('study_title')}}
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                {{$t('study_info')}}
              </p>
            </div>
            
          </div>
          <div class=" mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div class="sm:col-span-3">
              <label class="block text-sm font-medium text-gray-700"
                :class="{
                  'text-red-500': !validations.study,         
                }"
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
                  <list-search-input :options="study_list" v-on:input="select_study" :value="$store.state.state.study.id" v-if="deed.study.type === 'be'"></list-search-input>
                  <input
                    v-model="deed.study.foreign.name"
                    v-if="deed.study.type === 'foreign'"
                    type="text"
                    class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div class="sm:col-span-3">
              <div class="flex flex-row items-center justify-between">
                <label class="block text-sm font-medium text-gray-700"
                :class="{
                'text-red-500': !validations.notary,
                }">
                  {{$t('notary')}} *
                </label>
              </div>
              <div class="mt-1">
                <list-search-input :options="notary_list" :value="deed.notary.be === null ? null : deed.notary.be.id" v-on:input="select_notary" v-if="deed.study.type === 'be'"></list-search-input>
                <input
                  v-model="deed.notary.foreign.name"
                  v-if="deed.study.type === 'foreign'"
                  type="text"
                  class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
                /> 
            </div>
          </div>
        </div>
        <div class=" mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6" v-if="deed.study.type === 'foreign'">
          <div class="sm:col-span-3">
            <label class="block text-sm font-medium text-gray-700">
              {{$t('study_address')}} *
            </label>
            <div class="mt-1">
              <div class="flex flex-col">
                <div class="flex flex-row items-center py-2">
                  <input
                    v-model="deed.study.foreign.address.street"
                    v-if="deed.study.type === 'foreign'"
                    type="text"
                    class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
                    placeholder="Straat en nummer"
                  />
                </div>
                <div class="flex flex-row items-center py-2">
                  <input
                    v-model="deed.study.foreign.address.postal_code"
                    v-if="deed.study.type === 'foreign'"
                    type="text"
                    class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
                    placeholder="Postcode"
                  />
                  <input
                    v-model="deed.study.foreign.address.city"
                    v-if="deed.study.type === 'foreign'"
                    type="text"
                    class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
                    placeholder="Stad"
                  />
                </div>
                <div class="flex flex-col py-2">
                  <list-search-input :options="country_list" v-model="deed.study.foreign.address.country"></list-search-input>
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
              class="block text-sm font-medium"
              :class="{
                'text-red-500': !validations.reference,
              }"
            >
              {{$t('reference')}} *
            </label>
            <div class="mt-1">
              <input
                v-model="deed.reference"
                type="text"
                class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
                :readonly="deed.acts.length > 0"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              class="block text-sm font-medium text-gray-700"
              :class="{
                'text-red-500': !validations.repertorium,
              }"
            >
              {{$t('repertorium')}} <span v-if="is_repertorium_required">*</span>
            </label>
            <div class="mt-1">
              <input
                v-model="deed.repertorium"
                type="text"
                class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
              />
            </div>
          </div>
        </div>
        <div class=" mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label
              class="block text-sm font-medium text-gray-700"
              :class="{
                'text-red-500': !validations.deed_date,
              }"
            >
              {{$t('deed_date')}} *
            </label>
            <div class="mt-1">
              <input
                v-model="deed.deed_date"
                type="date"
                :max="today"
                class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
              />
            </div>
          </div>
          <div class="sm:col-span-3" v-if="$store.state.state.user.role_id === 3">
            <label
              class="block text-sm font-medium text-gray-700"
              :class="{
                'text-red-500': !validations.registration_date,
              }"
            >
              {{$t('registration_date')}}
            </label>
            <div class="mt-1">
              <input
                v-model="deed.registration_date"
                type="date"
                :max="today"
                class="border-b focus:border-indigo-500 block w-full sm:text-sm border-gray-300 outline-none transition-all"
              />
            </div>
          </div>
        </div>
        <div class=" mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6" v-if="$store.state.state.user.role_id === 3">
          <div class="sm:col-span-3">
        
            <div class="mt-1">
              <check-box-input :value="deed.billable" v-on:input="deed.billable = readonly ? deed.billable : !deed.billable" :readonly="false">
                {{$t('billable')}}
              </check-box-input>
            
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
            :class="{'bg-red-500': !validations.acts_count}"
          >
            {{ deed.acts.length }}
          </div>
        </h2>
        <div class="flex flex-row items-center">
          <button v-if="deed.deed_id !== null && !all_is_cancelled" class="outline-none hover:outline-none font-semibold text-sm text-white bg-red-800 rounded shadow hover:bg-red-700 py-2 px-4 flex flex-row items-center mr-2" v-on:click.prevent="cancel_all()">{{$t('cancel_all')}}</button>
          <legal-act-select
            v-on:selected="addAct"
            :acts="deed.acts"
            v-if="deed.reference.trim().length >= 2 && deed.acts.length > 0"
          ></legal-act-select>
        </div>
      </div>

      <div class="bg-white rounded shadow p-8 text-center" v-if="deed.acts.length === 0">
        <div v-if="deed.reference.trim().length < 2">
          {{$t('add_act_info_reference')}}
        </div>
        <div v-else class="flex flex-col items-center">
          {{$t('add_act_info')}}
            <legal-act-select
              class="mt-4"
              v-on:selected="addAct"
              :acts="deed.acts"
              v-if="deed.reference.trim().length >= 2"
            ></legal-act-select>
        </div>
      </div>

      <create-act
        class="mt-2"
        :act="act"
        :acts="deed.acts"
        :open="state.selected_act === i"
        v-for="(act, i) in deed.acts"
        :key="act.act_id"
        v-on:open="state.selected_act = i"
        v-on:close="state.selected_act = null"
        v-on:addact="addAct"
        v-on:delact="delAct"
        v-on:restoreact="restoreAct"
        :readonly="act.cancelled_at !== null"
      ></create-act>
  </div>
</template>


<script>

import _ from 'lodash';
import moment from "moment";
import IconDown from '../../../../../components/icons/down';
import CheckBoxInput from '../../../../../components/inputs/checkbox';
import ListSearchInput from '../../../../../components/inputs/list-search';
import LegalActSelect from './legalact-select';
import CreateAct from '../../act/create';
import InputComponent from '../../../../../components/inputs/input'

export default {
  components: {IconDown, CheckBoxInput, ListSearchInput, LegalActSelect, CreateAct, InputComponent},
  props: {
    value: {
      required: true
    }
  },
  data() {
    return {
      state: {
        study_type_open: false,
        selected_act: null,
      },
      deed: _.cloneDeep(this.value)
    }
  },
  computed: {
    all_is_cancelled() {
      return _.filter(this.deed.acts, function(a) { return a.cancelled_at === null; }).length === 0;
    },
    validations() {
      return {
        study: !((this.deed.study.type === 'be' && this.$store.state.state.study.id === 999) || (this.deed.study.type === 'foreign' && this.deed.study.foreign.name.trim().length < 2)),
        notary: !((this.deed.study.type === 'be' && this.deed.notary.be === null) || (this.deed.study.type === 'foreign' && this.deed.notary.foreign.name.trim().length < 2)),
        reference: this.deed.reference.trim().length >= 2,
        repertorium: !this.is_repertorium_required || this.deed.repertorium.trim().length >= 2,
        deed_date: this.deed.deed_date.trim().length === 10,
        registration_date: this.deed.registration_date.trim().length === 10,
        acts_count: this.deed.acts.length > 0,
        acts_all_valid: _.filter(this.deed.acts, function (el) { return !el.is_valid; }).length === 0
      }
    },
    is_repertorium_required() {
      return _.filter(this.deed.acts, function (el) { return el.repertorium_required; }).length > 0;
    },
    is_valid: function () {
      return this.validations.study && 
        this.validations.notary &&
        this.validations.reference &&
        this.validations.repertorium &&
        this.validations.deed_date &&
        this.validations.registration_date &&
        this.validations.acts_count &&
        this.validations.acts_all_valid
    },
    today() {
      return moment().format('YYYY-MM-DD')
    },
    notary_list() {
      let self = this;

      if(this.deed.study.type !== 'be' || this.$store.state.state.study === null || this.$store.state.state.study.id === 999) return [];

      let notaries = _.filter(this.$store.state.meta.users, function(u) {

        if(self.$store.state.settings.allow_all_notaries_for_support && self.deed.admin.allow_all_notaries && self.$store.state.state.user.role_id === 3 && self.deed.study.type === 'be') {
          return true;
        }

        return u.role_id === 1 && u.study_id === self.$store.state.state.study.id;
      });

      return _.map(notaries, function(n) {
        return {
          id: n.id,
          label: n.last_name + ' ' + n.first_name,
          sorter: (self.$store.state.state.study.id !== n.study_id ? '3' : (n.active ? '1' : '2')) + n.last_name.toLowerCase() + " " + n.first_name.toLowerCase(),
          tag: self.$store.state.state.study.id !== n.study_id ? 'external' : (n.active ? '' : 'inactive')
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
  },
  methods: {
    close_study_type() { this.state.study_type_open = false; },
    select_study(v) {
      let studies = _.filter(this.$store.state.meta.studies, function(s) { return s.id === v});
      if(studies.length === 1) {
        this.$store.commit('state_study', studies[0]);
      }
    },
    select_notary(v) {
      let notaries = _.filter(this.$store.state.meta.users, function(s) { return s.id === v && s.role_id === 1});
      if(notaries.length === 1) {
        this.deed.notary.be = notaries[0];
      }
    },
    addAct(registration_type, data = null) {
      let type = _.filter(this.$store.state.meta.registration_types, function (
        el
      ) {
        return el.id === registration_type;
      })[0];

      let new_act_id = 1;
      if(this.deed.acts.length > 0) {
        new_act_id = parseInt(_.maxBy(this.deed.acts, function(a) { return parseInt(a.act_id); }).act_id) + 1;
      }

      if(data) {
        this.deed.acts.push(_.merge({}, type, { is_valid: true, act_id: new_act_id, cancelled_at: null }, {data}));
      } else {
        this.deed.acts.push(_.merge({}, type, { is_valid: false, act_id: new_act_id, cancelled_at: null }));
        this.state.selected_act = this.deed.acts.length - 1;
      }
      
    },
    delAct(act) {
      if(this.deed.deed_id) {
        // this is a registered deed, so we can no longer delete, but only cancel...
        this.deed.acts[this.deed.acts.indexOf(act)].cancelled_at = this.today;
      } else {
        this.deed.acts.splice(this.deed.acts.indexOf(act), 1);
      }
      
      this.$forceUpdate();
    },
    restoreAct(act) {
      this.deed.acts[this.deed.acts.indexOf(act)].cancelled_at = null;

      this.$forceUpdate();
    },
    cancel_all() {
      let self = this;
      this.deed.acts = _.map(this.deed.acts, function(a) {
        a.cancelled_at = a.cancelled_at || self.today;
        return a;
      });
    }
  },
  watch: {
    deed: {
      deep: true,
      handler() {
        this.deed.admin.is_valid = this.is_valid;
        this.$emit('input', this.deed);
      }
    }
  },
  beforeMount() {
    if(this.value.deed_id && this.$store.state.state.user.role_id === 3 && this.value.study.type === 'be') {
      this.$store.commit('state_study', this.value.study.be);
    }
  },
  i18n: {
    messages: {
      en: {
        study_types: {
          be: 'Belgian study',
          foreign: 'Foreign study',
          other: 'Other declarer'
        },
        master_data: 'Master Data',
        allow_all_notaries: 'All notaries',
        study_title: 'Study Data',
        study_info: 'Data related to the study making the registration',
        study_name: 'Study Name',
        study_address: 'Address',
        notary: 'Notary',
        dossier_title: 'Deed Information',
        dossier_info: 'Data related to the deed',
        reference: 'Reference',
        repertorium: 'Repertorium',
        deed_date: 'Deed date',
        registration_date: 'Registration date',
        billable: 'Invoice registration',
        legal_acts: 'Legal acts',
        add_act_info: 'To continue, add at least one legal act to the registration',
        add_act_info_reference: 'To continue, enter the dossier reference',
        cancel_all: 'Cancel all registrations'
      },
      nl: {
        study_types: {
          be: 'Belgische studie',
          foreign: 'Buitenlandse studie',
          other: 'Andere aangever'
        },
        allow_all_notaries: 'Alle notarissen',
        master_data: 'Kerngegevens',
        study_title: 'Studiegegevens',
        study_info: 'Gegevens met betrekking tot het kantoor dat de registratie verricht',
        study_name: 'Naam van de studie',
        study_address: 'Adres',
        notary: 'Notaris',
        dossier_title: 'Aktegegevens',
        dossier_info: 'Gegevens met betrekking tot de akte',
        reference: 'Referentie',
        repertorium: 'Repertorium',
        deed_date: 'Aktedatum',
        registration_date: 'Inschrijvingsdatum',
        billable: 'Inschrijving factureren',
        legal_acts: 'Rechtshandelingen',
        add_act_info: 'Voeg minstens één rechtshandeling toe om verder te gaan',
        add_act_info_reference: 'Voer de dossierreferentie in alvorens verder te gaan',
        cancel_all: 'Annuleer alle inschrijvingen'
      },
      fr: {
        study_types: {
          be: 'Etude belgique',
          foreign: 'Etude étrangère',
          other: 'Autre déclarant'
        },
        allow_all_notaries: 'Tous notaires',
        master_data: 'Données de base',
        study_title: 'Données de l\'étude',
        study_info: 'Données relatives à l\'étude qui fait l\'inscription',
        study_name: 'Nom de l\'étude',
        study_address: 'Adresse',
        notary: 'Notaire',
        dossier_title: 'Données de l\'acte',
        dossier_info: 'Données relative à l\'acte',
        reference: 'Référence',
        repertorium: 'Repertorium',
        deed_date: 'Date de l\'acte',
        registration_date: 'Date d\'inscription',
        billable: 'Facturer l\'inscription',
        legal_acts: 'Actes juridiques',
        add_act_info: 'Veuillez ajouter au moins un acte juridique pour continuer',
        add_act_info_reference: 'Remplissez la référence du dossier pour continuer',
        cancel_all: 'Supprimer tous inscriptions'
      }
    }
  }


}
</script>