<template>
  <div>
    <div class=" grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      
      <div class="sm:col-span-3">
        <label class="block text-sm font-medium text-gray-700"
        :class="{'text-red-500': !validations.regime}"
          >{{$t('regime')}} *</label
        >
        <div class="mt-1">
          <list-search-input :options="regimes" v-model="v.data.regime" :readonly="readonly"></list-search-input>
        </div>
      </div>
    </div>
    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div class="sm:col-span-3">
        <label class="block text-sm font-medium text-gray-700"
        :class="{'text-red-500': !validations.partner_1 || !validations.different_partners}">
          {{$t('partner')}} 1 *</label
        >
        <div class="mt-1">
          <person-input v-model="v.data.declarers[0]" :readonly="readonly"></person-input>
        </div>
      </div>
      <div class="sm:col-span-3">
        <label class="block text-sm font-medium text-gray-700"
        :class="{'text-red-500': !validations.partner_2 || !validations.different_partners}">
          {{$t('partner')}} 2 *</label
        >
        <div class="mt-1">
          <person-input v-model="v.data.declarers[1]" :readonly="readonly"></person-input>
        </div>
      </div>
    </div>
    <div v-if="!validations.different_partners" class="mt-2 grid grid-cols-1 gap-y-6 gap-x-1 font-semibold text-red-500 text-sm">
      {{$t('different_partners')}}
    </div>
    <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6" v-if="v.is_valid && $store.state.settings.enable_additional_registration">
    
      <div class="sm:col-span-3">
        <label class="block text-sm font-medium text-gray-700" >
          {{$t('add_regs')}}:</label
        >

        <check-box-input :readonly="readonly" :value="crt_6_partner_1.length === 1" v-on:input="crt_6_partner_1.length === 1 ? $emit('delact', crt_6_partner_1[0]) : $emit('addact', 6, {declarers: [v.data.declarers[0]]})">
            <div class="flex flex-row items-center">
              <div :class="'mr-2 text-xs rounded-full flex flex-row items-center  bg-' + $store.getters.meta('register_types', 1).color + '-100 overflow-hidden text-' + $store.getters.meta('register_types', 1).color + '-800'">
                <div
                  :class="'bg-' + $store.getters.meta('register_types', 1).color + '-400 text-white px-1 text-center w-8 h-full'"
                >
                  {{$store.getters.meta('register_types', 1).name[$i18n.locale]}}
                </div>
                <div
                  :class="'   text-center w-8'"
                >
                  {{$store.getters.meta('registration_types', 6).code | 6}}
                </div>
              </div>
              <label class="block text-xs text-gray-700">
                {{$store.getters.meta('registration_types', 6).label[$i18n.locale]}}
              </label>
            </div>
        </check-box-input>


        <check-box-input class="mt-1" :readonly="readonly" :value="crt_10_partner_1.length === 1" v-on:input="crt_10_partner_1.length === 1 ? $emit('delact', crt_10_partner_1[0]) : $emit('addact', 10, {declarers: [v.data.declarers[0]]})">
            <div class="flex flex-row items-center">
              <div :class="'mr-2 text-xs rounded-full flex flex-row items-center  bg-' + $store.getters.meta('register_types', 1).color + '-100 overflow-hidden text-' + $store.getters.meta('register_types', 1).color + '-800'">
                <div
                  :class="'bg-' + $store.getters.meta('register_types', 1).color + '-400 text-white px-1 text-center w-8 h-full'"
                >
                  {{$store.getters.meta('register_types', 1).name[$i18n.locale]}}
                </div>
                <div
                  :class="'   text-center w-8'"
                >
                  {{$store.getters.meta('registration_types', 10).code | 10}}
                </div>
              </div>
              <label class="block text-xs text-gray-700">
                {{$store.getters.meta('registration_types', 10).label[$i18n.locale]}}
              </label>
            </div>
        </check-box-input>

        <check-box-input class="mt-1" :readonly="readonly" :value="crt_1_partner_1.length === 1" v-on:input="crt_1_partner_1.length === 1 ? $emit('delact', crt_1_partner_1[0]) : $emit('addact', 1, {declarers: [v.data.declarers[0]]})">
            <div class="flex flex-row items-center">
              <div :class="'mr-2 text-xs rounded-full flex flex-row items-center  bg-' + $store.getters.meta('register_types', 1).color + '-100 overflow-hidden text-' + $store.getters.meta('register_types', 1).color + '-800'">
                <div
                  :class="'bg-' + $store.getters.meta('register_types', 1).color + '-400 text-white px-1 text-center w-8 h-full'"
                >
                  {{$store.getters.meta('register_types', 1).name[$i18n.locale]}}
                </div>
                <div
                  :class="'   text-center w-8'"
                >
                  {{$store.getters.meta('registration_types', 1).code | 1}}
                </div>
              </div>
              <label class="block text-xs text-gray-700">
                {{$store.getters.meta('registration_types', 1).label[$i18n.locale]}}
              </label>
            </div>
        </check-box-input>

      </div>
      <div class="sm:col-span-3">
        <label class="block text-sm font-medium text-gray-700">
          {{$t('add_regs')}}:</label
        >

        <check-box-input :readonly="readonly" :value="crt_6_partner_2.length === 1" v-on:input="crt_6_partner_2.length === 1 ? $emit('delact', crt_6_partner_1[1]) : $emit('addact', 6, {declarers: [v.data.declarers[1]]})">
            <div class="flex flex-row items-center">
              <div :class="'mr-2 text-xs rounded-full flex flex-row items-center  bg-' + $store.getters.meta('register_types', 1).color + '-100 overflow-hidden text-' + $store.getters.meta('register_types', 1).color + '-800'">
                <div
                  :class="'bg-' + $store.getters.meta('register_types', 1).color + '-400 text-white px-1 text-center w-8 h-full'"
                >
                  {{$store.getters.meta('register_types', 1).name[$i18n.locale]}}
                </div>
                <div
                  :class="'   text-center w-8'"
                >
                  {{$store.getters.meta('registration_types', 6).code | 6}}
                </div>
              </div>
              <label class="block text-xs text-gray-700">
                {{$store.getters.meta('registration_types', 6).label[$i18n.locale]}}
              </label>
            </div>
        </check-box-input>

        <check-box-input class="mt-1" :readonly="readonly" :value="crt_10_partner_2.length === 1" v-on:input="crt_10_partner_2.length === 1 ? $emit('delact', crt_10_partner_2[0]) : $emit('addact', 10, {declarers: [v.data.declarers[1]]})">
            <div class="flex flex-row items-center">
              <div :class="'mr-2 text-xs rounded-full flex flex-row items-center  bg-' + $store.getters.meta('register_types', 1).color + '-100 overflow-hidden text-' + $store.getters.meta('register_types', 1).color + '-800'">
                <div
                  :class="'bg-' + $store.getters.meta('register_types', 1).color + '-400 text-white px-1 text-center w-8 h-full'"
                >
                  {{$store.getters.meta('register_types', 1).name[$i18n.locale]}}
                </div>
                <div
                  :class="'   text-center w-8'"
                >
                  {{$store.getters.meta('registration_types', 10).code | 10}}
                </div>
              </div>
              <label class="block text-xs text-gray-700">
                {{$store.getters.meta('registration_types', 10).label[$i18n.locale]}}
              </label>
            </div>
        </check-box-input>

        <check-box-input class="mt-1" :readonly="readonly" :value="crt_1_partner_2.length === 1" v-on:input="crt_1_partner_2.length === 1 ? $emit('delact', crt_1_partner_2[0]) : $emit('addact', 1, {declarers: [v.data.declarers[1]]})">
            <div class="flex flex-row items-center">
              <div :class="'mr-2 text-xs rounded-full flex flex-row items-center  bg-' + $store.getters.meta('register_types', 1).color + '-100 overflow-hidden text-' + $store.getters.meta('register_types', 1).color + '-800'">
                <div
                  :class="'bg-' + $store.getters.meta('register_types', 1).color + '-400 text-white px-1 text-center w-8 h-full'"
                >
                  {{$store.getters.meta('register_types', 1).name[$i18n.locale]}}
                </div>
                <div
                  :class="'   text-center w-8'"
                >
                  {{$store.getters.meta('registration_types', 1).code | 1}}
                </div>
              </div>
              <label class="block text-xs text-gray-700">
                {{$store.getters.meta('registration_types', 1).label[$i18n.locale]}}
              </label>
            </div>
        </check-box-input>

      </div>
    </div>
    
  </div>
