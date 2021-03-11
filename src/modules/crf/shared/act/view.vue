<template>
  <div
    class=" shadow rounded flex flex-col hover:bg-white transition-all overflow-hidden"
    :class="{
      'bg-white': open,
      'bg-gray-100': !open,
    }"
  >
    
    <div
      class="flex flex-row items-center cursor-pointer"
      v-on:click="$emit(open ? 'close' : 'open')"
      :class="{
        'border-b': open        
      }"
    >
      
      <div class="px-8 py-4 flex flex-row items-center justify-between flex-grow">
        <div class="flex flex-row items-center">
          
          <div :class="'text-' + (act.cancelled_at === null ? register_type.color : 'gray') + '-600 bg-' + (act.cancelled_at === null ? register_type.color : 'gray') + '-100 px-2 py-1 mr-6 rounded-full text-xs font-semibold'">{{ register_type.name[$i18n.locale] }}-{{act.reference}}</div>
          
          <div class="flex flex-col" :class="{
                  'text-gray-400': act.cancelled_at !== null
                }">
            <div class="font-semibold flex flex-row items-center">
              <div class="text-gray-600 bg-white border px-2 mr-2 rounded-full text-xs font-semibold'">
                {{$store.getters.meta('registration_types', act.id).code || act.id}}
              </div>
              <div class="font-semibold flex flex-row items-center">
                <div >{{ act.label[$i18n.locale] }}</div>
                <div class="border border-red-500 rounded ml-2 uppercase text-xs  px-2 text-red-500" v-if="act.cancelled_at !== null && act.cancelled_at.trim().length > 0">{{$t('deleted', {date: act.cancelled_at})}}</div>
              </div>
            
            </div>
            <div class="flex flex-row items-center">
              <div class="mr-2" v-for="(d, i) in data.data.declarers" :key="i"><div v-if="d">{{d.first_name}} {{d.last_name}}</div></div>
            </div>
          </div>
        </div>
      
        <div class="flex flex-row items-center">
          <div v-if="modus === 'review' && ['updated', 'deleted', 'added', 'restored'].includes(modif_status)"
            class="font-semibold text-sm px-3 py-1 rounded-full mr-6 text-white shadow"
            :class="{
              'bg-yellow-600': modif_status === 'updated',
              'bg-red-600': modif_status === 'deleted',
              'bg-green-600': modif_status === 'added',
              'bg-blue-600': modif_status === 'restored'
            }">
            {{$t('modif.' + modif_status)}}
          </div>
          
          
          <svg
            v-if="!open"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns:svgjs="http://svgjs.com/svgjs"
            viewBox="0 0 140 140"
            class="w-4 h-4 stroke-current"
          >
            <g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
              <path
                d="M5.5.75,16.22,11.47a.749.749,0,0,1,0,1.06L5.5,23.25"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              ></path>
            </g>
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns:svgjs="http://svgjs.com/svgjs"
            viewBox="0 0 140 140"
            class="w-4 h-4 stroke-current"
          >
            <g transform="matrix(5.833333333333333,0,0,5.833333333333333,0,0)">
              <path
                d="M23.25,7.311,12.53,18.03a.749.749,0,0,1-1.06,0L.75,7.311"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              ></path>
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div class=" transform transition-all duration-150 ease-in-out origin-top"
    :class="{
      'scale-y-0 h-0 ': !open,
      'scale-y-100 p-8': open
    }">
      <component :is="act.component + '-component'" v-model="data" :acts="acts" :readonly="true" :active_act="active_act" :modus="modus"></component>
    </div>
  </div>
</template>
<script>
import _ from "lodash";

import DeclarerComponent from './components/declarer';
import MarriageContractComponent from './components/marriage-contract';
import SuccessionAgreementComponent from './components/succession-agreement';
import OwnTestamentComponent from './components/own-testament';
import OtherDeedComponent from "./components/other-deed";
import TwoDeclarersComponent from "./components/two-declarers";
import ChangeMatrimonialRegimeComponent from "./components/change-matrimonial-regime";

export default {
  components: {
    DeclarerComponent,
    MarriageContractComponent,
    SuccessionAgreementComponent,
    OwnTestamentComponent,
    OtherDeedComponent,
    TwoDeclarersComponent,
    ChangeMatrimonialRegimeComponent
  },
  data() {
    return {
      data: this.act,
    };
  },
  props: {
    act: {
      required: true,
    },
    open: {
      required: true,
    },
    acts: {
      required: true
    },
    active_act: {
      required: true
    },
    modus: {
      required: false,
      default: 'view'
    }
  },
  computed: {
    register_type: function () {
      let self = this;
      return _.filter(this.$store.state.meta.register_types, function (el) {
        return el.id === self.act.register;
      })[0];
    },
    modif_status() {
      if(this.modus === 'view') return '';

      if(this.active_act === null) return 'added';

      if(this.act.cancelled_at === null && this.active_act.cancelled_at !== null) return 'restored';

      if(this.act.cancelled_at !== null && this.active_act.cancelled_at === null) return 'deleted';

      if(!_.isEqual(this.act.data, this.active_act.data)) return 'updated';

      return '';

    }
  },
  methods: {
    addAct(registration_type, data = {}) {
      this.$emit('addact', registration_type, data);
    },
    delAct(act) {
      this.$emit('delact', act);
    }
  },
  i18n: {
    messages: {
      en: {
        deleted: 'Cancelled on {date}',
        modif: {
          updated: 'Updated',
          deleted: 'Deleted',
          added: 'Added',
          restored: 'Restored'
        }
      },
      nl: {
        deleted: 'Geannuleerd op {date}',
        modif: {
          updated: 'Gewijzigd',
          deleted: 'Verwijderd',
          added: 'Toegevoegd',
          restored: 'Hersteld'
        }
      },
      fr: {
        deleted: 'Annulé le {date}',
        modif: {
          updated: 'Mis à jour',
          deleted: 'Supprimé',
          added: 'Ajouté',
          restored: 'Rétabli'
        }
      }
    }
  }
};
</script>