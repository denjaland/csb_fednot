<template>
  <div
    class="shadow rounded flex flex-col hover:bg-white transition-all"
    :class="{
      'bg-white': open,
      'bg-gray-100': !open,
    }"
  >
    <div
      class="px-8 py-4 flex flex-row items-center justify-between cursor-pointer"
      v-on:click="$emit(open ? 'close' : 'open')"
      :class="{
        'border-b': open        
      }"
    >
      <div class=" flex flex-row items-center">


        <icon-check-yes
          class="w-6 h-6 mr-5 -ml-11 transition-all  "
          :class="{
            'text-transparent': !data.is_valid,
            'text-green-600 bg-white shadow-lg rounded-full': data.is_valid
          }"
        >
        </icon-check-yes>
  

        <div :class="'text-' + register_type.color + '-600 bg-' + register_type.color + '-100 px-2 py-1 mr-6 rounded-full'">{{ register_type.name[$i18n.locale] }}</div>
        <div class="flex flex-col">
          <div class="font-semibold flex flex-row items-center">
            <div>{{ act.label[$i18n.locale] }}</div>
            <div class="border border-red-500 rounded ml-2 uppercase text-xs  px-2 text-red-500" v-if="act.cancelled_at !== null">{{$t('deleted', {date: act.cancelled_at})}}</div>
          </div>
          <div class="flex flex-row items-center">
            <div class="mr-2" v-for="(d, i) in data.data.declarers" :key="i"><div v-if="d">{{d.first_name}} {{d.last_name}}</div></div>
          </div>
        </div>
      </div>
      <div class=" flex flex-row items-center">
        <div v-if="act.cancelled_at === null" class="cursor-pointer text-gray-400 hover:text-red-500 font-semibold text-xs mr-6 transition-all" v-on:click="$emit('delact', act)">
          <tooltip-component :tooltip="$t('delete')" color="red"><icon-garbage class="w-4 h-4"></icon-garbage></tooltip-component>
        </div>
        <div v-if="act.cancelled_at !== null" class="cursor-pointer text-gray-400 hover:text-green-500 font-semibold text-xs mr-6 transition-all" v-on:click="$emit('restoreact', act)">
          <tooltip-component :tooltip="$t('restore')" color="green"><icon-revert class="w-4 h-4"></icon-revert></tooltip-component>
        </div>
        <icon-down v-if="open" class="w-4 h-4"></icon-down>
        <icon-right v-else class="w-4 h-4"></icon-right>
        
      </div>
    </div>
    <div class=" transform transition-all duration-150 ease-in-out origin-top"
      :class="{
        'scale-y-0 h-0 ': !open,
        'scale-y-100 p-8': open
      }">
      <component :readonly="false" :is="act.component + '-component'" v-model="data" v-on:addact="addAct" v-on:delact="delAct" :acts="acts"></component>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import DeclarerComponent from "./components/declarer";
import MarriageContractComponent from "./components/marriage-contract";
import SuccessionAgreementComponent from "./components/succession-agreement";
import OwnTestamentComponent from "./components/own-testament";
import OtherDeedComponent from "./components/other-deed";
import TwoDeclarersComponent from "./components/two-declarers";
import ChangeMatrimonialRegimeComponent from "./components/change-matrimonial-regime";
import CheckBoxComponent from "../../../../components/inputs/checkbox";
import IconDown from "../../../../components/icons/down";
import IconRight from "../../../../components/icons/right";
import IconCheckYes from "../../../../components/icons/check_yes";
import IconGarbage from "../../../../components/icons/garbage";
import IconRevert from "../../../../components/icons/revert";
import TooltipComponent from "../../../../components/base/tooltip";

export default {
  components: {
    TooltipComponent,
    DeclarerComponent,
    MarriageContractComponent,
    SuccessionAgreementComponent,
    OwnTestamentComponent,
    OtherDeedComponent,
    TwoDeclarersComponent,
    ChangeMatrimonialRegimeComponent,
    CheckBoxComponent,
    IconDown,
    IconRight,
    IconCheckYes,
    IconGarbage,
    IconRevert
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
    }
  },
  computed: {
    register_type: function () {
      let self = this;
      return _.filter(this.$store.state.meta.register_types, function (el) {
        return el.id === self.act.register;
      })[0];
    },
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
        delete: 'delete',
        restore: 'restore',
        deleted: 'cancelled on {date}'
      },
      nl: {
        delete: 'verwijderen',
        restore: 'herstellen',
        deleted: 'geannuleerd op {date}'
      },
      fr: {
        delete: 'supprimer',
        restore: 'rétablir',
        deleted: 'annulé le {date}'
      }
    }
  }
};
</script>