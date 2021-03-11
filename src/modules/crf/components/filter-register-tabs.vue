<template>
  <div class="grid grid-cols-6 gap-2 lg:gap-6 items-center px-2 lg:px-6 mt-10">
    <tooltip-component class="font-semibold text-xs uppercase whitespace-nowrap" :tooltip="r.label" :color="r.color" v-for="r in registers" :key="r.name">
      <div :class="style(r)" v-on:click="register = r.id" class="transition-all duration-150 col-span-1 flex flex-col items-stretch text-center py-2 bg-gray-50 rounded-t-lg" >
        {{r.name}} 
      </div>
    </tooltip-component>
  </div>
</template>
<script>
import _ from 'lodash';
import TooltipComponent from '../../../components/base/tooltip';
export default {
  components: { TooltipComponent },
  
  methods: {
    style(r) {
      if(parseInt(this.register) === parseInt(r.id)) {
        // active
        return 'bg-' + r.color + '-600 text-white shadow';
      } else {
        // selectable
        return 'cursor-pointer bg-gray-50 text-' + r.color + '-600 hover:bg-' + r.color + '-100';
      }
    }
  },
  computed: {
    register: {
      get: function () {
        return parseInt(this.$route.query.register) || 0;
      },
      set: function (n) {
        if(n === 0 && parseInt(this.$route.query.register) > 0) {
          this.$router.push({query: _.merge({}, this.$route.query, {register: null})});
        } else if(parseInt(this.$route.query.register) !== parseInt(n)) {
          this.$router.push({query: _.merge({}, this.$route.query, {register: n})});
        }
      }
    },
    registers() {
      let self = this;
      let registers = [{
        id: 0,
        name: this.$t('all.name'),
        label: this.$t('all.label'),
        color: 'gray'
      }];
      
      registers.push(..._.map(this.$store.state.meta.register_types, function(r) {
          return {
            id: r.id,
            name: r.name[self.$route.params.locale],
            label: r.label[self.$route.params.locale],
            color: r.color
          }
        })
      ); 

      return registers;
     
    },
    
  },
  i18n: {
      messages: {
        en: {
          all: {
            name: 'All registers',
            label: 'View data from all registers'
          }
        },
        nl: {
          all: {
            name: 'Alle registers',
            label: 'Bekijk data van alle registers'
          }
        },
        fr: {
          all: {
            name: 'Tous registres',
            label: 'Consulter données de tous registres'
          }
        }
      }
    }


}
</script>