<template>
  <div>
    <div class=" grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div class="sm:col-span-3">
        <label class="block text-sm font-medium text-gray-700"
        :class="{'text-red-500': !validations.declarer_1}">
          {{$t('partner')}} 1 *</label
        >
        <div class="mt-1">
          <person-input v-model="v.data.declarers[0]" :readonly="readonly"></person-input>
        </div>
      </div>
      <div class="sm:col-span-3">
        <label class="block text-sm font-medium text-gray-700"
        :class="{'text-red-500': !validations.declarer_2}">
          {{$t('partner')}} 2 *</label
        >
        <div class="mt-1">
          <person-input v-model="v.data.declarers[1]" :readonly="readonly"></person-input>
        </div>
      </div>
    </div>  
  </div>
</template>
<script>
import PersonInput from "../../../../../components/inputs/person";

export default {
  components: {
    PersonInput,
  },
  data() {
    return {
      v: this.value,
    };
  },
  computed: {
    validations() {
      return {
        declarer_1: this.v.data.declarers[0] && this.v.data.declarers[0].id !== null,
        declarer_2: this.v.data.declarers[1] && this.v.data.declarers[1].id !== null,
      }
    }
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
  methods: {
    
    validate: function() {
      this.v.is_valid =this.validations.declarer_1 && this.validations.declarer_2
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
        partner: 'Partner',
      },
      nl: {
        partner: 'Partner',
      },
      fr: {
        partner: 'Partenaire',
      }
    }
  }
};
</script>