</template>
<script>
import PersonInput from "../../../../../components/inputs/person";
import _ from "lodash";
import ListSearchInput from "../../../../../components/inputs/list-search";
import CheckBoxInput from "../../../../../components/inputs/checkbox";

export default {
  components: {
    PersonInput,
    ListSearchInput,
    CheckBoxInput
  },
  props: {
    readonly: {
      required: false,
      default: false
    },
    value: {
      required: true,
    },
    acts: {
      required: true,
    },
    active_act: {
      required: false
    },
    modus: {
      required: false,
      default: 'view'
    }
  },
  data() {
    return {
      v: this.value,
    };
  },
  computed: {
    validations() {
      return {
        regime: _.map(this.regimes, function(r) { return r.id }).includes(this.v.data.regime),
        partner_1: this.v.data.declarers[0] && this.v.data.declarers[0].id !== null,
        partner_2: this.v.data.declarers[1] && this.v.data.declarers[1].id !== null,
        different_partners: 
        
          !((this.v.data.declarers[0] && this.v.data.declarers[0].id !== null) 
          && (this.v.data.declarers[1] && this.v.data.declarers[1].id !== null))
          
          || this.v.data.declarers[0].id !== this.v.data.declarers[1].id
        // declarer: this.v.data.declarers[0] && this.v.data.declarers[0].id !== null
      }
    },
    regimes: function () {
      let self = this;
      return _.map(this.$store.state.meta.marriage_regimes, function(el) {
        return {
          id: el.id,
          label: el.label[self.$i18n.locale],
          info: el.info[self.$i18n.locale]
        }
      });


    },
    crt_1_partner_1: function() {
      let self = this;
      if(!this.v.data.declarers[0]) return [];
      return _.filter(this.acts, function(a) {return a.id === 1 && a.data.declarers[0].id === self.v.data.declarers[0].id});
    },
    crt_1_partner_2: function() {
      let self = this;
      if(!this.v.data.declarers[1]) return [];

      return _.filter(this.acts, function(a) {return a.id === 1 && a.data.declarers[0].id === self.v.data.declarers[1].id});
    },
    crt_6_partner_1: function() {
      let self = this;
      if(!this.v.data.declarers[0]) return [];
      return _.filter(this.acts, function(a) {return a.id === 6 && a.data.declarers[0].id === self.v.data.declarers[0].id});
    },
    crt_6_partner_2: function() {
      let self = this;
      if(!this.v.data.declarers[1]) return [];

      return _.filter(this.acts, function(a) {return a.id === 6 && a.data.declarers[0].id === self.v.data.declarers[1].id});
    },
    crt_10_partner_1: function() {
      let self = this;
      if(!this.v.data.declarers[0]) return [];
      return _.filter(this.acts, function(a) {return a.id === 10 && a.data.declarers[0].id === self.v.data.declarers[0].id});
    },
    crt_10_partner_2: function() {
      let self = this;
      if(!this.v.data.declarers[1]) return [];

      return _.filter(this.acts, function(a) {return a.id === 10 && a.data.declarers[0].id === self.v.data.declarers[1].id});
    },
    lo: function() {
      return _;
    },
  },
  methods: {
    
    validate: function() {
      this.v.is_valid =
          this.v.data.declarers[0] &&
          this.v.data.declarers[1] &&
          this.v.data.declarers[0].id !== null &&
          this.v.data.declarers[1].id !== null &&
          this.v.data.declarers[0].id !== this.v.data.declarers[1].id &&
          this.v.data.regime !== null;
      this.$emit("input", this.v);
    }
  },
  watch: {
    v: {
      deep: true,
      handler: function (n, o) {
        this.validate();
        
      },
    },
    
  },

  mounted() {
    this.validate();
  },
  i18n: {
    messages: {
      en: {
        regime: 'Matrimonial property regime',
        select: 'Please select...',
        partner: 'Partner',
        add_regs: 'Additional legal acts',
        different_partners: 'You selected the same partner twice'
      },
      nl: {
        regime: 'Huwelijksvermogensstelsel',
        select: 'Selecteer',
        partner: 'Partner',
        add_regs: 'Bijkomende rechtshandelingen',
        different_partners: 'Je selecteerde twee keer dezelfde partner'
      },
      fr: {
        regime: 'Régime matrimonial',
        select: 'Sélectionner',
        partner: 'Partenaire',
        add_regs: 'Actes juridiques supplémentaires',
        different_partners: 'Tu as choisi le même partenaire deux fois'
      }
    }
  }
};
</script>