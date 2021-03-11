<template>
  <div>
    <div class="flex flex-row items-center text-gray-500 mb-2">
          
        <router-link :to="'/' + $route.params.locale + '/crf'"><svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" viewBox="0 0 140 140" class="stroke-current w-4 h-4"><g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)"><path d="M3.753,13.944v8.25h6v-6a1.5,1.5,0,0,1,1.5-1.5h1.5a1.5,1.5,0,0,1,1.5,1.5v6h6v-8.25" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><path d="M.753,12.444,10.942,2.255a1.5,1.5,0,0,1,2.122,0L23.253,12.444" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></g></svg> </router-link>     
        <div class="mx-3 text-gray-400">/</div>
    </div>
    <div class="flex flex-row items-center justify-between mb-4">
      <h1 class="text-2xl text-indigo-800 font-semibold">{{ $t("title") }}</h1>
      <div class="flex flex-row items-stretch">
        <filter-lens-component
          class="mr-2 w-96 flex-grow"
        ></filter-lens-component>
        <search-input v-model="filters.search" class="mr-6"></search-input>
        <router-link
          :to="'/' + $route.params.locale + '/crf/consultations/create'"
          class="font-semibold text-sm text-white bg-indigo-800 rounded shadow hover:bg-indigo-700 py-2 px-4 flex flex-row items-center"
        >
          <icon-add class="w-4 h-4 mr-2"></icon-add>
          <div>{{ $t("btn_new") }}</div>
        </router-link>
      </div>
    </div>

    <filter-register-tabs class="mt-2"></filter-register-tabs>

    <div class="flex flex-col" v-if="myconsultations.length > 0">
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
                <div> {{ $t("column.dossier") }}</div>
                
              </div>
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              
            >
              <div class="flex flex-col">
                <div v-if="$store.state.state.user.role_id === 3"> {{ $t("column.study") }}</div>
                <div :class="{
                'text-gray-400': $store.state.state.user.role_id === 3,
              }"> {{ $t("column.notary") }}</div>
              </div>
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <div class="flex flex-col">
                <div> {{ $t("column.consultation_date") }}</div>
                <div class="text-gray-400"> </div>
              </div>
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <div class="flex flex-col">
                <div> {{ $t("column.person") }}</div>
                <div class="text-gray-400"> {{ $t("column.partner") }}</div>
              </div>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 h-96 overflow-y-auto">
          <tr
            v-for="c in consultations"
            :key="c.consultation_id"
            class="hover:bg-gray-50 transition-all"
            
          >
            
            <td class="px-6 py-4 whitespace-nowrap cursor-pointer " v-on:click="navigate(c)">
              {{ c.reference }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap cursor-pointer" v-on:click="navigate(c)">
              <div class="text-sm text-gray-900" v-if="$store.state.state.user.role_id === 3">
                <div v-if="c.study.type === 'be'">{{ c.study.be.name }}</div>
                <div v-else-if="c.study.type === 'foreign'">
                  {{ c.study.foreign.name }}
                </div>
                <div v-else>
                  ToDo: implement studies abroad and other organisations
                </div>
              </div>
              <div class="text-sm"
              :class="{
                'text-gray-500': $store.state.state.user.role_id === 3,
                'text-gray-900': $store.state.state.user.role_id !== 3
              }">
                <div v-if="c.study.type === 'be'">
                  {{ c.notary.be.first_name }} {{ c.notary.be.last_name }}
                </div>
                <div v-else-if="c.study.type === 'foreign'">
                  {{ c.notary.foreign.name }}
                </div>
                <div v-else>
                  ToDo: implement studies abroad and other organisations
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap cursor-pointer" v-on:click="navigate(c)">
              <div class="text-sm text-gray-900 flex flex-row items-center">
                <div>{{ moment(c.consultation_date).format('LLL') }}</div>
                <div
                  :class="'text-' + $store.getters.meta('register_types', r).color + '-600 bg-' + $store.getters.meta('register_types', r).color + '-100 px-2 py-1 text-xs ml-2 rounded-full'"
                  
                  v-for="r in c.registers"
                  :key="r"
                >
                  {{$store.getters.meta('register_types', r).name[$i18n.locale]}}
                </div>
              </div>
              <div class="text-sm text-gray-500">
                {{ $tc("results", c.results.length, { count: c.results.length }) }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap cursor-pointer text-sm text-gray-500" v-on:click="navigate(d)">
                <div class="flex flex-col">
                  <div>{{ c.person.last_name }} {{ c.person.first_name }}</div>
                  <div class="text-sm text-gray-500">
                     <div v-if="c.partner !== null && c.partner.id !== null">{{ c.partner.last_name || '' }} {{ c.partner.first_name || '' }}</div>
                  </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex flex-row items-center justify-end">
                <action-button :consultation="c"></action-button>
              </div>
            </td>
            
          </tr>
        </tbody>
      </table>
      <div class="flex flex-row items-center justify-between mt-2">
        <div class="font-semibold text-xs text-gray-500 ml-6">
          {{
            $t("displaying", {
              from: (page - 1) * rpp + 1,
              to: (page - 1) * rpp + consultations.length,
              total: myconsultations.length,
            })
          }}
        </div>

        <div class="flex flex-row items-center">
          <div
            class="bg-white shadow rounded overflow-hidden flex flex-row items-stretch text-sm"
          >
            <div
              v-if="page > 1"
              v-on:click="$router.push({ query: { page: page - 1 } })"
              class="px-2 py-1 cursor-pointer text-gray-500 hover:text-gray-700 transition-all hover:bg-gray-50 flex flex-row items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:svgjs="http://svgjs.com/svgjs"
                viewBox="0 0 140 140"
                class="stroke-current w-3 h-3"
              >
                <g
                  transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)"
                >
                  <path
                    d="M16.25,23.25,5.53,12.53a.749.749,0,0,1,0-1.06L16.25.75"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></path>
                </g>
              </svg>
            </div>
            <div class="px-4 py-2 bg-gray-50 text-gray-400 font-semibold">
              {{ $t("page", { page, total: Math.ceil(myconsultations.length / rpp) }) }}
            </div>
            <div
              v-if="page < allconsultations.length"
              v-on:click="$router.push({ query: { page: page + 1 } })"
              class="px-2 py-1 cursor-pointer text-gray-500 hover:text-gray-700 transition-all hover:bg-gray-50 flex flex-row items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:svgjs="http://svgjs.com/svgjs"
                viewBox="0 0 140 140"
                class="stroke-current w-3 h-3"
              >
                <g
                  transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)"
                >
                  <path
                    d="M5.5.75,16.22,11.47a.749.749,0,0,1,0,1.06L5.5,23.25"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                  ></path>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="bg-white flex flex-col items-center py-24 shadow rounded"
    >
      <icon-empty class="w-16 h-16 text-gray-400"></icon-empty>
      <div class="text-gray-500 text-xl mt-6">{{ $t("no_data") }}</div>
    </div>


  </div>
    
