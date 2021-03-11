<template>
  <div>
    <div class="flex flex-row items-center text-gray-500 mb-2">
      <router-link :to="'/' + $route.params.locale + '/crf'"
        ><icon-home class="w-4 h-4"></icon-home>
      </router-link>
      <div class="mx-3 text-gray-400">/</div>
    </div>
    <div class="flex flex-row items-center justify-between mb-4">
      <h1 class="text-2xl text-indigo-800 font-semibold">{{ $t("title") }}</h1>
      <div class="flex flex-row items-stretch">
        <filter-lens-component
          class="mr-2 w-96 flex-grow"
          v-on:label-updated="update_lens_label"
        ></filter-lens-component>
        <search-input v-model="filter_search" class="mr-6"></search-input>
        <router-link
          :to="'/' + $route.params.locale + '/crf/registrations/create'"
          class="font-semibold text-sm text-white bg-indigo-800 rounded shadow hover:bg-indigo-700 py-2 px-4 flex flex-row items-center"
        >
          <icon-add class="w-4 h-4 mr-2"></icon-add>
          <div>{{ $t("btn_new") }}</div>
        </router-link>
      </div>
    </div>

    <div
      class="bg-blue-100 text-xs font-semibold text-blue-600 px-4 py-2 mb-4 shadow rounded"
      v-if="$store.state.state.user.role_id === 3 && filters.admin === false"
    >
      {{ $t("support_view_info") }}
    </div>


    <filter-register-tabs class="mt-2"></filter-register-tabs>

    <div class="flex flex-col" v-if="mydeeds.length > 0">
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
                <div class="text-gray-400"> {{ $t("column.repertorium") }}</div>
              </div>
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <div class="flex flex-col">
                <div> {{ $t("column.study") }}</div>
                <div class="text-gray-400"> {{ $t("column.notary") }}</div>
              </div>
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <div class="flex flex-col">
                <div> {{ $t("column.deed") }}</div>
                <div class="text-gray-400"> </div>
              </div>
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <div class="flex flex-col">
                <div> {{ $t("column.declarers") }}</div>
                <div class="text-gray-400"> </div>
              </div>
            </th>
            <th scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500">
              <div class="flex flex-row items-center justify-end">
              
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 h-96 overflow-y-auto">
          <tr
            v-for="d in deeds"
            :key="d.deed_id"
            class="hover:bg-gray-50 transition-all"
            
          >
            
            <td class="px-6 py-4 whitespace-nowrap cursor-pointer " v-on:click="navigate(d)">
              <div class="flex flex-row items-center justify-between">
                <div class="flex flex-col">
                  <div class="text-sm text-gray-900 flex flex-row items-center">
                    <div>{{ d.reference }}</div>
                    <div
                  :class="
                    'bg-' +
                    $t('status.' + getStatus(d) + '.color') +
                    '-100 px-3 py-1 text-xs ml-2 rounded-full text-' +
                    $t('status.' + getStatus(d) + '.color') +
                    '-600 font-semibold'
                  "
                >
                  {{ $t("status." + getStatus(d) + ".label") }}
                </div>
                </div>
                  <div class="text-sm text-gray-500">{{ d.repertorium }}</div>
                </div>
                
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap cursor-pointer" v-on:click="navigate(d)">
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
            <td class="px-6 py-4 whitespace-nowrap cursor-pointer" v-on:click="navigate(d)">
              <div class="text-sm text-gray-900 flex flex-row items-center">
                <div>{{ moment(d.deed_date).format('LL') }}</div>
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
            <td class="px-6 py-4 whitespace-nowrap cursor-pointer text-sm text-gray-500" v-on:click="navigate(d)">
              <div
                class="text-sm text-gray-900"
                v-for="(p, pi) in d.declarers"
                :key="pi"
              >
                {{ p.last_name }} {{ p.first_name }}
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div class="flex flex-row items-center justify-end">
                <action-button :deed="d"></action-button>
                </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex flex-row items-center justify-between mt-2">
        <div class="flex flex-row items-center">
          <div v-on:click="download()"
               class="font-semibold text-sm text-white bg-gray-500 rounded shadow hover:bg-gray-700 py-2 px-4 flex flex-row items-center cursor-pointer">
               <icon-download class="w-4 h-4 mr-2"></icon-download>
               <div>Export</div></div>
        <div class="font-semibold text-xs text-gray-500 ml-6">
          {{
            $t("displaying", {
              from: (page - 1) * rpp + 1,
              to: (page - 1) * rpp + deeds.length,
              total: mydeeds.length,
            })
          }}
        </div>
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
              {{ $t("page", { page, total: Math.ceil(mydeeds.length / rpp) }) }}
            </div>
            <div
              v-if="page < alldeeds.length"
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
import _ from "lodash";
import moment from 'moment/min/moment-with-locales';
import SearchInput from "../../../components/inputs/search";
import IconAdd from "../../../components/icons/add";
import IconEmpty from "../../../components/icons/empty";
import IconDownload from "../../../components/icons/download";
import FilterLensComponent from "./components/filter-lens";
import IconHome from "../../../components/icons/home";
import ActionButton from '../shared/deed/components/action-button';
import FilterRegisterTabs from '../components/filter-register-tabs';
import Excel from 'exceljs';
import * as fs from 'file-saver';

