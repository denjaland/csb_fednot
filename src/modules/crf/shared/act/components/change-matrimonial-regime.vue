<template>
  <div>
    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      
      <div class="sm:col-span-3"
      :class="{
                'bg-yellow-100 -mx-2 px-2 -my-2 py-2 shadow rounded': modus === 'review' && v.data.previous !== active_act.data.previous
              }">
        <label class="block text-sm font-medium text-gray-700"
        :class="{'text-red-500': !validations.previous || !validations.different_regimes}"
          >{{$t('previous')}} *</label
        >
        <div class="mt-1">
          <list-search-input :options="regimes" v-model="v.data.previous" :readonly="readonly"></list-search-input>
        </div>
      </div>

      <div class="sm:col-span-3">
        <label class="block text-sm font-medium text-gray-700"
        :class="{'text-red-500': !validations.regime || !validations.different_regimes}"
          >{{$t('regime')}} *</label
        >
        <div class="mt-1">
          <list-search-input :options="regimes" v-model="v.data.regime" :readonly="readonly"></list-search-input>
        </div>
      </div>
    </div>
    <div v-if="!validations.different_regimes" class="mt-2 grid grid-cols-1 gap-y-6 gap-x-1 font-semibold text-red-500 text-sm">
      {{$t('different_regimes')}}
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
        previous: _.map(this.regimes, function(r) { return r.id }).includes(this.v.data.previous),
        different_regimes: 
          !(_.map(this.regimes, function(r) { return r.id }).includes(this.v.data.regime) && _.map(this.regimes, function(r) { return r.id }).includes(this.v.data.previous))
          ||
          this.v.data.regime !== this.v.data.previous,
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
    
    
    lo: function() {
      return _;
    },
  },
  methods: {
    
    validate: function() {
      this.v.is_valid =
        this.validations.regime &&
        this.validations.previous &&
        this.validations.different_regimes &&
        this.validations.partner_1 &&
        this.validations.partner_2 &&
        this.validations.different_partners;
          
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
        previous: 'Previous Matrimonial Property Regime',
        regime: 'Matrimonial Property Regime',
        select: 'Please select...',
        partner: 'Partner',
        add_regs: 'Additional legal acts',
        different_partners: 'You selected the same partner twice',
        different_regimes: 'Previous and new regime should be different'
      },
      nl: {
        previous: 'Vorig huwelijksvermogensstelsel',
        regime: 'Huwelijksvermogensstelsel',
        select: 'Selecteer',
        partner: 'Partner',
        add_regs: 'Bijkomende rechtshandelingen',
        different_partners: 'Je selecteerde twee keer dezelfde partner',
        different_regimes: 'Vorig en nieuw stelsel moeten verschillend zijn'
      },
      fr: {
        previous: 'Régime matrimonial précédente',
        regime: 'Régime matrimonial',
        select: 'Sélectionner',
        partner: 'Partenaire',
        add_regs: 'Actes juridiques supplémentaires',
        different_partners: 'Tu as choisi le même partenaire deux fois',
        different_regimes: 'L\'ancienne et la nouvelle régime doivent être différentes'
      }
    }
  }
};
</script>