</template>
<script>

import _ from 'lodash';

import IconAdd from '../../../components/icons/add';
import IconEmpty from '../../../components/icons/empty';
import moment from 'moment/min/moment-with-locales';
import FilterLensComponent from './components/filter-lens';
import SearchInput from '../../../components/inputs/search';
import FilterRegisterTabs from '../components/filter-register-tabs';

import ActionButton from '../shared/consultation/components/action-button';

export default {
  components: {ActionButton, IconAdd, IconEmpty, FilterLensComponent, SearchInput, FilterRegisterTabs},
  data() {
    return {
      filters: {
        search: this.$route.query.search || "",
      }
    }
  },
  beforeMount() {
    if(!this.$store.state.settings.consultation_history_enabled) {
      this.$router.push('/' + this.$route.params.locale + '/crf/consultations/create');
    }
  },
  methods: {
    moment(data) {
      return moment(data).locale(this.$route.params.locale);
    },
    navigate(c) {
      
        this.$router.push('/' + this.$route.params.locale + '/crf/consultations/' + c.consultation_id)

    },
  },
  watch: {
    "filters.search": function (n, o) {
      this.$router.push({
        query: _.merge({}, this.$route.query, { search: n }),
      });
    },
  },
  computed: {
    rpp() {
      return this.$store.state.settings.rpp;
    },
    page: function () {
      let page = parseInt(this.$route.query.page) || 1;
      if (page > this.allconsultations.length + 1) {
        page = this.allconsultations.length;
      }
      return page;
    },
    filter_register() {
      return this.$route.query.register || null
    },
    filter_lens() {
      return this.$route.query.lens || 'my'
    },
    myconsultations() {
      let self = this;

      let consultations = _.filter(this.$store.state.data.consultations, function (el) {
        // let's apply our lens...
        switch(self.filter_lens.split('-')[0]) {
          case 'all':
            if(self.$store.state.state.user.role_id === 3) {
              return true;
            } else {
              // we can only see everything from our study...
              return el.study.type === 'be' && el.study.be.id === self.$store.state.state.study.id;
            }
          case 'study':
            let study_id = parseInt(self.filter_lens.split('-')[1]);
            // ToDo: should we validate the study_id here?
            return el.study.type === 'be' && el.study.be.id === study_id;
          case 'not':
            let not_id = parseInt(self.filter_lens.split('-')[1]);
            // ToDo: should we validate the study_id here?
            return el.study.type === 'be' && el.notary.be.id === not_id;
          case 'my':
          default:
            return el.user.id === self.$store.state.state.user.id;
        }

      });

      if (
        _.map(self.$store.state.meta.register_types, function (r) {
          return r.id;
        }).includes(parseInt(self.filter_register))
      ) {
        consultations = _.filter(consultations, function (c) {
          return c.registers.includes(parseInt(self.filter_register));
        });
      }

      if (self.filters.search.trim().length > 0) {
        consultations = _.filter(consultations, function(c) {
          return c.reference
              .toLowerCase()
              .includes(self.filters.search.trim().toLowerCase()) ||
            parseInt(c.person.rrn) === parseInt(self.filters.search.toLowerCase().trim()) ||
            c.person.first_name
                .toLowerCase()
                .includes(self.filters.search.toLowerCase()) ||
            c.person.last_name
                .toLowerCase()
                .includes(self.filters.search.toLowerCase());
        });
      }

      return _.orderBy(consultations, ["consultation_id"], ["desc"]);


    },
    allconsultations: function () {
      return _.chunk(this.myconsultations, this.rpp);
    },
    consultations() {
      return this.allconsultations[this.page - 1];
    },
  },
  i18n: {
    messages: {
      en: {
        title: 'My Consultations',
        coming: 'This page is still under construction.  Come back soon!',
        btn_new: 'New consultation',
        no_data: "We searched for the stars, but couldn't find any records matching your criteria",
        column: {
          dossier: 'Dossier',
          study: 'Requestor',
          notary: 'User',
          consultation_date: 'Consultation',
          person: 'Person',
          partner: 'Partner (CRM only)'
        },
        results: '1 search result | {count} search results',
        displaying: "Displaying {from} to {to} of {total} records",
        page: "Page {page} of {total}",
      },
      nl: {
        title: 'Mijn consultaties',
        coming: 'Deze pagina is nog in opbouw. Kom snel terug!',
        btn_new: 'Nieuwe consultatie',
        no_data: "We searched for the stars, but couldn't find any records matching your criteria",
        column: {
          dossier: 'Dossier',
          study: 'Opvrager',
          notary: 'Medewerker',
          consultation_date: 'Consultatie',
          person: 'Persoon',
          partner: 'Partner (enkel CRH)'
        },
        results: '1 zoekresultaat | {count} zoekresultaten',
        displaying: "Records {from} tot {to} van {total} worden getoond",
        page: "Pagina {page} van {total}",
      },
      fr: {
        title: 'Mes consultations',
        coming: 'Cette page est encore en cours de construction. Reviens bientôt!',
        btn_new: 'Nouvelle consultation',
        no_data: "We searched for the stars, but couldn't find any records matching your criteria",
        column: {
          dossier: 'Dossier',
          study: 'Demandeur',
          notary: 'Collaborateur',
          consultation_date: 'Consultation',
          person: 'Personne',
          partner: 'Partenaire (RCM uniquement)'
        },
        results: '1 résultat | {count} résultats',
        displaying: "Inscriptions {from} à {to} de {total} sont affichées",
        page: "Page {page} de {total}",
      }
    }
  }
}
</script>