export default {
  components: {
    SearchInput,
    IconAdd,
    IconEmpty,
    IconHome,
    IconDownload,
    FilterLensComponent,
    ActionButton,
    FilterRegisterTabs
  },
  data() {
    return {
      filters: {
        search: this.$route.query.search || "",
        lens: {
          label: ''
        }
      },

    };
  },
  methods: {
    update_lens_label(v) {
      this.filters.lens.label = v;
    },
    download() {
      let self = this;
      let workbook = new Excel.Workbook();

      workbook.creator = 'Fednot';
      workbook.created = new Date();

      let register = this.$t('all_registers');
      if(this.filter_register !== null) {
        register = this.$store.getters.meta('register_types', this.filter_register).name[this.$route.params.locale] + ' - ' + this.$store.getters.meta('register_types', this.filter_register).label[this.$route.params.locale];
      }

      
      
      
      

      let deedsSheet = workbook.addWorksheet(this.$t('excel.sheets.deeds.title'));
      deedsSheet.getRow(1).getCell(1).value = this.$t('excel.sheets.deeds.columns.study');
      deedsSheet.getRow(1).getCell(2).value = this.$t('excel.sheets.deeds.columns.notary');
      deedsSheet.getRow(1).getCell(3).value = this.$t('excel.sheets.deeds.columns.deed_date');
      deedsSheet.getRow(1).getCell(4).value = this.$t('excel.sheets.deeds.columns.registration_date');
      deedsSheet.getRow(1).getCell(5).value = this.$t('excel.sheets.deeds.columns.reference');
      deedsSheet.getRow(1).getCell(6).value = this.$t('excel.sheets.deeds.columns.repertorium');
      deedsSheet.getRow(1).getCell(7).value = this.$t('excel.sheets.deeds.columns.naban');
      deedsSheet.getRow(1).getCell(8).value = this.$t('excel.sheets.deeds.columns.status');
      deedsSheet.getRow(1).getCell(9).value = this.$t('excel.sheets.deeds.columns.invoiced');
      deedsSheet.getRow(1).getCell(10).value = this.$t('excel.sheets.deeds.columns.legal_acts');
      deedsSheet.getRow(1).getCell(11).value = this.$t('excel.sheets.deeds.columns.registers');
      deedsSheet.getRow(1).getCell(12).value = this.$t('excel.sheets.deeds.columns.declarers');

      deedsSheet.getRow(1).font = { name: 'Calibri',  size: 8, bold: true , color: {argb: 'FFFFFFFF'}};

      deedsSheet.getRow(1).eachCell(function(c){
        c.border = {
          bottom: {style:'thin'},
        };
        c.fill = {
          type: 'pattern',
          pattern:'solid',
          fgColor:{argb:'FF758599'}
        };
      });

      deedsSheet.columns = [
        { header: this.$t('excel.sheets.deeds.columns.study'), key: 'study' },
        { header: this.$t('excel.sheets.deeds.columns.notary'), key: 'notary' },
        { header: this.$t('excel.sheets.deeds.columns.deed_date'), key: 'deed_date' },
        { header: this.$t('excel.sheets.deeds.columns.registration_date'), key: 'registration_date' },
        { header: this.$t('excel.sheets.deeds.columns.reference'), key: 'reference' },
        { header: this.$t('excel.sheets.deeds.columns.repertorium'), key: 'repertorium' },
        { header: this.$t('excel.sheets.deeds.columns.naban'), key: 'naban' },
        { header: this.$t('excel.sheets.deeds.columns.status'), key: 'status' },
        { header: this.$t('excel.sheets.deeds.columns.invoiced'), key: 'invoiced' },
        { header: this.$t('excel.sheets.deeds.columns.legal_acts'), key: 'legal_acts' },
        { header: this.$t('excel.sheets.deeds.columns.registers'), key: 'registers' },
        { header: this.$t('excel.sheets.deeds.columns.declarers'), key: 'declarers' },
      ];
      
      _.each(deedsSheet.addRows(
        _.map(this.mydeeds, function(d) {
          let has_naban = 
            _.filter(d.acts, function(a) { return [2,6,7].includes(a.id);}).length > 0;

          return {
            study: d.study.type === 'be' ? d.study.be.name : d.study.foreign.name,
            notary: d.study.type === 'be' ? d.notary.be.last_name + ' ' + d.notary.be.first_name : d.notary.foreign.name,
            deed_date: new Date(moment(d.deed_date)),
            registration_date: new Date(moment(d.registration_date)),
            reference: d.reference,
            repertorium: d.repertorium,
            naban: has_naban ? d.naban : '',
            invoiced: d.billable ? self.$t('yes') : self.$t('no'),
            legal_acts: d.acts.length,
            registers: _.map(d.registers, function(r) { return r.name[self.$route.params.locale]}).join(','),
            status: self.$t('status.' + self.getStatus(d) + '.label'),
            declarers: _.map(d.declarers, function(dc) { return dc.last_name + ' ' + dc.first_name; }).join(',')
          }
        })
      ), function(row) {
        row.font = { name: 'Calibri',  size: 8, bold: false , color: {argb: 'FF758599'}};
      });

      deedsSheet.views = [
        {state: 'frozen', xSplit: 0, ySplit: 1, activeCell: 'A2'}
      ];

      let actsSheet = workbook.addWorksheet(this.$t('excel.sheets.acts.title'));

      actsSheet.getRow(1).getCell(1).value = this.$t('excel.sheets.acts.columns.study');
      actsSheet.getRow(1).getCell(2).value = this.$t('excel.sheets.acts.columns.notary');
      actsSheet.getRow(1).getCell(3).value = this.$t('excel.sheets.acts.columns.deed_date');
      actsSheet.getRow(1).getCell(4).value = this.$t('excel.sheets.acts.columns.registration_date');
      actsSheet.getRow(1).getCell(5).value = this.$t('excel.sheets.acts.columns.act_reference');
      actsSheet.getRow(1).getCell(6).value = this.$t('excel.sheets.acts.columns.reference');
      actsSheet.getRow(1).getCell(7).value = this.$t('excel.sheets.acts.columns.repertorium');
      actsSheet.getRow(1).getCell(8).value = this.$t('excel.sheets.acts.columns.naban');
      actsSheet.getRow(1).getCell(9).value = this.$t('excel.sheets.acts.columns.status');
      actsSheet.getRow(1).getCell(10).value = this.$t('excel.sheets.acts.columns.invoiced');
      actsSheet.getRow(1).getCell(11).value = this.$t('excel.sheets.acts.columns.register');
      actsSheet.getRow(1).getCell(12).value = this.$t('excel.sheets.acts.columns.registration_type');
      actsSheet.getRow(1).getCell(13).value = this.$t('excel.sheets.acts.columns.declarers');

      actsSheet.getRow(1).font = { name: 'Calibri',  size: 8, bold: true , color: {argb: 'FFFFFFFF'}};
      actsSheet.getRow(1).border = { bottom: {style:'thin'}};
      actsSheet.getRow(1).fill = {type: 'pattern',pattern:'solid', fgColor:{argb:'FF758599'}};
     
      actsSheet.columns = [
        { header: this.$t('excel.sheets.acts.columns.study'), key: 'study' },
        { header: this.$t('excel.sheets.acts.columns.notary'), key: 'notary' },
        { header: this.$t('excel.sheets.acts.columns.deed_date'), key: 'deed_date' },
        { header: this.$t('excel.sheets.acts.columns.registration_date'), key: 'registration_date' },
        { header: this.$t('excel.sheets.acts.columns.act_reference'), key: 'act_reference' },
        { header: this.$t('excel.sheets.acts.columns.reference'), key: 'reference' },
        { header: this.$t('excel.sheets.acts.columns.repertorium'), key: 'repertorium' },
        { header: this.$t('excel.sheets.acts.columns.naban'), key: 'naban' },
        { header: this.$t('excel.sheets.acts.columns.status'), key: 'status' },
        { header: this.$t('excel.sheets.acts.columns.invoiced'), key: 'invoiced' },
        { header: this.$t('excel.sheets.acts.columns.register'), key: 'register' },
        { header: this.$t('excel.sheets.acts.columns.registration_type'), key: 'registration_type' },
        { header: this.$t('excel.sheets.acts.columns.declarers'), key: 'declarers' },
      ];

      _.each(actsSheet.addRows(
        _.flatten(_.map(this.mydeeds, function(d) {
          let has_naban = 
            _.filter(d.acts, function(a) { return [2,6,7].includes(a.id);}).length > 0;

          return _.map(d.acts, function(a) {
            return {
              study: d.study.type === 'be' ? d.study.be.name : d.study.foreign.name,
              notary: d.study.type === 'be' ? d.notary.be.last_name + ' ' + d.notary.be.first_name : d.notary.foreign.name,
              deed_date: new Date(moment(d.deed_date)),
              registration_date: new Date(moment(d.registration_date)),
              act_reference: self.$store.getters.meta('register_types', a.register).name[self.$route.params.locale] + '-' + a.reference,
              reference: d.reference,
              repertorium: d.repertorium,
              naban: has_naban ? d.naban : '',
              invoiced: d.billable ? self.$t('yes') : self.$t('no'),
              legal_acts: d.acts.length,
              register: self.$store.getters.meta('register_types', a.register).name[self.$route.params.locale],
              registration_type: self.$store.getters.meta('registration_types', a.id).label[self.$route.params.locale],
              status: self.$t('status.' + (self.getStatus(d) === 'partially_cancelled' ? (a.cancelled_at === null ? 'registered' : 'cancelled') : self.getStatus(d)) + '.label'),
              declarers: _.map(a.data.declarers, function(dc) { return dc.last_name + ' ' + dc.first_name; }).join(',')
            }
          })


          
        }))
      ), function(row) {
        row.font = { name: 'Calibri',  size: 8, bold: false , color: {argb: 'FF758599'}};
      });
      
      actsSheet.views = [
        {state: 'frozen', xSplit: 0, ySplit: 1, activeCell: 'A2'}
      ];

      let metaSheet = workbook.addWorksheet(this.$t('excel.sheets.meta.title'));
      metaSheet.getRow(1).getCell(1).value = this.$t('excel.sheets.meta.columns.intro');
      metaSheet.getRow(3).getCell(2).value = this.$t('excel.sheets.meta.columns.register');
      metaSheet.getRow(4).getCell(2).value = this.$t('excel.sheets.meta.columns.lens');
      metaSheet.getRow(5).getCell(2).value = this.$t('excel.sheets.meta.columns.search');
      metaSheet.getRow(6).getCell(2).value = this.$t('excel.sheets.meta.columns.search_date');
      metaSheet.getRow(3).getCell(3).value = register;
      metaSheet.getRow(4).getCell(3).value = this.filters.lens.label;
      metaSheet.getRow(5).getCell(3).value = this.filters.search;
      metaSheet.getRow(6).getCell(3).value = new Date();

      for(let i = 0; i < 7; i++) {
        metaSheet.getRow(i).font = { name: 'Calibri',  size: 8, bold: false};
      }


      


     
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, this.$t('excel.sheet.title')+'-'+new Date().valueOf()+'.xlsx');
      });
    },

    moment(date) {
      return moment(date).locale(this.$route.params.locale);
    },
    navigate(d) {
      if(this.$store.state.state.user.role_id === 3 && this.filter_lens === 'work') {
        let version = _.findIndex(d.staging, function(s) { return s.status === 'pending'; }) + 1;

        this.$router.push('/' + this.$route.params.locale + '/crf/registrations/' + d.deed_id + '/versions/' + version);
      } else {
        this.$router.push('/' + this.$route.params.locale + '/crf/registrations/' + d.deed_id)
      }

    },
    getStatus: function (deed) {
      if (
        _.filter(deed.staging, function (el) {
          return el.status === "pending";
        }).length > 0
      )
        return "in_review";

      if (
        _.filter(deed.acts, function (a) {
          return a.cancelled_at === null;
        }).length === 0
      )
        return "cancelled";

      if (
        _.filter(deed.acts, function (a) {
          return a.cancelled_at !== null;
        }).length > 0
      )
        return "partially_cancelled";

      return "registered";
    },
  },
  computed: {
    filter_search: {
      get: function () {
        return this.$route.query.search || '';
      },
      set: function (n) {
        if(this.$route.query.search !== n) {
          this.$router.push({query: _.merge({}, this.$route.query, {search: n})});
        }
      }
    },
    filter_register() {
      return this.$route.query.register || null
    },
    filter_lens() {
      return this.$route.query.lens || 'my'
    },
    
    rpp() {
      return this.$store.state.settings.rpp;
    },
    register_options() {
      let self = this;
      return _.map(this.$store.state.meta.register_types, function (r) {
        return {
          id: r.id,
          label: r.name[self.$i18n.locale],
          info: r.label[self.$i18n.locale],
        };
      });
    },
    page: function () {
      let page = parseInt(this.$route.query.page) || 1;
      if (page > this.alldeeds.length + 1) {
        page = this.alldeeds.length;
      }
      return page;
    },
    mydeeds: function () {
      let self = this;

      let deeds = _.filter(this.$store.state.data.deeds, function (el) {
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
          case 'work':
            if(self.$store.state.state.user.role_id === 3) {
              return _.filter(el.staging, function(s) { return s.status === 'pending' }).length > 0;
            } else {
              // this view is only available to admins...
              return false;
            }
          case 'reg':
            return el.user.id === parseInt(self.filter_lens.split('-')[1])
    
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
        deeds = _.filter(deeds, function (d) {
          return (
            _.filter(d.acts, function (a) {
              return a.register === parseInt(self.filter_register);
            }).length > 0
          );
        });
      }

      if (self.filter_search.trim().length > 0) {
        // apply the search filter...

        deeds = _.filter(deeds, function (d) {
          return (
            d.reference
              .toLowerCase()
              .includes(self.filter_search.toLowerCase()) ||
            d.repertorium
              .toLowerCase()
              .includes(self.filter_search.toLowerCase()) ||
            _.filter(d.declarers, function (p) {
              if (
                self.filter_search.toLowerCase().trim().length === 11 &&
                parseInt(p.rrn) ===
                  parseInt(self.filter_search.toLowerCase().trim())
              ) {
                return true;
              }

              return (
                p.first_name
                  .toLowerCase()
                  .includes(self.filter_search.toLowerCase()) ||
                p.last_name
                  .toLowerCase()
                  .includes(self.filter_search.toLowerCase())
              );
            }).length > 0 ||
            _.filter(d.acts, function(a) {
              return self.$store.getters.meta('register_types', a.register).name[self.$i18n.locale].toLowerCase() + '-' +a.reference.toLowerCase() === self.filter_search.toLowerCase()              
            }).length > 0
          );
        });
      }

      return _.orderBy(deeds, ["deed_id"], ["desc"]);
    },
    alldeeds: function () {
      return _.chunk(this.mydeeds, this.rpp);
    },
    deeds: function () {
      let self = this;

      return _.map(
        this.alldeeds[this.page - 1],

        function (el) {
          el.declarers = [];
          el.registers = [];
          _.each(el.acts, function (a) {
            _.each(a.data.declarers, function (d) {
              el.declarers.push(d);
            });

            el.registers.push(
              _.filter(self.$store.state.meta.register_types, function (el) {
                return el.id === a.register;
              })[0]
            );
          });
          el.declarers = _.uniqBy(el.declarers, "rrn");
          el.registers = _.uniqBy(el.registers, "id");
          return el;
        }
      );
    },
  },
  i18n: {
    messages: {
      en: {
        yes: 'Yes',
        no: 'No',
        excel: {
          sheet: {
            title: 'My CRF Registrations'
          },
          sheets: {
            meta: {
              title: 'About',
              columns: {
                intro: 'Data in this sheet has been fetched using the following parameters:',
                register: 'Register',
                lens: 'Lens',
                search: 'Text searched',
                search_date: 'Search date'
              }
            },
            deeds: {
              title: 'Deeds',
              columns: {
                study: 'Study',
                notary: 'Notary',
                deed_date: 'Deed Date',
                registration_date: 'Registration Date',
                reference: 'Dossier Reference',
                repertorium: 'Repertorium',
                naban: 'Naban reference',
                invoiced: 'Invoiced',
                legal_acts: 'Number of legal acts',
                registers: 'Registers',
                declarers: 'Declarers',
                status: 'Registration Status'
              }
            },
            acts: {
              title: 'Legal Acts',
              columns: {
                study: 'Study',
                notary: 'Notary',
                deed_date: 'Deed Date',
                registration_date: 'Registration Date',
                act_reference: 'Registration Reference',
                reference: 'Dossier Reference',
                repertorium: 'Repertorium',
                naban: 'Naban reference',
                invoiced: 'Invoiced',
                legal_acts: 'Number of legal acts',
                register: 'Register',
                declarers: 'Declarers',
                status: 'Registration Status',
                registration_type: 'Legal act'
              }
            }
          }
        },
        no_data:
          "We searched for the stars, but couldn't find any records matching your criteria",
        all_registers: "All registers",
        title: "My registrations",
        btn_new: "New Registration",
        legal_acts: "1 legal act | {count} legal acts",
        column: {
          dossier: "Dossier",
          repertorium: 'Repertorium',
          study: "Study",
          notary: 'Notary',
          deed: "Deed",
          declarers: "Declarers",
        },
        support_view_info:
          "As a support magician, you have access to all deeds registered within the system if you enable the option `Search for all studies` above",
        displaying: "Displaying {from} to {to} of {total} records",
        page: "Page {page} of {total}",
        admin_view: "Search for all studies",
        status: {
          registered: {
            label: "Registered",
            color: "green",
          },
          in_review: {
            label: "Changes pending review",
            color: "yellow",
          },
          cancelled: {
            label: "Cancelled",
            color: "red",
          },
          partially_cancelled: {
            label: "Partially cancelled",
            color: "blue",
          },
        },
      },
      nl: {
        yes: 'Ja',
        no: 'Neen',
        excel: {
          sheet: {
            title: 'Mijn CRF Inschrijvingen'
          },
          sheets: {
            meta: {
              title: 'Over',
              columns: {
                intro: 'De data in deze excel werden opgehaald met de volgende parameters:',
                register: 'Register',
                lens: 'Lens',
                search: 'Zoektekst',
                search_date: 'Zoekdatum'
              }
            },
            deeds: {
              title: 'Aktes',
              columns: {
                study: 'Studie',
                notary: 'Notaris',
                deed_date: 'Aktedatum',
                registration_date: 'Inschrijvingsdatum',
                reference: 'Dossierreferentie',
                repertorium: 'Repertorium',
                naban: 'Nabanreferentie',
                invoiced: 'Te factureren',
                legal_acts: 'Aantal rechtshandelingen',
                registers: 'Registers',
                declarers: 'Declaranten',
                status: 'Inschrijvingsstatus'
              }
            },
            acts: {
              title: 'Rechtshandelingen',
              columns: {
                study: 'Studie',
                notary: 'Notaris',
                deed_date: 'Aktedatum',
                registration_date: 'Inschrijvingsdatum',
                act_reference: 'Documentreferentie',
                reference: 'Dossierreference',
                repertorium: 'Repertorium',
                naban: 'Nabanreferentie',
                invoiced: 'Te factureren',
                legal_acts: 'Aantal rechtshandelingen',
                register: 'Register',
                declarers: 'Declaranten',
                status: 'Registratiestatus',
                registration_type: 'Rechtshandeling'
              }
            }
          }
        },
        no_data:
          "We searched for the stars, but couldn't find any records matching your criteria",
        all_registers: "Alle registers",
        title: "Mijn inschrijvingen",
        btn_new: "Nieuwe inschrijving",
        legal_acts: "1 rechtshandeling | {count} rechtshandelingen",
        column: {
          dossier: "Dossier",
          repertorium: 'Repertorium',
          study: "Studie",
          notary: 'Notaris',
          deed: "Akte",
          declarers: "Declaranten",
        },
        support_view_info:
          "Als een ondersteuningsmagiër, heb je toegang tot alle dossiers geregistreerd binnen het systeem als je de optie `Zoek voor alle studiën`bovenaan aanvinkt",
        displaying: "Records {from} tot {to} van {total} worden getoond",
        page: "Pagina {page} van {total}",
        admin_view: "Zoek over alle studiën",
        status: {
          registered: {
            label: "Ingeschreven",
            color: "green",
          },
          in_review: {
            label: "Wijzigingen in review",
            color: "yellow",
          },
          cancelled: {
            label: "Geannuleerd",
            color: "red",
          },
          partially_cancelled: {
            label: "Gedeeltelijk geannuleerd",
            color: "blue",
          },
        },
      },
      fr: {
        yes: 'Oui',
        no: 'Non',
        excel: {
          sheet: {
            title: 'Mes inscriptions RCF'
          },
          sheets: {
            meta: {
              title: 'Sur',
              columns: {
                intro: 'Les données dans ce fichier ont été cherché avec les paramètres suivants:',
                register: 'Registre',
                lens: 'Lentille',
                search: 'Texte à rechercher',
                search_date: 'Date de la recherche'
              }
            },
            deeds: {
              title: 'Actes',
              columns: {
                study: 'Studie',
                notary: 'Notaire',
                deed_date: 'Date de l\'acte',
                registration_date: 'Date de l\'inscription',
                reference: 'Référence du dossier',
                repertorium: 'Répertoire',
                naban: 'Référence NABAN',
                invoiced: 'À facturer',
                legal_acts: 'Nombre d\'actes juridiques',
                registers: 'Registres',
                declarers: 'Déclarants',
                status: 'Statut de l\'inscription'
              }
            },
            acts: {
              title: 'Actes juridiques',
              columns: {
                study: 'Studie',
                notary: 'Notaire',
                deed_date: 'Date de l\'acte',
                registration_date: 'Date de l\'inscription',
                act_reference: 'Référence du document',
                reference: 'Référence du dossier',
                repertorium: 'Répertoire',
                naban: 'Référence NABAN',
                invoiced: 'À facturer',
                legal_acts: 'Nombre d\'actes juridiques',
                register: 'Registre',
                declarers: 'Déclarants',
                status: 'Statue de l\'inscription',
                registration_type: 'Acte juridique'
              }
            }
          }
        },
        no_data:
          "We searched for the stars, but couldn't find any records matching your criteria",
        all_registers: "Tous registres",
        title: "Mes inscriptions",
        btn_new: "Nouvelle inscription",
        legal_acts: "1 acte juridique | {count} actes juridiques",
        column: {
          dossier: "Dossier",
          repertorium: 'Repertorium',
          study: "Étude",
          notary: 'Notaire',
          deed: "Acte",
          declarers: "Declarers",
        },
        support_view_info:
          "Comme magicien support, vous pouvez accéder tous les actes enregistré dans le système si vous cochez l'option `Rechercher dans tous les études ci-dessus",
        displaying: "Inscriptions {from} à {to} de {total} sont affichées",
        page: "Page {page} de {total}",
        admin_view: "Rechercher dans tous les études",
        status: {
          registered: {
            label: "Enregistré",
            color: "green",
          },
          in_review: {
            label: "Modifications en attente",
            color: "yellow",
          },
          cancelled: {
            label: "Annulée",
            color: "red",
          },
          partially_cancelled: {
            label: "Annulée partiellement",
            color: "blue",
          },
          go_to_review:
            "Cette inschription a des modifications en attente de validation.  Clicquez ici pour les valider",
        },
      },
    },
  },
};
</script>