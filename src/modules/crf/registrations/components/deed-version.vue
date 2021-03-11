<template>
  <div class="relative" v-click-outside="close" :key="active_version">
    <div
      :class="'text-white hover:text-white bg-' + $t('states.' + status(viewed_version-1) + '.color') + '-600 px-3 py-1 uppercase flex flex-row items-center rounded-full  cursor-pointer'"
      v-on:click="state.open = !state.open"
    >
     
      <div>{{$t('version')}} {{viewed_version}}</div>
      <div :class="'ml-4 bg-white text-' + $t('states.' + status(viewed_version-1) + '.color') + '-500 text-xs uppercase px-1 rounded'">
          {{$t('states.' + status(viewed_version-1) + '.label')}}
      </div>
      <icon-down class="w-3 h-3 ml-2"></icon-down>
    </div>
    <div
      class="z-10 absolute right-0 bg-white rounded shadow overflow-hidden w-96"
      v-if="state.open"
    >
      <div
        v-for="(s, i) in deed_global.staging"
        class="flex flex-row items-center justify-between py-2 px-4 cursor-pointer hover:bg-gray-50 transition-all"
        :key="i"
        v-on:click="$router.push('/' + $route.params.locale + '/crf/registrations/' + $route.params.id + '/versions/' + (i+1)); state.open = false;"
      >
        <div class="whitespace-nowrap text-xs">{{$t('option', {version: (i+1), created: moment(s.created).format('LLL')})}}</div>
        <div :class="'whitespace-nowrap border border-' + $t('states.' + status(i) + '.color') + '-500 text-' + $t('states.' + status(i) + '.color') + '-500 text-xs uppercase px-1 rounded'">
          {{$t('states.' + status(i) + '.label')}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash';
import IconDown from '../../../../components/icons/down';
import moment from 'moment/min/moment-with-locales';

export default {
  components: {IconDown},
  data() {
    return {
      state: {
        open: false,
      },
    };
  },
  methods: {
    close() {
      this.state.open = false;
    },
    status(i) {
      if(i+1 === this.active_version) {
        return 'active';
      } 
      
      return this.deed_global.staging[i].status;
    },
    moment(date) {
      return moment(date).locale(this.$route.params.locale);
    }
  },
  computed: {
    deed_global: function () {
      let self = this;
      let deeds = _.filter(this.$store.state.data.deeds, function (el) {
        return parseInt(el.deed_id) === parseInt(self.$route.params.id);
      });
      if (deeds.length === 0) return null;

      return _.first(deeds);
    },
    deed: function () {
      let self = this;
      let deed = this.deed_global;

      if (parseInt(self.$route.params.version) > 0) {
        deed =
          deed.staging[parseInt(self.$route.params.version) - 1].deed || null;
      }

      return deed;
    },
    active_version: function() {
      return _.findLastIndex(this.deed_global.staging, function (s) { return s.status === "promoted"; }) + 1;
    },
    viewed_version: function() {
      return this.$route.params.version ? (parseInt(this.$route.params.version) || this.active_version) : this.active_version;
    },
  },
  i18n: {
    messages: {
      en: {
        states: {
          active: {
            label: 'Active',
            color: 'green'
          },
          pending: {
            label: 'In review',
            color: 'yellow'
          },
          promoted: {
            label: 'History',
            color: 'blue'
          },
          rejected: {
            label: 'Rejected',
            color: 'gray'
          },
          
        },
        option: 'Version {version} of {created}',
        version: 'Version'
      },
      nl: {
        states: {
          active: {
            label: 'Actief',
            color: 'green'
          },
          pending: {
            label: 'In review',
            color: 'yellow'
          },
          promoted: {
            label: 'Vorige versie',
            color: 'blue'
          },
          rejected: {
            label: 'Verworpen',
            color: 'gray'
          },
          
        },
        option: 'Versie {version} van {created}',
        version: 'Versie'
      },
      fr: {
        states: {
          active: {
            label: 'Actif',
            color: 'green'
          },
          pending: {
            label: 'à valider',
            color: 'yellow'
          },
          promoted: {
            label: 'Version précédente',
            color: 'blue'
          },
          rejected: {
            label: 'Rejetté',
            color: 'gray'
          },
          
        },
        option: 'Version {version} du {created}',
        version: 'Version'
      }
    }
  }
};
</script>